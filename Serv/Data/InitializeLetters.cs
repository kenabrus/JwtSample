using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Serv.Models;

namespace Serv.Data
{
    public static class InitializeLetters
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
            /*  Letters */

            if (_context.Letters.Any())
            {
                Console.WriteLine("InitializeLetters => letters exists in DB");
                return;
            }
                Console.WriteLine("Creating new letters");
                var letterList = new List<Letter>()
                {
                    new Letter(){Character="A", Description="Jakis tam opis elementu", ImagePath="../../assets/img_2.jpg"},
                    new Letter(){Character="B", Description="Jakis tam opis elementu", ImagePath="../../assets/img_3.jpg"},
                    new Letter(){Character="C", Description="Jakis tam opis elementu", ImagePath="../../assets/img_4.jpg"},
                    new Letter(){Character="D", Description="Jakis tam opis elementu", ImagePath="../../assets/img_5.jpg"},
                    new Letter(){Character="E", Description="Jakis tam opis elementu", ImagePath="../../assets/img_6.jpg"},
                    new Letter(){Character="F", Description="Jakis tam opis elementu", ImagePath="../../assets/img_7.jpg"},
                    new Letter(){Character="G", Description="Jakis tam opis elementu", ImagePath="../../assets/img_8.jpg"},
                    new Letter(){Character="H", Description="Jakis tam opis elementu", ImagePath="../../assets/img_9.jpg"}
                };
                
                foreach(Letter letter in letterList)
                {
                    _context.Letters.Add(letter);
                }
            
                int code = await _context.SaveChangesAsync();
        }
    }
}