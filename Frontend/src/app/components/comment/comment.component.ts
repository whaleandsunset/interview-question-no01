import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  comments: Comment[] = [];
  newCommentText = '';

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getComments().subscribe({
      next: (comments) => this.comments = comments,
      error: (err) => console.error('Error fetching comments:', err)
    });
  }

  onEnterPress(): void {
    const content = this.newCommentText.trim();

    if (!content) {
      return;
    }

    this.commentService.createComment(content).subscribe({
      next: () => {
        this.newCommentText = '';
        this.loadComments();
      },
      error: (err) => console.error('Error posting comment:', err)
    });
  }
}
