import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public queryid: string;
public response: string;

  constructor(private httpClient: HttpClient) { }
}
