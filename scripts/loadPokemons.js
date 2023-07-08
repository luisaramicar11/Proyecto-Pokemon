let $template = "";
export async function loadPokemons(url) {
  let $containerPokemons = document.querySelector(".container-pokemons");
  let $linksPaginacion = document.querySelector(".links-paginacion");
  let $totalCards = document.querySelector(".totalCards");

  if (localStorage.getItem("selectType") === null)
    localStorage.setItem("selectType", "all");

  let pokeAPIType = "https://pokeapi.co/api/v2/type";
  try {
    $containerPokemons.innerHTML = `<img src="./assets/loader.svg" alt="Cargando...">`;

    let path =
      localStorage.getItem("selectType") === "all"
        ? url
        : `${pokeAPIType}/${localStorage.getItem("selectType")}`;

    let res = await fetch(path);
    let json = await res.json();
    let $nextLink;

    console.log(res);
    console.log(json);

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
        console.log(pokemon);

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        //console.log(pokemon.types[0].type.name);

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
        let message = err.statusText || "Ocurrió un error";
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

    let $card = document.querySelectorAll(".card");
    console.log($card.length);

    $nextLink = json.next
      ? `<a class="btn-show-more" href="${json.next}">Show more cards</a>`
      : "";
    $linksPaginacion.innerHTML = $nextLink;
    $totalCards.innerHTML = `${$card.length} Cards`;
  } catch (err) {
    //console.log(err);
    let message = err.statusText || "Ocurrió  un error";
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
