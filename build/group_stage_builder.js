"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.get3rdPlaceTable = exports.getGroupApi = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var fs = __importStar(require("fs"));
var getGroupApi = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var apiToken, url, response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiToken = process.env.API_TOKEN;
                url = "https://soccer.sportmonks.com/api/v2.0/standings/season/live/15733?api_token=" + apiToken + "&group_id=" + id;
                return [4 /*yield*/, node_fetch_1["default"](url)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data.data];
        }
    });
}); };
exports.getGroupApi = getGroupApi;
var getGS = function () { return __awaiter(void 0, void 0, void 0, function () {
    var gs;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {};
                return [4 /*yield*/, exports.getGroupApi(225400)];
            case 1:
                _a.a = _b.sent();
                return [4 /*yield*/, exports.getGroupApi(225401)];
            case 2:
                _a.b = _b.sent();
                return [4 /*yield*/, exports.getGroupApi(225402)];
            case 3:
                _a.c = _b.sent();
                return [4 /*yield*/, exports.getGroupApi(225403)];
            case 4:
                _a.d = _b.sent();
                return [4 /*yield*/, exports.getGroupApi(225404)];
            case 5:
                _a.e = _b.sent();
                return [4 /*yield*/, exports.getGroupApi(225405)];
            case 6:
                gs = (_a.f = _b.sent(),
                    _a);
                return [2 /*return*/, gs];
        }
    });
}); };
var get3rdPlace = function (group) {
    var thirdPlacers = group.filter(function (standing) { return standing.position == 3; });
    if (thirdPlacers.length != 1) {
        throw 'Numerous third place finishers in group.';
    }
    return thirdPlacers[0];
};
var build3rdPlaceTable = function (gs) {
    return [
        get3rdPlace(gs['a']),
        get3rdPlace(gs['b']),
        get3rdPlace(gs['c']),
        get3rdPlace(gs['d']),
        get3rdPlace(gs['e']),
        get3rdPlace(gs['f'])
    ];
};
var goalsScored = function (s) {
    return parseInt(s.goals[0]);
};
var qualiTable = function () {
    var buf = fs.readFileSync('./qualifier_ranking.json');
    return JSON.parse(buf.toString());
};
var get3rdPlaceTable = function () { return __awaiter(void 0, void 0, void 0, function () {
    var gs, thirdPlacers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getGS()];
            case 1:
                gs = _a.sent();
                thirdPlacers = build3rdPlaceTable(gs);
                return [2 /*return*/, thirdPlacers.sort(standingSort)];
        }
    });
}); };
exports.get3rdPlaceTable = get3rdPlaceTable;
var standingSort = function (first, second) {
    var points_diff = first.points - second.points;
    if (points_diff != 0) {
        return points_diff;
    }
    var goal_diff = first.goal_diff - second.goal_diff;
    if (goal_diff != 0) {
        return goal_diff;
    }
    var scored_diff = goalsScored(first) - goalsScored(second);
    if (scored_diff != 0) {
        return scored_diff;
    }
    var wins_diff = first.wins - second.wins;
    if (wins_diff != 0) {
        return wins_diff;
    }
    var fair_diff = first.fairplay_points_lose - second.fairplay_points_lose;
    if (fair_diff != 0) {
        return fair_diff;
    }
    var quali_table = qualiTable();
    var fst_code = first.short_code;
    var snd_code = second.short_code;
    var quali_diff = quali_table[fst_code] - quali_table[snd_code];
    return quali_diff;
};
