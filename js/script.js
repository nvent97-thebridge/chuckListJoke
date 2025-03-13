const btnGetJoke = document.getElementById("fetchJoke");
const jokeList = document.getElementById("jokeList");

let jokesArray = [];

const getJoke = () => {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((res) => res.json())
    .then((data) => {
      jokesArray.push(data.value);
      saveJokes();
      displayJokes();
    });
};

const displayJokes = () => {
  jokeList.innerHTML = "";
  jokesArray.forEach((joke, index) => {
    jokeList.innerHTML += `
        <div>
        <p>${joke}</p>
        <button class='redButton' onclick=deleteJoke(${index})>Eliminar</button>
        </div>
        `;
  });
};

const saveJokes = () => {
  localStorage.setItem("jokes", JSON.stringify(jokesArray));
};

const deleteJoke = (idToDelete) => {
  // Filtrar aquellos elementos cuyo indice sea diferente al seleccionado a borrar
  jokesArray = jokesArray.filter((_, index) => index != idToDelete);
  saveJokes();
  displayJokes();
};

const loadJokes = () => {
  if (localStorage.getItem("jokes")) {
    const localJokes = JSON.parse(localStorage.getItem("jokes"));
    jokesArray = localJokes;
    displayJokes();
  }
};

btnGetJoke.addEventListener("click", getJoke);
loadJokes();

