import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Base64 } from 'js-base64';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { EnvironmentVariables } from '../../app/env/env';
import { Storage as IonicStorage } from '@ionic/storage';

const TOKEN = 'token';

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
  constructor(public http: Http, @Inject(EnvironmentVariables) public env, @Inject(IonicStorage) public storage: Storage) {}

  login(username: string, password: string): Promise<User> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic '+ Base64.encode(username+":"+password));
    console.log(headers);
    return this.http.get(this.env.apiEndpoint + '/user/token', {headers:headers})
      .toPromise()
      .then(res => {
        if (res.status == 201){
          this.storage.set(TOKEN, res.json().token)
          return new User(username, res.json().token)
        } else {
          return this.handleError({message: 'login failed with code ' + res.status});
        }
      })
      .catch(e => this.handleError(e));
  }

  register(username: string, password: string, email: string): Promise<Boolean> {
    console.log(email+" "+password);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Accept', 'application/json');

    return this.http.post(this.env.apiEndpoint + '/user', JSON.stringify({'email': email, 'password': password}), 
      {headers: headers})
      .toPromise()
      .then(res => {
        return res.status == 201 ? true : this.handleError({message: 'registration failed with code ' + res.status});
      }).catch(err => this.handleError(err));
     
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
