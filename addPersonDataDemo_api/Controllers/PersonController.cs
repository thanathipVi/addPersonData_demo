using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonApi.Data;
using PersonApi.Models;

namespace PersonApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly AppDbContext _db;
        public PersonController(AppDbContext db) { _db = db; }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _db.Persons.OrderBy(p => p.Id).ToListAsync();
            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Person person)
        {
            if (person == null) return BadRequest();
            person.Age = CalculateAge(person.BirthDate);
            _db.Persons.Add(person);
            await _db.SaveChangesAsync();
            return Ok(person);
        }

        private int CalculateAge(DateTime birth)
        {
            var today = DateTime.Today;
            var age = today.Year - birth.Year;
            if (birth.Date > today.AddYears(-age)) age--;
            return age;
        }
    }
}
