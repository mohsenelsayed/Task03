"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var Member = /** @class */ (function () {
    function Member(name, email, mobile, committee) {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.committee = committee;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Member.prototype, "id");
    __decorate([
        typeorm_1.Column('text')
    ], Member.prototype, "name");
    __decorate([
        typeorm_1.Column('text')
    ], Member.prototype, "email");
    __decorate([
        typeorm_1.Column('text')
    ], Member.prototype, "mobile");
    __decorate([
        typeorm_1.Column('text')
    ], Member.prototype, "committee");
    Member = __decorate([
        typeorm_1.Entity()
    ], Member);
    return Member;
}());
exports.Member = Member;
