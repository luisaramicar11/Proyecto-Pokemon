export async function loadPokemons(url) {
  let $containerPokemons = document.querySelector(".container-pokemons"),
    $linksPaginacion = document.querySelector(".links-paginacion");

  if (localStorage.getItem("selectType") === null)
    localStorage.setItem("selectType", "all");

  let pokeAPIType = "https://pokeapi.co/api/v2/type";
  try {
    $containerPokemons.innerHTML = `<img class="loader" src="./assets/loader.svg" alt="Cargando...">`;

    let path =
      localStorage.getItem("selectType") === "all"
        ? url
        : `${pokeAPIType}/${localStorage.getItem("selectType")}`;

    let res = await fetch(path),
      json = await res.json(),
      $template = "",
      $prevLink,
      $nextLink;

    //console.log(res);
    //console.log(json);

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    let jsonPokemon =
      localStorage.getItem("selectType") === "all"
        ? json.results
        : json.pokemon;

    for (let i = 0; i < jsonPokemon.length; i++) {
      //console.log(json.results[i]);
      try {
        let res = await fetch(
            localStorage.getItem("selectType") === "all"
              ? jsonPokemon[i].url
              : jsonPokemon[i].pokemon.url
          ),
          pokemon = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        console.log(pokemon.types[0].type.name);

        $template += `
        <div class="card" >
            <div class="name text-600 ">
              <p><b>${pokemon.name}</b></p>
              <i class="fa-regular fa-heart"></i>
            </div>
            <div class="back-pokemon">
              <img class="img-pokemon" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            </div>
            <div class="power">
             <p class="text-600"><b>${pokemon.base_experience}</b></p>
             <button>Buy</button>
            </div> 
          </div>
        `;
      } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurriò un error";
        $template.innerHTML = `<div class="card">
            <div class="name">
              <p><b>Name</b></p>
              <i class="fa-regular fa-heart"></i>
            </div>
            <div class="back-pokemon">
              <p>Error ${err.status}: ${message}</p>
            </div>
            <div class="power">
             <p><b>Power Level</b></p>
             <button>Buy</button>
            </div>
          </div>`;
      }
    }
    $containerPokemons.innerHTML = $template;
    $prevLink = json.previous ? `<a href="${json.previous}">⏮️</a>` : "";
    $nextLink = json.next ? `<a href="${json.next}">⏭️</a>` : "";
    $linksPaginacion.innerHTML = $prevLink + " " + $nextLink;
  } catch (err) {
    //console.log(err);
    let message = err.statusText || "Ocurriò un error";
    $containerPokemons.innerHTML = `<p> Error ${err.status}:${message}</p>`;
  }
}
document.addEventListener("click", (e) => {
  if (e.target.matches(".links-paginacion a")) {
    e.preventDefault();
    loadPokemons(e.target.getAttribute("href"));
  }
});

export function filtrarPokemons(entrada) {
  document.addEventListener("click", (e) => {
    if (e.target.matches(entrada)) {
      /* alert(entrada);
      alert(e.target.id); */

      localStorage.setItem("selectType", e.target.id);
    }
  });
}
