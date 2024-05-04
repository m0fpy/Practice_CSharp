// (c) Microsoft Corporation
var vsViewKindPrimary                     = "{00000000-0000-0000-0000-000000000000}";
var vsViewKindDebugging                   = "{7651A700-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindCode                        = "{7651A701-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindDesigner                    = "{7651A702-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindTextView                    = "{7651A703-06E5-11D1-8EBD-00A0C90F26EA}";

var GUID_ItemType_PhysicalFolder          = "{6BB5F8EF-4483-11D3-8BCF-00C04F8EC28C}";
var GUID_ItemType_VirtualFolder           = "{6BB5F8F0-4483-11D3-8BCF-00C04F8EC28C}";
var GUID_ItemType_PhysicalFile            = "{6BB5F8EE-4483-11D3-8BCF-00C04F8EC28C}";

var GUID_Deployment_TemplatePath          = "{54435603-DBB4-11D2-8724-00A0C9A8B90C}";

var gbExceptionThrown = false;

    var vsCMFunctionConstructor = 1;

    var vsCMAddPositionInvalid = -3;
    var vsCMAddPositionDefault = -2;
    var vsCMAddPositionEnd = -1;
    var vsCMAddPositionStart = 0;
//
    var vsCMAccessPublic = 1;
    var vsCMAccessDefault = 32;
//
    var vsCMWhereInvalid = -1;
    var vsCMWhereDefault = 0;
    var vsCMWhereDeclaration = 1;
    var vsCMWhereDefinition = 2;
//
    var vsCMValidateFileExtNone = -1;
    var vsCMValidateFileExtCpp = 0;
    var vsCMValidateFileExtCppSource = 1;
    var vsCMValidateFileExtHtml = 2;
//
    var vsCMElementClass    = 1;
    var vsCMElementFunction = 2;
    var vsCMElementVariable = 3;
    var vsCMElementProperty = 4;
    var vsCMElementNamespace= 5;
    var vsCMElementInterface= 8;
    var vsCMElementStruct   = 11;   
    var vsCMElementUnion    = 12;
    var vsCMElementIDLCoClass=33;
    var vsCMElementVCBase   = 37;


// VS-specific HRESULT failure codes
//
    var OLE_E_PROMPTSAVECANCELLED = -2147221492;
    var VS_E_PROJECTALREADYEXISTS = -2147753952;
    var VS_E_PACKAGENOTLOADED = -2147753953;
    var VS_E_PROJECTNOTLOADED = -2147753954;
    var VS_E_SOLUTIONNOTOPEN = -2147753955;
    var VS_E_SOLUTIONALREADYOPEN = -2147753956;
    var VS_E_INCOMPATIBLEDOCDATA = -2147753962;
    var VS_E_UNSUPPORTEDFORMAT = -2147753963;
    var VS_E_WIZARDBACKBUTTONPRESS = -2147213313;
    var VS_E_WIZCANCEL = VS_E_WIZARDBACKBUTTONPRESS;

////////////////////////////////////////////////////////


/******************************************************************************
 Description: Sets the error info
  nErrNumber: Error code
  strErrDesc: Error description
******************************************************************************/
function SetErrorInfo(oErrorObj)
{
    var oWizard;
    try
    {
        oWizard = wizard;
    }
    catch(e)
    {
        oWizard = window.external;
    }

    try
    {
        var strErrorText = "";

        if(oErrorObj.description.length != 0)
        {
            strErrorText = oErrorObj.description;       
        }
        else
        {
            var strErrorDesc = GetRuntimeErrorDesc(oErrorObj.name);
            if (strErrorDesc.length != 0)
            {
                var L_strScriptRuntimeError_Text = " во время выполнения скрипта возникла ошибка:\r\n\r\n";
                strErrorText = oErrorObj.name + L_strScriptRuntimeError_Text + strErrorDesc;
            }
        }

        oWizard.SetErrorInfo(strErrorText, oErrorObj.number & 0xFFFFFFFF);
    }
    catch(e)
    {
        var L_ErrSettingErrInfo_Text = "Во время задания информации об ошибке возникла ошибка.";
        oWizard.ReportError(L_ErrSettingErrInfo_Text);
    }
}


/******************************************************************************
         Description: Returns a description for the exception type given
 strRuntimeErrorName: The name of the type of exception occurred
 *****************************************************************************/
function GetRuntimeErrorDesc(strRuntimeErrorName)
{
    var L_strDesc_Text = "";
    switch(strRuntimeErrorName)
    {
        case "ConversionError":
            var L_ConversionError1_Text = "Данная ошибка происходит при попытке преобразовать";
            var L_ConversionError2_Text = "объект в то, во что он не может быть преобразован.";
            L_strDesc_Text = L_ConversionError1_Text + "\r\n" + L_ConversionError2_Text;
            break;
        case "RangeError":
            var L_RangeError1_Text = "Данная ошибка происходит тогда, когда в функцию передается аргумент,";
            var L_RangeError2_Text = "превосходящий диапазон допустимых значений. Например, данная ошибка происходит";
            var L_RangeError3_Text = "при попытке создать массив с длиной, не являющейся";
            var L_RangeError4_Text = "допустимым положительным числом.";
            L_strDesc_Text = L_RangeError1_Text + "\r\n" + L_RangeError2_Text + "\r\n" + L_RangeError3_Text + "\r\n" + L_RangeError4_Text;
            break;
        case "ReferenceError":
            var L_ReferenceError1_Text = "Данная ошибка возникает при обнаружении недопустимой ссылки.";
            var L_ReferenceError2_Text = "Данная ошибка возникнет, например, если ожидаемая ссылка содержит значение null.";
            L_strDesc_Text = L_ReferenceError1_Text + "\r\n" + L_ReferenceError2_Text;
            break;
        case "RegExpError":
            var L_RegExpError1_Text = "Данная ошибка возникает, когда происходит ошибка компиляции регулярного";
            var L_RegExpError2_Text = "выражения. Однако после того как регулярное выражение было скомпилировано, такая ошибка";
            var L_RegExpError3_Text = "не может произойти. Такая ошибка возникает, например, когда регулярное";
            var L_RegExpError4_Text = "выражение объявлено при помощи шаблона с неверным синтаксисом или флагами,";
            var L_RegExpError5_Text = "отличными от i, g и m, или содержит несколько вхождений одного и того же флага.";
            L_strDesc_Text = L_RegExpError1_Text + "\r\n" + L_RegExpError2_Text + "\r\n" + L_RegExpError3_Text + "\r\n" + L_RegExpError4_Text + "\r\n" + L_RegExpError5_Text;
            break;
        case "SyntaxError":
            var L_SyntaxError1_Text = "Данная ошибка возникает при разборе исходного кода, не";
            var L_SyntaxError2_Text = "соответствующего правильному синтаксису. Такая ошибка возникнет, например, если функция";
            var L_SyntaxError3_Text = "eval вызвана с аргументом, не являющимся допустимым программным текстом.";
            L_strDesc_Text = L_SyntaxError1_Text + "\r\n" + L_SyntaxError2_Text + "\r\n" + L_SyntaxError3_Text;
            break;
        case "TypeError":
            var L_TypeError1_Text = "Данная ошибка возникает, когда фактический тип операнда не соответствует";
            var L_TypeError2_Text = "ожидаемому типу. Причиной возникновения такой ошибки может служить, например, вызов метода";
            var L_TypeError3_Text = "для не-объекта или элемента, не поддерживающего вызов.";
            L_strDesc_Text = L_TypeError1_Text + "\r\n" + L_TypeError2_Text + "\r\n" + L_TypeError3_Text;
            break;
        case "URIError":
            var L_URIError1_Text = "Данная ошибка возникает при обнаружении недопустимого URI (Uniform Resource Indicator - унифицированный указатель ресурса).";
            var L_URIError2_Text = "Например, такая ошибка возникает при обнаружении недопустимого символа в";
            var L_URIError3_Text = "кодируемой или декодируемой строке.";
            L_strDesc_Text = L_URIError1_Text + "\r\n" + L_URIError2_Text + "\r\n" + L_URIError3_Text;
            break;
        default:
            break;
    }
    return L_strDesc_Text;
}

/******************************************************************************
 Description: Creates the Templates.inf file.
              Templates.inf is created based on TemplatesInf.txt and contains
              a list of file names to be created by the wizard.
******************************************************************************/
function CreateInfFile()
{
    try
    {
        var oFSO, TemplatesFolder, TemplateFiles, strTemplate;
        oFSO = new ActiveXObject("Scripting.FileSystemObject");

        var TemporaryFolder = 2;
        var oFolder = oFSO.GetSpecialFolder(TemporaryFolder);

        var strTempFolder = oFSO.GetAbsolutePathName(oFolder.Path);
        var strWizTempFile = strTempFolder + "\\" + oFSO.GetTempName();

        var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
        var strInfFile = strTemplatePath + "\\Templates.inf";
        wizard.RenderTemplate(strInfFile, strWizTempFile);

        var oWizTempFile = oFSO.GetFile(strWizTempFile);
        return oWizTempFile;

    }
    catch(e)
    {   
        throw e;
    }
}

/******************************************************************************
 Description: Returns a unique file name
strDirectory: Directory to look for file name in
 strFileName: File name to check.  If unique, same file name is returned.  If 
              not unique, a number from 1-9999999 will be appended.  If not 
              passed in, a unique file name is returned via GetTempName.
******************************************************************************/
function GetUniqueFileName(strDirectory, strFileName)
{
    try
    {
        oFSO = new ActiveXObject("Scripting.FileSystemObject");
        if (!strFileName)
            return oFSO.GetTempName();

        if (strDirectory.length && strDirectory.charAt(strDirectory.length-1) != "\\")
            strDirectory += "\\";

        var strFullPath = strDirectory + strFileName;
        var strName = strFileName.substring(0, strFileName.lastIndexOf("."));
        var strExt = strFileName.substr(strFileName.lastIndexOf("."));

        var nCntr = 0;
        while (oFSO.FileExists(strFullPath))
        {
            nCntr++;
            strFullPath = strDirectory + strName + nCntr + strExt;
        }
        if (nCntr)
            return strName + nCntr + strExt;
        else
            return strFileName;
    }
    catch(e)
    {   
        throw e;
    }
}


/******************************************************************************
 Description: Deletes the file given
        oFSO: File System Object
     strFile: Name of the file to be deleted
******************************************************************************/
function DeleteFile(oFSO, strFile)
{
    try
    {
        if (oFSO.FileExists(strFile))
        {
            var oFile = oFSO.GetFile(strFile);
            oFile.Delete();
        }
    }
    catch(e)
    {   
        throw e;
    }
}

/******************************************************************************
Description: Returns the highest dispid from members of the given interface & 
             all its bases
  oInterface: Interface object
******************************************************************************/
function GetMaxID(oInterface)
{
    var currentMax = 0;
    try
    {
        var funcs = oInterface.Functions;
        if(funcs!=null)
        {
            var nTotal = funcs.Count;
            var nCntr;
            for (nCntr = 1; nCntr <= nTotal; nCntr++)
            {
                var id = funcs(nCntr).Attributes("id");
                if(id!=null)
                {
                    var idval = parseInt(id.Value);
                    if(idval>currentMax)
                        currentMax = idval;
                }
            }
        }
//REMOVE remove this and use Children collection above, if it's implemented
        funcs = oInterface.Variables;
        if(funcs!=null)
        {
            var nTotal = funcs.Count;
            var nCntr;
            for (nCntr = 1; nCntr <= nTotal; nCntr++)
            {
                var id = funcs(nCntr).Attributes("id");
                if(id!=null)
                {
                    var idval = parseInt(id.Value);
                    if(idval>currentMax)
                        currentMax = idval;
                }
            }
        }
        var nextBases = oInterface.Bases;
        var nTotal = nextBases.Count;
        var nCntr;
        for (nCntr = 1; nCntr <= nTotal; nCntr++)
        {
            var nextObject = nextBases(nCntr).Class;
            if(nextObject!=null && nextObject.Name != "IDispatch")
            {
                var idval = GetMaxID(nextObject);
                if(idval>currentMax)
                        currentMax = idval;
            }
        }
        return currentMax;
    }
    catch(e)
    {   
        throw e;
    }
}


/******************************************************************************
 Description: Generates a C++ friendly name
     strName: The old, unfriendly name
******************************************************************************/
function CreateSafeName(strName)
{
    try
    {
        var nLen = strName.length;
        var strSafeName = "";
        
        for (nCntr = 0; nCntr < nLen; nCntr++)
        {
            var cChar = strName.charAt(nCntr);
            if ((cChar >= 'A' && cChar <= 'Z') || (cChar >= 'a' && cChar <= 'z') || 
                    (cChar == '_') || (cChar >= '0' && cChar <= '9'))
            {
                // valid character, so add it
                strSafeName += cChar;
            }
            // otherwize, we skip it
        }
        if (strSafeName=="")
        {
            // if it's empty, we add My
            strSafeName = "My";
        }
        else if (strSafeName.charAt(0) >= '0' && strSafeName.charAt(0) <= '9')
        {
            // if it starts with a digit, we prepend My
            strSafeName = "My" + strSafeName;
        }
        return strSafeName;
    }
    catch(e)
    {   
        throw e;
    }
}


/******************************************************************************
 Description: Called from the wizards html script when 'Finish' is clicked. This
              function in turn calls the wizard control's Finish().
    document: HTML document object
******************************************************************************/
function OnWizFinish(document)
{
    document.body.style.cursor='wait';
    try
    {
        window.external.Finish(document, "ok"); 
    }
    catch(e)
    {
        document.body.style.cursor='default';
        if (e.description.length != 0)
            SetErrorInfo(e.description, e.number);
        return e.number;
    }
}

/******************************************************************************
 Description: Returns a Function object based on the given name
      oClass: Class object
 strFuncName: Name of the function
       oProj: Selected project
******************************************************************************/
function GetMemberFunction(oClass, strFuncName, oProj)
{
    try
    {
        var oFunctions;
        if (oClass)
            oFunctions = oClass.Functions;
        else
        {
            if (!oProj)
                return false;
            oFunctions = oProj.CodeModel.Functions;
        }

        for (var nCntr = 1; nCntr <= oFunctions.Count; nCntr++)
        {
            if (oFunctions(nCntr).Name == strFuncName)
                return oFunctions(nCntr);
        }
        return false;
    }
    catch(e)
    {   
        throw e;
    }
}


/*****************************************************************************
  The following section contains functions that are used by CSharp Projects
  and CSharp Additems. If you like to add a new function that is CSharp
  specific, please add it beyond this point of this file.

                            - CSHARP SECTION -
******************************************************************************/

/******************************************************************************
     Description: Creates a C# project
  strProjectName: Project Name
  strProjectPath: The path that the project will be created in
 strTemplateFile: Project template file e.g. "defualt.csproj"
******************************************************************************/
function CreateCSharpProject(strProjectName, strProjectPath, strTemplateFile)
{
    try
    {
        // Make sure user sees ui.
        dte.SuppressUI = false;
        var strProjTemplatePath = wizard.FindSymbol("PROJECT_TEMPLATE_PATH") + "\\";
        var strProjTemplate = strProjTemplatePath + strTemplateFile; 
        var Solution = dte.Solution;
        var strSolutionName = "";
        if (wizard.FindSymbol("CLOSE_SOLUTION"))
        {
            Solution.Close();
            strSolutionName = wizard.FindSymbol("VS_SOLUTION_NAME");
            if (strSolutionName.length)
            {

                var strSolutionPath = strProjectPath.substr(0, strProjectPath.length - strProjectName.length);
                Solution.Create(strSolutionPath, strSolutionName);
            }
        }

        strProjectNameWithExt = strProjectName + ".csproj";

        var oTarget = wizard.FindSymbol("TARGET");
        var oPrj;
        if (wizard.FindSymbol("WIZARD_TYPE") == vsWizardAddSubProject)  // vsWizardAddSubProject
        {
            var nPos = strProjectPath.search("http://");
            var prjItem
            if(nPos == 0)
                prjItem = oTarget.AddFromTemplate(strProjTemplate, strProjectPath + "/" + strProjectNameWithExt);    
            else
                prjItem = oTarget.AddFromTemplate(strProjTemplate, strProjectPath + "\\" + strProjectNameWithExt);
            oPrj = prjItem.SubProject;
        }
        else
        {
            oPrj = oTarget.AddFromTemplate(strProjTemplate, strProjectPath, strProjectNameWithExt);
        }
        var strNameSpace = "";
        strNameSpace = oPrj.Properties("RootNamespace").Value;
        wizard.AddSymbol("SAFE_NAMESPACE_NAME",  strNameSpace);

        return oPrj;
    }
    catch(e)
    {
        // propagate all errors back to the caller
        throw e;
    }
}

/******************************************************************************
     Description: 
           oProj: Project object
******************************************************************************/
function GetUIReferencesNode(oProj)
{
    var L_strReferencesNode_Text = "Ссылки"; // This string needs to be localized
    try
    {
        var UIItemX = GetUIItem(oProj, L_strReferencesNode_Text);
        return UIItemX.UIHierarchyItems;
    }
    catch(e)
    {
    }
}

/******************************************************************************
     Description: Returns the parent of the input hierarchy item. The parent 
                  may be a folder, or a superproject or the solution.
           oProj: Project object
******************************************************************************/
function getParent(obj)
{
    var parent = obj.Collection.parent;
    //
    // is obj a project ?
    //
    if( parent == dte )
    {
        //
        // is obj a sub-project ?
        //
        if( obj.ParentProjectItem )
        {                
            parent = obj.ParentProjectItem.Collection.parent;
        }
        else
        {
            //
            // obj is a top-level project
            //
            parent = null;
        }
    }
    return parent;    
}

/******************************************************************************
 Description: Gets the UIHierarchyItem for the projectitem, sName. If 
              sName is empty, returns the UIHierarchyItem for the project.
       oProj: Project object
       sName: Project item name
******************************************************************************/
function GetUIItem( oProj, sName )
{
    // this functionality will not work properly for projects nested under
    // solution folders until automation support can be added in M2.

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
    // we have arrived at the top of the soltuion explorer hierarchy - return the sName index into the solution's UIHierarchyItem collection
    //
    var strSolutionName = dte.Solution.Properties("Name");
    var vsHierObject = dte.Windows.Item(vsWindowKindSolutionExplorer).Object;   
    return vsHierObject.GetItem( strSolutionName + "\\" + sName );
}

/******************************************************************************
 description: returns true if this path is a root web project
        strProjectPath: path to the web proj
******************************************************************************/
function ProjectIsARootWeb(strProjectPath)
{
    // Returns true if strProjectPath is a root web. Is does this by counting
    // the forward slashes. Web roots are of the form: http://server. Assuming
    // no trailing slash, a web root will have 2 forward slashes, non webroots will
    // have 3 or more slashes. 
    var nCntr = 0;
    var cSlashes = 0;
    var nLen = strProjectPath.length - 1;   // Ignore last character
    for (nCntr = 0; nCntr < nLen; nCntr++)
    {
        // Count the forward slashes
        if(strProjectPath.charAt(nCntr) == "/")
            cSlashes++;
    }
    
    if(cSlashes == 2)
        return true;
    return false;
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function IsReferencesNodeExpanded(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    try
    {
        if (UIItem.Expanded == true)
            return true;
    }
    catch(e)
    {
    }
    
    return false;
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function CollapseReferencesNode(oProj)
{
    UIItem = GetUIReferencesNode(oProj);
    try
    {
        UIItem.Expanded = false;
    }
    catch(e)
    {
    }
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function GetCSharpReferenceManager(oProj)
{
    var VSProject = oProj.Object;
    var refmanager = VSProject.References;
    return refmanager;
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForClass(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForComponent(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForInstaller(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Management");
    refmanager.Add("System.Configuration.Install");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForControl(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.Drawing");
    refmanager.Add("System.Windows.Forms");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWinForm(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.Drawing");
    refmanager.Add("System.Windows.Forms");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWinService(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.ServiceProcess");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWebService(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Data");
    refmanager.Add("System.Web");
    refmanager.Add("System.Web.Services");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWebForm(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Drawing");
    refmanager.Add("System.Data");
    refmanager.Add("System.Web");
    refmanager.Add("System.XML");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
******************************************************************************/
function AddReferencesForWebControl(oProj)
{
    var refmanager = GetCSharpReferenceManager(oProj);
    refmanager.Add("System");
    refmanager.Add("System.Drawing");
    refmanager.Add("System.Web");
    CollapseReferencesNode(oProj);
}

/******************************************************************************
 Description: 
       oProj: Project object
    itemName:
******************************************************************************/
function SetStartupPage(oProj, itemName)
{
    var configs = new Enumerator(oProj.ConfigurationManager);
    for(;!configs.atEnd();configs.moveNext())
    {
        configs.item().Properties("StartPage").Value = itemName;
    }
}

/******************************************************************************
    Description: Adds all the files to the project based on the Templates.inf file.
          oProj: Project object
 strProjectName: Project name
 strProjectPath: Project path
        InfFile: Templates.inf file object
    AddItemFile: Wether the wizard is invoked from the Add Item Dialog or not
******************************************************************************/
function AddFilesToCSharpProject(oProj, strProjectName, strProjectPath, InfFile, AddItemFile)
{
    try
    {
        dte.SuppressUI = false;
        var projItems;
        if(AddItemFile)
            projItems = oProj;
        else
            projItems = oProj.ProjectItems;

        var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");

        var strTpl = "";
        var strName = "";
        var strDependent = "";

        // if( Not a web project )
        if(strProjectPath.charAt(strProjectPath.length - 1) != "\\")
            strProjectPath += "\\"; 

        var strTextStream = InfFile.OpenAsTextStream(1, -2);
        
        while (!strTextStream.AtEndOfStream)
        {
            // Look to see if there is a dependency on another object.  The inf
            // file will show as:
            //
            // MasterObjectFileName;DependentObjectFileName
            strTpl = strTextStream.ReadLine();
            if (strTpl != "")
            {
                var sc = strTpl.indexOf(";");
                if (sc >= 0) 
                {
                    strName = strTpl.substr(0,sc);
                    if(sc < strTpl.length)
                    {
                        strDependent = strTpl.substr(sc+1);
                    }
                    else 
                    {
                        strDependent = "";
                    }
                }
                else
                {
                    strName = strTpl;
                    strDependent = "";
                }

                var strTarget = "";
                var strFile = "";
                strTarget = GetCSharpTargetName(strName, strProjectName);

                var fso;
                fso = new ActiveXObject("Scripting.FileSystemObject");
                var TemporaryFolder = 2;
                var tfolder = fso.GetSpecialFolder(TemporaryFolder);
                var strTempFolder = fso.GetAbsolutePathName(tfolder.Path);

                var strFile = strTempFolder + "\\" + fso.GetTempName();

                var strClassName = strTarget.split(".");
                wizard.AddSymbol("SAFE_CLASS_NAME", strClassName[0]);
                    wizard.AddSymbol("SAFE_ITEM_NAME", strClassName[0]);

                var strTemplate = strTemplatePath + "\\" + strName;
                var bCopyOnly = false;
                var strExt = strName.substr(strName.lastIndexOf("."));
                if(strExt==".bmp" || strExt==".ico" || strExt==".gif" || strExt==".rtf" || strExt==".css")
                    bCopyOnly = true;
                wizard.RenderTemplate(strTemplate, strFile, bCopyOnly, true);

                var projfile = projItems.AddFromTemplate(strFile, strTarget);
                SafeDeleteFile(fso, strFile);
                
                if(projfile)
                {
                    SetFileProperties(projfile, strName);
                    if (strDependent != "") 
                    {
                        // There is a dependent file.  Add this to the projfile we just added
                        var strDependentTarget = GetCSharpTargetName(strDependent, strProjectName);
                        
                        strTemplate = strTemplatePath + "\\" + strDependent;
                        strFile = strTempFolder + "\\" + fso.GetTempName();
                        strExt = strDependent.substr(strDependent.lastIndexOf("."));
                        if(strExt==".bmp" || strExt==".ico" || strExt==".gif" || strExt==".rtf" || strExt==".css")
                            bCopyOnly = true;
                        else
                            bCopyOnly = false;
                        wizard.RenderTemplate(strTemplate, strFile, bCopyOnly, true);
                        
                        var dependentItem = projfile.ProjectItems.AddFromTemplate(strFile, strDependentTarget);
                        SafeDeleteFile(fso, strFile);
                    }
                }

                var bOpen = false;
                if(AddItemFile)
                    bOpen = true;
                else if (DoOpenFile(strTarget))
                    bOpen = true;

                if(bOpen)
                {
                    var window = projfile.Open(vsViewKindPrimary);
                    window.visible = true;
                }
            }
        }
        strTextStream.Close();
    }
    catch(e)
    {
        strTextStream.Close();
        throw e;
    }
}

/******************************************************************************
    Description: Adds a designer file to the project.
          oProj: Project object
 strProjectName: Project name
 strProjectPath: Project path
strDesignerFile: Designer file name
    AddItemFile: Wether the wizard is invoked from the Add Item Dialog or not
******************************************************************************/
function AddDesignerFileToCSharpWebProject(oProj, strProjectName, strProjectPath, strDesignerFile, AddItemFile)
{
    dte.SuppressUI = false;
    var projItems;
    if(AddItemFile)
        projItems = oProj;
    else
        projItems = oProj.ProjectItems;

    var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");

    var strTpl = "";
    var strName = "";

    if (strDesignerFile != "")
    {
        strName = strDesignerFile;
        var strTarget;
        if(!AddItemFile)
        {
            strTarget = GetCSharpTargetName(strName, strProjectName);
        }
        else
        {
            strTarget = wizard.FindSymbol("ITEM_NAME");
        }
        var strClassName = strTarget.split(".");
        wizard.AddSymbol("SAFE_CLASS_NAME", strClassName[0]);
        wizard.AddSymbol("SAFE_ITEM_NAME", strClassName[0]);

        var strTemplate = strTemplatePath + "\\" + strDesignerFile;
        var projfile = projItems.AddFromTemplate(strTemplate, strTarget);
        if(projfile)
            SetFileProperties(projfile, strName);

        var bOpen = false;
        if(AddItemFile)
            bOpen = true;
        else if (DoOpenFile(strTarget))
            bOpen = true;

        if(bOpen)
        {
            var window = projfile.Open(vsViewKindPrimary);
            if(window)
                window.visible = true;
        }
    }
}

/******************************************************************************
 Description: Validate the value of the wizard combo control as a CSharp type.
     oObject: The wizard editable combo control
******************************************************************************/
function ValidateWizComboCSharpType(oObject, strName)
{
    var bValid;
    if(typeof(strName) == "undefined")
        strName = oObject.id;
    if (oObject.ListIndex > -1)
    {
        bValid = true;
    }
    else if(""==oObject.value)
    {
        L_ValidateCSharpTypeEEmpty_Text = " не может быть пустым.";
        window.external.ReportError(strName + L_ValidateCSharpTypeEEmpty_Text);
        bValid = false;
    }
    else if ( !window.external.ValidateCLRIdentifier(oObject.value) )
    {
        L_ValidateCSharpType_E_INVALID_TEXT = "Недопустимый ";
        L_PERIOD_TEXT = ".";
        window.external.ReportError(L_ValidateCSharpType_E_INVALID_TEXT + strName + L_PERIOD_TEXT); 
        bValid = false;
    }
    else
        bValid = true;
    return bValid;
}

/******************************************************************************
 Description: Validate the value of the control as a valid CSharp name.
     oObject: The reference to control
     strName: Control name used by message
******************************************************************************/
function ValidateCSharpName(oObject, strName)
{
    var bValid;
    if(typeof(strName) == "undefined")
        strName = oObject.id;

    if(""==oObject.value)
    {
        L_ValidateCSharpNameEEmpty_Text = " не может быть пустым.";
        window.external.ReportError(strName + L_ValidateCSharpNameEEmpty_Text);
        bValid = false;
    }
    else if ( !window.external.ValidateCLRIdentifier(oObject.value) )
    {
        L_ValidateCSharpName_E_INVALID_TEXT = "Недопустимый ";
        L_PERIOD_TEXT = ".";
        window.external.ReportError(L_ValidateCSharpName_E_INVALID_TEXT + strName + L_PERIOD_TEXT); 
        bValid = false;
    }
    else
        bValid = true;
    return bValid;
}

/******************************************************************************
 Description: Gets the current selected project items from the selection 
                 object if it was passed from Solution Explorer.
     oObject: The wizard context object
******************************************************************************/
function SetTargetFullPath(oObject)
{
    var parent = oObject.Parent;
    var kind = parent.Kind;
    var strFilePath = "";
    var strNameSpace = "";
    if(kind == GUID_ItemType_PhysicalFolder || kind == GUID_ItemType_VirtualFolder)
    {
        strFilePath = parent.FileNames(1);
        strNameSpace = parent.Properties("DefaultNamespace").Value;
    }
    else
    {
        strFilePath =   wizard.FindSymbol("PROJECT_PATH");
        strNameSpace = parent.Properties("RootNamespace").Value;
    }
    wizard.AddSymbol("SAFE_NAMESPACE_NAME",  strNameSpace);
    wizard.AddSymbol("TARGET_FULLPATH",  strFilePath);
}

/******************************************************************************
 Description: Strip spaces from a string
       strin: The string (is in/out param)
******************************************************************************/
function TrimStr(str)
{
    var nLength = str.length;
    var nStartIndex = 0;
    var nEndIndex = nLength-1;

    while (nStartIndex < nLength && (str.charAt(nStartIndex) == ' ' || str.charAt(nStartIndex) == '\t'))
        nStartIndex++;
        
    while (nEndIndex > nStartIndex && (str.charAt(nEndIndex) == ' ' || str.charAt(nEndIndex) == '\t'))
        nEndIndex--;
    
    return str.substring(nStartIndex, nEndIndex+1);
}

/******************************************************************************
 Description: Open the file that contains the TextPoint, then move the cursor to the 
              TextPoint.
         oTP: The reference to TextPoint
******************************************************************************/
function ShowTextPoint(oTP)
{
    try
    {
        oTP.Parent.Parent.ProjectItem.Open(vsViewKindCode).Visible = true;
        var oSel = oTP.Parent.Selection;
        oSel.MoveToPoint(oTP);
        oSel.ActivePoint.TryToShow(vsPaneShowHow.vsPaneShowAsIs);
    }
    catch(e)
    {
        throw(e);
    }
}

/******************************************************************************
 Description: Add the default target schema. 
         
******************************************************************************/
function AddDefaultTargetSchemaToWizard(selProj)
{
    var prjTargetSchema = selProj.Properties("DefaultTargetSchema").Value;
    // 0 = IE3/Nav4
    // 1 = IE5
    // 2 = Nav4
    if(prjTargetSchema == 0)
    {
        wizard.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/ie3-2nav3-0");
    }
    else if( prjTargetSchema == 2)
    {
        wizard.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/nav4-0");
    }
    else
    {
        wizard.AddSymbol("DEFAULT_TARGET_SCHEMA", "http://schemas.microsoft.com/intellisense/ie5");
    }
}

/******************************************************************************
 Description: Delete file using file system object. 
******************************************************************************/
function SafeDeleteFile( fso, strFilespec )
{
    if (fso.FileExists(strFilespec))
    {
        var tmpFile = fso.GetFile(strFilespec);
        tmpFile.Delete();
    }
}

// SIG // Begin signature block
// SIG // MIIoKgYJKoZIhvcNAQcCoIIoGzCCKBcCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // Wl0c478uQu7Iaec0WuKvM5J7xcW73KD9esd9aexBQxyg
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
// SIG // DQEJBDEiBCCRr9zgfXTlIJKOujiurN+OoRwElxeuwAAs
// SIG // GOgPwWXTVjBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBALP/j/o+
// SIG // HKWaEIg1t8FBYVUg+polUn03lPNpauh8se6erOsDJdOG
// SIG // Km/+ZjzkZKS48FJ/3N7ZanCXiHX38EH2ESEULPM7mE8O
// SIG // Y5Ft2nNlMZRSmzUt+X4/r/Cgkrg8Gvlwelw1Y7Ikv29p
// SIG // ZZY6O4B3fDRwmKa0dx9uEfYB6KGKv0QzUe5BdoBsy2z1
// SIG // roD1K2Jp/o5lKD4CqRBxjEUblX/Q7CkgOp4UV0v+kivU
// SIG // I7K33hRucm3Vg8rpHkscLFZOjaSIVkeXgfbnm0cEmxEW
// SIG // glt5LemGvjTI4p28yKkU3iQJfGNAJS6F6Idxf3yaRQb8
// SIG // /cL4sm8xhUVOx+jTeLCQuFVv1zuhgheWMIIXkgYKKwYB
// SIG // BAGCNwMDATGCF4Iwghd+BgkqhkiG9w0BBwKgghdvMIIX
// SIG // awIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgsiQ/60n8SusbtvyNiMiY
// SIG // 2Jl8NXY2rVsZYt7ccfpMN1wCBmWf3XakmxgTMjAyNDAx
// SIG // MTExODU0NDUuNTE2WjAEgAIB9KCB0aSBzjCByzELMAkG
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
// SIG // MQ0GCyqGSIb3DQEJEAEEMC8GCSqGSIb3DQEJBDEiBCDM
// SIG // SojMyjH8fvBejedZqOkK0sYymrs6BJa7Rxozl+v5TDCB
// SIG // +gYLKoZIhvcNAQkQAi8xgeowgecwgeQwgb0EILPpsLqe
// SIG // NS4NuYXE2VJlMuvQeWVA80ZDFhpOPjSzhPa/MIGYMIGA
// SIG // pH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMA
// SIG // AAHPUja+cUvNSMoAAQAAAc8wIgQgvXkYzL5rojNQvXdm
// SIG // 1BjluP18JbyWwTzjGuDInlBasdUwDQYJKoZIhvcNAQEL
// SIG // BQAEggIAX8SevFSxJ0qFFRtRNPwLfJ07cwo8fjeqf+lY
// SIG // AioGVY0tvfrInfB3ERzai5v1hFA7w0JFBQ3/Q221rfjb
// SIG // ev2KN3MbaK/VShJ+9Ylv8dPwIqOeXNNTXMrcKJ+RsK9+
// SIG // cxqmnhtfvCVK2p7vemkSuDHqZxScqte2KZLO9w20BQdU
// SIG // bFliub3puMPMDJWYZV6/xDBLkkTin6qFE6ME+ev5uSqG
// SIG // GIQsCXiPzmfGQpX5t60WiE8kP2MplooVbWwdz5cQhQgn
// SIG // cXGNTjT2DO7nmE0vK+hEQl1Ssc2HpUEorJwMCxanHuel
// SIG // 37mS7lcnapzfQEWcwjVzSM13nfQZ5jFNjGEERicWBSKg
// SIG // fs0CfFwP6gSOM1FtMjjWfUlZuMV2CnfZRn5BSvDXUVyV
// SIG // bckHfovZ3uObz1r8WP5V0p06PG2LpLlSu2qUwAgevYJD
// SIG // okzBzW5Kkkn4SyYV5iCIhIMZktCXyM93RoaXftoP93O9
// SIG // gHKL5gTorZbR42VuIfjVL4RmvU8VPdhtMsYiFc/U511Q
// SIG // FxMOvCDJkbUl7vy82B9WJwdw+Vnj/2Oiw3nPYLKkipmK
// SIG // 8sa864SRokbkkJGrMYxaLsS/kgO1QVD2RocC2mBwity8
// SIG // 6niJP/J4iilC95vCPxAdTEMjQsir9UBojKy4e18xIZdK
// SIG // sg/5y1ELV1of6bcTNXHW29y/YzIgJfU=
// SIG // End signature block
