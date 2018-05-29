var _this = this;
import { ReflectiveInjector } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { UserProvider } from './user';
describe('MockBackend UserProvider', function () {
    // construct UserProvider with MockBackend for testing.
    beforeEach(function () {
        _this.injector = ReflectiveInjector.resolveAndCreate([
            { provide: ConnectionBackend, useClass: MockBackend },
            { provide: RequestOptions, useClass: BaseRequestOptions },
            Http,
            UserProvider
        ]);
        _this.userProvider = _this.injector.get(UserProvider);
        _this.backend = _this.injector.get(ConnectionBackend);
        _this.backend.connections.subscribe(function (connection) { return _this.lastConnection = connection; });
    });
    // ensure login calls the correct endpoint.
    it('login() shoud query current service url', function () {
        _this.userProvider.login("test", "password");
        expect(_this.lastConnection).toBeDefined('no http service connection at all?');
        expect(_this.lastConnection.request.url).toMatch(/api\/user\/token$/, 'url invalid');
    });
    // ensure login constructs User model from token in response.
    it('login() should return a user model', fakeAsync(function () {
        var result;
        // Sets callback on Promise to assign returned user to result.
        _this.userProvider.login("test", "password").then(function (user) { return result = user; });
        // mockRespond prepares a fake response to be sent to the userProvider.
        _this.lastConnection.mockRespond(new Response(new ResponseOptions({
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
    it('login() fails with 4XX status', fakeAsync(function () {
        var result;
        var caughtError;
        _this.userProvider.login("test", "wrong-password")
            .then(function (user) { return result = user; })
            .catch(function (error) { return caughtError = error; });
        _this.lastConnection.mockRespond(new Response(new ResponseOptions({
            status: 401,
            statusText: 'Unauthorized',
        })));
        tick();
        expect(result).toBeUndefined();
        expect(caughtError).toBeDefined();
    }));
    // ensure register calls the correct endpoint.
    it('register() shoud query current service url', function () {
        _this.userProvider.register("test_username", "test_password");
        expect(_this.lastConnection).toBeDefined('no http service connection at all?');
        expect(_this.lastConnection.request.url).toMatch(/api\/user$/, 'url invalid');
    });
    // ensure register constructs new User.
    it('register() should return true', fakeAsync(function () {
        var result;
        _this.userProvider.register("name", "password", "email").then(function (response) { return result = response; });
        _this.lastConnection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify({
                id: 1,
                username: "name"
            }),
        })));
        tick();
        expect(result).toEqual(true);
    }));
    it('register() should return 409 error', fakeAsync(function () {
        var result;
        var caughtError;
        _this.userProvider.register("name", "password", "email")
            .then(function (response) { return result = response; })
            .catch(function (error) { return caughtError = error; });
        _this.lastConnection.mockRespond(new Response(new ResponseOptions({
            status: 409,
            statusText: 'Conflict'
        })));
        tick();
        expect(result).toBeUndefined();
        expect(caughtError).toBeDefined();
    }));
});
//# sourceMappingURL=user.spec.js.map