import {Injectable, ReflectiveInjector} from '@angular/core';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {Storage as IonicStorage} from '@Ionic/storage';
import {UserProvider, User} from './user'
import {EnvironmentVariables} from '../../app/env/env';
import {resolveDep} from '../../../node_modules/@angular/core/src/view/provider';

// Mock class for Ionic's Storage
class MockStorage {
  item = null;

  set(key, value) {
    this.item = [key, value];
  }

  get(key) {
    return this.item[0] == key ? this.item : null;
  }
}

describe('MockBackend UserProvider', () => {

  // construct UserProvider with MockBackend, Env Variables and MockStorage for testing.
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      {provide: EnvironmentVariables, useValue: {apiEndpoint: "api"}},
      Http,
      {provide: IonicStorage, useClass: MockStorage }
    ]);

    // Set mocks
    this.http = this.injector.get(Http);
    this.env = this.injector.get(EnvironmentVariables);
    this.storage = this.injector.get(IonicStorage);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);

    // Class that we want to test
    this.userProvider = new UserProvider(this.http, this.env, this.storage);
  });

  // ensure login calls the correct endpoint.
  it('login() should query current service url', () => {
    this.userProvider.login("test", "password");

    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/user\/token$/, 'url invalid');
  });

  // ensure login constructs User model from token in response.
  it('login() should return a user model and store a token', fakeAsync(() => {
    let result: User;

    // Sets callback on Promise to assign returned user to result.
    this.userProvider.login("test", "password").then((user: User) => result = user);

    // mockRespond prepares a fake response to be sent to the userProvider.
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      status: 201,
      body: JSON.stringify({
          token: "token"
        }),
    })));

    // tick forces Promise to resolve.
    tick();

    // check assertions on result object.
    expect(result.username).toEqual("test", ' username should be test');
    expect(result.token).toEqual("token", ' token should be token');
    expect(this.storage.get("token")).toEqual(["token", "token"]);
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
  it('register() should query current service url', () => {
    this.userProvider.register("test_username", "test_password");

    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/api\/user$/, 'url invalid');
  });


  // ensure register constructs new User.
  it('register() should return true', fakeAsync(() => {
    let result: Boolean;

    this.userProvider.register("name", "password", "email")
      .then((response: Boolean) => result = response);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      status: 201
    })));
    
    tick();

    expect(result).toEqual(true);
  }));

  it('register() should return 409 error', fakeAsync(() => {
    let result: Boolean;
    let caughtError: any;

    this.userProvider.register("name", "password", "email")
      .then((response: Boolean) => {
        console.log('response: ' + response)
        result = response})
      .catch((error: any) => caughtError = error);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      status: 409,
      statusText: 'Conflict',
    })));

    tick();

    expect(result).toBeUndefined();
    expect(caughtError).toBeDefined();
  }));
});

