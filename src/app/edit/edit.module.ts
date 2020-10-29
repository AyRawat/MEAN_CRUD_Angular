import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditComponent} from './edit.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes:Routes=[
  {
    path: '',
    component: EditComponent,
  }
]
@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditModule { }
