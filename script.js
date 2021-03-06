let container = document.getElementsByClassName('container')[0]
container.innerHTML = `
<form onsubmit="getUserRepos(event)" autocomplete="off" class="usernameform">
  <input
    class="form-control"
    type="search"
    placeholder="Enter a Github Username"
    id="githubusername"
    spellcheck="false"
    class="usernameinput"
  />
</form>
<div class="userdetails" id="userdetails">
</div>
<div id="reposlist"><ul class="list-group list-group-flush" id="repoitem"></ul></div>`



try {
  document.getElementById('githubusername').value = sessionStorage.getItem("username");
} catch (error) {
  console.log(error);
}

if (document.getElementById('githubusername').value != '') {
  let username = document.getElementById('githubusername').value

  getUserData(username)
}

async function getUserRepos(event) {
  event.preventDefault();
  let username = document.getElementById('githubusername').value
  sessionStorage.setItem("username", `${username}`);
  await getUserData(username)
}


async function getUserData(username) {
  try {
    let uri = `https://api.github.com/users/${username}`
    let resp = await fetch(uri)
    if (!resp.ok) {
      throw 'please check username'
    }
    else {
      let user = await resp.json()
      console.log(user);
      let userdetails = document.getElementById('userdetails')
      userdetails.innerHTML = `
        <img src="${user.avatar_url}" alt="useravatar" class="useravatar"> ${user.login}'s repositories:`

      fetchRepos(username);
    }

  } catch (error) {
    userdetails.innerText = `Please check username`
    let repoitem = document.getElementById('repoitem')
    repoitem.innerHTML = ``
  }
}
async function fetchRepos(username) {
  let uri = `https://api.github.com/users/${username}/repos`
  try {
    let repoitem = document.getElementById('repoitem')
    repoitem.innerHTML = ``
    let resp = await fetch(uri)
    let repos = await resp.json()
    if (repos.length != 0) {
      repos.forEach(repo => {
        repoitem.innerHTML += ` <li class="list-group-item repocarditem"><div class="repocard">
        <a class="repotitle" href="${repo.html_url}" target="_blank">${repo.name}</a>
        <span class="buttons"><a href="${repo.html_url}" class="btn text-reset" title="View repository on Github page." target="_blank"><i class="fab fa-github-square"></i></a><button class="btn" title="Fork Count"><i class="fas fa-code-branch"></i>${repo.forks}</button><button class="btn" title="Star Count"><i class="far fa-star"></i>${repo.stargazers_count}</button></span>
      </div></li>`
      });
    }
    else {
      throw 'The user has no repositories.'
    }

  } catch (error) {
    let repoitem = document.getElementById('repoitem')

    repoitem.innerHTML = ` <li class="list-group-item">The user has no repositories.</li>`
  }
}
