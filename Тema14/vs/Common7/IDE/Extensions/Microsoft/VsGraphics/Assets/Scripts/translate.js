//
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

// services.debug.trace("Translating");

///////////////////////////////////////////////////////////////////////////////
//
// Helper functions 
//
///////////////////////////////////////////////////////////////////////////////
function getCameraElement() {
    var camera = document.elements.findElementByTypeId("Microsoft.VisualStudio.3D.PerspectiveCamera");
    return camera;
}

function getWorldMatrix(element) {
    return element.getTrait("WorldTransform").value;
}

function getFrustumHeightAtDepth(zDepth, fovy) {
    var angle = (fovy * 0.5) * 3.14 / 180.0;
    return 2.0 * zDepth * Math.tan(angle);
}

function getParentToLocal(element) {
    var localToWorldMatrix = getWorldMatrix(element);
    var worldToLocal = math.getInverse(localToWorldMatrix);

    var parent = element.parent;
    if (parent != null) {
        var parentToWorld = getWorldMatrix(parent);

        return math.multiplyMatrix(worldToLocal, parentToWorld);
    }
    else {
        return worldToLocal;
    }
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
//
// heper to get a designer property as a bool
//
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
//
// Button state trait
//
///////////////////////////////////////////////////////////////////////////////

var state = command.getTrait("state");

///////////////////////////////////////////////////////////////////////////////
//
// Property window and tool settings 
//
///////////////////////////////////////////////////////////////////////////////
var enablePropertyWindow = 8;

var stepAmount = 5.0;

function StepAmountChanged(sender, args) {
    stepAmount = document.toolProps.getTrait("StepAmount").value;
}


var toolProps;
var toolPropCookie;
var snapCookie;
function createOptions() {

    var snapTrait = document.designerProps.getOrCreateTrait("snap", "bool", 0);
    snapCookie = snapTrait.addHandler("OnDataChanged", OnSnapEnabledTraitChanged);

    toolProps = document.createElement("toolProps", "type", "toolProps");
    toolProps.getOrCreateTrait("StepAmount", "float", enablePropertyWindow);
    document.toolProps = toolProps;

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

///////////////////////////////////////////////////////////////////////////////
//
// Manipulator registration and event handling
//
///////////////////////////////////////////////////////////////////////////////
var manipulatorData = services.manipulators.getManipulatorData("TranslationManipulator");
var manipulator = services.manipulators.getManipulator("TranslationManipulator");
var undoableItem;

function getTranslationTraitId() {
    var translationTraitId;
    if (getDesignerPropAsBool("usePivot")) {
        translationTraitId = "PivotTranslation";
    }
    else {
        translationTraitId = "Translation";
    }
    return translationTraitId;
}

// find the mesh child
function findFirstChildMesh(parent)
{
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

///////////////////////////////////////////////////////////////////////////////
//
// Translation logic
//
///////////////////////////////////////////////////////////////////////////////
function coreTranslate(dx, dy, dz) {

    var selectionMode = getSelectionMode();

    var selectedElement = getFirstSelectedWithoutAncestorInSelection();

    if (selectedElement == null) {
        return;
    }

    if (selectionMode == 0) {

        // object selection mode
        var translationTraitId = getTranslationTraitId();

        var t = selectedElement.getTrait(translationTraitId).value;

        var isSnapMode = getDesignerPropAsBool("snap");

        if (isSnapMode && stepAmount != 0) {
        
            var newX = t[0] + dx;
            var newY = t[1] + dy;
            var newZ = t[2] + dz;

            var tmpX = Math.round(newX / stepAmount) * stepAmount;
            var tmpY = Math.round(newY / stepAmount) * stepAmount;
            var tmpZ = Math.round(newZ / stepAmount) * stepAmount;

            var halfStep = stepAmount * 0.5;
            var stepPct = halfStep * 0.9;

            if (Math.abs(tmpX - newX) < stepPct) {
                t[0] = tmpX;
            }

            if (Math.abs(tmpY - newY) < stepPct) {
                t[1] = tmpY;
            }

            if (Math.abs(tmpZ - newZ) < stepPct) {
                t[2] = tmpZ;
            }
        }
        else {
            t[0] = t[0] + dx;
            t[1] = t[1] + dy;
            t[2] = t[2] + dz;
        }

        undoableItem._lastValue = t;
        undoableItem.onDo();
    }
    else if (selectionMode == 1 || selectionMode == 2 || selectionMode == 3) {

        // polygon or edge selection mode

        var pToL = getParentToLocal(selectedElement);
        var v = [dx, dy, dz];

        v = math.transformNormal(pToL, v);

        undoableItem._currentDelta[0] = v[0];
        undoableItem._currentDelta[1] = v[1];
        undoableItem._currentDelta[2] = v[2];

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

    coreTranslate(dx, dy, dz);
}

///////////////////////////////////////////////////////////////////////////////
//
// Called when manipulator begins modifying the object (i.e. mouse down and begin drag)
// Begins the undoable block / marks the restore point
//
///////////////////////////////////////////////////////////////////////////////
function onBeginManipulation() {

    // services.debug.trace("Translate: onBeginManipulation()");    

    undoableItem = null;

    //
    // Check the selection mode
    //
    var selectionMode = getSelectionMode();
    if (selectionMode == 0) {
        //
        // object selection
        //

        // services.debug.trace("onBeginManipulation - object selection");

        var translationTraitId = getTranslationTraitId();

        function UndoableTranslation(trait, traitValues, initialValue) {
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

                var currTrait = currSelected.getTrait(translationTraitId);

                traitArray.push(currTrait);
                traitValues.push(currTrait.value);
                initialValues.push(currTrait.value);
            }
        }


        // create the undoable item
        undoableItem = new UndoableTranslation(traitArray, traitValues, initialValues);

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

                var theVal = this._traitArray[i].value;
                theVal[0] = this._traitValues[i][0];
                theVal[1] = this._traitValues[i][1];
                theVal[2] = this._traitValues[i][2];
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
    else if (selectionMode == 1) {
        //
        // polygon selection mode
        //

        // services.debug.trace("onBeginManipulation - polygon selection");

        function UndoablePolyTranslation(elem) {
            // services.debug.trace("UndoablePolyTranslation construct");

            this._totalDelta = [0, 0, 0];
            this._currentDelta = [0, 0, 0];

            // find the mesh child
            this._meshElem = findFirstChildMesh(elem);
            if (this._meshElem == null) {
                return;
            }
            // services.debug.trace("UndoablePolyTranslation found mesh element");

            this._mesh = this._meshElem.behavior;

            // loop over the elements in the polygon collection
            var collElem = this._mesh.selectedObjects;
            if (collElem == null) {
                return;
            }

            this._polyCollectionElem = collElem.clone();

            // services.debug.trace("UndoablePolyTranslation found _polyCollectionElem element");

            // get the actual collection we can operate on
            this._polyCollection = this._polyCollectionElem.behavior;
            // services.debug.trace("assigned _polyCollection");

            this._geom = this._meshElem.getTrait("Geometry").value
        }

        //
        // do
        //
        UndoablePolyTranslation.prototype.onDo = function () {

            // array we will store indices in
            var polygonPoints = new Object();

            // loop over the point indices in the poly collection
            var polyCount = this._polyCollection.getPolygonCount();
            for (var i = 0; i < polyCount; i++) {
                var polyIndex = this._polyCollection.getPolygon(i);

                // get the point count and loop over polygon points
                var polygonPointCount = this._geom.getPolygonPointCount(polyIndex);
                for (var j = 0; j < polygonPointCount; j++) {

                    // get the point index
                    var pointIndex = this._geom.getPolygonPoint(polyIndex, j);
                    polygonPoints[pointIndex] = pointIndex;
                }
            }

            // loop over the unique set of indices and transform the associated point
            for (var key in polygonPoints) {
                var ptIdx = polygonPoints[key];
                var pt = this._geom.getPointAt(ptIdx);
                pt[0] += this._currentDelta[0];
                pt[1] += this._currentDelta[1];
                pt[2] += this._currentDelta[2];
                this._geom.setPointAt(ptIdx, pt);
            }

            this._totalDelta[0] += this._currentDelta[0];
            this._totalDelta[1] += this._currentDelta[1];
            this._totalDelta[2] += this._currentDelta[2];

            // invalidate the mesh collision
            this._mesh.recomputeCachedGeometry();
        }

        //
        // undo
        //
        UndoablePolyTranslation.prototype.onUndo = function () {

            // array we will store indices in
            var polygonPoints = new Object();

            // loop over the point indices in the poly collection
            var polyCount = this._polyCollection.getPolygonCount();
            for (var i = 0; i < polyCount; i++) {
                var polyIndex = this._polyCollection.getPolygon(i);

                // get the point count and loop over polygon points
                var polygonPointCount = this._geom.getPolygonPointCount(polyIndex);
                for (var j = 0; j < polygonPointCount; j++) {

                    // get the point index
                    var pointIndex = this._geom.getPolygonPoint(polyIndex, j);
                    polygonPoints[pointIndex] = pointIndex;
                }
            }

            // loop over the unique set of indices and transform the associated point
            for (var key in polygonPoints) {
                var ptIdx = polygonPoints[key];
                var pt = this._geom.getPointAt(ptIdx);
                pt[0] -= this._totalDelta[0];
                pt[1] -= this._totalDelta[1];
                pt[2] -= this._totalDelta[2];
                this._geom.setPointAt(ptIdx, pt);
            }

            this._currentDelta[0] = this._totalDelta[0];
            this._currentDelta[1] = this._totalDelta[1];
            this._currentDelta[2] = this._totalDelta[2];

            this._totalDelta[0] = 0;
            this._totalDelta[1] = 0;
            this._totalDelta[2] = 0;

            this._mesh.recomputeCachedGeometry();
        }

        // create the undoable item
        undoableItem = new UndoablePolyTranslation(document.selectedElement);
    }
    else if (selectionMode == 2) {
        //
        // edge selection
        //
        // services.debug.trace("onBeginManipulation - edge selection");

        function UndoableEdgeTranslation(elem) {
            // services.debug.trace("UndoableEdgeTranslation construct");

            this._totalDelta = [0, 0, 0];
            this._currentDelta = [0, 0, 0];

            // find the mesh child
            this._meshElem = findFirstChildMesh(elem);
            if (this._meshElem == null) {
                return;
            }
            // services.debug.trace("UndoableEdgeTranslation found mesh element");

            this._mesh = this._meshElem.behavior;

            // loop over the elements in the polygon collection
            var collElem = this._mesh.selectedObjects;
            if (collElem == null) {
                return;
            }

            this._collectionElem = collElem.clone();

            // services.debug.trace("UndoableEdgeTranslation found _collectionElem element");

            // get the actual collection we can operate on
            this._edgeCollection = this._collectionElem.behavior;
            // services.debug.trace("assigned _edgeCollection");

            this._geom = this._meshElem.getTrait("Geometry").value
        }

        //
        // do
        //
        UndoableEdgeTranslation.prototype.onDo = function () {

            // array we will store indices in
            var points = new Object();

            // loop over the edges
            var edgeCount = this._edgeCollection.getEdgeCount();
            for (var i = 0; i < edgeCount; i++) {
                var edge = this._edgeCollection.getEdge(i);

                points[edge[0]] = edge[0];
                points[edge[1]] = edge[1];
            }

            // loop over the unique set of indices and transform the associated point
            for (var key in points) {
                var ptIdx = points[key];
                var pt = this._geom.getPointAt(ptIdx);
                pt[0] += this._currentDelta[0];
                pt[1] += this._currentDelta[1];
                pt[2] += this._currentDelta[2];
                this._geom.setPointAt(ptIdx, pt);
            }

            this._totalDelta[0] += this._currentDelta[0];
            this._totalDelta[1] += this._currentDelta[1];
            this._totalDelta[2] += this._currentDelta[2];

            // invalidate the mesh collision
            this._mesh.recomputeCachedGeometry();
        }

        //
        // undo
        //
        UndoableEdgeTranslation.prototype.onUndo = function () {

            // array we will store indices in
            var points = new Object();

            // loop over the edges
            var edgeCount = this._edgeCollection.getEdgeCount();
            for (var i = 0; i < edgeCount; i++) {
                var edge = this._edgeCollection.getEdge(i);

                points[edge[0]] = edge[0];
                points[edge[1]] = edge[1];
            }

            // loop over the unique set of indices and transform the associated point
            for (var key in points) {
                var ptIdx = points[key];
                var pt = this._geom.getPointAt(ptIdx);
                pt[0] -= this._totalDelta[0];
                pt[1] -= this._totalDelta[1];
                pt[2] -= this._totalDelta[2];
                this._geom.setPointAt(ptIdx, pt);
            }

            this._currentDelta[0] = this._totalDelta[0];
            this._currentDelta[1] = this._totalDelta[1];
            this._currentDelta[2] = this._totalDelta[2];

            this._totalDelta[0] = 0;
            this._totalDelta[1] = 0;
            this._totalDelta[2] = 0;

            this._mesh.recomputeCachedGeometry();
        }

        // create the undoable item
        undoableItem = new UndoableEdgeTranslation(document.selectedElement);
    }
    else if (selectionMode == 3) {
        //
        // point selection
        //
        // services.debug.trace("onBeginManipulation - point selection");

        function UndoablePointTranslation(elem) {
            // services.debug.trace("UndoablePointTranslation construct");

            this._totalDelta = [0, 0, 0];
            this._currentDelta = [0, 0, 0];

            // find the mesh child
            this._meshElem = findFirstChildMesh(elem);
            if (this._meshElem == null) {
                return;
            }
            // services.debug.trace("UndoablePointTranslation found mesh element");

            this._mesh = this._meshElem.behavior;

            // loop over the elements in the polygon collection
            var collElem = this._mesh.selectedObjects;
            if (collElem == null) {
                return;
            }

            this._collectionElem = collElem.clone();

            // services.debug.trace("UndoablePointTranslation found _collectionElem element");

            // get the actual collection we can operate on
            this._pointCollection = this._collectionElem.behavior;
            // services.debug.trace("assigned _pointCollection");

            this._geom = this._meshElem.getTrait("Geometry").value
        }

        //
        // do
        //
        UndoablePointTranslation.prototype.onDo = function () {

            // array we will store indices in
            var points = new Object();

            // loop over the points
            var pointCount = this._pointCollection.getPointCount();
            for (var i = 0; i < pointCount; i++) {
                var pointIndex = this._pointCollection.getPoint(i);

                points[pointIndex] = pointIndex;
            }

            // loop over the unique set of indices and transform the associated point
            for (var key in points) {
                var ptIdx = points[key];
                var pt = this._geom.getPointAt(ptIdx);
                pt[0] += this._currentDelta[0];
                pt[1] += this._currentDelta[1];
                pt[2] += this._currentDelta[2];
                this._geom.setPointAt(ptIdx, pt);
            }

            this._totalDelta[0] += this._currentDelta[0];
            this._totalDelta[1] += this._currentDelta[1];
            this._totalDelta[2] += this._currentDelta[2];

            // invalidate the mesh collision
            this._mesh.recomputeCachedGeometry();
        }

        //
        // undo
        //
        UndoablePointTranslation.prototype.onUndo = function () {

            // array we will store indices in
            var points = new Object();

            // loop over the points
            var pointCount = this._pointCollection.getPointCount();
            for (var i = 0; i < pointCount; i++) {
                var pointIndex = this._pointCollection.getPoint(i);

                points[pointIndex] = pointIndex;
            }

            // loop over the unique set of indices and transform the associated point
            for (var key in points) {
                var ptIdx = points[key];
                var pt = this._geom.getPointAt(ptIdx);
                pt[0] -= this._totalDelta[0];
                pt[1] -= this._totalDelta[1];
                pt[2] -= this._totalDelta[2];
                this._geom.setPointAt(ptIdx, pt);
            }

            this._currentDelta[0] = this._totalDelta[0];
            this._currentDelta[1] = this._totalDelta[1];
            this._currentDelta[2] = this._totalDelta[2];

            this._totalDelta[0] = 0;
            this._totalDelta[1] = 0;
            this._totalDelta[2] = 0;

            this._mesh.recomputeCachedGeometry();
        }

        // create the undoable item
        undoableItem = new UndoablePointTranslation(document.selectedElement);
    }

    if (undoableItem != null) {
        undoableItem.getName = function () {
            var IDS_MreUndoTranslate = 143;
            return services.strings.getStringFromId(IDS_MreUndoTranslate);
        }
        services.undoService.addUndoableItem(undoableItem);
    }
}

///////////////////////////////////////////////////////////////////////////////
//
// onEndManipulation
//
///////////////////////////////////////////////////////////////////////////////
function onEndManipulation() {
}


///////////////////////////////////////////////////////////////////////////////
//
// Tool
//
///////////////////////////////////////////////////////////////////////////////
var tool = new Object();
// services.debug.trace("Translate: tool = new Object()");    

var onBeginManipulationHandler;
var onEndManipulationHandler;


///////////////////////////////////////////////////////////////////////////////
//
// Tool activate
//
///////////////////////////////////////////////////////////////////////////////
tool.activate = function () {
    // services.debug.trace("Translate: tool.activate()");    

    state.value = 2;

    createOptions();

    services.manipulators.activate("TranslationManipulator");

    onBeginManipulationHandler = manipulator.addHandler("OnBeginManipulation", onBeginManipulation);
    onEndManipulationHandler = manipulator.addHandler("OnEndManipulation", onEndManipulation);
    
    var mxyz = manipulatorData.getTrait("ManipulatorTraitXYZ");
    var ct = manipulatorData.getOrCreateTrait("cookie", "int", 0);
    ct.value = mxyz.addHandler("OnDataChanged", onManipulatorXYZChangedHandler);
}

///////////////////////////////////////////////////////////////////////////////
//
// Tool Deactive
//
///////////////////////////////////////////////////////////////////////////////
tool.deactivate = function () {
    // services.debug.trace("Translate: tool.deactivate()");    

    state.value = 0;

    var ct = manipulatorData.getTrait("cookie");
    manipulatorData.getTrait("ManipulatorTraitXYZ").removeHandler("OnDataChanged", ct.value);

    manipulator.removeHandler("OnBeginManipulation", onBeginManipulationHandler);
    manipulator.removeHandler("OnEndManipulation" , onEndManipulationHandler);

    services.manipulators.deactivate("TranslationManipulator");

    toolProps.getTrait("StepAmount").removeHandler("OnDataChanged", toolPropCookie);
    var snapTrait = document.designerProps.getOrCreateTrait("snap", "bool", 0);
    snapTrait.removeHandler("OnDataChanged", snapCookie);
}

///////////////////////////////////////////////////////////////////////////////
// Global code
///////////////////////////////////////////////////////////////////////////////

if (state.value != 2) {
    // services.debug.trace("Translate: setTool()");    
    document.setTool(tool);
}
// SIG // Begin signature block
// SIG // MIIoKAYJKoZIhvcNAQcCoIIoGTCCKBUCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 0eYuOxb6M7D6xewduFYfjBObsRakPS0tQ0eppdN49vOg
// SIG // gg12MIIF9DCCA9ygAwIBAgITMwAAA68wQA5Mo00FQQAA
// SIG // AAADrzANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIzMTExNjE5MDkwMFoX
// SIG // DTI0MTExNDE5MDkwMFowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // zkvLNa2un9GBrYNDoRGkGv7d0PqtTBB4ViYakFbjuWpm
// SIG // F0KcvDAzzaCWJPhVgIXjz+S8cHEoHuWnp/n+UOljT3eh
// SIG // A8Rs6Lb1aTYub3tB/e0txewv2sQ3yscjYdtTBtFvEm9L
// SIG // 8Yv76K3Cxzi/Yvrdg+sr7w8y5RHn1Am0Ff8xggY1xpWC
// SIG // XFI+kQM18njQDcUqSlwBnexYfqHBhzz6YXA/S0EziYBu
// SIG // 2O2mM7R6gSyYkEOHgIGTVOGnOvvC5xBgC4KNcnQuQSRL
// SIG // iUI2CmzU8vefR6ykruyzt1rNMPI8OqWHQtSDKXU5JNqb
// SIG // k4GNjwzcwbSzOHrxuxWHq91l/vLdVDGDUwIDAQABo4IB
// SIG // czCCAW8wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFEcccTTyBDxkjvJKs/m4AgEF
// SIG // hl7BMEUGA1UdEQQ+MDykOjA4MR4wHAYDVQQLExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xFjAUBgNVBAUTDTIzMDAx
// SIG // Mis1MDE4MjYwHwYDVR0jBBgwFoAUSG5k5VAF04KqFzc3
// SIG // IrVtqMp1ApUwVAYDVR0fBE0wSzBJoEegRYZDaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jcmwvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNybDBhBggr
// SIG // BgEFBQcBAQRVMFMwUQYIKwYBBQUHMAKGRWh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNydDAMBgNV
// SIG // HRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4ICAQCEsRbf
// SIG // 80dn60xTweOWHZoWaQdpzSaDqIvqpYHE5ZzuEMJWDdcP
// SIG // 72MGw8v6BSaJQ+a+hTCXdERnIBDPKvU4ENjgu4EBJocH
// SIG // lSe8riiZUAR+z+z4OUYqoFd3EqJyfjjOJBR2z94Dy4ss
// SIG // 7LEkHUbj2NZiFqBoPYu2OGQvEk+1oaUsnNKZ7Nl7FHtV
// SIG // 7CI2lHBru83e4IPe3glIi0XVZJT5qV6Gx/QhAFmpEVBj
// SIG // SAmDdgII4UUwuI9yiX6jJFNOEek6MoeP06LMJtbqA3Bq
// SIG // +ZWmJ033F97uVpyaiS4bj3vFI/ZBgDnMqNDtZjcA2vi4
// SIG // RRMweggd9vsHyTLpn6+nXoLy03vMeebq0C3k44pgUIEu
// SIG // PQUlJIRTe6IrN3GcjaZ6zHGuQGWgu6SyO9r7qkrEpS2p
// SIG // RjnGZjx2RmCamdAWnDdu+DmfNEPAddYjaJJ7PTnd+PGz
// SIG // G+WeH4ocWgVnm5fJFhItjj70CJjgHqt57e1FiQcyWCwB
// SIG // hKX2rGgN2UICHBF3Q/rsKOspjMw2OlGphTn2KmFl5J7c
// SIG // Qxru54A9roClLnHGCiSUYos/iwFHI/dAVXEh0S0KKfTf
// SIG // M6AC6/9bCbsD61QLcRzRIElvgCgaiMWFjOBL99pemoEl
// SIG // AHsyzG6uX93fMfas09N9YzA0/rFAKAsNDOcFbQlEHKiD
// SIG // T7mI20tVoCcmSIhJATCCB3owggVioAMCAQICCmEOkNIA
// SIG // AAAAAAMwDQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290
// SIG // IENlcnRpZmljYXRlIEF1dGhvcml0eSAyMDExMB4XDTEx
// SIG // MDcwODIwNTkwOVoXDTI2MDcwODIxMDkwOVowfjELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEoMCYGA1UEAxMfTWljcm9zb2Z0
// SIG // IENvZGUgU2lnbmluZyBQQ0EgMjAxMTCCAiIwDQYJKoZI
// SIG // hvcNAQEBBQADggIPADCCAgoCggIBAKvw+nIQHC6t2G6q
// SIG // ghBNNLrytlghn0IbKmvpWlCquAY4GgRJun/DDB7dN2vG
// SIG // EtgL8DjCmQawyDnVARQxQtOJDXlkh36UYCRsr55JnOlo
// SIG // XtLfm1OyCizDr9mpK656Ca/XllnKYBoF6WZ26DJSJhIv
// SIG // 56sIUM+zRLdd2MQuA3WraPPLbfM6XKEW9Ea64DhkrG5k
// SIG // NXimoGMPLdNAk/jj3gcN1Vx5pUkp5w2+oBN3vpQ97/vj
// SIG // K1oQH01WKKJ6cuASOrdJXtjt7UORg9l7snuGG9k+sYxd
// SIG // 6IlPhBryoS9Z5JA7La4zWMW3Pv4y07MDPbGyr5I4ftKd
// SIG // gCz1TlaRITUlwzluZH9TupwPrRkjhMv0ugOGjfdf8NBS
// SIG // v4yUh7zAIXQlXxgotswnKDglmDlKNs98sZKuHCOnqWbs
// SIG // YR9q4ShJnV+I4iVd0yFLPlLEtVc/JAPw0XpbL9Uj43Bd
// SIG // D1FGd7P4AOG8rAKCX9vAFbO9G9RVS+c5oQ/pI0m8GLhE
// SIG // fEXkwcNyeuBy5yTfv0aZxe/CHFfbg43sTUkwp6uO3+xb
// SIG // n6/83bBm4sGXgXvt1u1L50kppxMopqd9Z4DmimJ4X7Iv
// SIG // hNdXnFy/dygo8e1twyiPLI9AN0/B4YVEicQJTMXUpUMv
// SIG // dJX3bvh4IFgsE11glZo+TzOE2rCIF96eTvSWsLxGoGyY
// SIG // 0uDWiIwLAgMBAAGjggHtMIIB6TAQBgkrBgEEAYI3FQEE
// SIG // AwIBADAdBgNVHQ4EFgQUSG5k5VAF04KqFzc3IrVtqMp1
// SIG // ApUwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAUci06AjGQQ7kUBU7h6qfHMdEjiTQwWgYDVR0f
// SIG // BFMwUTBPoE2gS4ZJaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // MjAxMV8yMDExXzAzXzIyLmNybDBeBggrBgEFBQcBAQRS
// SIG // MFAwTgYIKwYBBQUHMAKGQmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY2VydHMvTWljUm9vQ2VyQXV0MjAx
// SIG // MV8yMDExXzAzXzIyLmNydDCBnwYDVR0gBIGXMIGUMIGR
// SIG // BgkrBgEEAYI3LgMwgYMwPwYIKwYBBQUHAgEWM2h0dHA6
// SIG // Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvZG9jcy9w
// SIG // cmltYXJ5Y3BzLmh0bTBABggrBgEFBQcCAjA0HjIgHQBM
// SIG // AGUAZwBhAGwAXwBwAG8AbABpAGMAeQBfAHMAdABhAHQA
// SIG // ZQBtAGUAbgB0AC4gHTANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // Z/KGpZjgVHkaLtPYdGcimwuWEeFjkplCln3SeQyQwWVf
// SIG // Liw++MNy0W2D/r4/6ArKO79HqaPzadtjvyI1pZddZYSQ
// SIG // fYtGUFXYDJJ80hpLHPM8QotS0LD9a+M+By4pm+Y9G6XU
// SIG // tR13lDni6WTJRD14eiPzE32mkHSDjfTLJgJGKsKKELuk
// SIG // qQUMm+1o+mgulaAqPyprWEljHwlpblqYluSD9MCP80Yr
// SIG // 3vw70L01724lruWvJ+3Q3fMOr5kol5hNDj0L8giJ1h/D
// SIG // Mhji8MUtzluetEk5CsYKwsatruWy2dsViFFFWDgycSca
// SIG // f7H0J/jeLDogaZiyWYlobm+nt3TDQAUGpgEqKD6CPxNN
// SIG // ZgvAs0314Y9/HG8VfUWnduVAKmWjw11SYobDHWM2l4bf
// SIG // 2vP48hahmifhzaWX0O5dY0HjWwechz4GdwbRBrF1HxS+
// SIG // YWG18NzGGwS+30HHDiju3mUv7Jf2oVyW2ADWoUa9WfOX
// SIG // pQlLSBCZgB/QACnFsZulP0V3HjXG0qKin3p6IvpIlR+r
// SIG // +0cjgPWe+L9rt0uX4ut1eBrs6jeZeRhL/9azI2h15q/6
// SIG // /IvrC4DqaTuv/DDtBEyO3991bWORPdGdVk5Pv4BXIqF4
// SIG // ETIheu9BCrE/+6jMpF3BoYibV3FWTkhFwELJm3ZbCoBI
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoKMIIaBgIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // rzBADkyjTQVBAAAAAAOvMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCD0DnWrsryU9PZPc8gvUSDj2VDSVGZZ6Jrn
// SIG // 137Mrc/CBjBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAMcOt+Vr
// SIG // yLnm3ME6G4rjNmnm4iDi3iGdyc8OTLNNy5KTR2nilPpP
// SIG // eEnwZDHWwddfUE6r7rjeawPcMLlt4JMUWPdGmlaHsA0h
// SIG // I9aQ57Py6uuqjuc4nUrXCRa6IUxUV0dnvJmRosmysacC
// SIG // pK+zjRmflE5GusELzhECJAnUqP5KdhIpD2XiVTszQAti
// SIG // 8K6w06p/Z6BeYVhVOV/7KpANGWroTqEuYAve6Bcp0hhb
// SIG // GbY+vh5jlzXXpQNShoOkdIOJMB6g0SfN0e4740IVCvwA
// SIG // qwq+bUwaZkJOXNZ2YthBM22PQQgOCCxxZtEi4i3sAOF+
// SIG // /yez4BoBhrxG+6wXCFCZyzhH6iOhgheUMIIXkAYKKwYB
// SIG // BAGCNwMDATGCF4Awghd8BgkqhkiG9w0BBwKgghdtMIIX
// SIG // aQIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQghrkGweccS4vhKHh1G0/i
// SIG // EUfoZRF7RNl0tkDNv1rLz9QCBmWf+GRg+xgTMjAyNDAx
// SIG // MjUxOTQ2MzkuMjEzWjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOjg2MDMtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR6jCCByAwggUIoAMCAQICEzMAAAHXmw0eVy6MUY4A
// SIG // AQAAAdcwDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjM3WhcN
// SIG // MjQwMjAxMTkxMjM3WjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // Ojg2MDMtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAxKxgpDdl/1L7jQnH
// SIG // 5dMlQTaPiyCMsxuwNdF+ZFYBp6fbPJn+GmbLpGbua7y7
// SIG // OzamjRMXMJz7hyFnaepLMI2tWMPUsU1/hNJXqvlgbnCE
// SIG // SlnXDLpiAwYCxNBG/9/wWPeWbU9V7J52rQRWYa9Li5A4
// SIG // k/R4K0W9dtrJu/2JMjIoBZE9CbqIkj16Cy+8GlBPbXiP
// SIG // UDpKI6o0ZXCAuGFTWPtlCATOUKKyjWjnc/7KPkyBeps8
// SIG // V+Z8tlP6P4jBVU378JuE/IP2KscMnvpTpmvSivfL+r8H
// SIG // v4ou9kzE1VsClxXVzsrD/RoqHF7d/HLj/XPGhNXh96uB
// SIG // XRk4CjndKxvsYQoLERfBqi0+5OfFaUJyfLvso0Vui6Jr
// SIG // eUXK6KYH/RB/HuH6A1KFMlOUO4j4MDicWIaCsUYxmZbY
// SIG // Q5qeXsfulOs7/ea3fe9+uvKRqQpLtCAeNy/wU8zHAwFe
// SIG // P8bukX3FRcGqzf8iauan2cjLKR+YHGkwlQKLl5EE3PC8
// SIG // LX8bYCM+d6jElUfXPYJEp8TOXNbR4IjF9w9hgZ0Gp/eb
// SIG // cvgnU2AAIY4AU3Mo/T+zhhDIa95cmmcY694KbOmZqOO1
// SIG // TkyPLbEmB4R7Q/AaQaIN/S+XuP5QyYPzquKxrBSksTF7
// SIG // iEWdRNPHZl+u1zO6pr5tuzvNOAoRJm/gjkfFm+OjBRBM
// SIG // +to7vsUCAwEAAaOCAUkwggFFMB0GA1UdDgQWBBSup8C7
// SIG // /VkC9zSMRCcj7iTGejCNjTAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // UgXd1CfiLL3TAl/iu8ah2uVAbVQtQml2bx0XfrLVtJVw
// SIG // P3UzZ3gltExawaCWOfW/X5206Lj0XmpLtpd1+W5obGqO
// SIG // gwkVbqnJoVTwGcklxnqFX4+dnCxosmSxMOk0M7ug/vr4
// SIG // zThpkomztChPRnb/IUBEceURtCoK05pPHJHgtVVKrnlE
// SIG // BylQhEqkw1Aw/HV0y1gppuh6pkF+v/oCg0l4IMKXO+YY
// SIG // tgGykqOLbpTME31yXRncK7Ih45M/J8yFv2dz5zIBhVO+
// SIG // irs2BVdF8h/Q00vwzzvOkS7UIwOWZVRspkz3058O5MaI
// SIG // iyTf8pbjByJB0s6Wibwoql/g59UBkRBJzSGXkXpLy6Lq
// SIG // 6j0RCDk5tWyUSdOuXPWF+2ydJ2j4sc5ucvGNgfmCCBAI
// SIG // uI1K2jod6BO2uCbyFtxIN6Daj+6oaXe8TC8atlpzPlPW
// SIG // 6lk3k+FQqKQIV7trhkHsXS6u21nXGMMhBQ4UuGfTdLsN
// SIG // 4em4we0uDF/eqX2EhFdDChRjim5nwlEu1nppLhamctKD
// SIG // Rzz8fnH3TWHkhem4Tjx3bK6NRFXd81iJHQ9RuZBAz5xE
// SIG // LRWq7TPB/m7+c1IQFCbPKi87hQHQWUC7ng/V2Xsp40Cs
// SIG // BHgM+t8QEyAofLTlDNszIEhIVS/B5uOUgen6HrOAUwtG
// SIG // PEmVqL9yGobb8MhxW1KrNWIwggdxMIIFWaADAgECAhMz
// SIG // AAAAFcXna54Cm0mZAAAAAAAVMA0GCSqGSIb3DQEBCwUA
// SIG // MIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQDEylN
// SIG // aWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3Jp
// SIG // dHkgMjAxMDAeFw0yMTA5MzAxODIyMjVaFw0zMDA5MzAx
// SIG // ODMyMjVaMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNV
// SIG // BAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEw
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // 5OGmTOe0ciELeaLL1yR5vQ7VgtP97pwHB9KpbE51yMo1
// SIG // V/YBf2xK4OK9uT4XYDP/XE/HZveVU3Fa4n5KWv64NmeF
// SIG // RiMMtY0Tz3cywBAY6GB9alKDRLemjkZrBxTzxXb1hlDc
// SIG // wUTIcVxRMTegCjhuje3XD9gmU3w5YQJ6xKr9cmmvHaus
// SIG // 9ja+NSZk2pg7uhp7M62AW36MEBydUv626GIl3GoPz130
// SIG // /o5Tz9bshVZN7928jaTjkY+yOSxRnOlwaQ3KNi1wjjHI
// SIG // NSi947SHJMPgyY9+tVSP3PoFVZhtaDuaRr3tpK56KTes
// SIG // y+uDRedGbsoy1cCGMFxPLOJiss254o2I5JasAUq7vnGp
// SIG // F1tnYN74kpEeHT39IM9zfUGaRnXNxF803RKJ1v2lIH1+
// SIG // /NmeRd+2ci/bfV+AutuqfjbsNkz2K26oElHovwUDo9Fz
// SIG // pk03dJQcNIIP8BDyt0cY7afomXw/TNuvXsLz1dhzPUNO
// SIG // wTM5TI4CvEJoLhDqhFFG4tG9ahhaYQFzymeiXtcodgLi
// SIG // Mxhy16cg8ML6EgrXY28MyTZki1ugpoMhXV8wdJGUlNi5
// SIG // UPkLiWHzNgY1GIRH29wb0f2y1BzFa/ZcUlFdEtsluq9Q
// SIG // BXpsxREdcu+N+VLEhReTwDwV2xo3xwgVGD94q0W29R6H
// SIG // XtqPnhZyacaue7e3PmriLq0CAwEAAaOCAd0wggHZMBIG
// SIG // CSsGAQQBgjcVAQQFAgMBAAEwIwYJKwYBBAGCNxUCBBYE
// SIG // FCqnUv5kxJq+gpE8RjUpzxD/LwTuMB0GA1UdDgQWBBSf
// SIG // pxVdAF5iXYP05dJlpxtTNRnpcjBcBgNVHSAEVTBTMFEG
// SIG // DCsGAQQBgjdMg30BATBBMD8GCCsGAQUFBwIBFjNodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL0RvY3Mv
// SIG // UmVwb3NpdG9yeS5odG0wEwYDVR0lBAwwCgYIKwYBBQUH
// SIG // AwgwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAU1fZWy4/oolxiaNE9lJBb186aGMQwVgYDVR0f
// SIG // BE8wTTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // XzIwMTAtMDYtMjMuY3JsMFoGCCsGAQUFBwEBBE4wTDBK
// SIG // BggrBgEFBQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jZXJ0cy9NaWNSb29DZXJBdXRfMjAxMC0w
// SIG // Ni0yMy5jcnQwDQYJKoZIhvcNAQELBQADggIBAJ1Vffwq
// SIG // reEsH2cBMSRb4Z5yS/ypb+pcFLY+TkdkeLEGk5c9MTO1
// SIG // OdfCcTY/2mRsfNB1OW27DzHkwo/7bNGhlBgi7ulmZzpT
// SIG // Td2YurYeeNg2LpypglYAA7AFvonoaeC6Ce5732pvvinL
// SIG // btg/SHUB2RjebYIM9W0jVOR4U3UkV7ndn/OOPcbzaN9l
// SIG // 9qRWqveVtihVJ9AkvUCgvxm2EhIRXT0n4ECWOKz3+SmJ
// SIG // w7wXsFSFQrP8DJ6LGYnn8AtqgcKBGUIZUnWKNsIdw2Fz
// SIG // Lixre24/LAl4FOmRsqlb30mjdAy87JGA0j3mSj5mO0+7
// SIG // hvoyGtmW9I/2kQH2zsZ0/fZMcm8Qq3UwxTSwethQ/gpY
// SIG // 3UA8x1RtnWN0SCyxTkctwRQEcb9k+SS+c23Kjgm9swFX
// SIG // SVRk2XPXfx5bRAGOWhmRaw2fpCjcZxkoJLo4S5pu+yFU
// SIG // a2pFEUep8beuyOiJXk+d0tBMdrVXVAmxaQFEfnyhYWxz
// SIG // /gq77EFmPWn9y8FBSX5+k77L+DvktxW/tM4+pTFRhLy/
// SIG // AsGConsXHRWJjXD+57XQKBqJC4822rpM+Zv/Cuk0+CQ1
// SIG // ZyvgDbjmjJnW4SLq8CdCPSWU5nR0W2rRnj7tfqAxM328
// SIG // y+l7vzhwRNGQ8cirOoo6CGJ/2XBjU02N7oJtpQUQwXEG
// SIG // ahC0HVUzWLOhcGbyoYIDTTCCAjUCAQEwgfmhgdGkgc4w
// SIG // gcsxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJTAjBgNVBAsTHE1p
// SIG // Y3Jvc29mdCBBbWVyaWNhIE9wZXJhdGlvbnMxJzAlBgNV
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjo4NjAzLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUAMVvbosxt4RGP
// SIG // Pbi9rrvl/phv63WggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOlc
// SIG // 64QwIhgPMjAyNDAxMjUxNDE1MzJaGA8yMDI0MDEyNjE0
// SIG // MTUzMlowdDA6BgorBgEEAYRZCgQBMSwwKjAKAgUA6Vzr
// SIG // hAIBADAHAgEAAgIePzAHAgEAAgITIjAKAgUA6V49BAIB
// SIG // ADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZCgMC
// SIG // oAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqGSIb3
// SIG // DQEBCwUAA4IBAQB8V7IEpwnMsbCCb9pBdRY1FQTYIqEQ
// SIG // fJa4JcBG5kQgl6tUoLRmecDQ5jfExqPYRTAf0AMKDw6R
// SIG // AKEkZ4cw8ivTbatFe1UUek0XQEVLJRlCarTcMz3aR+RW
// SIG // 0a7WEfFKBNGLDvx1dSyGXnBe5J73tnk0NDALHF+Oj89j
// SIG // xu5mnOKPckzwiWMZPMte85d40guSyWLhZkLsGQYVFefL
// SIG // 5QKr6KsFCB0LMSgbGUDHA00ptssm1meOE97rV+OfMvvP
// SIG // d86BByN4BQVLlPeAFSZ4Qyn6n2TLb4aLT4+D5kIdztch
// SIG // MxBYLMpgIM2+Pqpbjbgk2qP5ViI2ZqEVp3WXRjSBbQoP
// SIG // LNwOMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTACEzMAAAHXmw0eVy6MUY4AAQAAAdcw
// SIG // DQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJAzEN
// SIG // BgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQg3RdB
// SIG // 05RPslr0yUzmqYR2zCaIaNsP/dQSi3PMyIlWG38wgfoG
// SIG // CyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCCc3j5eS159
// SIG // T4qjY8fGDe0zdWSNHdWV/9s0XZyPe6yaOzCBmDCBgKR+
// SIG // MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAB
// SIG // 15sNHlcujFGOAAEAAAHXMCIEID+BW1R92HuO0ec5Tw6D
// SIG // zzsLB/F0YCdddOqhfk8c5APSMA0GCSqGSIb3DQEBCwUA
// SIG // BIICAH20bviAJWOtv8rm63mbuI5NwLmFJcAIZ709vvVc
// SIG // k4zO+ZlJ0u369rWzajGrZLgCoC7YpmOgsGXlwz2gmFTS
// SIG // +wOumomhw1CFcGPaRSGERtT1j5WC7fwT+eM2BQTN2gV2
// SIG // Ac7y9QATmYbUACpYF0YtDfg+XA5u17THIVqw6Ete9etU
// SIG // 1IjWqx5axCxu1zFmIHmxvYyjyE1toCa7C8WGgNvJYZRG
// SIG // 2mnH3Enk65UWq5seuwUSJtPIBBaSle5C/jayEsC5ZOwG
// SIG // k6pKFfCuN910krRdt8WqSp/CUbyhq6jfFFnXTn2yfksS
// SIG // saH94sHqxuIySxBH73Q7G9iFM1A3+wkXlyVtdWclS5Uz
// SIG // 35EbnChCeKBxwUsCWaGxdn79OWtHoBIZBw4YH7sLpVNu
// SIG // JS+yhibsjnhZpvWSdcYx+lDfhsqPnpBvXSRkrmefFT5U
// SIG // e5SkBQk8IAfPnyVIXVfnHlSB0ZHvGn6NCcGTdMlc6bqx
// SIG // YITMKtsewzJgJLW/jTC0sg0Ijfe+GLN6n5tUOT6boka7
// SIG // oK3srKkUwKCnribl8JmN1Z0EOcOily89v7ktLPQ+91cC
// SIG // CqWNN8wJ0652GrljVYJzcfo+otBuphs2cOWOOaGdvm76
// SIG // i8lfoCAWepj5PQ03txn0zFPaqhgqEwDEi068WE/akwv3
// SIG // 3Ho7dXxzK8117SIcolckjOXZNwy/
// SIG // End signature block
