import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { ReviewComponent } from './review/review.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { UsersService } from './users.service';

const routes: Routes = [
   {path: 'quiz', component: QuizComponent},
   {path: 'review', component: ReviewComponent},
   {path: '', redirectTo: 'quiz', pathMatch: 'full'},
   {path: '**', component: QuizComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
