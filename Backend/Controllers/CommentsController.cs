using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Com.Example.Interview.Data;
using Com.Example.Interview.Models;

namespace Com.Example.Interview.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CommentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.OrderByDescending(c => c.CreatedAt).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {
            comment.Author = "Blend 285"; 
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetComments), new { id = comment.Id }, comment);
        }
    }
}