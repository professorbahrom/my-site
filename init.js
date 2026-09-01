/* Tema: kunduzi ochiq fon. Oy tugmasi bosilsa — to‘q fon, tanlov eslab qolinadi. */
(function () {
  var t = "light";
  try { var v = localStorage.getItem("bd-tema"); if (v === "dark" || v === "light") t = v; } catch (e) {}
  document.documentElement.setAttribute("data-theme", t);
  try { var l = localStorage.getItem("bd-til"); if (l === "uz" || l === "en" || l === "ru") document.documentElement.setAttribute("lang", l); } catch (e) {}
  document.documentElement.classList.add("js");
})();
