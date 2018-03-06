var _this = this;
import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CommunityResourceProvider } from './community-resource';
describe('MockBackend CommunityResource', function () {
    beforeEach(function () {
        _this.injector = ReflectiveInjector.resolveAndCreate([
            { provide: ConnectionBackend, useClass: MockBackend },
            { provide: RequestOptions, useClass: BaseRequestOptions },
            Http,
            CommunityResourceProvider
        ]);
        _this.communityResourceProvider = _this.injector.get(CommunityResourceProvider);
        _this.backend = _this.injector.get(ConnectionBackend);
        _this.backend.connections.subscribe(function (connection) { return _this.lastConnection = connection; });
    });
});
//# sourceMappingURL=community-resource.spec.js.map