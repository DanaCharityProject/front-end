import {Injectable, ReflectiveInjector} from '@angular/core';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import {UserProvider, User} from './user'

describe('MockBackend UserProvider', () => {

  // construct UserProvider with MockBackend for testing.
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      UserProvider
    ]);

    this.userProvider = this.injector.get(UserProvider);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  // ensure login calls the correct endpoint.
  it('login() shoud query current service url', () => {
    this.userProvider.login("test", "password");

    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/user\/token$/, 'url invalid');
  });

  // ensure login constructs User model from token in response.
  it('login() should return a user model', fakeAsync(() => {
    let result: User;

    // Sets callback on Promise to assign returned user to result.
    this.userProvider.login("test", "password").then((user: User) => result = user);

    // mockRespond prepares a fake response to be sent to the userProvider.
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({
          token: "token"
        }),
    })));

    // tick forces Promise to resolve.
    tick();

    // check assertions on result object.
    expect(result.username).toEqual("test", ' username should be test');
    expect(result.token).toEqual("token", ' token should be token');
  }));

  // ensure login fails on 4XX status code. 
  it('login() fails with 4XX status', fakeAsync(() => {
    let result: User;
    let caughtError: any;

    this.userProvider.login("test", "wrong-password")
        .then((user: User) => result = user)
        .catch((error: any) => caughtError = error);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      status: 401,
      statusText: 'Unauthorized',
    })));

    tick();

    expect(result).toBeUndefined();
    expect(caughtError).toBeDefined();
  }));


  // ensure register calls the correct endpoint.
  it('register() shoud query current service url', () => {
    this.userProvider.register("test_username", "test_password");

    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/user$/, 'url invalid');
  });


  // ensure register constructs new User.
  it('register() should return true', fakeAsync(() => {
    let result: Boolean;

    this.userProvider.register("name", "password", "email").then((response: Boolean) => result = response);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({
          id: 1,
          username: "name"
        }),
    })));

    tick();

    expect(result).toEqual(true);
  }));


  // ensure register fails with incorrect input.
  it('register() should return an error', fakeAsync(() => {
    let result: Boolean;

    this.userProvider.register("name", "password", "email").then((response: Boolean) => result = response);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({
          id: 1,
          username: "name"
        }),
    })));

    tick();

    expect(result).toEqual(true);
  }));
});
