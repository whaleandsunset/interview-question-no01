import { Component } from '@angular/core';
import { CommentComponent } from './components/comment/comment.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommentComponent],
  template: '<app-comment />'
})
export class App {}
