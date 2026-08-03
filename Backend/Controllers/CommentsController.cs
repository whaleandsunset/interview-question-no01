using Com.Example.Interview.Data;
using Com.Example.Interview.Dtos;
using Com.Example.Interview.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Com.Example.Interview.Controllers;

[ApiController]
[Route("api/comments")]
public sealed class CommentsController(ApplicationDbContext context) : ControllerBase
{
    private const string DefaultAuthor = "Blend 285";

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Comment>>> GetComments(CancellationToken cancellationToken)
    {
        var comments = await context.Comments
            .OrderByDescending(comment => comment.CreatedAt)
            .ToListAsync(cancellationToken);

        return comments;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Comment>> GetComment(int id, CancellationToken cancellationToken)
    {
        var comment = await context.Comments.FindAsync([id], cancellationToken);

        return comment is null ? NotFound() : comment;
    }

    [HttpPost]
    public async Task<ActionResult<Comment>> CreateComment(CreateCommentRequest request, CancellationToken cancellationToken)
    {
        var content = request.Content.Trim();

        if (string.IsNullOrWhiteSpace(content))
        {
            return BadRequest();
        }

        var comment = new Comment
        {
            Author = DefaultAuthor,
            Content = content
        };

        context.Comments.Add(comment);
        await context.SaveChangesAsync(cancellationToken);

        return CreatedAtAction(nameof(GetComment), new { id = comment.Id }, comment);
    }
}
