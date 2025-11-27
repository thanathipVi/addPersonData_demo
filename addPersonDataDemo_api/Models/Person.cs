using System;
using System.ComponentModel.DataAnnotations;

namespace PersonApi.Models
{
    public class Person
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = "";

        public DateTime BirthDate { get; set; }

        public int Age { get; set; }
    }
}
