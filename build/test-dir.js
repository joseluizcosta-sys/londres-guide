/* Confere "sentido" em casos conhecidos: node build/test-dir.js */
const fs = require("fs"), path = require("path");
const { JSDOM } = require("jsdom");
const root = path.join(__dirname, "..");
const dom = new JSDOM("<section id=tube></section><section id=metro></section>",
  { runScripts: "outside-only", pretendToBeVisual: true });
const w = dom.window;
w.HTMLElement.prototype.getBoundingClientRect = function () {
  return { x: 0, y: 0, top: 0, left: 0, right: 390, bottom: 500, width: 390, height: 500 };
};
Object.defineProperty(w.HTMLElement.prototype, "clientWidth", { get: () => 390 });
Object.defineProperty(w.HTMLElement.prototype, "clientHeight", { get: () => 500 });
w.eval(fs.readFileSync(path.join(root, "vendor/leaflet.js"), "utf8"));
w.eval("L.canvas=function(o){return L.svg(o)};");
w.eval(fs.readFileSync(path.join(root, "metro-data.js"), "utf8")
  .replace("const METRO =", "window.METRO ="));
w.eval(fs.readFileSync(path.join(root, "metro.js"), "utf8"));
const idx = (c, n) => w.METRO[c].stations.findIndex(s => s[0] === n);
function t(view, city, a, b) {
  w.MetroUI.open(view);
  w.MetroUI.setEnd(view, idx(city, a), "from");
  w.MetroUI.setEnd(view, idx(city, b), "to");
  const r = w.document.getElementById(view + "-result").textContent.replace(/\s+/g, " ").trim();
  console.log(a, "->", b, "::", r.slice(0, 170));
}
t("tube", "london", "King's Cross St. Pancras", "Brixton");
t("tube", "london", "Westminster", "Tower Hill");
t("metro", "paris", "Invalides", "Saint-Denis-Université");
t("metro", "paris", "Vaugirard", "Gare du Nord");
t("metro", "paris", "Châtelet", "Aéroport d'Orly");
