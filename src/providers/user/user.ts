import {Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class User {
  constructor(public username: string, public token: string) {}
}

let baseUrl = 'http://localhost:5000';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  constructor(private http: Http) {}

  login(username: string, password: string): Promise<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(baseUrl+'/user')
      .toPromise()
      .then(response => new User(username, response.json().token))
      .catch(e => this.handleError(e));
  }

  register(username: string, password: string, email: string): Promise<Boolean> {
     console.log(email+" "+password);
     return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Accept', 'application/json');

        this.http.post(baseUrl+'/user', JSON.stringify({'email': email, 'password': password}), 
          {headers: headers})
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                  reject(err);
                });
     });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
