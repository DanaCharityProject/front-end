import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class CommunityResource {
  constructor(public id: number, public name: string) {}
}

/*
  Generated class for the CommunityResourceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommunityResourceProvider {

  constructor(public http: Http) {}

  get_nearby_communityresource(lon: number, lat: number, rad: number): Promise<CommunityResource[]> {
    return this.http.get("api/communityresource/radius")
    .toPromise()
    .then(response => response.json().data)
    .catch(e => this.handleError(e));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
