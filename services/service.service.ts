import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../src/app/component/form/form.component';
import { throwError } from 'rxjs';
import { FormComponent } from '../src/app/component/form/form.component';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private urlLocal = 'http://localhost:8080/users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
};
  constructor(private http:HttpClient) { }
  getUsers():Observable<FormComponent>{
    return this.http.get<FormComponent>(this.urlLocal);
  }
  createUsers(form:FormComponent):Observable<FormComponent>{
    let url:string = 'http://localhost:8080/user';
    return this.http.post<FormComponent>(url,JSON.stringify(form),this.httpOptions).pipe(
      catchError((err) => {
        console.log('Hay un error')
        console.error(err);
        return throwError(err);
      })
    )
  }
}
