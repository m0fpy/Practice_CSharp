
//
// AddSubdivisions.js
//
function addSubdivisions(geom, polyCollection, polyIndex, splitEdgesMap, polysToSelect) {

    var polygonPointCount = geom.getPolygonPointCount(polyIndex);
    if (polygonPointCount < 3) {
        return;
    }
    // services.debug.trace("splitting poly : " + polyIndex);

    var containingMesh = polyCollection.getContainingMesh();

    // determine if we need to add new texture coordinates
    var IndexingModeUndefined = 0;
    var IndexingModePerPoint = 1;
    var IndexingModePerPointOnPolygon = 3;

    // determine the material index on the pre division polygon
    var materialIndex = geom.getPolygonMaterialIndex(polyIndex);

    // this is our starting index for new points
    var newPointStart = geom.pointCount;

    // we'll compute the center of the triangle
    var avgPos = [0, 0, 0];
    var avgTex = [0, 0];

    // iterate over polypoints and total
    for (var i = 0; i < polygonPointCount; i++) {
        var point = geom.getPointOnPolygon(polyIndex, i);
        avgPos[0] += point[0];
        avgPos[1] += point[1];
        avgPos[2] += point[2];
    }

    // total tex coords if needed
    if (geom.textureCoordinateIndexingMode != IndexingModeUndefined) {
        for (var i = 0; i < polygonPointCount; i++) {
            
            var texCoord = geom.getTextureCoordinateOnPolygon(polyIndex, i);
            avgTex[0] += texCoord[0];
            avgTex[1] += texCoord[1];
        }
    }

    // get the center 
    var div = 1.0 / polygonPointCount;
    avgPos[0] *= div;
    avgPos[1] *= div;
    avgPos[2] *= div;

    avgTex[0] *= div;
    avgTex[1] *= div;

    // add the avg point
    geom.addPoints(avgPos, 1);

    // store tex coords if (if we need to)
    // we'll put these into the geom later
    var texcoords = new Array();
    if (geom.textureCoordinateIndexingMode == IndexingModePerPoint) {
        geom.addTextureCoordinates(avgTex, 1);
    }
    else if (geom.textureCoordinateIndexingMode == IndexingModePerPointOnPolygon) {
        texcoords.push(avgTex);
    }

    // split points for this polygon
    var splitPointIndices = new Array();
    
    // compute the split points
    for (var i = 0; i < polygonPointCount; i++) {
        var i0 = i;
        var i1 = i + 1;
        if (i1 >= polygonPointCount) {
            i1 = 0;
        }
        var p0 = geom.getPointOnPolygon(polyIndex, i0);
        var p1 = geom.getPointOnPolygon(polyIndex, i1);

        // get object level indices
        var oi0 = geom.getPolygonPoint(polyIndex, i0);
        var oi1 = geom.getPolygonPoint(polyIndex, i1);

        // index of the point that splits this edge
        var splitPointIndex = 0;

        // we're splitting the edge between object level points
        // p0 and p1, so see if this is edge has been previously split

        var tmp0 = Math.min(oi0, oi1);
        var tmp1 = Math.max(oi0, oi1);

        // services.debug.trace("splitting edge: " + tmp0 + " " + tmp1);

        var wasNewPointCreated = false;
        if (splitEdgesMap.hasOwnProperty("" + tmp0) && (splitEdgesMap[tmp0].hasOwnProperty("" + tmp1)))
        {
            splitPointIndex = splitEdgesMap[tmp0][tmp1];
            // services.debug.trace("using split point: " + splitPointIndex);
        }
        else
        {
            wasNewPointCreated = true;

            var split = [0, 0, 0];
            split[0] = p0[0] + 0.5 * (p1[0] - p0[0]);
            split[1] = p0[1] + 0.5 * (p1[1] - p0[1]);
            split[2] = p0[2] + 0.5 * (p1[2] - p0[2]);

            if (splitEdgesMap.hasOwnProperty("" + tmp0) == false) {
                splitEdgesMap[tmp0] = new Object();
            }

            splitPointIndex = geom.pointCount;
            geom.addPoints(split, 1);

            // services.debug.trace("created split point: " + splitPointIndex);

            splitEdgesMap[tmp0][tmp1] = splitPointIndex;
        }
        splitPointIndices.push(splitPointIndex);

        if (geom.textureCoordinateIndexingMode != IndexingModeUndefined) {

            var texCoord0 = geom.getTextureCoordinateOnPolygon(polyIndex, i0);
            var texCoord1 = geom.getTextureCoordinateOnPolygon(polyIndex, i1);
            var texCoord = [0, 0];
            texCoord[0] = texCoord0[0] + 0.5 * (texCoord1[0] - texCoord0[0]);
            texCoord[1] = texCoord0[1] + 0.5 * (texCoord1[1] - texCoord0[1]);

            if (geom.textureCoordinateIndexingMode == IndexingModePerPoint) {
                if (wasNewPointCreated) {
                    geom.addTextureCoordinates(texCoord, 1);
                }   
            }
            else if (geom.textureCoordinateIndexingMode == IndexingModePerPointOnPolygon) {
                texcoords.push(texCoord);
            }
        }

        //
        // we need to split edges on polys if the edge is shared
        //
        var polygonsSharingEdge = geom.getPolygonsFromEdge(tmp0, tmp1);
        var sharedPolyCount = polygonsSharingEdge.getPolygonCount();
        for (var j = 0; j < sharedPolyCount; j++) {
            var sharedPolygonIndex = polygonsSharingEdge.getPolygon(j);
            if (polyCollection.hasPolygon(sharedPolygonIndex) == false) {
                // this is a shared poly, and not part of the set we're going to subdivide explicitly
                // so we need to break the edge tmp0, tmp1
                geom.insertPolygonPoint(sharedPolygonIndex, tmp0, tmp1, splitPointIndex);
            }
        }
    }

    // we now create a new polygon (quad) for each point in the old poly
    // i.e oldpoly point count == old poly edge count == number of new polys created after split
    for (var i = 0; i < polygonPointCount; i++) {

        // wrap around
        var prevIndex;
        if (i > 0) {
            prevIndex = i - 1;
        }
        else {
            prevIndex = polygonPointCount - 1;
        }

        // add a polygon
        var thisPolyIndex = geom.polygonCount;
        geom.addPolygon(materialIndex);

        polysToSelect.push(thisPolyIndex);

        // add points
        var i0 = geom.getPolygonPoint(polyIndex, i);
        var i1 = splitPointIndices[i];
        var i2 = newPointStart;
        var i3 = splitPointIndices[prevIndex];

        geom.addPolygonPoint(thisPolyIndex, i0);
        geom.addPolygonPoint(thisPolyIndex, i1);
        geom.addPolygonPoint(thisPolyIndex, i2);
        geom.addPolygonPoint(thisPolyIndex, i3);

        if (geom.textureCoordinateIndexingMode == IndexingModePerPointOnPolygon) {
            geom.addTextureCoordinates(geom.getTextureCoordinateOnPolygon(polyIndex, i), 1);
            geom.addTextureCoordinates(texcoords[i + 1], 1);
            geom.addTextureCoordinates(texcoords[0], 1);
            geom.addTextureCoordinates(texcoords[prevIndex + 1], 1);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
//
// helper to get a designer property as a bool
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


// find the mesh child
function findFirstChildMeshElement(parent)
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


function UndoableItem(collElem, meshElem) {

    this._clonedColl = collElem.clone();
    this._polyCollection = this._clonedColl.behavior;
    this._meshElem = meshElem;
    this._mesh = meshElem.behavior;

    var geom = this._meshElem.getTrait("Geometry").value;
    this._restoreGeom = geom.clone();

    this.getName = function () {
        var IDS_MreUndoSubdivide = 147;
        return services.strings.getStringFromId(IDS_MreUndoSubdivide);
    }

    this.onDo = function () {

        var newCollection = this._clonedColl.clone();
        var newPolyBeh = newCollection.behavior;
        newPolyBeh.clear();

        // maps split edges to indices of points used to split them
        var splitEdgesMap = new Object();

        var geom = this._meshElem.getTrait("Geometry").value;

        var polysToSelect = new Array();

        // subdivide
        var polysToDelete = new Array();
        var polyCount = this._polyCollection.getPolygonCount();
        for (var i = 0; i < polyCount; i++) {
            var polyIndex = this._polyCollection.getPolygon(i);
            addSubdivisions(geom, this._polyCollection, polyIndex, splitEdgesMap, polysToSelect);

            polysToDelete.push(polyIndex);
        }

        function sortNumberDescending(a, b) {
            return b - a;
        }
 
        // delete the old selection
        polysToDelete.sort(sortNumberDescending);

        var numDeletedPolys = polysToDelete.length;

        for (var p = 0; p < polysToDelete.length; p++) {
            geom.removePolygon(polysToDelete[p]);
        }

        // shift polygon indices
        for (var p = 0; p < polysToSelect.length; p++) {
            var indexToSelect = polysToSelect[p] - numDeletedPolys;

            newPolyBeh.addPolygon(indexToSelect);
        }

        this._mesh.selectedObjects = newCollection;

        this._mesh.recomputeCachedGeometry();
    }

    this.onUndo = function () {
        var geom = this._meshElem.getTrait("Geometry").value;
        geom.copyFrom(this._restoreGeom);

        this._mesh.selectedObjects = this._clonedColl;

        this._mesh.recomputeCachedGeometry();
    }
}

var selectedElement = document.selectedElement;
var selectionMode = getSelectionMode();

// get the poly collection
var polyCollection = null;
var mesh = null;
var meshElem = null;
var collElem = null;
if (selectedElement != null) {
    if (selectionMode == 1) {
        meshElem = findFirstChildMeshElement(selectedElement);
        if (meshElem != null) {
            mesh = meshElem.behavior;

            // polygon selection mode
            collElem = mesh.selectedObjects;
            if (collElem != null) {
                polyCollection = collElem.behavior;
            }
        }
    }
}

if (polyCollection != null && collElem.typeId == "PolygonCollection") {
    var undoableItem = new UndoableItem(collElem, meshElem);
    undoableItem.onDo();
    services.undoService.addUndoableItem(undoableItem);
}
// SIG // Begin signature block
// SIG // MIIoKAYJKoZIhvcNAQcCoIIoGTCCKBUCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // vVb+u/YO+8d4nxqG8U1pDSpZo+x+WxGf5RzP6XhH35eg
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
// SIG // DQEJBDEiBCCABiziPKjLkgCPTLKfCTG1m/dLTh5/kJvR
// SIG // JoWbo1+pxzBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAGKK4GWi
// SIG // F/Zty///Bk1WmoYTB+GTNvZ/2CH/hpqzxg6tgvBPsvGe
// SIG // Xs0tH8wWtvbxk0dhIt5nLTuASOaxxjNuYNM4UtXcWJcE
// SIG // MK2OQxVIljoTqHYJOitCUs6H83esUozu1ugIV1CoxfeD
// SIG // U7OyfDCbqlZjhb9LLJmDTxADEMR6T0l1dx2ExNF0ucJy
// SIG // WgEmtkvJLuDCcE5V9jLN6GeDIZXoaROneD/plP0QZb83
// SIG // BHrBbicnaeCcaVrfcqII7i4xwgrztex46QSuujuqq6aE
// SIG // ETf1VS5HV89FdDn4n6XNNoy8jPdOaVU6TO9uObb53i20
// SIG // ACAR+PNv+4WLvF2XlTEepkAV8r6hgheUMIIXkAYKKwYB
// SIG // BAGCNwMDATGCF4Awghd8BgkqhkiG9w0BBwKgghdtMIIX
// SIG // aQIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgv+2DlVhPEh5tD+ZgE6cb
// SIG // KraqAKNI6dY7o0ayna/hVZUCBmWf6YOcixgTMjAyNDAx
// SIG // MjUxOTQ2MzkuMzgxWjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOkEwMDAtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR6jCCByAwggUIoAMCAQICEzMAAAHQdwiq76MXxt0A
// SIG // AQAAAdAwDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjE0WhcN
// SIG // MjQwMjAxMTkxMjE0WjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OkEwMDAtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEA3zJX59+X7zNFwFEp
// SIG // iOaohtFMT4tuR5EsgYM5N86WDt9dXdThBBc9EKQCtt7N
// SIG // XSRa4weYA/kjMOc+hMMQuAq11PSmkOFjR6h64Vn7aYKN
// SIG // zJCXsfX65jvTJXVH41BuerCFumFRemI1/va09SQ3Qgx2
// SIG // 6OZ2YmrDIoBimsBm9h6g+/5I0Ueu0b1Ye0OJ2rQFbuOm
// SIG // X+TC74kdMTeXDRttMcAcILbWmBJOV5VC2gR+Tp189nlq
// SIG // CMfkowzuwbeQbgAVmPEr5kUHwck9nKaRM047f37NMaeA
// SIG // dXAB1Q8JRsGbr/UX3N53XcYBaygPDFh2yRdPmllFGCAU
// SIG // fBctoLhVR6B3js3uyLG8r0a2sf//N4GKqPHOWf9f7u5I
// SIG // y3E4IqYsmfFxEbCxBAieaMdQQS2OgI5m4AMw3TZdi3no
// SIG // /qiG3Qa/0lLyhAvl8OMYxTDk1FVilnprdpIcJ3VHwTUe
// SIG // zc7tc/S9Fr+0wGP7/r+qTYQHqITzAhSXPmpOrjA/Eyks
// SIG // 1hY8OWgA5Jg/ZhrgvOsr0ipCCODGss6FHbHk9J35PGNH
// SIG // z47XcNlp3o5esyx7mF8HA2rtjtQzLqInnTVY0xd+1BJm
// SIG // E/qMQvzhV1BjwxELfbc4G0fYPBy7VHxHljrDhA+cYG+a
// SIG // 8Mn7yLLOx/3HRxXCIiHM80IGJ7C8hBnqaGQ5CoUjEeXg
// SIG // geinL/0CAwEAAaOCAUkwggFFMB0GA1UdDgQWBBQz4QGF
// SIG // ktKAPpTrSE34ybcpdJJ0UTAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // l4fnJApGWgNOkjVvqsbUvYB0KeMexvoHYpJ4CiLRK/KL
// SIG // ZFyK5lj2K2q0VgZWPdZahoopR8iJWd4jQVG2jRJmigBj
// SIG // GeWHEuyGVCj2qtY1NJrMpfvKINLfQv2duvmrcd77IR6x
// SIG // ULkoMEx2Vac7+5PAmJwWKMXYSNbhoah+feZqi77TLMRD
// SIG // f9bKO1Pm91Oiwq8ubsMHM+fo/Do9BlF92/omYPgLNMUz
// SIG // ek9EGvATXnPy8HMqmDRGjJFtlQCq5ob1h/Dgg03F4DjZ
// SIG // 5wAUBwX1yv3ywGxxRktVzTra+tv4mhwRgJKwhpegYvD3
// SIG // 8LOn7PsPrBPa94V/VYNILETKB0bjGol7KxphrLmJy59w
// SIG // ME4LjGrcPUfFObybVkpbtQhTuT9CxL0EIjGddrEErEAJ
// SIG // DQ07Pa041TY4yFIKGelzzMZXDyA3I8cPG33m+MuMAMTN
// SIG // kUaFnMaZMfuiCH9i/m+4Cx7QcVwlieWzFu1sFAti5bW7
// SIG // q1MAb9EoI6Q7WxKsP7g4FgXqwk/mbctzXPeu4hmkI8mE
// SIG // B+h/4fV3PLJptp+lY8kkcdrMJ1t4a+kMet1P8WPRy+hT
// SIG // YaxohRA+2USq58L717zFUFCBJAexlBHjeoXmPIBy7dIy
// SIG // 1d8sw4kAPEfKeWBoBgFbfTBMIACTWNYh7x//L84SUmRT
// SIG // ZB/LL0c7Tv4t07yq42/GccIwggdxMIIFWaADAgECAhMz
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
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjpBMDAwLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUAvLfIU/CilF/d
// SIG // ZVORakT/Qn7vTImggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOlc
// SIG // 3IAwIhgPMjAyNDAxMjUxMzExMjhaGA8yMDI0MDEyNjEz
// SIG // MTEyOFowdDA6BgorBgEEAYRZCgQBMSwwKjAKAgUA6Vzc
// SIG // gAIBADAHAgEAAgInezAHAgEAAgIVVzAKAgUA6V4uAAIB
// SIG // ADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZCgMC
// SIG // oAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqGSIb3
// SIG // DQEBCwUAA4IBAQCE0W6AE99Mw5jg/e3H3V7+dMxXxG61
// SIG // 0SJTxc2Hz4SgOi/klG7YpaVVNU/U8rOrcOpU+Oy1hAfT
// SIG // HjPkS/4hJ7Xi0G6jcqptsi3ulNmn8/+Gay/xqFbDpmTD
// SIG // 2qSYHMYfBO+1iso/Zznq5QS21D4ouNQv8IDKdtLLkwjz
// SIG // rd2YXINtMO++CaXEBrphYRnN8+PEiPkDbsSUvYn3QThE
// SIG // Uo2i0Q8bCSFqOXS4PxFUZS/JHczmUrX5ljFR3x8B7191
// SIG // 6VKNOL/Zej5lNWPKarcURGydFiVlbiMZ+e03SGJzrsAX
// SIG // fNbIwJTn6k6bhi/pbO3ThMSWWyjSokzmUU3fPaFrUJxE
// SIG // o/u8MYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTACEzMAAAHQdwiq76MXxt0AAQAAAdAw
// SIG // DQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJAzEN
// SIG // BgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQgCD1z
// SIG // zGplr+tEKJLIXF4xG2NurlfNdQFjmAXWUHk6i5IwgfoG
// SIG // CyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCAIlUAGX7TT
// SIG // /zHdRNmMPnwV2vcOn45k2eVgHq600j8J1zCBmDCBgKR+
// SIG // MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAB
// SIG // 0HcIqu+jF8bdAAEAAAHQMCIEIPiptK3GT7NTj3ZSJPz6
// SIG // nx/jYtYdNv8iUYM5tE3A1gKHMA0GCSqGSIb3DQEBCwUA
// SIG // BIICAFUD4hy/MWVXGNmqhm7dF15G+mc0k3v04poXzLtS
// SIG // t1omcCqfS41CMJ3cul7WPg6GTckIeURrRyMLkUiTdS1x
// SIG // +istERB9TRbhjFsp1D4kL2AGW1HX6jVcPb9MbaBOV+Om
// SIG // E/Ozv5FeJ56WcnA8rOTECav+0/HEu8prsqGgIvYZLNnS
// SIG // jWsCi9/2rt4bEWaNbiuDHq04UtwcCKAWSQJUA3+ISgGY
// SIG // gAtArIKEpMEkx7QWHaf81C/bRiz1ee5JAHwiFSzgPGt6
// SIG // MTPE2FKexvIB4ZWuCVFdzDD8NWXncCCNgjx9nuU/XsyM
// SIG // qDtc+5/lfRxFRdv3lKc75IFqMoLb0ysVDWC/OgqlTqI+
// SIG // jAYV7UIPC//SdQatdLs4Jl8jLAqR5ZHKUm504xlEFqYU
// SIG // SQoLXfbBl+SZVB3k55G6666eO5xTRVhfOpfFoC6J0EvR
// SIG // NpLadPn2JnxPlLI/izRlTtq/4GEgkA7RoJEbV8xQu5zr
// SIG // n+HmieaaUL4dXvgZ7pbHOOh+OTzX3HMlUXnoP164iT6o
// SIG // iejHOU7KkYM0aTJfAYyyd+y4shWnO4itDZA5TH915mDw
// SIG // lPd4JGYEuCifa6HbskCqSqCmZgFXsXFLdCazTxk7Qmnq
// SIG // oaxRkhphDfJTXpN4mpBxHxJOZJnrOMFYUys+yT09MSbj
// SIG // TE5d20HmCCrPlU25dt967Z2cNkAG
// SIG // End signature block
