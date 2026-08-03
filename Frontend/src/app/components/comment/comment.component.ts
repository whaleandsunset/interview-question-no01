import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 600px; margin: 30px auto; border: 1px solid #ccc; font-family: sans-serif; border-radius: 4px; overflow: hidden;">
      <div style="background-color:rgb(67, 116, 69); color: white; padding: 10px 15px; font-weight: bold;">
        IT 08-1
      </div>

      <div style="padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="assets/dogs.jpg" alt="" style="max-width: 100%; height: auto; border-radius: 4px;">
        </div>

        <div style="margin-bottom: 20px;">
          <input 
            type="text" 
            style="width: 100%; padding: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;"
            placeholder="Comment..." 
            [(ngModel)]="newCommentText" 
            (keyup.enter)="onEnterPress()">
        </div>

        <div *ngFor="let item of comments" style="margin-bottom: 10px; padding: 10px; background: #f8fafc; border-radius: 4px; border-left: 4px solid #2e7d32;">
          <div style="font-weight: bold; color: #1e293b; font-size: 14px;">{{ item.author }}</div>
          <div style="color: #475569; margin-top: 4px;">{{ item.content }}</div>
        </div>
      </div>
    </div>
  `
})
export class CommentComponent implements OnInit {
  comments: any[] = [];
  newCommentText: string = '';
  apiUrl = 'http://localhost:5255/api/comments';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => this.comments = data,
      error: (err) => console.error('Error fetching comments:', err)
    });
  }

  onEnterPress() {
    if (!this.newCommentText.trim()) return;

    const payload = {
      author: 'Blend 285', 
      content: this.newCommentText
    };

    this.http.post(this.apiUrl, payload).subscribe({
      next: () => {
        this.newCommentText = ''; 
        this.fetchComments();     
      },
      error: (err) => console.error('Error posting comment:', err)
    });
  }
}
