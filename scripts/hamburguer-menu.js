export default function hamburguerMenu(btnPanel, menuPanel, menuLink) {
  const $btnPanel = document.querySelector(btnPanel);
  const $menuPanel = document.querySelector(menuPanel);

  document.addEventListener("click", (e) => {
    if (e.target.matches(btnPanel) || e.target.matches(`${btnPanel} *`)) {
      $menuPanel.classList.toggle("is-active");
      $btnPanel.classList.toggle("is-active");
    }

    if (e.target.matches(menuLink)) {
      $menuPanel.classList.remove("is-active");
      $btnPanel.classList.remove("is-active");
    }
  });
}
