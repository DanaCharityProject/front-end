import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Base64 } from 'js-base64';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { EnvironmentVariables } from '../../app/env/env';

export class User {
  constructor(public username: string, public token: string) {}
}

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  constructor(public http: Http, @Inject(EnvironmentVariables) public env) {}

  login(username: string, password: string): Promise<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic '+ Base64.encode(username+":"+password));
    console.log(headers);
    return this.http.get(this.env.apiEndpoint + '/user/token', {headers:headers})
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

        this.http.post(this.env.apiEndpoint + '/user', JSON.stringify({'email': email, 'password': password}), 
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
