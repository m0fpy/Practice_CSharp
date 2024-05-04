﻿//
// Copyright (c) Microsoft Corporation.  All rights reserved.
//
//
// Use of this source code is subject to the terms of the Microsoft shared
// source or premium shared source license agreement under which you licensed
// this source code. If you did not accept the terms of the license agreement,
// you are not authorized to use this source code. For the terms of the license,
// please see the license agreement between you and Microsoft or, if applicable,
// see the SOURCE.RTF on your install media or the root of your tools installation.
// THE SOURCE CODE IS PROVIDED "AS IS", WITH NO WARRANTIES OR INDEMNITIES.
//

///////////////////////////////////////////////////////////////////////////////
// heper to get a designer property as a bool
///////////////////////////////////////////////////////////////////////////////
function getDesignerPropAsBool(tname) {
    if (document.designerProps.hasTrait(tname))
        return document.designerProps.getTrait(tname).value;

    return false;
}

function getSelectionMode() {
    if (getDesignerPropAsBool("usePivot"))
        return 0; // default to object mode when using pivot
    if (document.designerProps.hasTrait("SelectionMode"))
        return document.designerProps.getTrait("SelectionMode").value;
    return 0;
}

function getCommandState(commandName) {
    var commandData = services.commands.getCommandData(commandName);
    if (commandData != null) {
        var trait = commandData.getTrait("state");
        if (trait != null) {
            return trait.value;
        }
    }
    return -1;
}

///////////////////////////////////////////////////////////////////////////////
// Button state trait
///////////////////////////////////////////////////////////////////////////////
var state = command.getTrait("state");

///////////////////////////////////////////////////////////////////////////////
// Property window and tool option settings 
///////////////////////////////////////////////////////////////////////////////

var enablePropertyWindow = 8;

var stepAmount = 1.0;

function StepAmountChanged(sender, args) {
    stepAmount = document.toolProps.getTrait("StepAmount").value;
}

var toolProps;
var toolPropCookie;
var snapCookie;
function createOptions() {
    toolProps = document.createElement("toolProps", "type", "toolProps");
    toolProps.getOrCreateTrait("StepAmount", "float", enablePropertyWindow);
    document.toolProps = toolProps;

    var snapTrait = document.designerProps.getOrCreateTrait("snap", "bool", 0);
    snapCookie = snapTrait.addHandler("OnDataChanged", OnSnapEnabledTraitChanged);

    toolProps.getTrait("StepAmount").value = stepAmount;

    // Set up the callback when the option traits are changed
    toolPropCookie = toolProps.getTrait("StepAmount").addHandler("OnDataChanged", StepAmountChanged);

    OnSnapEnabledTraitChanged(null, null);
}

function OnSnapEnabledTraitChanged(sender, args) {
    var snapTrait = document.designerProps.getOrCreateTrait("snap", "bool", 0);
    if (toolProps != null) {
        var stepAmountTrait = toolProps.getTrait("StepAmount");
        if (stepAmountTrait != null) {
            var newFlags = stepAmountTrait.flags;
            if (snapTrait.value) {
                newFlags |= enablePropertyWindow;
            }
            else {
                newFlags &= ~enablePropertyWindow;
            }
            stepAmountTrait.flags = newFlags;

            document.refreshPropertyWindow();
        }
    }
}

function getCameraElement()
{
    var camera = document.elements.findElementByTypeId("Microsoft.VisualStudio.3D.PerspectiveCamera");
    return camera;
}

function getWorldMatrix(element) {
    return element.getTrait("WorldTransform").value;
}

// find the mesh child
function findFirstChildMesh(parent) {
    // find the mesh child
    for (var i = 0; i < parent.childCount; i++) {

        // get child and its materials
        var child = parent.getChild(i);
        if (child.typeId == "Microsoft.VisualStudio.3D.Mesh") {
            return child;
        }
    }
    return null;
}

function getFirstSelectedWithoutAncestorInSelection() {
    var count = services.selection.count;
    for (var i = 0; i < count; i++) {
        var currSelected = services.selection.getElement(i);

        //
        // don't operate on items whose parents (in scene) are ancestors
        // since this will double the amount of translation applied to those
        //
        var hasAncestor = false;
        for (var otherIndex = 0; otherIndex < count; otherIndex++) {
            if (otherIndex != i) {
                var ancestor = services.selection.getElement(otherIndex);
                if (currSelected.behavior.isAncestor(ancestor)) {
                    hasAncestor = true;
                    break;
                }
            }
        }

        if (!hasAncestor) {
            return currSelected;
        }
    }
    return null;
}

///////////////////////////////////////////////////////////////////////////////
// Manipulator registration and event handling
///////////////////////////////////////////////////////////////////////////////
var manipulatorData = services.manipulators.getManipulatorData("ScaleManipulator");
var manipulator = services.manipulators.getManipulator("ScaleManipulator");
var undoableItem;

var manipulatorTraitXYZTraitChangedCookie;
var mxyz;

var accumDx;
var accumDy;
var accumDz;

