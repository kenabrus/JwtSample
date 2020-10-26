using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Serv.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public long Id {get;set;}
        public string Login { get; set; }
        public string Password { get; set; }
        public string Type { get; set; }
    }
}