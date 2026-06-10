/* Smoke test das abas Tube/Métro em jsdom: node build/test-ui.js
   (canvas do jsdom não desenha; força SVG só no teste) */
const fs = require("fs"), path = require("path");
const { JSDOM } = require("jsdom");
const root = path.join(__dirname, "..");
const read = f => fs.readFileSync(path.join(root, f), "utf8");

const dom = new JSDOM(`<!DOCTYPE html><html><body>
  <section id="tube"></section><section id="metro"></section></body></html>`, {
  runScripts: "outside-only", pretendToBeVisual: true, url: "https://x.test/"
});
const { window } = dom;
// stubs de geometria (jsdom não tem layout)
window.HTMLElement.prototype.getBoundingClientRect = function () {
  return { x: 0, y: 0, top: 0, left: 0, right: 390, bottom: 500, width: 390, height: 500 };
};
Object.defineProperty(window.HTMLElement.prototype, "clientWidth", { get: () => 390 });
Object.defineProperty(window.HTMLElement.prototype, "clientHeight", { get: () => 500 });

window.eval(read("vendor/leaflet.js"));
window.eval("L.canvas = function(o){ return L.svg(o); };"); // sem canvas 2d no jsdom
// num browser real, const de <script> vai pro escopo léxico global compartilhado;
// no eval do jsdom não — então registramos explicitamente em window:
window.eval(read("metro-data.js").replace("const METRO =", "window.METRO ="));
window.eval(read("metro.js"));

let fail = 0;
["tube", "metro"].forEach(view => {
  window.MetroUI.open(view);
  const sec = window.document.getElementById(view);
  const hasErr = sec.innerHTML.includes("Erro ao montar");
  const hasInputs = !!window.document.getElementById(view + "-from");
  const mapDiv = window.document.getElementById(view + "-map");
  const leafletOn = mapDiv && mapDiv.className.includes("leaflet-container");
  const paths = mapDiv ? mapDiv.querySelectorAll("path").length : 0;
  const ok = !hasErr && hasInputs && leafletOn && paths > 100;
  console.log(`${view}: ${ok ? "OK" : "FALHOU"} (erro=${hasErr}, inputs=${hasInputs}, leaflet=${leafletOn}, paths=${paths})`);
  if (!ok) { fail = 1; if (hasErr) console.log("   ", sec.textContent.trim().slice(0, 200)); }
});
// simula seleção via mapa + rota
window.MetroUI.setEnd("tube", 0, "from");
window.MetroUI.setEnd("tube", 50, "to");
const res = window.document.getElementById("tube-result").textContent;
console.log("rota tube:", res.includes("min") ? "OK -> " + res.trim().slice(0, 80) : "FALHOU: " + res.slice(0, 120));
if (!res.includes("min")) fail = 1;
console.log("sentido:", res.includes("sentido") ? "OK" : "FALHOU (sem 'sentido')");
if (!res.includes("sentido")) fail = 1;
// lista completa ao focar campo vazio
const inp = window.document.getElementById("metro-from");
inp.value = "";
inp.dispatchEvent(new window.Event("focus"));
const nOpts = window.document.querySelectorAll("#metro-from-sug .pl-opt").length;
const total = window.METRO.paris.stations.length;
console.log(`lista De/Para: ${nOpts}/${total} ${nOpts === total ? "OK" : "FALHOU"}`);
if (nOpts !== total) fail = 1;
process.exit(fail);
