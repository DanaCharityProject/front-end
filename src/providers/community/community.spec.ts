import { ReflectiveInjector } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Connection } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import {CommunityProvider, Community} from './community';

describe('MockBackend Community', () => {
    beforeEach(() => {
        this.injector = ReflectiveInjector.resolveAndCreate([
            {provide: ConnectionBackend, useClass: MockBackend},
            {provide: RequestOptions, useClass: BaseRequestOptions},
            Http,
            CommunityProvider
        ]);

        this.communityProvider = this.injector.get(CommunityProvider);
        this.backend = this.injector.get(Connection) as MockBackend;
        this.backend.connection.subscribe((connection: any) => this.lastConnection = connection);
    });

    // ensure correct endpoint
    it('get_all_communities() should query current service url', () => {
        this.communityProvider.get_all_communities();

        expect(this.lastConnection).toBeDefined('no http service connection');
        expect(this.lastConnection.request.url).toMatch(/api\/community$/, 'url invalid');
    });

    // test returning a couple communities
    it('get_all_communities() should return a list of communities', fakeAsync(() => {
        let result: Community[];

        this.communityProvider.get_all_communities().then((communities: Community[]) => result = communities);

        this.lastConnection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify({data: 
                [new Community(1, "Example Community", [[[[-79.391194827, 43.681081124], [-79.391405432, 43.680969554], [-79.393223778, 43.68016564], [-79.395808832, 43.67897994], [-79.39734939, 43.678274813], [-79.397456054, 43.678225407], [-79.397563898, 43.678167002], [-79.397671319, 43.678117597], [-79.397779545, 43.678068202], [-79.397888536, 43.678014289], [-79.397931367, 43.67799496], [-79.397944053, 43.678026295], [-79.398012159, 43.678203874], [-79.398140901, 43.678530736], [-79.39835151, 43.679039165], [-79.398562968, 43.679554271], [-79.398733166, 43.679962231], [-79.39893948, 43.680460422], [-79.399065448, 43.680766541], [-79.399215419, 43.681127631], [-79.399803535, 43.682543482], [-79.400168894, 43.683415978], [-79.400209291, 43.683526704], [-79.400530362, 43.684309799], [-79.400841057, 43.685027249], [-79.40112639, 43.685716067], [-79.401495486, 43.686640698], [-79.402338541, 43.688721201], [-79.403084698, 43.690632725], [-79.403084595, 43.69068726], [-79.40306224, 43.690739752], [-79.403017635, 43.690782127], [-79.401858246, 43.690989071], [-79.401758471, 43.691018509], [-79.401694884, 43.691039868], [-79.401586377, 43.691075806], [-79.401475066, 43.691059555], [-79.400869288, 43.691197554], [-79.401046406, 43.691647493], [-79.401129155, 43.691756401], [-79.401284819, 43.692098259], [-79.401589348, 43.692923003], [-79.401895134, 43.693727159], [-79.402191292, 43.694575291], [-79.402323138, 43.694891641], [-79.402372873, 43.695111837], [-79.402403564, 43.695494538], [-79.403094469, 43.695349317], [-79.403506916, 43.695259526], [-79.404674309, 43.695019966], [-79.405052346, 43.695978147], [-79.405281498, 43.696553361], [-79.405412512, 43.696951675], [-79.405611741, 43.697479664], [-79.405883211, 43.698180489], [-79.405661289, 43.698018991], [-79.405471175, 43.697963262], [-79.404605213, 43.697686571], [-79.403203304, 43.697269527], [-79.40312408, 43.697261791], [-79.402963269, 43.697149125], [-79.402769041, 43.697126386], [-79.402584239, 43.697074482], [-79.402277968, 43.696997568], [-79.401668084, 43.696834151], [-79.401266766, 43.696730327], [-79.400089966, 43.696390928], [-79.398961414, 43.696096816], [-79.398039911, 43.695845162], [-79.397199651, 43.695652603], [-79.396884534, 43.695603138], [-79.396105325, 43.695658887], [-79.395379674, 43.692273296], [-79.395342183, 43.692098523], [-79.395170311, 43.691261324], [-79.39506256, 43.690784199], [-79.394936396, 43.690199042], [-79.394891382, 43.690000974], [-79.394821305, 43.689735385], [-79.394603411, 43.689217051], [-79.394567687, 43.689132066], [-79.394141978, 43.688083036], [-79.393705219, 43.687133004], [-79.393331962, 43.68623254], [-79.393185671, 43.685881365], [-79.392854227, 43.685025923], [-79.392384472, 43.683940867], [-79.392032918, 43.683101241], [-79.391939056, 43.682874946], [-79.391630762, 43.682148949], [-79.391555118, 43.681973354], [-79.391340234, 43.681431807], [-79.391194827, 43.681081124]]]]), 
                new Community(2, "Another Community", [])]}),
        })));

        tick();

        expect(result.length).toEqual(2, ' should return 2 communities');
        expect(result[0].id).toEqual(1, ' id of community 1 should be 1');
        expect(result[0].name).toEqual("Example Community", ' name of community 1 should be Example Community');
        expect(result[1].id).toEqual(1, ' id of community 2 should be 2');
        expect(result[1].name).toEqual("Another Community", ' name of community 2 should be Example Community');
    }));
})