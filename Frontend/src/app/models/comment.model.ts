export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

export interface CreateCommentRequest {
  content: string;
}
