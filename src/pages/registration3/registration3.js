var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the Registration3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Registration3Page = /** @class */ (function () {
    function Registration3Page(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formIn = {
            firstname: '',
            lastname: '',
            email: '',
            postal: '',
            password: ''
        };
    }
    Registration3Page_1 = Registration3Page;
    Registration3Page.prototype.ionViewDidLoad = function () {
        var first = this.navParams.get('firstname');
        var last = this.navParams.get('lastname');
        var email = this.navParams.get('email');
        var postal = this.navParams.get('postal');
        this.formIn.firstname = first;
        this.formIn.lastname = last;
        this.formIn.email = email;
        this.formIn.postal = postal;
    };
    Registration3Page.prototype.saveInfo = function () {
        this.navCtrl.push(Registration3Page_1, this.formIn);
    };
    Registration3Page = Registration3Page_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-registration3',
            templateUrl: 'registration3.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], Registration3Page);
    return Registration3Page;
    var Registration3Page_1;
}());
export { Registration3Page };
//# sourceMappingURL=registration3.js.map