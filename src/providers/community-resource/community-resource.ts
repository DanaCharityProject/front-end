import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { EnvironmentVariables } from '../../app/env/env';

export class CommunityResource {
  constructor(public community_resource_id: number, public name: string, public address: string, public location: Array<number>) {}
}

let baseUrl = 'http://localhost:5000';

/*
  Generated class for the CommunityResourceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommunityResourceProvider {

  constructor(public http: Http, @Inject(EnvironmentVariables) public env) {}

  get_nearby_communityresource(longitude: number, latitude: number, radius: number): Promise<CommunityResource[]> {
    return this.http.get(this.env.apiEndpoint + "/communityresource", {
      params: {
        "latitude": latitude,
        "longitude": longitude,
        "radius": radius
      }
    })
    .toPromise()
    .then(response =>
      response.json().map(communityResource =>
        new CommunityResource(
          communityResource.community_resource_id,
          communityResource.name,
          communityResource.address,
          communityResource.location.coordinates)))
    .catch(e => this.handleError(e));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
