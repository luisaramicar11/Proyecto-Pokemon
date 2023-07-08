export default function darkTheme(btn, classDark) {
  const $selectors = document.querySelectorAll("[data-dark]");
  const $btn = document.querySelector(btn);

  const darkMode = () => {
    $selectors.forEach((el) => {
      el.classList.add(classDark);
    });
    $btn.textContent = "Light Mode";
    localStorage.setItem("tema", "dark");
  };

  const lightMode = () => {
    $selectors.forEach((el) => {
      el.classList.remove(classDark);
    });
    $btn.textContent = "Dark Mode";
    localStorage.setItem("tema", "light");
  };

  document.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      if ($btn.textContent === "Dark Mode") {
        darkMode();
      } else {
        lightMode();
      }
    }
  });

  document.addEventListener("DOMContentLoaded", (e) => {
    if (localStorage.getItem("tema") === null)
      localStorage.setItem("tema", "light");
    if (localStorage.getItem("tema") === "light") lightMode();
    if (localStorage.getItem("tema") === "dark") darkMode();
  });
}
