var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationPg2Page } from './registration-pg2';
var RegistrationPg2PageModule = /** @class */ (function () {
    function RegistrationPg2PageModule() {
    }
    RegistrationPg2PageModule = __decorate([
        NgModule({
            declarations: [
                RegistrationPg2Page,
            ],
            imports: [
                IonicPageModule.forChild(RegistrationPg2Page),
            ],
        })
    ], RegistrationPg2PageModule);
    return RegistrationPg2PageModule;
}());
export { RegistrationPg2PageModule };
//# sourceMappingURL=registration-pg2.module.js.map