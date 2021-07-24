
let repolist = document.getElementById('reposlist')
repolist.innerHTML = `<ul class="list-group" id="repoitem"></ul>`

async function getUserRepos(event) {

  event.preventDefault();
  let username = document.getElementById('githubusername').value
  let uri = `https://api.github.com/users/${username}/repos`
  try {
    let resp = await fetch(uri)
  let data = await resp.json()
  data.forEach(element => {
    let repoitem = document.getElementById('repoitem')
    repoitem.innerHTML += ` <li class="list-group-item">${element.name}<br> ${element.description}</li>`
  });
  } catch (error) {
    repoitem.innerHTML = ` <li class="list-group-item">Please check username</li>`
  }
  
}