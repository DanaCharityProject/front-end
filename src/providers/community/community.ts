import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { EnvironmentVariables } from '../../app/env/env';

export class Community {
    constructor(public id: number, public name: string, public boundaries: Array<Object>) {}
}

let baseUrl = 'http://localhost:5000';

@Injectable()
export class CommunityProvider {

    constructor(public http: Http, @Inject(EnvironmentVariables) public env) {}

    get_all_communities(): Promise<Community[]> {
        return this.http.get(this.env.apiEndpoint + "/community", {
        })
        .toPromise()
        .then(response =>
            response.json().map(community =>
                new Community(
                    community.id,
                    community.name,
                    community.boundaries)))
        .catch(e => this.handleError(e));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}