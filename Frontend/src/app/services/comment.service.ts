import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, CreateCommentRequest } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private readonly apiUrl = 'http://localhost:5255/api/comments';

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl);
  }

  createComment(content: string): Observable<Comment> {
    const request: CreateCommentRequest = { content };

    return this.http.post<Comment>(this.apiUrl, request);
  }
}
