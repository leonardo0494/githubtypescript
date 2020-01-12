class Profile {
    username: string;
    login: string;
    company: string;
    location: string;
    bio: string;
    repos: Object;
    avatar:string;

    constructor(public userName:string, public userLogin:string, public userCompany:string, public userLocation:string, public userBio:string, public userAvatar:string, public userRepos:Object){
        this.username = userName;
        this.login    = userLogin;
        this.company  = userCompany;
        this.location = userLocation;
        this.bio      = userBio;
        this.repos    = userRepos;
        this.avatar   = userAvatar;
    }
}

interface GitHubProfile{
    name: string;
    login: string;
    company: string;
    location: string;
    bio: string;
    avatar_url: string;
}

const userNameSearch = (<HTMLInputElement> document.querySelector("#userNameSearch"));
const avatar         = (<HTMLImageElement> document.querySelector("#avatar"));
const userInfo       = (<HTMLElement> document.querySelector("#userInfo"));
const repoList       = (<HTMLElement> document.querySelector("#repo-list"));

async function loadUserInfo():Promise<void> {

    let user = userNameSearch.value;
    const userData = await fetch('https://api.github.com/users/'+user);
    const profileInfo = await userData.json();

    const userRepos = await fetch('https://api.github.com/users/' + user + '/repos');
    const userReposJson = await userRepos.json();

    setUserInfo(profileInfo, userReposJson);

}
 
function setUserInfo(profile: GitHubProfile, repositories){

    let profileUser = new Profile(profile.name, profile.login, profile.company, profile.location, profile.bio, profile.avatar_url, repositories);

    avatar.setAttribute('src', profileUser.avatar);
    userInfo.innerHTML = `
        <h2 class="card-title">${profileUser.username}</h2>
        <p>${profileUser.company}</p>
        <p>${profileUser.location}</p>
        <h6>${profileUser.bio}</h6>
    `;

    const keys = Object.keys(profileUser.repos);

    keys.map(item => {
        let li = document.createElement("li");
        li.className = 'list-group-item';
        li.innerHTML = `<a href="https://github.com/${profileUser.login}/${profileUser.repos[item].name}" target="_blank" rel="noopener noreferrer">${profileUser.repos[item].name}</a>`;
        repoList.appendChild(li);
    });

}

document.querySelector("#procurar").addEventListener("click", e => {
    e.preventDefault();

    const loadUser = loadUserInfo();
    loadUser.then(() => console.log("OOK"))
            .catch( e => console.log(e));

});