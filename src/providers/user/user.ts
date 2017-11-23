import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

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

  constructor(private http: Http) {}

  login(username: string, password: string): Promise<User> {
    return this.http.get("api/user/token")
      .toPromise()
      .then(response => new User(username, response.json().token))
      .catch(e => this.handleError(e));
  }

  register(username: string, password: string, email: string): Promise<Boolean> {
    return this.http.post("api/user", JSON.stringify({username: username, password: password, email: email}))
        .toPromise()
        .then(response => true) 
        .catch(e => this.handleError(e));
  }

  editInfo(username: string, password: string, passwordRE: string): Promise<Boolean> {
    return this.http.put("api/user/info", JSON.stringify({username: username}))
        .toPromise()
        .then(response => true)
        .catch(e => this.handleError(e));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
