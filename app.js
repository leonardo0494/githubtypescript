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
var Profile = /** @class */ (function () {
    function Profile(userName, userLogin, userCompany, userLocation, userBio, userAvatar, userRepos) {
        this.userName = userName;
        this.userLogin = userLogin;
        this.userCompany = userCompany;
        this.userLocation = userLocation;
        this.userBio = userBio;
        this.userAvatar = userAvatar;
        this.userRepos = userRepos;
        this.username = userName;
        this.login = userLogin;
        this.company = userCompany;
        this.location = userLocation;
        this.bio = userBio;
        this.repos = userRepos;
        this.avatar = userAvatar;
    }
    return Profile;
}());
var userNameSearch = document.querySelector("#userNameSearch");
var avatar = document.querySelector("#avatar");
var userInfo = document.querySelector("#userInfo");
var repoList = document.querySelector("#repo-list");
function loadUserInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var user, userData, profileInfo, userRepos, userReposJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = userNameSearch.value;
                    return [4 /*yield*/, fetch('https://api.github.com/users/' + user)];
                case 1:
                    userData = _a.sent();
                    return [4 /*yield*/, userData.json()];
                case 2:
                    profileInfo = _a.sent();
                    return [4 /*yield*/, fetch('https://api.github.com/users/' + user + '/repos')];
                case 3:
                    userRepos = _a.sent();
                    return [4 /*yield*/, userRepos.json()];
                case 4:
                    userReposJson = _a.sent();
                    setUserInfo(profileInfo, userReposJson);
                    return [2 /*return*/];
            }
        });
    });
}
function setUserInfo(profile, repositories) {
    var profileUser = new Profile(profile.name, profile.login, profile.company, profile.location, profile.bio, profile.avatar_url, repositories);
    avatar.setAttribute('src', profileUser.avatar);
    userInfo.innerHTML = "\n        <h2 class=\"card-title\">" + profileUser.username + "</h2>\n        <p>" + profileUser.company + "</p>\n        <p>" + profileUser.location + "</p>\n        <h6>" + profileUser.bio + "</h6>\n    ";
    var keys = Object.keys(profileUser.repos);
    keys.map(function (item) {
        var li = document.createElement("li");
        li.className = 'list-group-item';
        li.innerHTML = "<a href=\"https://github.com/" + profileUser.login + "/" + profileUser.repos[item].name + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + profileUser.repos[item].name + "</a>";
        repoList.appendChild(li);
    });
}
document.querySelector("#procurar").addEventListener("click", function (e) {
    e.preventDefault();
    var loadUser = loadUserInfo();
    loadUser.then(function () { return console.log("OOK"); })["catch"](function (e) { return console.log(e); });
});