///////////////////////////////////////////////////////////////////////////////
// Scale logic
///////////////////////////////////////////////////////////////////////////////
function coreScale(dx, dy, dz) {

    var selectionMode = getSelectionMode();

    var selectedElement = getFirstSelectedWithoutAncestorInSelection();

    if (selectedElement == null) {
        return;
    }

    if (selectionMode == 0) {

        //
        // object mode
        //
        var t = selectedElement.getTrait("Scale").value;

        var isSnapMode = getDesignerPropAsBool("snap");
        if (isSnapMode && stepAmount != 0) {

            var targetX = t[0] + dx + accumDx;
            var targetY = t[1] + dy + accumDy;
            var targetZ = t[2] + dz + accumDz;

            var roundedX = Math.round(targetX / stepAmount) * stepAmount;
            var roundedY = Math.round(targetY / stepAmount) * stepAmount;
            var roundedZ = Math.round(targetZ / stepAmount) * stepAmount;

            var halfStep = stepAmount * 0.5;
            var stepPct = halfStep * 0.9;

            if (Math.abs(roundedX - targetX) < stepPct) {
                t[0] = roundedX;
            }

            if (Math.abs(roundedY - targetY) < stepPct) {
                t[1] = roundedY;
            }

            if (Math.abs(roundedZ - targetZ) < stepPct) {
                t[2] = roundedZ;
            }

            accumDx = targetX - t[0];
            accumDy = targetY - t[1];
            accumDz = targetZ - t[2];
        }
        else {
            t[0] = t[0] + dx;
            t[1] = t[1] + dy;
            t[2] = t[2] + dz;
        }

        var minScale = 0.00001;
        if (Math.abs(t[0]) < minScale) {
            t[0] = minScale;
        }
        if (Math.abs(t[1]) < minScale) {
            t[1] = minScale;
        }
        if (Math.abs(t[2]) < minScale) {
            t[2] = minScale;
        }

        undoableItem._lastValue = t;
        undoableItem.onDo();
    }
    else if (selectionMode == 1 || selectionMode == 2 || selectionMode == 3) {

        // subobjects    
        undoableItem._currentDelta[0] = dx;
        undoableItem._currentDelta[1] = dy;
        undoableItem._currentDelta[2] = dz;

        undoableItem.onDo();
    }
}

///////////////////////////////////////////////////////////////////////////////
//
// Listens to manipulator position changes
//
///////////////////////////////////////////////////////////////////////////////
function onManipulatorXYZChangedHandler(sender, args) {
    var xyzDelta = manipulatorData.getTrait("ManipulatorTraitXYZ").value;
    var dx = xyzDelta[0];
    var dy = xyzDelta[1];
    var dz = xyzDelta[2];

    coreScale(dx, dy, dz);
}

function UndoableSubobjectScale(obj, elem) {

    obj._totalDelta = [1, 1, 1];
    obj._currentDelta = [0, 0, 0];
    
    // find the mesh child
    obj._meshElem = findFirstChildMesh(elem);
    if (obj._meshElem == null) {
        return;
    }

    // get the scale origin in local space of node we're manipulating
    var manipulatorToWorld = manipulator.getWorldTransform();
    manipulatorToWorld = math.getNormalizedMatrix(manipulatorToWorld);

    var localToWorldMatrix = getWorldMatrix(obj._meshElem);

    var worldToLocal = math.getInverse(localToWorldMatrix);
    obj._manipulatorToLocal = math.multiplyMatrix(worldToLocal, manipulatorToWorld);
    obj._localToManipulator = math.getInverse(obj._manipulatorToLocal);

    obj._mesh = obj._meshElem.behavior;

    // loop over the elements in the polygon collection
    var collElem = obj._mesh.selectedObjects;
    if (collElem == null) {
        return;
    }

    obj._collectionElem = collElem.clone();

    // get the actual collection we can operate on
    obj._collection = obj._collectionElem.behavior;

    obj._geom = obj._meshElem.getTrait("Geometry").value
}

function SubobjectDoScale(obj)
{
    var polygonPoints = obj.getPoints();
    var lastTotal = [0, 0, 0];

    lastTotal[0] = obj._totalDelta[0];
    lastTotal[1] = obj._totalDelta[1];
    lastTotal[2] = obj._totalDelta[2];

    obj._totalDelta[0] += obj._currentDelta[0];
    obj._totalDelta[1] += obj._currentDelta[1];
    obj._totalDelta[2] += obj._currentDelta[2];

    var scale = [obj._totalDelta[0] / lastTotal[0], obj._totalDelta[1] / lastTotal[1], obj._totalDelta[2] / lastTotal[2]];

    var scaleMatrix = math.createScale(scale);

    var transform = math.multiplyMatrix(scaleMatrix, obj._localToManipulator);
    transform = math.multiplyMatrix(obj._manipulatorToLocal, transform);

    // loop over the unique set of indices and transform the associated point
    for (var key in polygonPoints) {

        var ptIdx = polygonPoints[key];
        var pt = obj._geom.getPointAt(ptIdx);

        pt = math.transformPoint(transform, pt);

        obj._geom.setPointAt(ptIdx, pt);
    }

    // invalidate the mesh collision
    obj._mesh.recomputeCachedGeometry();
}

function SubobjectUndoScale(obj) {
    var polygonPoints = obj.getPoints();

    var scale = [1.0 / obj._totalDelta[0], 1.0 / obj._totalDelta[1], 1.0 / obj._totalDelta[2]];

    var scaleMatrix = math.createScale(scale);

    var transform = math.multiplyMatrix(scaleMatrix, obj._localToManipulator);
    transform = math.multiplyMatrix(obj._manipulatorToLocal, transform);

    // loop over the unique set of indices and transform the associated point
    for (var key in polygonPoints) {

        var ptIdx = polygonPoints[key];
        var pt = obj._geom.getPointAt(ptIdx);

        pt = math.transformPoint(transform, pt);

        obj._geom.setPointAt(ptIdx, pt);
    }

    obj._currentDelta[0] = obj._totalDelta[0] - 1;
    obj._currentDelta[1] = obj._totalDelta[1] - 1;
    obj._currentDelta[2] = obj._totalDelta[2] - 1;

    obj._totalDelta[0] = 1;
    obj._totalDelta[1] = 1;
    obj._totalDelta[2] = 1;

    obj._mesh.recomputeCachedGeometry();
}

