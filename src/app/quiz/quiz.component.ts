import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../userresponse';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  public quizSource = 'assets/QuizList.json';
  public quizList;
  submitted = false;
  exists = false;
  public ures: UserResponse;
  respList: Array<UserResponse> = [];
  public users;
  score = 0;
  percent = 0;

  constructor(private httpClient: HttpClient, private usersrv: UsersService) {
    this.users = this.usersrv;
  }

  ngOnInit(): void {
    this.httpClient.get(this.quizSource).subscribe((data: UserResponse[]) => {
      this.quizList = data;
    });
  }

  resetForm(form: any) {
    this.submitted = false;
    form.reset();
  }

  hasError(field: any) {
    return (field.invalid && field.touched && field.errors);
  }

  submitForm(form: any) {
    if (form.valid) {
      this.submitted = true;
      this.score = this.calculateResult();
      this.percent = (this.score/15)*100;
      console.log(this.respList);
      console.log(this.score);
    } else {
      this.validationForm(form);
    }
  }

  validationForm(form: any) {
    Object.keys(form.control).forEach(field => {
      const control = form.control[field];
      control.markAsTouched({ onlyself: true });
    });
  }

  addCheckedResponse(qid, uresp) {
      this.ures = new UserResponse();
      this.ures.queryid = qid;
      this.ures.response = uresp;
      for (let x = 0; x < this.quizList.length; x++){
        if (this.ures.queryid === this.quizList[x].queryid){
          this.ures.answer = this.quizList[x].answer;
        }
      }
      this.exists = false;
      this.exists = this.ifAlreadyExists(this.ures);
      if (!this.exists) {
        this.respList.push(this.ures);
      }
    }

   ifAlreadyExists(uobj: UserResponse) {
    for (let i = 0; i < this.respList.length; i++) {
      if (this.respList[i].queryid === uobj.queryid) {
        this.respList[i].response = uobj.response;
        this.exists = true;
        return this.exists;
      }
    }
    }
    calculateResult() {
      for (let i = 0 ; i < this.respList.length; i++) {
        if (this.respList[i].response === this.respList[i].answer) {
        this.score = this.score + 1;
        }
      }
      return this.score;
    }

  }

