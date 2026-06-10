/* Teste do roteador: node build/test-route.js */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
global.window = {};
eval(fs.readFileSync(path.join(root, "metro-data.js"), "utf8")
  .replace("const METRO =", "globalThis.METRO ="));
eval(fs.readFileSync(path.join(root, "metro.js"), "utf8"));
const route = window.MetroUI._route;

function idx(city, name) {
  const i = METRO[city].stations.findIndex(s => s[0] === name);
  if (i < 0) throw new Error("estacao nao achada: " + name);
  return i;
}
function show(city, a, b) {
  const d = METRO[city];
  const r = route(d, idx(city, a), idx(city, b));
  if (!r) { console.log(`${a} -> ${b}: SEM ROTA !!`); return; }
  const mins = Math.round(r.cost / 60) + 2;
  const legs = r.legs.map(l =>
    `${d.lines[l.line].n}: ${d.stations[l.sts[0]][0]} -> ${d.stations[l.sts[l.sts.length - 1]][0]} (${l.sts.length - 1} paradas)`
  ).join("  |  ");
  console.log(`${a} -> ${b}: ~${mins} min, ${r.legs.length - 1} troca(s)\n   ${legs}`);
}

console.log("== LONDRES ==");
show("london", "Heathrow Terminals 2 & 3", "Paddington");   // Elizabeth direto
show("london", "King's Cross St. Pancras", "Westminster");  // Victoria->Jubilee ou direto?
show("london", "Paddington", "Tower Hill");                 // Circle/District
show("london", "Waterloo", "Bank");                         // W&C direto
show("london", "Cutty Sark", "Piccadilly Circus");          // DLR + troca
show("london", "Battersea Power Station", "Camden Town");   // extensao Northern
show("london", "Baker Street", "South Kensington");
console.log("== PARIS ==");
show("paris", "Vaugirard", "Gare du Nord");                 // L12 hotel -> Eurostar
show("paris", "Châtelet", "Aéroport d'Orly");               // M14 nova
show("paris", "Saint-Denis Pleyel", "Madeleine");           // M14 norte
show("paris", "Bastille", "Trocadéro");
show("paris", "Vaugirard", "Tour Eiffel = Bir-Hakeim" === "" ? "" : "Bir-Hakeim");
show("paris", "Rosny, Bois-Perrier", "Châtelet");           // M11 nova
show("paris", "Abbesses", "Champs Élysées, Clémenceau");
