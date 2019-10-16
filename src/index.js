"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var member_1 = require("./entity/member");
var express = require("express");
var members;
function memberExists(memberID) {
    var exists = false;
    members.forEach(function (member) {
        if (member.id == memberID) {
            exists = true;
        }
    });
    return exists;
}
typeorm_1.createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "admin",
    password: "admin",
    database: "task03",
    entities: [
        member_1.Member
    ],
    synchronize: true,
    logging: false
}).then(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        app = express();
        app.get('/members', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.manager.find(member_1.Member)];
                    case 1:
                        members = _a.sent();
                        res.status(200).send(members);
                        return [2 /*return*/];
                }
            });
        }); });
        app.get('/members/member/:ID', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var targetMember;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!memberExists(req.params.ID)) return [3 /*break*/, 2];
                        return [4 /*yield*/, connection.getRepository(member_1.Member)];
                    case 1:
                        members = _a.sent();
                        targetMember = members[req.params.ID - 1];
                        res.status(200).send(targetMember);
                        return [3 /*break*/, 3];
                    case 2:
                        res.status(400).send("Wrong member ID!");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        app.use(express.json());
        app.post('/members/new', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var body, newMember;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.getRepository(member_1.Member)];
                    case 1:
                        members = _a.sent();
                        body = req.body;
                        newMember = new member_1.Member(body.name, body.email, body.mobile, body.committee);
                        connection.manager.save(newMember);
                        res.status(200).send("Member added successfully!");
                        return [2 /*return*/];
                }
            });
        }); });
        app.patch('/members/modify', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var targetID, targetMember;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.getRepository(member_1.Member)];
                    case 1:
                        members = _a.sent();
                        targetID = req.body.id;
                        return [4 /*yield*/, members.findOne(targetID)];
                    case 2:
                        targetMember = _a.sent();
                        if (req.body.name !== undefined) {
                            targetMember.name = req.body.name;
                        }
                        if (req.body.email !== undefined) {
                            targetMember.email = req.body.email;
                        }
                        if (req.body.mobile !== undefined) {
                            targetMember.mobile = req.body.mobile;
                        }
                        if (req.body.committee !== undefined) {
                            targetMember.committee = req.body.committee;
                        }
                        members.save(targetMember);
                        res.status(200).send("Member Updated successfully!");
                        return [2 /*return*/];
                }
            });
        }); });
        app["delete"]("/members/delete", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var targetMember;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.getRepository(member_1.Member)];
                    case 1:
                        members = _a.sent();
                        if (!members.findOne(req.body.id)) return [3 /*break*/, 3];
                        return [4 /*yield*/, members.findOne(req.body.id)];
                    case 2:
                        targetMember = _a.sent();
                        members.remove(targetMember);
                        res.status(200).send("Member Deleted successfully!");
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(400).send("This member doesn't exist!");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        app.listen(4444);
        return [2 /*return*/];
    });
}); })["catch"](function (error) { return console.log(error); });
