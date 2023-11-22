using EmpPayrollMVCAjaxJQuery.Models;
using EmpPayrollMVCAjaxJQuery.Models.Context;
using EmpPayrollMVCAjaxJQuery.Models.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace EmpPayrollMVCAjaxJQuery.Controllers.Ajax
{
    public class EmployeeController : Controller
    {
        private readonly EmployeeDBContext context;
        public EmployeeController(EmployeeDBContext context)
        {
            this.context = context;
        }
        

        //[HttpGet]
        public IActionResult EmployeesDetails()
        {
            return View();
        }

        [HttpGet]
        public JsonResult EmployeesList()
        {
            var data = context.EmpPayrollAjax.ToList();
            return new JsonResult(data);
        }


        [HttpPost]
        public JsonResult AddEmployee(EmployeeEntityModel employee)
        {
            var emp = new EmployeeEntityModel
            {
                EmpName = employee.EmpName,
                ProfileImage = employee.ProfileImage,
                Gender = employee.Gender,
                Department = employee.Department,
                Salary = employee.Salary,
                StartDate = employee.StartDate,
                Notes = employee.Notes
            };
            context.EmpPayrollAjax.Add(emp);
            context.SaveChanges();
            return new JsonResult("Data is Svaed");
        }


        public JsonResult DeleteEmp(int id)
        {
            var result = context.EmpPayrollAjax.Where(x => x.EmpId == id).SingleOrDefault();
            context.Remove(result);
            context.SaveChanges();
            return new JsonResult("data deleted");

        }
        public JsonResult EditEmp(int id)
        {
            var result = context.EmpPayrollAjax.Where(x => x.EmpId == id).SingleOrDefault();
            return new JsonResult(result);
        }

        public JsonResult UpdateEmployee(EmployeeEntityModel model)
        {
            context.EmpPayrollAjax.Update(model);
            context.SaveChanges();
            return new JsonResult("record updated");
        }
    }
}
