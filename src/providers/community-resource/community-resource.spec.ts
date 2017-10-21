import {Injectable, ReflectiveInjector} from '@angular/core';
import {async, fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import {CommunityResourceProvider, CommunityResource} from './community-resource';

describe('MockBackend CommunityResource', () => {

  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      CommunityResourceProvider
    ]);

    this.communityResourceProvider = this.injector.get(CommunityResourceProvider);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  // ensure correct endpoint
  it('get_nearby_communityresource() should query current serice url', () => {
    this.communityResourceProvider.get_nearby_communityresource(43.6427, -79.3741, 10);

    expect(this.lastConnection).toBeDefined('no http service connection');
    expect(this.lastConnection.request.url).toMatch(/api\/communityresource\/radius$/, 'url invalid');
  });

  // test returning an empty list of resources
  it('get_nearby_communityresource() should return an empty list with no resources', fakeAsync(() => {
    var result: CommunityResource[];

    this.communityResourceProvider.get_nearby_communityresource(43.6427, -79.3741, 10).then((communityresources: CommunityResource[]) => result = communityresources);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({data: []}),
    })));

    tick();

    expect(result).toBeDefined('should be non-null');
    expect(result.length).toEqual(0, ' no resources should be returned');
  }));

  // test returning a list of resources
  it('get_nearby_communityresource() should return a list of resources within radius', fakeAsync(() => {
    let result: CommunityResource[];

    this.communityResourceProvider.get_nearby_communityresource(43.6427, -79.3741, 10).then((communityresources: CommunityResource[]) => result = communityresources);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({data: [new CommunityResource(1, "An Example Charity"), new CommunityResource(2, "Another Example Charity")]}),
    })));

    tick();

    expect(result.length).toEqual(2, ' should return 2 resources');
    expect(result[0].id).toEqual(1, ' id of res1 should be 1');
    expect(result[0].name).toEqual("An Example Charity", ' name of res1 should be An Example Charity');
    expect(result[1].id).toEqual(2, ' id of res2 should be 2');
    expect(result[1].name).toEqual("Another Example Charity", ' name of res2 should be Another Example Charity');
  }));

})