





var jsondburl = "http://api.login2explore.com:5577";
var jpdbirl = "/api/irl";
var jpdbiml = "/api/iml";
var conntoken = "90938355|-31949272151112523|90951984";
var studentdbname = "SCHOOL-DB";
var studentrelationname = "STUDENT-TABLE";

$("#RollNo").focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getRollNoAsJsonObj(){
    var RollNo = $("#RollNo").val();
    var jsonStr = {
        RollNo: RollNo
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#FullName").val(record.FullName);
    $("#Class").val(record.Class);
    $("#BirthDate").val(record.BirthDate);
    $("#Address").val(record.Address);
    $("#EnrollmentDate").val(record.EnrollmentDate);
}

function resetForm() {
    $("#RollNo").val("");
    $("#FullName").val("");
    $("#Class").val("");
    $("#BirthDate").val();
    $("#Address").val("");
    $("#EnrollmentDate").val("");
    $("#RollNo").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#RollNo").focus();
}

function  validateData() {
    var RollNo, FullName, Class, BirthDate, Address, EnrollmentDate;
    RollNo = $("#RollNo").val();
    FullName = $("#FullName").val();
    Class = $("#Class").val();
    BirthDate = $("#BirthDate").val();
    Address = $("#Address").val();
    EnrollmentDate = $("#EnrollmentDate").val();
     
    if (RollNo === "") {
        alert("Roll number is required");
        $("#RollNo").focus();
        return "";
    }
    if (FullName === "") {
        alert("Full name is required");
        $("#FullName").focus();
        return "";
    }
    if (Class === "") {
        alert("Class is required");
        $("#Class").focus();
        return "";
    }
    if (BirthDate === "") {
        alert("Birth Date is required");
        $("#BirthDate").focus();
        return "";
    }
    if (Address === "") {
        alert("Address is required");
        $("#Address").focus();
        return "";
    }
    if (EnrollmentDate === "") {
        alert("Enrollment Date is required");
        $("#EnrollmentDate").focus();
        return "";
    }
    var jsonStrObj = {
        RollNo: RollNo,
        FullName: FullName,
        Class: Class,
        BirthDate: BirthDate,
        Address: Address,
        EnrollmentDate: EnrollmentDate
    };
    return JSON.stringify(jsonStrObj);
}


function getEmp(){
    var RollNoJsonObj = getRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(conntoken, studentdbname, studentrelationname, RollNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jsondburl, jpdbiml);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400){
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#FullName").focus();
        
    } else if (resJsonObj.status === 200){
        
        $("#RollNo").prop("disabled",true);
        fillData(resJsonObj);
        
        $("#update").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("FullName").focus();
        
    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest(conntoken, jsonStrObj, studentdbname, studentrelationname);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jsondburl, jpdbiml);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#RollNo").focus();
}

function updateData() {
    $("#update").prop("disabled",true);
    jsonupdate = validateData();
    var updateRequest = createUPDATERecordRequest(conntoken, jsonupdate, studentdbname, studentrelationname, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jsondburl, jpdbiml);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#RollNo").focus();
}