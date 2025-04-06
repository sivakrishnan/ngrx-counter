import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../models/state/posts.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.store';
import { addPost } from '../state/posts.action';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  postForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    })
  }

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }
    const post: Post = {
      id: Math.floor(Math.random() * 1000).toString(),
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    }

    this.store.dispatch(addPost({ post }));
  }

  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');

    if (descriptionForm?.touched && !descriptionForm?.valid) {
      if (descriptionForm?.errors?.['required']) {
        return 'Description is Required';
      }

      if (descriptionForm?.errors?.['minlength']) {
        return 'Description should be of minimum 10 characters length';
      }
    }
    return '';
  }
}
