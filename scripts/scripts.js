import hamburguerMenu from "./hamburguer-menu.js";
import { loadPokemons } from "./loadPokemons.js";

document.addEventListener("DOMContentLoaded", (e) => {
  hamburguerMenu(".panel-btn", ".menu-panel", ".menu-panel a");
  loadPokemons("https://pokeapi.co/api/v2/pokemon/");
});
