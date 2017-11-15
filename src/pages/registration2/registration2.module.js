var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Registration2Page } from './registration2';
var Registration2PageModule = /** @class */ (function () {
    function Registration2PageModule() {
    }
    Registration2PageModule = __decorate([
        NgModule({
            declarations: [
                Registration2Page,
            ],
            imports: [
                IonicPageModule.forChild(Registration2Page),
            ],
        })
    ], Registration2PageModule);
    return Registration2PageModule;
}());
export { Registration2PageModule };
//# sourceMappingURL=registration2.module.js.map