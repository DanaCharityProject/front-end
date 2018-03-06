var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
var User = /** @class */ (function () {
    function User(username, token) {
        this.username = username;
        this.token = token;
    }
    return User;
}());
export { User };
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UserProvider = /** @class */ (function () {
    function UserProvider(http) {
        this.http = http;
    }
    UserProvider.prototype.login = function (username, password) {
        var _this = this;
        return this.http.get("api/user/token")
            .toPromise()
            .then(function (response) { return new User(username, response.json().token); })
            .catch(function (e) { return _this.handleError(e); });
    };
    UserProvider.prototype.register = function (username, password, email) {
        var _this = this;
        return this.http.post("api/user", JSON.stringify({ username: username, password: password, email: email }))
            .toPromise()
            .then(function (response) { return response.json().username == username; })
            .catch(function (e) { return _this.handleError(e); });
    };
    UserProvider.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    UserProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], UserProvider);
    return UserProvider;
}());
export { UserProvider };
//# sourceMappingURL=user.js.map