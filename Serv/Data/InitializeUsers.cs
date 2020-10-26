using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Serv.Models;

namespace Serv.Data
{
    public static class InitializeUsers
    {
        public static async Task InitializeAsync(IServiceProvider service)
        {
            using (var serviceScope = service.CreateScope())
            {
                var scopeServiceProvider = serviceScope.ServiceProvider;
                var context = scopeServiceProvider.GetService<ApplicationDbContext>();
                await InsertTestData(context);
            }
        }

        private static async Task InsertTestData(ApplicationDbContext _context)
        {
            /*  USERS */

            if (_context.Users.Any())
            {
                Console.WriteLine("InitializeUsers => users exists in DB");
                return;
            }
                Console.WriteLine("Creating new users");
                var admin = new User(){Login="admin", Password="admin", Type="admin"};
                var user = new User(){Login="user", Password="user", Type="casual"};
                await _context.Users.AddAsync(admin);
                await _context.Users.AddAsync(user);
                int code = _context.SaveChanges();

        }
    }
}