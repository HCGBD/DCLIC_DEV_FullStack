const btnGenere = document.getElementById("genere");
const blagueBlock = document.getElementById("blague");
const rire = document.getElementById("rire");

async function getJoke() {
  const api =
    "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?lang=fr";
  displayLoading();
  try {
    const response = await fetch(api)
      .then((reponse) => reponse.json())
      .then((data) => {
        // console.log(data)
        hideLoading();
        blagueBlock.innerHTML = ` ${data.setup} <p class="rire"  id="rire"> <a href="https://emoji.gg/emoji/24753-penguhahaha"><img src="https://cdn3.emoji.gg/emojis/24753-penguhahaha.gif" width="64px" height="64px" alt="PenguHahaha"></a> ${data.delivery} </p>`;
      });
  } catch (eror) {}
}

btnGenere.addEventListener("click", getJoke);

// selecting loading div
const loader = document.querySelector("#loading");

// showing loading
function displayLoading() {
  loader.classList.add("display");
  // to stop loading after some time
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}

// hiding loading
function hideLoading() {
  loader.classList.remove("display");
}