function onBeginManipulation() {

    undoableItem = null;

    //
    // Check the selection mode
    //
    var selectionMode = getSelectionMode();
    if (selectionMode == 0) {
        //
        // object selection
        //

        accumDx = 0;
        accumDy = 0;
        accumDz = 0;

        function UndoableScale(trait, traitValues, initialValue) {
            this._traitArray = traitArray;
            this._traitValues = traitValues;
            this._initialValues = initialValue;
        }

        var traitArray = new Array();
        var traitValues = new Array();
        var initialValues = new Array();

        //
        // add the traits of selected items to the collections that we'll be operating on
        //
        var count = services.selection.count;
        for (i = 0; i < count; i++) {
            var currSelected = services.selection.getElement(i);

            //
            // don't operate on items whose parents (in scene) are ancestors
            // since this will double the amount of translation applied to those
            //
            var hasAncestor = false;
            for (var otherIndex = 0; otherIndex < count; otherIndex++) {
                if (otherIndex != i) {
                    var ancestor = services.selection.getElement(otherIndex);
                    if (currSelected.behavior.isAncestor(ancestor)) {
                        hasAncestor = true;
                        break;
                    }
                }
            }

            if (!hasAncestor) {
                var currTrait = currSelected.getTrait("Scale");

                traitArray.push(currTrait);
                traitValues.push(currTrait.value);
                initialValues.push(currTrait.value);
            }
        }


        // create the undoable item
        undoableItem = new UndoableScale(traitArray, traitValues, initialValues);

        undoableItem.onDo = function () {

            var count = this._traitArray.length;

            // movement delta of all the selected is determined by delta of the first selected
            var delta = [0, 0, 0];
            if (count > 0) {
                delta[0] = this._lastValue[0] - this._initialValues[0][0];
                delta[1] = this._lastValue[1] - this._initialValues[0][1];
                delta[2] = this._lastValue[2] - this._initialValues[0][2];
            }

            for (i = 0; i < count; i++) {
                var currTrait = this._traitArray[i];
                this._traitValues[i][0] = this._initialValues[i][0] + delta[0];
                this._traitValues[i][1] = this._initialValues[i][1] + delta[1];
                this._traitValues[i][2] = this._initialValues[i][2] + delta[2];

                var theVal = [this._traitValues[i][0], this._traitValues[i][1], this._traitValues[i][2]];
                this._traitArray[i].value = theVal;
            }
        }

        undoableItem.onUndo = function () {
            var count = this._traitArray.length;
            for (i = 0; i < count; i++) {
                this._traitArray[i].value = this._initialValues[i];
            }
        }
    }
    else {
        
        // create the undoable item
        undoableItem = new Object();
        UndoableSubobjectScale(undoableItem, document.selectedElement);

        if (selectionMode == 1) {
            
            // face selection mode

            // gets the points
            undoableItem.getPoints = function () {

                // map we will store indices in
                // we use the map instead of array to eliminate dups
                var polygonPoints = new Object();

                // loop over the point indices in the poly collection
                var polyCount = this._collection.getPolygonCount();
                for (var i = 0; i < polyCount; i++) {
                    var polyIndex = this._collection.getPolygon(i);

                    // get the point count and loop over polygon points
                    var polygonPointCount = this._geom.getPolygonPointCount(polyIndex);
                    for (var j = 0; j < polygonPointCount; j++) {

                        // get the point index
                        var pointIndex = this._geom.getPolygonPoint(polyIndex, j);
                        polygonPoints[pointIndex] = pointIndex;
                    }
                }

                return polygonPoints;
            }
        }
        else if (selectionMode == 2) {

            // edges selection mode

            // gets the points
            undoableItem.getPoints = function () {

                // we use the map instead of array to eliminate dups
                var polygonPoints = new Object();

                // loop over the edges collection
                var edgeCount = this._collection.getEdgeCount();
                for (var i = 0; i < edgeCount; i++) {
                    var edge = this._collection.getEdge(i);
                    polygonPoints[edge[0]] = edge[0];
                    polygonPoints[edge[1]] = edge[1];
                }

                return polygonPoints;
            }
        }
        else if (selectionMode == 3) {

            // point selection mode

            // gets the points
            undoableItem.getPoints = function () {

                // we use the map instead of array to eliminate dups
                var polygonPoints = new Object();

                // loop over the point indices in the collection
                var ptCount = this._collection.getPointCount();
                for (var i = 0; i < ptCount; i++) {
                    var pt = this._collection.getPoint(i);
                    polygonPoints[pt] = pt;
                }

                return polygonPoints;
            }
        }

        //
        // do
        //
        undoableItem.onDo = function () {
            SubobjectDoScale(this);
        }

        //
        // undo
        //
        undoableItem.onUndo = function () {
            SubobjectUndoScale(this);
        }
    }

    if (undoableItem != null) {
        //
        // getName()
        //
        undoableItem.getName = function () {
            var IDS_MreUndoScale = 145;
            return services.strings.getStringFromId(IDS_MreUndoScale);
        }

        // add to undo stack
        services.undoService.addUndoableItem(undoableItem);
    }
}

//
// the tool
//
var tool = new Object();

var onBeginManipulationHandler;

tool.activate = function () {
    state.value = 2;

    createOptions();

    services.manipulators.activate("ScaleManipulator")

    mxyz = manipulatorData.getTrait("ManipulatorTraitXYZ");

    manipulatorTraitXYZTraitChangedCookie = mxyz.addHandler("OnDataChanged", onManipulatorXYZChangedHandler);

    onBeginManipulationHandler = manipulator.addHandler("OnBeginManipulation", onBeginManipulation);
}

tool.deactivate = function () {
    state.value = 0;

    toolProps.getTrait("StepAmount").removeHandler("OnDataChanged", toolPropCookie);

    var snapTrait = document.designerProps.getOrCreateTrait("snap", "bool", 0);
    snapTrait.removeHandler("OnDataChanged", snapCookie);

    mxyz.removeHandler("OnDataChanged", manipulatorTraitXYZTraitChangedCookie);
    
    manipulator.removeHandler("OnBeginManipulation", onBeginManipulationHandler);

    services.manipulators.deactivate("ScaleManipulator");
}

