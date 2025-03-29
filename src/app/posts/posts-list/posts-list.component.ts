import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.store';
import { Observable } from 'rxjs';
import { Post } from '../../models/state/posts.model';
import { getPosts } from '../state/posts.selectors';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { deletePost } from '../state/posts.action';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent {

  posts!: Observable<Post[]>;
  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
  }

  onDeletePost(id: string) {
    if (confirm("Are sure want to delete the post?")) {
      this.store.dispatch(deletePost({ id: id }));
    }
  }

}
