import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { NoteToStarsPipe } from './pipes/note-to-stars.pipe';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [NoteToStarsPipe],
  imports: [
    CommonModule,
    HttpClientModule,

  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    NoteToStarsPipe,
  ]
})
export class SharedModule { }
