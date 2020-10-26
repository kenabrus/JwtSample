using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Serv.Models
{
	public class Letter
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
		public int Id { get; set; }
		public String Character { get; set; }
		public String Description { get; set; }
		public String ImagePath { get; set; }
	}
}