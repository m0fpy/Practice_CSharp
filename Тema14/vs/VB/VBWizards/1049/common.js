//
// (c) Корпорация Майкрософт (Microsoft Corp.), 2001-2002. Все права защищены.
//

var vsViewKindPrimary           = "{00000000-0000-0000-0000-000000000000}";
var vsViewKindDebugging         = "{7651A700-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindCode              = "{7651A701-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindDesigner          = "{7651A702-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindTextView          = "{7651A703-06E5-11D1-8EBD-00A0C90F26EA}";
var vsWindowKindSolutionExplorer= "{3AE79031-E1BC-11D0-8F78-00A0C9110057}";

var GUID_ItemType_PhysicalFolder= "{6BB5F8EF-4483-11D3-8BCF-00C04F8EC28C}";
var GUID_ItemType_VirtualFolder = "{6BB5F8F0-4483-11D3-8BCF-00C04F8EC28C}";
var GUID_ItemType_PhysicalFile  = "{6BB5F8EE-4483-11D3-8BCF-00C04F8EC28C}";

var vsWizardAddSubProject       = "{0F90E1D2-4999-11D1-B6D1-00A0C90F2744}";


function CreateVSProject(strProjectName, strProjectExt, strProjectPath, strTemplateFile)
{
    var solution = dte.Solution;
    var strSolutionName = "";

    if (wizard.FindSymbol("CLOSE_SOLUTION"))
    {
        solution.Close();
        strSolutionName = wizard.FindSymbol("VS_SOLUTION_NAME");
        if (strSolutionName.length)
        {
            var strSolutionPath = strProjectPath.substr(0, strProjectPath.length - strProjectName.length);
            solution.Create(strSolutionPath, strSolutionName);
        }
    }

    var strProjectFile = strProjectName + strProjectExt;

    var oTarget = wizard.FindSymbol("TARGET");
    var project;

    if (wizard.FindSymbol("WIZARD_TYPE") == vsWizardAddSubProject)
    {
        var prjItem = oTarget.AddFromTemplate(strTemplateFile, strProjectPath+"\\"+strProjectFile);
        project = prjItem.SubProject;
    }
    else
    {
        project = oTarget.AddFromTemplate(strTemplateFile, strProjectPath, strProjectFile);
    }
    return project;
}

function AddFileToVSProject(strItemName, selProj, selObj, strTemplateFile, bValidate)
{
    fso = new ActiveXObject("Scripting.FileSystemObject");
    AddBaseNameToWizard("SAFE_ITEM_NAME", strItemName, ".");

    if( bValidate )
    {
        var strSafeName = wizard.FindSymbol( "SAFE_ITEM_NAME" );
        if( !wizard.ValidateCLRIdentifier( strSafeName, false ))
        {
            strSafeName = "_" + strSafeName;
            wizard.AddSymbol("SAFE_ITEM_NAME", strSafeName);
        }
    }

    var isReferenceExpanded;
    if(selProj != null) 
        isReferenceExpanded = IsReferenceExpanded(selProj);

    // Получить элемент проекта для коллекции selObj
    var folder = selObj.parent;

    var strURL = folder.Properties("URL").Value;
    if (strURL.length > 0) //если веб-проект
        var strProjectPath = folder.Properties("LocalPath");
    else
        var strProjectPath = folder.Properties("FullPath");

    var strItemFile = strProjectPath + strItemName;

    var fsoTemporaryFolder = 2;
    var tFolder = fso.GetSpecialFolder(fsoTemporaryFolder);
    var strTempName = fso.GetTempName();
    var strTempFile = tFolder.Path + "\\" + strTempName;
    SafeDeleteFile(fso, strTempFile);
    
    wizard.RenderTemplate(strTemplateFile, strTempFile, false);
    var item = folder.ProjectItems.AddFromTemplate(strTempFile, strItemName );
    SafeDeleteFile(fso, strTempFile);

    if(selProj != null)
    {
        if(isReferenceExpanded == true)
 	    ExpandReferencesNode(selProj);
        else
            CollapseReferencesNode(selProj);
    }

    return item;
}

function AddDependentFileToVSProject(strItemName, projectItem, strTemplateFilePath)
{
    fso = new ActiveXObject("Scripting.FileSystemObject");
    
    var fsoTemporaryFolder = 2;
    var tFolder = fso.GetSpecialFolder(fsoTemporaryFolder);
    var strTempName = fso.GetTempName();
    var strTempFile = tFolder.Path + "\\" + strTempName;
    SafeDeleteFile(fso, strTempFile);
    
    wizard.RenderTemplate(strTemplateFilePath, strTempFile, false);
    var item = projectItem.ProjectItems.AddFromTemplate(strTempFile, strItemName);
    SafeDeleteFile(fso, strTempFile);
    
    return item;
}

function AddBaseNameToWizard( strName, strValue, strDelim )
{
    var strLegalItemName;
    var nIndex = strValue.lastIndexOf(strDelim);
    if( nIndex > 0 )
        strLegalItemName = strValue.substr(0, nIndex);
    else
        strLegalItemName = strValue;
    wizard.AddSymbol(strName, CreateLegalIdentifier(strLegalItemName));
}

function SafeDeleteFile( fso, strFilespec )
{
	if (fso.FileExists(strFilespec))
	{
		var tmpFile = fso.GetFile(strFilespec);
		tmpFile.Delete();
	}
}

function GetDependentFileName(strMainFileName, strMainExtension, strDependentExtension)
{
    var strDependentFileName = strMainFileName;
    
    // Если основной файл называется Something.vb, имя зависимого файла будет Something.resx
    // Иначе, если основной файл называется Something.ext, имя зависимого файла будет Something.ext.resx.
    
    if (strMainFileName.toLowerCase().lastIndexOf(strMainExtension.toLowerCase()) == 
        strMainFileName.length - strMainExtension.length)
    {
        strDependentFileName = strMainFileName.substring(0, strMainFileName.length - strMainExtension.length) +
            strDependentExtension;
    }
    else 
    {
        strDependentFileName = strMainFileName + strDependentExtension;
    }
    
    return strDependentFileName;
}

function CreateLegalIdentifier(strName)
{
    var nLen = strName.length;
    var strLegalName = "";
    var cChar = strName.charAt(0);
    switch(cChar)
    {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            strLegalName += "_";
            break;
    }
    for (nCntr = 0; nCntr < nLen; nCntr++)
    {
        cChar = strName.charAt(nCntr);
        switch(cChar)
        {
            case " ":
            case "~":
            case "&":
            case "'":
            case "#":
            case "!":
            case "@":
            case "$":
            case "%":
            case "^":
            case "(":
            case ")":
            case "-":
            case "+":
            case "=":
            case "{":
            case "}":
            case "[":
            case "]":
            case ";":
            case ",":
            case "`":
            case ".":
                strLegalName += "_";
                break;
            default:
                strLegalName += cChar;
                break;
        }
    }
    return strLegalName;
}

function ReplaceDots(strName)
{
    var nLen = strName.length;
    var strLegalName = "";
    for (nCntr = 0; nCntr < nLen; nCntr++)
    {
        var cChar = strName.charAt(nCntr);
        if (cChar == ".")
                strLegalName += "_";
        else
                strLegalName += cChar;
    }
    return strLegalName;
}


function AddNamespaceSymbolToWizard(dtex, wizardx, selObj) 
{
    var parent = selObj.Parent;
    var kind = parent.Kind;
    if(kind == GUID_ItemType_PhysicalFolder)
    {
        wizardx.AddSymbol("NAMESPACE", parent.Properties("DefaultNamespace").Value);
    }
    else
    {
        wizardx.AddSymbol("NAMESPACE", parent.Properties("RootNamespace").Value);
    }
}


function AddDefaultClientScriptToWizard(dtex, wizardx, selProj)
{
    var prjScriptLang = selProj.Properties("DefaultClientScript").Value;
    // 0 = JScript
    // 1 = VBScript
    if(prjScriptLang == 0)
    {
        wizardx.AddSymbol("DEFAULT_CLIENT_SCRIPT", "JavaScript");
    }
    else
    {
        wizardx.AddSymbol("DEFAULT_CLIENT_SCRIPT", "VBScript");
    }
}

function AddDefaultTargetSchemaToWizard(dtex, wizardx, selProj)
{
    var prjTargetSchema = selProj.Properties("DefaultTargetSchema").Value;
    // 0 = IE3/Nav4
    // 1 = IE5
    // 2 = Nav4
    if(prjTargetSchema == 0)
    {
        wizardx.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/ie3-2nav3-0");
    }
    else if( prjTargetSchema == 1)
    {
        wizardx.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/ie5");
    }
    else
    {
        wizardx.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/nav4-0");
    }
}

function AddDefaultDefaultHTMLPageLayoutToWizard(dtex, wizardx, selProj)
{
    var prjPageLayout = selProj.Properties("DefaultHTMLPageLayout").Value;
    // 0 = FlowLayout
    // 1 = GridLayout
    if(prjPageLayout == 0)
    {
        wizardx.AddSymbol("DEFAULT_HTML_LAYOUT", "FlowLayout");
    }
    else
    {
        wizardx.AddSymbol("DEFAULT_HTML_LAYOUT", "GridLayout");
    }
}
function AddDefaultWebFormsPropertiesToWizard(dtex, wizardx, selProj)
{
    AddDefaultClientScriptToWizard(dtex, wizardx, selProj);
    AddDefaultTargetSchemaToWizard(dtex, wizardx, selProj);
    AddDefaultDefaultHTMLPageLayoutToWizard(dtex, wizardx, selProj);
}


function IsReferenceExpanded(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    if( UIItem != null )
        return UIItem.Expanded;
}		

function ExpandReferencesNode(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    if( UIItem != null )
        UIItem.Expanded = true;
}

function CollapseReferencesNode(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    if( UIItem != null )
        UIItem.Expanded = false;
}

function GetUIReferencesNode(oProj)
{
    var L_strREferencesNode_Text = "Ссылки"; // Данную строку необходимо локализовать
    var UIItemX = null;

    UIItemX = GetUIItem( oProj, L_strREferencesNode_Text);
    if( UIItemX )
        return UIItemX.UIHierarchyItems;
    else
        return null;
}

//
// Вернуть родительский элемент из иерархии входных элементов. Родительский элемент может быть папкой, 
// или решением.
//
function getParent(obj)
{
    var parent = obj.Collection.parent;
    //
    // obj является проектом?
    //
    if( parent == dte )
    {
        //
        // obj является дочерним проектом?
        //
        if( IsSubProject(obj) )
        {                
            parent = obj.ParentProjectItem.Collection.parent;
        }
        else
        {
            //
            // obj является проектом верхнего уровня
            //
            parent = null;
        }
    }
    return parent;    
}

function IsSubProject(oProj)
{
    try
    {
        var Parent = oProj.ParentProjectItem;
        if(Parent)
            return true;
        return false;
    }
    catch(e)
    {
        return false;
    }
}

//
// возвращает UIHierarchyItem для элемента проекта, sName. 
// Если строка sName является пустой, возвращает UIHierarchyItem для проекта
//
function GetUIItem( oProj, sName )
{
    try
    {
        if( sName != "" )
        {
            sSaveName = sName;
            sName = oProj.Name + "\\" + sSaveName;
        }
        else
        {
            sName = oProj.Name;
        }

        var parent = getParent( oProj );

        while( parent != null )
        {
            sSaveName = sName;
            sName = parent.Name + "\\" + sSaveName;
            parent = getParent( parent );

        }

        //
        // был достигнут верхний уровень иерархии обозревателя решений - был возвращен индекс sName в коллекцию UIHierarchyItem решения
        //
        var strSolutionName = dte.Solution.Properties("Name");
        var vsHierObject = dte.Windows.Item(vsWindowKindSolutionExplorer).Object;   
        return vsHierObject.GetItem( strSolutionName + "\\" + sName );
    }	
    catch(e)
    {
        return null;
    }
}

//
// Определяет, существует ли такой файл в проекте
//
function DoesFileExistInProj(oProj, sName )
{
    try
    {
        return oProj.ProjectItems.Item(sName);

    }	
    catch(e)
    {
        return null;
    }
}

function SetErrorInfo(error)
{
    if(error.description.length > 0)
    {
        wizard.SetErrorInfo(error.description, error.number & 0xFFFFFFFF);
    }
}

function ReportError( strErr )
{
    if( dte.SuppressUI == false )
    {
        wizard.ReportError(strErr);
    }
}

function ProjectIsARootWeb(strProjectPath)
{
    // Возвращает, является ли strProjectPath корневым веб-узлом. Это осуществляется за счет подсчета
    // прямых косых черт. Корневые веб-узлы имеют форму: http://server. Предполагая,
    // что замыкающие косые черты отсутствуют, корневой веб-узел имеет 2 прямые косые черты, а не корневой
    // 3 или более косых черт. 
    var nCntr = 0;
    var cSlashes = 0;
    var nLen = strProjectPath.length - 1;   // Пропустить последний символ
    for (nCntr = 0; nCntr < nLen; nCntr++)
    {
        // Подсчитать прямые косые черты
        if(strProjectPath.charAt(nCntr) == "/")
            cSlashes++;
    }
    
    if(cSlashes == 2)
        return true;
    return false;
}

// SIG // Начало блока подписи
// SIG // MIIoJwYJKoZIhvcNAQcCoIIoGDCCKBQCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 4YdMNIXV59yR9PsfweZDIgJWtXFQwBnqn7Gz0v/1vnig
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
//SIG // IrVtqMp1ApUwVAYDVR0fBE0wSzBJoEegRYZDaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jcmwvTWlj
//SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNybDBhBggr
//SIG // BgEFBQcBAQQRVMFMwUQYIKwYBBQUHMAKGRWh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
//SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNydDAMBgNV
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
//SIG // cG9yYXRpb24xMjИБgNVBAMTKU1pY3Jvc29mdCBSb290
//SIG // IENlcnRpZmljYXRlIEF1dGhvcml0eSAyMDExMB4XDTEx
//SIG // MDcwODIwNTkwOVoXDTI2MDcwODIxMDkwOVowfjELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEoMCYGA1UEAxMfTWljcm9zb2Z0
//SIG // IENvZGUgU2lnbmluZiBQ0EgMjAxMTCCAiwDQYJKoZI
//SIG // hvcNAQEBBQADggIPADCCAgoCggAGOKvw+nIQHC6t2G6q
//SIG // ghBNNLrytlghn0IbKmvpWlCquAY4GgRJun/DDB7dN2vG
//SIG // EtgL8DjCmQrsyDnVARQxQtOJDXlkh36UYCRsr55JnOlo
//SIG // XtLfm1OyCizDr9mpK656Ca/XllnKYBoF6WZ26DJSJhIv
//SIG // 56sIUM+zRLdd2MQuA3WraPPLbfM6XKEW9Ea64DhkrG5k
//SIG // NXimoGMPLdNAk/jj3gcN1Vx5pUkp5w2+oBN3vpQ97/vj
//SIG // K1oQH01WKKJ6cuASOrdJXtjt7UORg9l7snuGG9k+sYxd
//SIG // 6IlPhBryoS9Z5JA7La4zWMW3Pv4y07MDPbGyr5I4ftKd
//SIG // gА1TlaRITUlwzluZH9TupwPrRkjhMv0ugOGjfdf8NBS
//SIG // v4yUh7zAIXQlXxgotswnKDglmDlKNs98sZKuHCOnqWbs
//SIG // YR9q4ShJnV+I4iVd0yFLPlLEtVc/JAPw0XpbL9Uj43Bd
//SIG // D1FGd7P4AOG8rAKCX9vAFbO9G9RVS+c5oQ/pI0m8GLhE
//SIG // fEXkwcNyeuBy5yTfv0aZxe/CHFfbg43sTUkwp6uO3+xb
//SIG // n6/83bBm4sGXgXvt1u1L50kppxMopqd9Z4DmimJ4X7Iv
//SIG // hNdXnFy/dygo8e1twyiPLI9AN0/B4YVEicQJTMXUpUMv
//SIG // dJX3bvh4IFgsE11glZo+TzOE2rCIF96eTvSWsLxGoGyY
//SIG // 0uDWiIwLAgMBAAGjggHtMIIB6TAQBgkrBgEEAYI3FQEE
// SIG // AwIBADAdBgNVHQ4EFgQUSG5k5VAF04KqFzc3IrVtqMp1
//SIG // ApUwGQYJKwYBBAGCNxQCBAweCgBTACGYgDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
//SIG // BBgwFoAUci06AjGQQ7kUBU7h6qfHMdEjiTQwWgYDVR0f
//SIG // BFMwUTBPoE2gS4ZJaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
//SIG // MjAxMV8yMDExXzAzXzIyLmNybDBeBggrBgEFBQcBAQRS
//SIG // MFHmTgYIKwYBBQUHMAKGQmh0dHA6Ly93d3cubWljcm9z
//SIG // b2Z0LmNvbS9wa2kvY2VydHMvTWljUm9vQ2VyQXV0MjAx
//SIG // MV8yMDExXzAzXzIyLmNydDCBnwYDVR0gBIGXMIGUMIGR
//SIG // BgkrBgEEAYY3LgMwgYMwYKwYKwYBBQUHEWM2h0dHA6
//SIG // Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvZG9jcy9w
//SIG // cmltYXJ5Y3BzLmh0bTBABggrBgEFBQcCJA0HjIgHQBM
//SIG // AGUAZwBhAGwAXwBwAG8AbABpAGMAeQBfAHMAdABhAHQA
//SIG // ZQBtAGUAbgB0AC4gHTANBgkqhkiG9w0BAQsFAAOCAgEA
//SIG // Z/KGpZjgVHkaLtPYdGcimwuWEeFjkplCln3SeQyQwWVf
//SIG // Liw++MNy0W2D/r4/6ArKO79HqaPzadtjvyI1pZddZYSQ
//SIG // fYtGUFXYDJJ80hpLHPM8QotS0LD9a+M+By4pm+Y9G6XU
//SIG // tR13lDni6WTJRD14eiPzE32mkHSDjfTLJgJGKsKKELuk
//SIG // qQUMm+1o+mgulaAqPyprWEljHwlpblqYluSD9MCP80Yr
//SIG // 3vw70L01724lruWvJ+3Q3fMOr5kol5hNDj0L8giJ1h/D
//SIG // Mhji8MUtzluetEk5CsYKwsatruWy2dsViFFFWDgycSca
//SIG // f7H0J/jeLDogaZiyWYlobm+nt3TDQAUGpgEqKD6CPxNN
//SIG // ZgvAs0314Y9/HG8VfUWnduVAKmWjw11SYobDHWM2l4bf
//SIG // 2vP48hahmifhzaWX0O5dY0HjWwechz4GdwbRBrF1HxS+
//SIG // YWG18NzGGwS+30HHDiju3mUv7Jf2oVyW2ADWoUa9WfOX
//SIG // pQlLSBCZgB/QACnFsZulP0V3HjXG0qKin3p6IvpIlR+r
//SIG // +0cjgPWe+L9rt0uX4ut1eBrs6jeZeRhL/9azI2h15q/6
//SIG // /IvrC4DqaTuv/DDtBEyO3991bWORPdGdVk5Pv4BXIqF4
//SIG // ETIheu9BCrE/+6jMpF3BoYibV3FWTибFwELJm3ZbCoBI
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoJMIIaBQIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // rzBADkyjTQVBAAAAAAOvMA0GCWCGSAFlAwQCAQUAoIGu
//SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
//SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
//SIG // DQEJBDEiBCARoGUkXPQqrv6IwQePI633kyMNhwEiYp/F
//SIG // MBrLx11FUjBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
//SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBALRZJ/7J
// SIG // WYHmPdrRvILXbDm6PJFwCdZ3fUYP4o62C0Azf4j50Hij
// SIG // Lc3p/4A3TJdWsOvdkXS6OpI6cEXE7PocmYvW3U2tkixJ
// SIG // XuyYzPjNEuy817+duzT89u+T/DiKAxe+llpRLzAGROVD
// SIG // jO4DaNmmNtdhB8S+WMFhVa3wArS7MUEd7fj9zRLr/wu1
// SIG // WoiBwx2FRCRbPrUpPh3yHeA0in+nKBL9pBjBaKUsUxh/
// SIG // KbqPwedbEmnmzEeLX8Pb2MzQPaKGXJBOROEHPcRsKGlp
// SIG // 8VU3YRfkqPSat3pJ8BYGa9w7gWBubV2LKDMAWtFVMKAH
// SIG // AsnitDgSZJFBlTUYaexraN2P3iyhgheTMIIXjwYKKwYB
// SIG // BAGCNwMDATGCF38wghd7BgkqhkiG9w0BBwKgghdsMIIX
// SIG // aAIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgwLE/UNZhbkvIy7WBZB4Y
// SIG // 3MRC1dqqTOzir2N25l8+fdICBmWf1o+IXxgTMjAyNDAx
// SIG // MTExODUyNDQuNDE2WjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOkE5MzUtMDNFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR6TCCByAwggUIoAMCAQICEzMAAAHRsltAKGwu0kUA
// SIG // AQAAAdEwDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjE4WhcN
// SIG // MjQwMjAxMTkxMjE4WjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OkE5MzUtMDNFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAmUzaNDnhs9lxXdoC
// SIG // 4OZ05QZvFzqbsCSIl7DFOta8KtWSg6WuON0a0hv6R/Bs
// SIG // +lzZxUChpwqjQrZr6ClCwKcK0/7O/3tV9JTRSpo+1O1+
// SIG // KdNEtLkG1ui8Ep/81h2htnOeGV7BmPgWH4Vg4GxaQk8U
// SIG // c050Qhutm5Fj6emR22T4OB7dQkQgDIYThk0fMCOBu8MF
// SIG // mcHTHOlL1FJatKpfQMQH85GEaYtrUbwxzHZmd78l6aoR
// SIG // cL0RvHIAh/00wo1uaumjW3aii9wRQz81LbgjbD1y9/xN
// SIG // HUdmwzKmtGjR/oiH4RguP73MLrXjjAj1CA1UqgwjXyGj
// SIG // wxMGHItX3fYLtc1cPhxIQ2TOxGt58SFK87fkX6eU6DDI
// SIG // +EAJielGnZvkz2w26PJBSCu9EoZlvMJ/HyZPUXkEBKU7
// SIG // SDeN3kb/UJl8t1HnfNKLDgRPlpHTL0ghYfqoArCnc0MU
// SIG // CRutnE3qFNnqjYR96KaV5sn1VMG7Hn0MzD7W4pwmXdBV
// SIG // JZpTP3R/uDp4qkMmh767WMt8KiGn2N83hSE5VQKD/avb
// SIG // xeFuyh0f7hdJr06QC+TWkwzdaZUEtDHYzJIM2SuYLcKj
// SIG // nv9605agc8cGu2GKd7qz+clpE8yEhp4TViGTsTskCDsW
// SIG // X24iGwB25tzPIY+9ykFnAkeSWr4JMFJp3BRxEmkH+A66
// SIG // rPv9S9UCAwEAAaOCAUkwggFFMB0GA1UdDgQWBBQLjvFM
// SIG // xew3B9JprBeF0McR0L0tozAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // m7va0wB1duJmNKqBuXhJyJs+WpBl074gcCqdmOdbNusP
// SIG // KA61qK/ptNEeP9wXA5mJVCvDa8f2rmBWInWXXXFI8ONk
// SIG // MUkrZr/6lpwkIv9jpx99ilR0PpDDmTwAUExtV5HJ2D1D
// SIG // jhBKK+n/9ybNbo+MIx8xOFeGrpmFwQLK+C+SkfLynrOb
// SIG // RcYTJFjQ/zu1v0Wh2MCTIzJMVaLAaJO1dtbCQJcUnBF8
// SIG // XyWvv6pKlK+wmYMN0eIwh0ZD6kITFom1zzGGq/4hdGbi
// SIG // wfTvPQzCTYYyvQUn+oqoGaDLsyFbfhAaE86b//aeMEOs
// SIG // aAQrNvZpI/xCFhXXPuWt9JLgkDkhDo9O/liNvQOJOkCE
// SIG // QecPnjJmdCXnNLEsnkAeSo8ROdYmDIbZTK1CnK9Opwag
// SIG // rEij2LEgCEwM4LLCQ/mf3E0uwrt+Xya1oTPTWF9uLgMW
// SIG // CwFtIqTbVqbSHlempLmRHhFegTbTN1U5PpgJVef3gv9G
// SIG // Ne2lUoyuf4Mg6CzZq4FcL+UwGgZqv8IEURR5lvVCd87/
// SIG // C5pOpiKAMk6agW7lIzC8q7Wo7krAP5tg5yjDtEIs9b/h
// SIG // UlW6jN/Cfz05YQk1GxTsdJC0+2P+/mcq4pVQs8gGHxSI
// SIG // pwyI1pTPObQ3lPGXyQoxSsKtw7EcVeCWNfMcMPE05qHd
// SIG // 5ZK/TahkOeC5sj1XPuYmza4wggdxMIIFWaADAgECAhMz
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
// SIG // ahC0HVUzWLOhcGbyoYIDTDCCAjQCAQEwgfmhgdGkgc4w
// SIG // gcsxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJTAjBgNVBAsTHE1p
// SIG // Y3Jvc29mdCBBbWVyaWNhIE9wZXJhdGlvbnMxJzAlBgNV
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjpBOTM1LTAzRTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUARyWNhb/hoS0L
// SIG // UQ0dryMwWkr/+yyggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOlK
// SIG // VQwwIhgPMjAyNDAxMTExMTUyNDRaGA8yMDI0MDExMjEx
// SIG // NTI0NFowczA5BgorBgEEAYRZCgQBMSswKTAKAgUA6UpV
// SIG // DAIBADAGAgEAAgEvMAcCAQACAhJyMAoCBQDpS6aMAgEA
// SIG // MDYGCisGAQQBhFkKBAIxKDAmMAwGCisGAQQBhFkKAwKg
// SIG // CjAIAgEAAgMHoSChCjAIAgEAAgMBhqAwDQYJKoZIhvcN
// SIG // AQELBQADggEBAIU9qWokEEpbGYbO9opFjEOzLAChNKH3
// SIG // Qusq3DBLJNu0dyCFQEZhTsR5e9gZObiYbOCmsLnegtCv
// SIG // II8IHClKfsSR8jNXL80VC1aTfKnJKEoqp34aqKOp5O77
// SIG // s/BFLs4Y4atL5KgClZ3WWD27BrgGLka/ZwKxo7V5J/GP
// SIG // CS89z61c3P0tsigssFHJaECsu0r/9ufjlJQDX8xZmv/K
// SIG // JBrCG26S30AyaJM7c0ddtF85Yz44o3kLspRjkQ3zH7T1
// SIG // 8uVeG84hVyKRPjqjl9X4SSyPYOxmi+tCQQiOORG6+3b6
// SIG // rZbsVXH8DNh59xewfKEeKuJMnBxJnIdOnK6lWfR3R+Q1
// SIG // kDgxggQNMIIECQIBATCBkzB8MQswCQYDVQQGEwJVUzET
// SIG // MBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVk
// SIG // bW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0
// SIG // aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1TdGFt
// SIG // cCBQQ0EgMjAxMAITMwAAAdGyW0AobC7SRQABAAAB0TAN
// SIG // BglghkgBZQMEAgEFAKCCAUowGgYJKoZIhvcNAQkDMQ0G
// SIG // CyqGSIb3DQEJEAEEMC8GCSqGSIb3DQEJBDEiBCB8A+2F
// SIG // NKP+ExCvzKcxRjxypnMGgC5BoIOG/oqWtbX8ajCB+gYL
// SIG // KoZIhvcNAQkQAi8xgeowgecwgeQwgb0EIMy8YXkCALv5
// SIG // 7c5sRhrPTub1q4TwJ6oVA36k8IiI/AcMMIGYMIGApH4w
// SIG // fDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMAAAHR
// SIG // sltAKGwu0kUAAQAAAdEwIgQghfCG8Qzl9WfrExEcF0oB
// SIG // fouvjeGRzOQCzO/m2gcZeJ4wDQYJKoZIhvcNAQELBQAE
// SIG // ggIAODU/B4sdJEG4m8YfU/wjhfkVTQMb3Tl9MhwFwv5I
// SIG // kEnALA9DtFx5vpeO1cIWRlIfSnaTYOGlI88tUuAAD6C6
// SIG // jwrY57cYnBwnUywDI0FqIzPPBkOMSgZOfz/XW0rod1SK
// SIG // lwt6qd0cxO38uHUH0vTylTJMB19IcFdvU5i5LI7/7DyY
// SIG // XrUNlOVBGXYyJ9FahqvzLrpZf1SIsneCI2D76+Vagqfi
// SIG // KPQodTtMzUmYWoeZS2xHt47pbQMAVEZ3JNvoK0DpFdi3
// SIG // FS9z6FScGy9RJoczacVQKyZQIPZmmlWzGweIojIZk1Y8
// SIG // lCK87+19Ay1Hj8FK2OcVdJEBP+tC3TRwXl3yjodIWcn7
// SIG // RwMLuE3EqrzoJA5W5xfFyjv1YqPa4j2K1wnH7QgpxuDB
// SIG // LD+Dt6tFNKzCUCvrg+Vs7zcV+Cld1AzOHkhvlbP6Wk0C
// SIG // lT5uvbsAeQAexkMxZLaWiq2jTPYg+DkU+7Cs0soTUKq8
// SIG // zCPeFd7X2WgdLQkwcuuSI6GhnPWgeHFvuzhB0y+J8XFU
// SIG // r/vW1Lz9MhsQLySkv9kQyqhMcGV1qlQLpTEeAOyYAn1k
// SIG // y2H36vc4Q/FCxuveKo+ZKhuAhRin6FWslrFHfrFE6hVe
// SIG // 5hPe9/JPGPEtpcEW89yz1D9ir827khbSK3lAGgwKEGrG
// SIG // h+Yg4HiJemaa+OvBBkf0giieULs=
// SIG // Конец блока подписи

// SIG // Begin signature block
// SIG // MIIoKgYJKoZIhvcNAQcCoIIoGzCCKBcCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // oNlmLRenoIksxS7uPmcJE0VoIdC+jtT+7fhwj88b5vqg
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoMMIIaCAIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // rzBADkyjTQVBAAAAAAOvMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCBkpwJKfFzUf5ce8fnGC1ahWEHbO7kGP/+M
// SIG // 9aBGCMS5TDBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAGJWSE8e
// SIG // 1oDfIOfwfQtu1dcwUWikJEinUoem4XPWBgtwLs1zxSnT
// SIG // GnIzGiQvlcXoLf6UXIkmlA1xrMBR+5Lokr3mWZ7MEHbl
// SIG // UeNmScmdBzGBaAiDsUBWjyWPg8QptcPiWL+WGV2RExaJ
// SIG // dWczvvU/zNuBBx87W1Ylc4+8wtwxA095NFOUg91w5VWP
// SIG // SwCMTzzyK49UCo2uwdq6aGofDFMHDCKsaTa+Zxc2sGyR
// SIG // VhLUyNamFZ9Onh3T7tR/CZa6AUfxNprWDYlGUvGY+veC
// SIG // L6PrRwjtfQ+XAtq2hXJVcKXzchSyua+dGh//DkS75MWj
// SIG // zSdbLKS/RBbbF2K6UFXP1HmAi1ihgheWMIIXkgYKKwYB
// SIG // BAGCNwMDATGCF4Iwghd+BgkqhkiG9w0BBwKgghdvMIIX
// SIG // awIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgyEP19LUzEQ7GxbdfE6lT
// SIG // v75I+WLDEepqP3HklegzaBACBmWf3XapgxgTMjAyNDAx
// SIG // MTExODU1MDMuMzAyWjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOjkyMDAtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR7DCCByAwggUIoAMCAQICEzMAAAHPUja+cUvNSMoA
// SIG // AQAAAc8wDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjExWhcN
// SIG // MjQwMjAxMTkxMjExWjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OjkyMDAtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAuD3LfteU2Mq1I3ue
// SIG // d5cwUKHYJneQc+1rh/EnR6QKFs/tNU6xxMQUrmjCp8b1
// SIG // TLMmLWrOYemqKVBgEuVilS2QL1LR+tkypgBNCSvotYWn
// SIG // 4gkly2T3EXscXkZDqnmXnywc16dJ7nTDl1FGm9990rPC
// SIG // 5KCuJdy2MZtRG7K929jk6Nnm7AKDSeJEsZlbjzOwvkQ4
// SIG // RrVSkfxJh7EPRnMBppbrueG6olRXdKABQW8OLcU1NZq7
// SIG // iBlj/4vrIIjar3Vf8Gof0HKyohpaVojq/WuWhqyWj0kA
// SIG // 9sYBA3T260n5WMbETHWQiSPL87zr+gZbj3DzxhlSxGlO
// SIG // zrM3WIyuX+GeUrv5TytXkk+TwuERbFXDokuC9LCOCBWc
// SIG // sCHQyR6CoHalkaekObxA5PJL2c+h1hZ2CzpR7qjBGL0C
// SIG // 6+joKKGFPc9AOXDCxxCB2FdcYmgc8dhEYkWPTFD1qIYf
// SIG // k6WVhFGZVJv6vWp11UTdLo3o5ujrFFRQ7LCDLM0TQqhK
// SIG // LSRsLRx5ucawiriZBa/Bn8DXpRZflw6B160GC/c2Ozaf
// SIG // n67E10KSkTZ5iNWrIXJ+RAvsMVLfxGSLJFs3sBH7dP/v
// SIG // 9IN/vGLTJFHWkBOfvHuwvFDIlzh5DCtuYzTUKiwnnZSc
// SIG // BSH/Yq/UqTHO9jUftY+lHm4s/2T1e+HaN43Vb6uw4jxZ
// SIG // U2/dlCsCAwEAAaOCAUkwggFFMB0GA1UdDgQWBBQ2nij7
// SIG // adHk0lXRvoGXOQQ5Gm04ODAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // UIJuKZwNMZHf/bilyTM3TGMsVH1Jv2brFAWt9jBGV0Lj
// SIG // BqdtKUrl9lVvf7aUzKOW5GiXQVaFMndg2w7DW9ZI6/9+
// SIG // p7U9I7y9wKFkrQBYWQcqZqT28fgTyuPWZXo5TOHeXqV+
// SIG // uvLUURnxYqfU4pfcikX1wa15zP6uuCIpze81xENxRUIX
// SIG // STM7fIm1wpTu3hQPtR4sGT1srGFj2/2ThaGzxDL14nvh
// SIG // phG0ym4RObc3ukawPWno4z/r9aLhaA+WzI+UIPsH2V6n
// SIG // voX2CqTHfEDp0Mns/jZY9YrcpzmVn8B1Ue3VcFdMi0pT
// SIG // 0/shyDvIPt31ogMKaDte2w3J7Ume2DgZY16yIGneFuIF
// SIG // /uLadXgbHOl1iCEzwTc8UA2WUcQ+K18zgel0ZRFSXWGU
// SIG // PIG1zoq4P3Tb0thsXEedEHTlwwLpnRB2hjR2+stiJyWn
// SIG // Qj6dok+UCwuDJ80fmGZ6NW/JlqQnTnUbPYNtUG26yNOo
// SIG // i5PSg+tZ8eyuUXkrnLkuWfZ25CAWi1MQ3rBYa9cJndcp
// SIG // 39B0OdUsK8oe2CO0109I6/NZm77yPcbaKoxbyITQbCAn
// SIG // Qn00fdcpSUx/FrVJaQ4RIEqlrd4MzSz00r1wMV06SDOf
// SIG // N7GXXfv9mBgAzHlprfD7jHHuhrCHCwjhdjYmGddElx2U
// SIG // uR0ay6wobs3nQ0YrFqSLubkwggdxMIIFWaADAgECAhMz
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
// SIG // ahC0HVUzWLOhcGbyoYIDTzCCAjcCAQEwgfmhgdGkgc4w
// SIG // gcsxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJTAjBgNVBAsTHE1p
// SIG // Y3Jvc29mdCBBbWVyaWNhIE9wZXJhdGlvbnMxJzAlBgNV
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjo5MjAwLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUA6vMc1V8C4Lmr
// SIG // gEI9a6yeP08hDJuggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOlK
// SIG // W/QwIhgPMjAyNDAxMTExMjIyMTJaGA8yMDI0MDExMjEy
// SIG // MjIxMlowdjA8BgorBgEEAYRZCgQBMS4wLDAKAgUA6Upb
// SIG // 9AIBADAJAgEAAgEoAgH/MAcCAQACAhO6MAoCBQDpS610
// SIG // AgEAMDYGCisGAQQBhFkKBAIxKDAmMAwGCisGAQQBhFkK
// SIG // AwKgCjAIAgEAAgMHoSChCjAIAgEAAgMBhqAwDQYJKoZI
// SIG // hvcNAQELBQADggEBAJPoJdPIiq72bsm5d2qO3dLm65Rt
// SIG // n5VaS8Gt9HHFeyAN1/tW8xl9XY56pKetbn+tA/0xaXRw
// SIG // CZ4AhPxefU5U0vl6udLM+cNL/U4sZu7hfA1rysDatc66
// SIG // 9ZnZnaNs3GrMb0xT6Zk7V96hvWm3X92agk2BblaS1zPi
// SIG // 2p0T/Q6BFQaWaJQC6i3uXUZF2WTa5aYgcOWC7z+Bwh3W
// SIG // AmgTT8yQKYYUIMVwY27WbL6P+gisGtHKME7jXbjb7zgJ
// SIG // x4Wmn6cPFa9oJ7lXQW61JSIz0CjV1W8LuqDFV7AV6JHS
// SIG // cvuKp2kXTn9JWnLylzfDQI5tKbEKdYmZ+GHrhbr9abKN
// SIG // 54ZR2M4xggQNMIIECQIBATCBkzB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMAITMwAAAc9SNr5xS81IygABAAAB
// SIG // zzANBglghkgBZQMEAgEFAKCCAUowGgYJKoZIhvcNAQkD
// SIG // MQ0GCyqGSIb3DQEJEAEEMC8GCSqGSIb3DQEJBDEiBCCl
// SIG // xOh3bjiirmuh28uwv3OWm++0O7OKRDijmLQsrQTW9TCB
// SIG // +gYLKoZIhvcNAQkQAi8xgeowgecwgeQwgb0EILPpsLqe
// SIG // NS4NuYXE2VJlMuvQeWVA80ZDFhpOPjSzhPa/MIGYMIGA
// SIG // pH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMA
// SIG // AAHPUja+cUvNSMoAAQAAAc8wIgQgvXkYzL5rojNQvXdm
// SIG // 1BjluP18JbyWwTzjGuDInlBasdUwDQYJKoZIhvcNAQEL
// SIG // BQAEggIAa3c+CAHXaMBehg1f6ByfxMwPmHjNVN0PjS4K
// SIG // wpaVRrNu73dTT6V42uSbPPXjYLdZryiiCT9C93nI7dVu
// SIG // jSMpWEygKHRSvHt/Lq3Mp5k4+XbVXgN5mXZqUaXilskf
// SIG // Lnq95zSdgsVTcJRhzPZORZWWTB8pkQnrqZz4vcdxz7md
// SIG // c8P76B3xUdHPwQU8j3N9BFR2wNT1gclCoyTwdazD0gI0
// SIG // l1YDpzbLdVE6SUUABJjwy2yUYGN/Lb8NWyseiGRhmW5c
// SIG // l12ZRF+Aj4MQ4GP8DYn/BIKs8S/bMPB4pfy7MZumg5Sw
// SIG // OinRAvXCtObzGkIWgUV2w7k+lDRI4ClmhQeApwr+70AG
// SIG // iykAGvOdbbo8mzW3YNE7Gneh1s7sZMC+puKUgqW0qPSP
// SIG // mKhVkNi72L0JseZzrc1l+tCRubXNhmAHBPcwghTxxFOt
// SIG // DeU57eg58rSIfG6+utQsiDS9w22wRb68lOPfxihlVk1z
// SIG // V9PJ3/3NUJOnwo5uJwXQ1x1kfdtyxAE6eLSqj04FrADz
// SIG // zX/CpHja3eY+nmtcmUBS9pIofwFaIBIdZ/70/2iSuIme
// SIG // Chc2om8FcngzlrCWOSHAfwbFYs0HIxhqBwePMMhpuK8X
// SIG // 0VH9GfsDMzUJ3XgyGvjAK/TNugQcM5LzqhUhS2nItGFX
// SIG // qAb5dgOKHeIwgUJ3rnhA86xRp+7iBd4=
// SIG // End signature block
