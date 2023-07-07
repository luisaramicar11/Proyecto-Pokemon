import hamburguerMenu from "./hamburguer-menu.js";
import { loadPokemons, filtrarPokemons } from "./loadPokemons.js";
import darkTheme from "./dark-theme.js";

document.addEventListener("DOMContentLoaded", (e) => {
  hamburguerMenu(".panel-btn", ".menu-panel", ".menu-panel a");
  loadPokemons("https://pokeapi.co/api/v2/pokemon/");
  filtrarPokemons(".links-type-pokemon a");
});

darkTheme(".btn-dark-mode", "dark-mode");
