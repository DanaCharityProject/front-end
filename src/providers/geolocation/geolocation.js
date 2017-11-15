var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GeolocationProvider = /** @class */ (function () {
    function GeolocationProvider(geolocation) {
        this.geolocation = geolocation;
        console.log('Hello GeolocationProvider Provider');
    }
    GeolocationProvider.prototype.getUserLocation = function () {
        return this.geolocation.getCurrentPosition();
    };
    GeolocationProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Geolocation])
    ], GeolocationProvider);
    return GeolocationProvider;
}());
export { GeolocationProvider };
//# sourceMappingURL=geolocation.js.map