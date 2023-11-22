using EmpPayrollMVCAjaxJQuery.Models.Entity;
using Microsoft.EntityFrameworkCore;

namespace EmpPayrollMVCAjaxJQuery.Models.Context
{
    public class EmployeeDBContext : DbContext
    {
        public EmployeeDBContext(DbContextOptions options) : base(options)
        { }

        public DbSet<EmployeeEntityModel> EmpPayrollAjax { get; set; }
    }
}
