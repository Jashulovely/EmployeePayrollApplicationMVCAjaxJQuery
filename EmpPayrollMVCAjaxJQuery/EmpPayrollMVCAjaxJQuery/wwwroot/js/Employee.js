
$(document).ready(function () {
    ShowEmployeeData();
});


function ShowEmployeeData() {
    debugger
    $.ajax({
        url: '/Employee/EmployeesList',
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result,status,xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.empId + '</td>';
                object += '<td>' + item.empName + '</td>';
                object += '<td>' + item.profileImage + '</td>';
                object += '<td>' + item.gender + '</td>';
                object += '<td>' + item.department + '</td>';
                object += '<td>' + item.salary + '</td>';
                object += '<td>' + item.startDate + '</td>';
                object += '<td>' + item.notes + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.empId +')"> Edit</a>||<a href="#" class="btn btn-danger" onclick="DeleteEmp(' + item.empId+')" > Delete</a >|| <a href="#" class="btn btn-success">Details</a></td > ';
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't get");
        }
    });
};


$('#btnAddEmployee').click(function () {
    $('#EmployeeModal').modal('show');
    $('#EmpId1').hide();
    $('#AddEmpHead').show();
    $('#UpdateEmpHead').hide();
})

function AddEmployee() {
    debugger
    var objData = {
        EmpName: $('#EmpName').val(),
        ProfileImage: $('#ProfileImage').val(),
        Gender: $('#Gender').val(),
        Department: $('#Department').val(),
        Salary: $('#Salary').val(),
        StartDate: $('#StartDate').val(),
        Notes: $('#Notes').val()
    }
    $.ajax({
        url: '/Employee/AddEmployee',
        type: 'Post',
        data: objData,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        success: function () {
            alert('Data Saved');
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert('Data cannot Saved');
        }
    });
}

function HideModalPopUp() {
    $('#EmployeeModal').modal('hide');
}

function ClearTextBox() {
    $('#EmpName').val('');
    $('#ProfileImage').val('');
    $('#Gender').val('');
    $('#Department').val('');
    $('#Salary').val('');
    $('#StartDate').val('');
    $('#Notes').val('');
}

function DeleteEmp(id) {
    debugger;
    if (confirm('Are you sure you want to delete')) {

        $.ajax({
            url: '/Employee/DeleteEmp?id=' + id,
            success: function () {
                alert("record deleted");
                ShowEmployeeData();
            },
            error: function () {
                alert("data cant delete");
            }
        })
    }
}

function Edit(id) {
    debugger
    $.ajax({
        url: '/Employee/EditEmp?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#AddEmpHead').hide();
            $('#UpdateEmpHead').show();
            $('#btnAddEmp').hide();
            $('#updateBtn').show()
            $('#EmployeeModal').modal('show');
            $('#EmpId').val(response.empId);
            $('#EmpName').val(response.empName);
            $('#ProfileImage').val(response.profileImage);
            $('#Gender').val(response.gender);
            $('#Department').val(response.department);
            $('#Salary').val(response.salary);
            $('#StartDate').val(response.startDate);
            $('#Notes').val(response.notes);
            //$('#saveButton').css('display', 'none');
            //$('#updateButton').css('display','block');
        },
        error: function () {
            alert("data not found");
        }
    })
}


function updateEmployee() {
    debugger
    var EmpData = {
        EmpId: $('#EmpId').val(),
        EmpName: $('#EmpName').val(),
        ProfileImage: $('#ProfileImage').val(),
        Gender: $('#Gender').val(),
        Department: $('#Department').val(),
        Salary: $('#Salary').val(),
        StartDate: $('#StartDate').val(),
        Notes: $('#Notes').val()
    }
    $.ajax({
        url: '/Employee/UpdateEmployee',
        type: 'post',
        data: EmpData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert("data updated!!");
            ClearTextBox();
            HideModalPopUp();
            ShowEmployeeData();
        },
        error: function () {
            alert("data not saved");
        }
    })
}

