namespace Com.Example.Interview.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Author { get; set; } = "Blend 285";
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}