///////////////////////////////////////////////////////////////////////////////
// Global code
///////////////////////////////////////////////////////////////////////////////
if (state.value != 2) {
    document.setTool(tool);
}
// SIG // Begin signature block
// SIG // MIInzAYJKoZIhvcNAQcCoIInvTCCJ7kCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // sfppIvAUfmoyDEnMCUyCiCNyBUQJN01CKjbrhRDg+Iqg
// SIG // gg2FMIIGAzCCA+ugAwIBAgITMwAAA64tNVHIU49VHQAA
// SIG // AAADrjANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIzMTExNjE5MDg1OVoX
// SIG // DTI0MTExNDE5MDg1OVowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // 9CD8pjY3wxCoPmMhOkow7ycCltfqYnqk4wGNApzh2dTY
// SIG // +YqxozWTzJUOB38VxsgFQmXBFhOMdrGYGpvO9kdbNPkw
// SIG // HpTrW6hZqFuLLiRwGKEx4ZM5zVSqbHJuX2fPfUJ0Xmb+
// SIG // VrVsGw/BwBV2zz0rVtiSgqj3GeeGOsG7llfWyrSjyJqm
// SIG // 5DHE3o04BAI/NuhkHOv04euiqJGvHFCL8+fXvyD9OAxq
// SIG // 4fcJKtoyBb0PBA3oMNQeCsiUyLO+voZqVTOUsAWY0bN5
// SIG // YjkK4nq5DVaNdVrrowd5AX9gmz6D/TJTssns6pDCG00Y
// SIG // +Dh3ipWpnVmkhYcByyUSEKX3PLC8DkiAQQIDAQABo4IB
// SIG // gjCCAX4wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFIcf73Spl4cHOFoll27H9COd
// SIG // 4fE/MFQGA1UdEQRNMEukSTBHMS0wKwYDVQQLEyRNaWNy
// SIG // b3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExpbWl0ZWQx
// SIG // FjAUBgNVBAUTDTIzMDAxMis1MDE4MzYwHwYDVR0jBBgw
// SIG // FoAUSG5k5VAF04KqFzc3IrVtqMp1ApUwVAYDVR0fBE0w
// SIG // SzBJoEegRYZDaHR0cDovL3d3dy5taWNyb3NvZnQuY29t
// SIG // L3BraW9wcy9jcmwvTWljQ29kU2lnUENBMjAxMV8yMDEx
// SIG // LTA3LTA4LmNybDBhBggrBgEFBQcBAQRVMFMwUQYIKwYB
// SIG // BQUHMAKGRWh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvY2VydHMvTWljQ29kU2lnUENBMjAxMV8yMDEx
// SIG // LTA3LTA4LmNydDAMBgNVHRMBAf8EAjAAMA0GCSqGSIb3
// SIG // DQEBCwUAA4ICAQBqyWA1Eu7PKNMjaaxl0V7gJ0XBysUo
// SIG // xZluMHJXFE2LEGZIZ2zMLYVjOnAGG/4dluRjSrZZo/8v
// SIG // wk4Xt8v6NBB9ofo8H1P/XidHytWTv9lg9MYu++6lPmu5
// SIG // fCozD3cI2NLZPW2BBhGX2D0R8tQBj0FbmZRuIucpiQ7D
// SIG // K3CHKlfKcc7MP8pPzuMv55Tox8+KFQD1NG6+bfbYA/BN
// SIG // PBkg4tyOh+exbaHfcNuodDJUIjq9dF6oa+Yjy0u0pUMI
// SIG // /B1t+8m6rJo0KSoZlrpesYl0jRhpt+hmqx8uENXoGJcY
// SIG // ZVJ5N2Skq90LViKNRhi9N4U+e8c4y9uXyomUF/6viCPJ
// SIG // 7huTNEJo75ehIJba+IWd3txUEc0R3y6DT6txC6cW1nR/
// SIG // LTbo9I/8fQq538G5IvJ+e5iSiOSVVkVk0i5m03Awy5E2
// SIG // ZSS4PVdQSCcFxmN4tpEfYuR7AAy/GJVtIDFlUpSgdXok
// SIG // pSui5hYtK1R9enXXvo+U/xGkLRc+qp4De3dZbzu7pOq7
// SIG // V/jCyhuCw0bEIAU4urCGIip7TI6GBRzD7yPzjFIqeZY7
// SIG // S4rVW5BRn2oEqpm8Su6yTIQvMIk8x2pwYNUa2339Z4gW
// SIG // 5xW21eFA5mLpo7NRSKRQms5OgAA18aCgqOU7Ds0h6q/Y
// SIG // B4BmEAtoTMl/TBiyKaMGAlEcdy+5FIhmzojMGjCCB3ow
// SIG // ggVioAMCAQICCmEOkNIAAAAAAAMwDQYJKoZIhvcNAQEL
// SIG // BQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMT
// SIG // KU1pY3Jvc29mdCBSb290IENlcnRpZmljYXRlIEF1dGhv
// SIG // cml0eSAyMDExMB4XDTExMDcwODIwNTkwOVoXDTI2MDcw
// SIG // ODIxMDkwOVowfjELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEoMCYG
// SIG // A1UEAxMfTWljcm9zb2Z0IENvZGUgU2lnbmluZyBQQ0Eg
// SIG // MjAxMTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoC
// SIG // ggIBAKvw+nIQHC6t2G6qghBNNLrytlghn0IbKmvpWlCq
// SIG // uAY4GgRJun/DDB7dN2vGEtgL8DjCmQawyDnVARQxQtOJ
// SIG // DXlkh36UYCRsr55JnOloXtLfm1OyCizDr9mpK656Ca/X
// SIG // llnKYBoF6WZ26DJSJhIv56sIUM+zRLdd2MQuA3WraPPL
// SIG // bfM6XKEW9Ea64DhkrG5kNXimoGMPLdNAk/jj3gcN1Vx5
// SIG // pUkp5w2+oBN3vpQ97/vjK1oQH01WKKJ6cuASOrdJXtjt
// SIG // 7UORg9l7snuGG9k+sYxd6IlPhBryoS9Z5JA7La4zWMW3
// SIG // Pv4y07MDPbGyr5I4ftKdgCz1TlaRITUlwzluZH9TupwP
// SIG // rRkjhMv0ugOGjfdf8NBSv4yUh7zAIXQlXxgotswnKDgl
// SIG // mDlKNs98sZKuHCOnqWbsYR9q4ShJnV+I4iVd0yFLPlLE
// SIG // tVc/JAPw0XpbL9Uj43BdD1FGd7P4AOG8rAKCX9vAFbO9
// SIG // G9RVS+c5oQ/pI0m8GLhEfEXkwcNyeuBy5yTfv0aZxe/C
// SIG // HFfbg43sTUkwp6uO3+xbn6/83bBm4sGXgXvt1u1L50kp
// SIG // pxMopqd9Z4DmimJ4X7IvhNdXnFy/dygo8e1twyiPLI9A
// SIG // N0/B4YVEicQJTMXUpUMvdJX3bvh4IFgsE11glZo+TzOE
// SIG // 2rCIF96eTvSWsLxGoGyY0uDWiIwLAgMBAAGjggHtMIIB
// SIG // 6TAQBgkrBgEEAYI3FQEEAwIBADAdBgNVHQ4EFgQUSG5k
// SIG // 5VAF04KqFzc3IrVtqMp1ApUwGQYJKwYBBAGCNxQCBAwe
// SIG // CgBTAHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB
// SIG // /wQFMAMBAf8wHwYDVR0jBBgwFoAUci06AjGQQ7kUBU7h
// SIG // 6qfHMdEjiTQwWgYDVR0fBFMwUTBPoE2gS4ZJaHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvTWljUm9vQ2VyQXV0MjAxMV8yMDExXzAzXzIyLmNy
// SIG // bDBeBggrBgEFBQcBAQRSMFAwTgYIKwYBBQUHMAKGQmh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2kvY2VydHMv
// SIG // TWljUm9vQ2VyQXV0MjAxMV8yMDExXzAzXzIyLmNydDCB
// SIG // nwYDVR0gBIGXMIGUMIGRBgkrBgEEAYI3LgMwgYMwPwYI
// SIG // KwYBBQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNv
// SIG // bS9wa2lvcHMvZG9jcy9wcmltYXJ5Y3BzLmh0bTBABggr
// SIG // BgEFBQcCAjA0HjIgHQBMAGUAZwBhAGwAXwBwAG8AbABp
// SIG // AGMAeQBfAHMAdABhAHQAZQBtAGUAbgB0AC4gHTANBgkq
// SIG // hkiG9w0BAQsFAAOCAgEAZ/KGpZjgVHkaLtPYdGcimwuW
// SIG // EeFjkplCln3SeQyQwWVfLiw++MNy0W2D/r4/6ArKO79H
// SIG // qaPzadtjvyI1pZddZYSQfYtGUFXYDJJ80hpLHPM8QotS
// SIG // 0LD9a+M+By4pm+Y9G6XUtR13lDni6WTJRD14eiPzE32m
// SIG // kHSDjfTLJgJGKsKKELukqQUMm+1o+mgulaAqPyprWElj
// SIG // HwlpblqYluSD9MCP80Yr3vw70L01724lruWvJ+3Q3fMO
// SIG // r5kol5hNDj0L8giJ1h/DMhji8MUtzluetEk5CsYKwsat
// SIG // ruWy2dsViFFFWDgycScaf7H0J/jeLDogaZiyWYlobm+n
// SIG // t3TDQAUGpgEqKD6CPxNNZgvAs0314Y9/HG8VfUWnduVA
// SIG // KmWjw11SYobDHWM2l4bf2vP48hahmifhzaWX0O5dY0Hj
// SIG // Wwechz4GdwbRBrF1HxS+YWG18NzGGwS+30HHDiju3mUv
// SIG // 7Jf2oVyW2ADWoUa9WfOXpQlLSBCZgB/QACnFsZulP0V3
// SIG // HjXG0qKin3p6IvpIlR+r+0cjgPWe+L9rt0uX4ut1eBrs
// SIG // 6jeZeRhL/9azI2h15q/6/IvrC4DqaTuv/DDtBEyO3991
// SIG // bWORPdGdVk5Pv4BXIqF4ETIheu9BCrE/+6jMpF3BoYib
// SIG // V3FWTkhFwELJm3ZbCoBIa/15n8G9bW1qyVJzEw16UM0x
// SIG // ghmfMIIZmwIBATCBlTB+MQswCQYDVQQGEwJVUzETMBEG
// SIG // A1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBTaWduaW5n
// SIG // IFBDQSAyMDExAhMzAAADri01UchTj1UdAAAAAAOuMA0G
// SIG // CWCGSAFlAwQCAQUAoIGuMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEE
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCANy8WGJO7NaQ/T
// SIG // YFTI8D56WfFGjvAFdw7HpvM/AwO5oTBCBgorBgEEAYI3
// SIG // AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAY
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3
// SIG // DQEBAQUABIIBAIzbEomrm5QSeYQlxlDqK0NVwGo7MzVF
// SIG // 5FeEqPHNcvmP6coyG1PI5fJnzd4FTlyHtALi9jYICeMH
// SIG // qk1b9BFoV2JMmO9+Lt4SN9SO38xUAdaUChPZ5EFtHCW1
// SIG // 9KIM4qyRFhmYmFttkEln/Sircuv7IXClLWBN6wJlHUtO
// SIG // bAb1pCKDpAg95twhm1zqoLlXhb0qHB7n92lvXCAyjw0i
// SIG // 3BFY3y8HVEhfa3bacsLiuZzUA4NkzjenLesFD8rxcNj6
// SIG // bMHdDqX7vJ4GNQFQvUaLbgJreUb1HwKCh7TK7vtq3b97
// SIG // VQU+37UpuDljXITcQopHUaG8DgZKIgsKlmGY+x+UCTX3
// SIG // ewihghcpMIIXJQYKKwYBBAGCNwMDATGCFxUwghcRBgkq
// SIG // hkiG9w0BBwKgghcCMIIW/gIBAzEPMA0GCWCGSAFlAwQC
// SIG // AQUAMIIBWQYLKoZIhvcNAQkQAQSgggFIBIIBRDCCAUAC
// SIG // AQEGCisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // zGSXKpgMVeEtCfmnbQRtODr2LmtC88CwE42sN6YFC9AC
// SIG // BmWunuiXJxgTMjAyNDAxMjUxOTQ2NTAuMDU5WjAEgAIB
// SIG // 9KCB2KSB1TCB0jELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEtMCsG
// SIG // A1UECxMkTWljcm9zb2Z0IElyZWxhbmQgT3BlcmF0aW9u
// SIG // cyBMaW1pdGVkMSYwJAYDVQQLEx1UaGFsZXMgVFNTIEVT
// SIG // TjoxNzlFLTRCQjAtODI0NjElMCMGA1UEAxMcTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgU2VydmljZaCCEXgwggcnMIIF
// SIG // D6ADAgECAhMzAAAB4NT8HxMVH35dAAEAAAHgMA0GCSqG
// SIG // SIb3DQEBCwUAMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAk
// SIG // BgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAy
// SIG // MDEwMB4XDTIzMTAxMjE5MDcxOVoXDTI1MDExMDE5MDcx
// SIG // OVowgdIxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xLTArBgNVBAsT
// SIG // JE1pY3Jvc29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGlt
// SIG // aXRlZDEmMCQGA1UECxMdVGhhbGVzIFRTUyBFU046MTc5
// SIG // RS00QkIwLTgyNDYxJTAjBgNVBAMTHE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFNlcnZpY2UwggIiMA0GCSqGSIb3DQEB
// SIG // AQUAA4ICDwAwggIKAoICAQCsh5zzocW70QE5xo2/+n7g
// SIG // YYd2S86LQMQIHS2mf85ERVHXkis8jbd7aqKzCuxg73F3
// SIG // SrPqiDFG73p5R/sOd7LD2uq2D++tGbhawAa37Hq39JBW
// SIG // sjV1c8E+42qyThI5xTAafsovrsENk5ybsXM3HhuRQx6y
// SIG // COrBehfO/ZT+snWNAQWZGfbd/Xv7LzUYngOYFJ7/2HDP
// SIG // 2yDGP0GJnfRdAfnmxWIvjx+AJF2oTZBYCvOTiGkawxr4
// SIG // Z8Tmv+cxi+zooou/iff0B5HSRpX50X20N0FzP+f7pgTi
// SIG // huCaBWNZ4meUVR+T09Prgo8HKoU2571LXyvjfsgdm/ax
// SIG // Gb6dk7+GcGMxHfQPVbGDLmYgkm2hTJO+y8FW5JaZ8OGh
// SIG // 1iVyZBGJib8UW3E4RPBUMjqFZErinOTlmdvljP4+dKG5
// SIG // QNLQlOdwGrr1DmUaEAYfPZxyvpuaTlyl3WDCfnHri2Bf
// SIG // Iecv3Fy0DDpqiyc+ZezC6hsFNMx1fjBDvC9RaNsxBEOI
// SIG // i+AV/GJJyl6JxxkGnEgmi2aLdpMiVUbBUsZ9D5T7x1ad
// SIG // GHbAjM3XosPYwGeyvbNVsbGRhAayv6G4qV+rsYxKclAP
// SIG // Zm1T5Y5W90eDFiNBNsSPzTOheAHPAnmsd2Fi0/mlgmXq
// SIG // oiDC8cslmYPotSmPGRMzHjUyghCOcBdcMaq+k9fzEKPv
// SIG // LQIDAQABo4IBSTCCAUUwHQYDVR0OBBYEFHBeFz9unVfv
// SIG // ErrKANV10Nkw0pnSMB8GA1UdIwQYMBaAFJ+nFV0AXmJd
// SIG // g/Tl0mWnG1M1GelyMF8GA1UdHwRYMFYwVKBSoFCGTmh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY3Js
// SIG // L01pY3Jvc29mdCUyMFRpbWUtU3RhbXAlMjBQQ0ElMjAy
// SIG // MDEwKDEpLmNybDBsBggrBgEFBQcBAQRgMF4wXAYIKwYB
// SIG // BQUHMAKGUGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvY2VydHMvTWljcm9zb2Z0JTIwVGltZS1TdGFt
// SIG // cCUyMFBDQSUyMDIwMTAoMSkuY3J0MAwGA1UdEwEB/wQC
// SIG // MAAwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwgwDgYDVR0P
// SIG // AQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4ICAQDAE84O
// SIG // kfwNJXTuzKhsQ9VSY4uclQNYR29B3NGI7b+1pMUPIsH3
// SIG // 5bpV+VLOuLQ9/tzU9SZKYVs2gFn9sCnQMN+UcbUBtYjj
// SIG // dxxGdF9t53XuCoP1n28eaxB5GfW8yp0f9jeQNevsP9aW
// SIG // 8Cc3X0XJyU93C8msK/5GIzFnetzj9Bpau9LmuFlBPz6O
// SIG // aVO60EW1hKEKM2NuIQKjnMLkXJugm9CQXkzgnkQZ7RCo
// SIG // IynqeKUWkLe2/b7rE/e1niXH2laLJpj7bGbGsIJ6SI2w
// SIG // WuebR37pNLw5GbWyF41OJq+XZ7PXZ2pwXQUtj2Nzd4SH
// SIG // wjxDrM6rsBy5H5BWf/W8cPP3kSZXbaLpB6NemnxPwKj/
// SIG // 7JphiYeWUdKZoFukHF/uta3YuZAyU8whWqDMmM1EtEhG
// SIG // 8qw2f6dijrigGDZ4JY4jpZZXLdLiVc9moH3Mxo47Cotg
// SIG // EtVml7zoYGTZhsONkhQdampaGvCmrsfUNhxyxPIHnv+a
// SIG // 4Dp8fc0m31VHOyHETaHauke7/kc/j+lyrToMgqlv/q4T
// SIG // 5qf5+xatgRk0ZHMv/4Zkt9qeqsoJa9iuDqCQyV8RbOpc
// SIG // HPA/OqpVHho1MqO4VcuVb8gPstJhpxALgPObbDnFD5c8
// SIG // FhebL/geX89+Tlt1+EqZOUojbpZyxUTzOVwrEh6r3Gwv
// SIG // Ed6sI9sNXrz4WcQ7jTCCB3EwggVZoAMCAQICEzMAAAAV
// SIG // xedrngKbSZkAAAAAABUwDQYJKoZIhvcNAQELBQAwgYgx
// SIG // CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9u
// SIG // MRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jv
// SIG // c29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eSAy
// SIG // MDEwMB4XDTIxMDkzMDE4MjIyNVoXDTMwMDkzMDE4MzIy
// SIG // NVowfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwggIi
// SIG // MA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDk4aZM
// SIG // 57RyIQt5osvXJHm9DtWC0/3unAcH0qlsTnXIyjVX9gF/
// SIG // bErg4r25PhdgM/9cT8dm95VTcVrifkpa/rg2Z4VGIwy1
// SIG // jRPPdzLAEBjoYH1qUoNEt6aORmsHFPPFdvWGUNzBRMhx
// SIG // XFExN6AKOG6N7dcP2CZTfDlhAnrEqv1yaa8dq6z2Nr41
// SIG // JmTamDu6GnszrYBbfowQHJ1S/rboYiXcag/PXfT+jlPP
// SIG // 1uyFVk3v3byNpOORj7I5LFGc6XBpDco2LXCOMcg1KL3j
// SIG // tIckw+DJj361VI/c+gVVmG1oO5pGve2krnopN6zL64NF
// SIG // 50ZuyjLVwIYwXE8s4mKyzbnijYjklqwBSru+cakXW2dg
// SIG // 3viSkR4dPf0gz3N9QZpGdc3EXzTdEonW/aUgfX782Z5F
// SIG // 37ZyL9t9X4C626p+Nuw2TPYrbqgSUei/BQOj0XOmTTd0
// SIG // lBw0gg/wEPK3Rxjtp+iZfD9M269ewvPV2HM9Q07BMzlM
// SIG // jgK8QmguEOqEUUbi0b1qGFphAXPKZ6Je1yh2AuIzGHLX
// SIG // pyDwwvoSCtdjbwzJNmSLW6CmgyFdXzB0kZSU2LlQ+QuJ
// SIG // YfM2BjUYhEfb3BvR/bLUHMVr9lxSUV0S2yW6r1AFemzF
// SIG // ER1y7435UsSFF5PAPBXbGjfHCBUYP3irRbb1Hode2o+e
// SIG // FnJpxq57t7c+auIurQIDAQABo4IB3TCCAdkwEgYJKwYB
// SIG // BAGCNxUBBAUCAwEAATAjBgkrBgEEAYI3FQIEFgQUKqdS
// SIG // /mTEmr6CkTxGNSnPEP8vBO4wHQYDVR0OBBYEFJ+nFV0A
// SIG // XmJdg/Tl0mWnG1M1GelyMFwGA1UdIARVMFMwUQYMKwYB
// SIG // BAGCN0yDfQEBMEEwPwYIKwYBBQUHAgEWM2h0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvRG9jcy9SZXBv
// SIG // c2l0b3J5Lmh0bTATBgNVHSUEDDAKBggrBgEFBQcDCDAZ
// SIG // BgkrBgEEAYI3FAIEDB4KAFMAdQBiAEMAQTALBgNVHQ8E
// SIG // BAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAW
// SIG // gBTV9lbLj+iiXGJo0T2UkFvXzpoYxDBWBgNVHR8ETzBN
// SIG // MEugSaBHhkVodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20v
// SIG // cGtpL2NybC9wcm9kdWN0cy9NaWNSb29DZXJBdXRfMjAx
// SIG // MC0wNi0yMy5jcmwwWgYIKwYBBQUHAQEETjBMMEoGCCsG
// SIG // AQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
// SIG // cGtpL2NlcnRzL01pY1Jvb0NlckF1dF8yMDEwLTA2LTIz
// SIG // LmNydDANBgkqhkiG9w0BAQsFAAOCAgEAnVV9/Cqt4Swf
// SIG // ZwExJFvhnnJL/Klv6lwUtj5OR2R4sQaTlz0xM7U518Jx
// SIG // Nj/aZGx80HU5bbsPMeTCj/ts0aGUGCLu6WZnOlNN3Zi6
// SIG // th542DYunKmCVgADsAW+iehp4LoJ7nvfam++Kctu2D9I
// SIG // dQHZGN5tggz1bSNU5HhTdSRXud2f8449xvNo32X2pFaq
// SIG // 95W2KFUn0CS9QKC/GbYSEhFdPSfgQJY4rPf5KYnDvBew
// SIG // VIVCs/wMnosZiefwC2qBwoEZQhlSdYo2wh3DYXMuLGt7
// SIG // bj8sCXgU6ZGyqVvfSaN0DLzskYDSPeZKPmY7T7uG+jIa
// SIG // 2Zb0j/aRAfbOxnT99kxybxCrdTDFNLB62FD+CljdQDzH
// SIG // VG2dY3RILLFORy3BFARxv2T5JL5zbcqOCb2zAVdJVGTZ
// SIG // c9d/HltEAY5aGZFrDZ+kKNxnGSgkujhLmm77IVRrakUR
// SIG // R6nxt67I6IleT53S0Ex2tVdUCbFpAUR+fKFhbHP+Crvs
// SIG // QWY9af3LwUFJfn6Tvsv4O+S3Fb+0zj6lMVGEvL8CwYKi
// SIG // excdFYmNcP7ntdAoGokLjzbaukz5m/8K6TT4JDVnK+AN
// SIG // uOaMmdbhIurwJ0I9JZTmdHRbatGePu1+oDEzfbzL6Xu/
// SIG // OHBE0ZDxyKs6ijoIYn/ZcGNTTY3ugm2lBRDBcQZqELQd
// SIG // VTNYs6FwZvKhggLUMIICPQIBATCCAQChgdikgdUwgdIx
// SIG // CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9u
// SIG // MRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xLTArBgNVBAsTJE1pY3Jv
// SIG // c29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGltaXRlZDEm
// SIG // MCQGA1UECxMdVGhhbGVzIFRTUyBFU046MTc5RS00QkIw
// SIG // LTgyNDYxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFNlcnZpY2WiIwoBATAHBgUrDgMCGgMVAG3z0dXw
// SIG // V+h8WH8j8fM2MyVOXyEMoIGDMIGApH4wfDELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRp
// SIG // bWUtU3RhbXAgUENBIDIwMTAwDQYJKoZIhvcNAQEFBQAC
// SIG // BQDpXRF9MCIYDzIwMjQwMTI2MDA1NzMzWhgPMjAyNDAx
// SIG // MjcwMDU3MzNaMHQwOgYKKwYBBAGEWQoEATEsMCowCgIF
// SIG // AOldEX0CAQAwBwIBAAICEKEwBwIBAAICEsgwCgIFAOle
// SIG // Yv0CAQAwNgYKKwYBBAGEWQoEAjEoMCYwDAYKKwYBBAGE
// SIG // WQoDAqAKMAgCAQACAwehIKEKMAgCAQACAwGGoDANBgkq
// SIG // hkiG9w0BAQUFAAOBgQCQW1LME0LJIMNpJht64IiL+/Vo
// SIG // dwDoueT0+N8R7GXliMq+F51aKzKl+25lQeBKg88Pnbdm
// SIG // c3V1EQunEG2mtE5HtLCcecTNWm6jvn5186xvp/SdSVSP
// SIG // DPecM0wagDl6hE/XI7CLljL44jqPxIDjNRySBYJWgUSn
// SIG // UhA8fAGgZ55k3jGCBA0wggQJAgEBMIGTMHwxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAB4NT8HxMVH35d
// SIG // AAEAAAHgMA0GCWCGSAFlAwQCAQUAoIIBSjAaBgkqhkiG
// SIG // 9w0BCQMxDQYLKoZIhvcNAQkQAQQwLwYJKoZIhvcNAQkE
// SIG // MSIEIGUZIJwI+TweBzw+2da4E1nhV6YePmeJY7jSitoB
// SIG // QIxkMIH6BgsqhkiG9w0BCRACLzGB6jCB5zCB5DCBvQQg
// SIG // 4+5Sv/I55W04z73O+wwgkm+E2QKWPZyZucIbCv9pCsEw
// SIG // gZgwgYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYD
// SIG // VQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAx
// SIG // MAITMwAAAeDU/B8TFR9+XQABAAAB4DAiBCCtLHoFlRTx
// SIG // hXMls8Q9lG5LppKFxwa8mJdyBVhvtN4RCDANBgkqhkiG
// SIG // 9w0BAQsFAASCAgCLuJY/nRCYFJlBMZi0I9fKt4A1Jfh7
// SIG // jCA7FYxtTL2pOupBy10bnSYRsxdt4TtMI1LCNSO5VjMP
// SIG // zVLIciUX2OhhjDSgPLJDv4Fjs7WCN8EDjUBhxJmgrMM+
// SIG // ojvR1Opo+slrCoQLLCkR3Shdd0AtGZ4tdT1nqjF2Lk9P
// SIG // 6wwRFeZCuLYX/pBA0sJr3YCHM+beHiSTEaBtXbzLNF14
// SIG // gB3evInWwdwg5W4PU0xA7DRhw+MMJ+z2TWWT8+DG3ZEa
// SIG // O0oAFlHI8QZn74HhNq2g/I1nCnfmU6eacHE662Kbtqsv
// SIG // loEHi1CftHtIi642nP2dNMhFsuWSex/Q7oDiqipWYyUf
// SIG // ocoMS8e/wU53v6e4yGm/SdBACTpfwR2X5vToHgiebqy+
// SIG // gCaRBhfk3P77bPOVDUrB3X2WkaTqlt//4XIyVgD/+Q9Q
// SIG // YYatjqsjKY0BNVKCwfLVagE3V4Fa+2pk+3UtCNGDTa9z
// SIG // mCWJal7FizwGp2n3WzyyIjIoDaMKHYUZ51TbgOsOl8wx
// SIG // oFw/dfSxLOcOoM6D9ZeMQzu3Cb9rO7o3v97+bJd2GDlR
// SIG // g4aGvFL/gUVAjCoENqb9y2Ii+kv2YNB19eCpmplIIyvh
// SIG // 5vL+jBJWzW3iNJfW4uLltMk3Qr0TiU5drgw2MM9wlJLt
// SIG // WdqlRqjywCrbn5yvOmMKaR6BaepAUmFl1J2Hag==
// SIG // End signature block
