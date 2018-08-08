import { ReflectiveInjector } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import {CommunityResourceProvider, CommunityResource} from './community-resource';
import { EnvironmentVariables } from '../../app/env/env';

describe('MockBackend CommunityResource', () => {

  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      {provide: EnvironmentVariables, useValue: {apiEndpoint: "api"}},
      Http,
      CommunityResourceProvider
    ]);

    this.communityResourceProvider = this.injector.get(CommunityResourceProvider, EnvironmentVariables);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  // ensure correct endpoint
  it('get_nearby_communityresource() should query current serice url', fakeAsync(() => {
    this.communityResourceProvider.get_nearby_communityresource(43.6427, -79.3741, 10);

    expect(this.lastConnection).toBeDefined('no http service connection');
    expect(this.lastConnection.request.url).toMatch(/api\/communityresource\?latitude=-79.3741&longitude=43.6427&radius=10$/, 'url invalid');
  }));

  // test returning an empty list of resources
  it('get_nearby_communityresource() should return an empty list with no resources', fakeAsync(() => {
    var result: CommunityResource[];

    this.communityResourceProvider.get_nearby_communityresource(43.6427, -79.3741, 10).then((communityresources: CommunityResource[]) => result = communityresources);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify([]),
    })));

    tick();

    expect(result.length).toEqual(0, ' no resources should be returned');
  }));

  // test returning a list of resources
  it('get_nearby_communityresource() should return a list of resources within radius', fakeAsync(() => {
    let result: CommunityResource[];

    this.communityResourceProvider.get_nearby_communityresource(43.6427, -79.3741, 10).then((communityresources: CommunityResource[]) => result = communityresources);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify([new CommunityResource(1, "An Example Charity", "123", [43.70273,
        -79.3977]), new CommunityResource(2, "Another Example Charity", "123",  [43.70273,
          -79.3977])]),
    })));

    tick();

    expect(result.length).toEqual(2, ' should return 2 resources');
    expect(result[0].community_resource_id).toEqual(1, ' id of res1 should be 1');
    expect(result[0].name).toEqual("An Example Charity", ' name of res1 should be An Example Charity');
    expect(result[1].community_resource_id).toEqual(2, ' id of res2 should be 2');
    expect(result[1].name).toEqual("Another Example Charity", ' name of res2 should be Another Example Charity');
  }));

  it('get_communityresources_in_shape() should return a list of resources within the shape', fakeAsync(() => {
    let result: CommunityResource[];

    this.communityResourceProvider.get_communityresources_in_shape("43.660160 -79.398425,43.660360 -79.395625,43.658218 -79.395417,43.658514 -79.398372,43.660160 -79.398425").then((communityresources: CommunityResource[]) => result = communityresources);

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify([new CommunityResource(1, "An Example Charity", "123", [43.659752,
        -79.397678]), new CommunityResource(2, "Another Example Charity", "123",  [43.658849,
          -79.397205])]),
    })));

    tick();

    expect(result.length).toEqual(2, ' should return 2 resources');
    expect(result[0].community_resource_id).toEqual(1, ' id of res1 should be 1');
    expect(result[0].name).toEqual("An Example Charity", ' name of res1 should be An Example Charity');
    expect(result[1].community_resource_id).toEqual(2, ' id of res2 should be 2');
    expect(result[1].name).toEqual("Another Example Charity", ' name of res2 should be Another Example Charity');
  }));

})