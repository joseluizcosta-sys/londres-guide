#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gera ../metro-data.js a partir dos datasets em build/.

Londres: nicola/tubemaps (2014) + patches 2026:
  - remove East London Line (virou Overground; dados antigos tinham Shoreditch, fechada)
  - corrige nomes (Piccadilly Circus, Heathrow T2&3, etc.)
  - adiciona Elizabeth line (Heathrow/Ealing -> Paddington -> Abbey Wood/Stratford)
  - adiciona extensao Northern (Nine Elms, Battersea Power Station)
  - adiciona Heathrow T5 (Piccadilly + Elizabeth)

Paris: EFREI metro.txt (1998-2002) + coords w8r + patches 2026:
  - renomeacoes atuais, M14 completa (Saint-Denis Pleyel <-> Aeroport d'Orly),
    M4 ate Bagneux, M12 ate Mairie d'Aubervilliers, M11 ate Rosny-Bois-Perrier,
    M13 ate Les Courtilles, M8 ate Pointe du Lac.

Formato de saida (METRO em metro-data.js):
  stations: [[nome, lat, lon], ...]  (indice = id)
  edges:    [[a, b, "linha", segundos], ...]  (nao-dirigido)
  lines:    { "chave": {n: nome, c: cor} }
"""
import csv, json, re, unicodedata, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "metro-data.js")

def norm(s):
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = s.lower()
    s = re.sub(r"\((metro|métro)[^)]*\)", "", s)
    s = re.sub(r"[^a-z0-9]", "", s)
    return s

# ============================ LONDRES ============================
LON_RENAME = {
    "Picadilly Circus": "Piccadilly Circus",
    "Harrow & Wealdston": "Harrow & Wealdstone",
    "Heathrow Terminals 1, 2 & 3": "Heathrow Terminals 2 & 3",
    "Shepherd's Bush (C)": "Shepherd's Bush",
    "Shepherd's Bush (H)": "Shepherd's Bush Market",
    "Edgware Road (B)": "Edgware Road (Bakerloo)",
    "Edgware Road (C)": "Edgware Road (Circle)",
    "Crossharbour & London Arena": "Crossharbour",
}
LON_DROP_LINES = {"5"}  # East London Line (dados obsoletos)
LON_LINE_NAMES = {
    "1": ("Bakerloo", "#B36305"), "2": ("Central", "#E32017"),
    "3": ("Circle", "#FFD300"), "4": ("District", "#00782A"),
    "6": ("Hammersmith & City", "#F3A9BB"), "7": ("Jubilee", "#A0A5A9"),
    "8": ("Metropolitan", "#9B0056"), "9": ("Northern", "#000000"),
    "10": ("Piccadilly", "#003688"), "11": ("Victoria", "#0098D4"),
    "12": ("Waterloo & City", "#95CDBA"), "13": ("DLR", "#00A4A7"),
    "14": ("Elizabeth line", "#6950A1"),
}
# Estações novas: nome -> (lat, lon)
LON_NEW_ST = {
    "Nine Elms": (51.4798, -0.1285),
    "Battersea Power Station": (51.4796, -0.1442),
    "Heathrow Terminal 5": (51.4723, -0.4887),
    "Acton Main Line": (51.5169, -0.2676),
    "West Ealing": (51.5137, -0.3203),
    "Hanwell": (51.5116, -0.3384),
    "Southall": (51.5058, -0.3782),
    "Hayes & Harlington": (51.5031, -0.4209),
    "Woolwich": (51.4915, 0.0697),
    "Abbey Wood": (51.4907, 0.1215),
}
# Arestas novas: (nomeA, nomeB, linha, minutos)
LON_NEW_EDGES = [
    # Northern line - extensao Battersea (2021)
    ("Kennington", "Nine Elms", "9", 3),
    ("Nine Elms", "Battersea Power Station", "9", 2),
    # Piccadilly - Terminal 5 (2008)
    ("Heathrow Terminals 2 & 3", "Heathrow Terminal 5", "10", 4),
    # Elizabeth line (2022)
    ("Heathrow Terminal 4", "Heathrow Terminals 2 & 3", "14", 5),
    ("Heathrow Terminal 5", "Heathrow Terminals 2 & 3", "14", 4),
    ("Heathrow Terminals 2 & 3", "Hayes & Harlington", "14", 7),
    ("Hayes & Harlington", "Southall", "14", 3),
    ("Southall", "Hanwell", "14", 3),
    ("Hanwell", "West Ealing", "14", 2),
    ("West Ealing", "Ealing Broadway", "14", 2),
    ("Ealing Broadway", "Acton Main Line", "14", 3),
    ("Acton Main Line", "Paddington", "14", 6),
    ("Paddington", "Bond Street", "14", 3),
    ("Bond Street", "Tottenham Court Road", "14", 2),
    ("Tottenham Court Road", "Farringdon", "14", 2),
    ("Farringdon", "Liverpool Street", "14", 2),
    ("Liverpool Street", "Whitechapel", "14", 3),
    ("Whitechapel", "Stratford", "14", 7),
    ("Whitechapel", "Canary Wharf", "14", 3),
    ("Canary Wharf", "Custom House", "14", 3),
    ("Custom House", "Woolwich", "14", 7),
    ("Woolwich", "Abbey Wood", "14", 4),
]

def build_london():
    stations, by_id, by_name = [], {}, {}
    with open(os.path.join(HERE, "london.stations.csv"), encoding="utf-8") as f:
        for row in csv.DictReader(f):
            name = LON_RENAME.get(row["name"], row["name"])
            idx = len(stations)
            stations.append([name, float(row["latitude"]), float(row["longitude"])])
            by_id[row["id"]] = idx
            by_name[name] = idx
    for name, (lat, lon) in LON_NEW_ST.items():
        idx = len(stations)
        stations.append([name, lat, lon])
        by_name[name] = idx
    edges, seen = [], set()
    with open(os.path.join(HERE, "london.connections.csv"), encoding="utf-8") as f:
        for row in csv.DictReader(f):
            if row["line"] in LON_DROP_LINES:
                continue
            a, b = by_id[row["station1"]], by_id[row["station2"]]
            key = (min(a, b), max(a, b), row["line"])
            if key in seen:
                continue
            seen.add(key)
            edges.append([a, b, row["line"], int(row["time"]) * 60])
    for na, nb, line, mins in LON_NEW_EDGES:
        a, b = by_name[na], by_name[nb]
        edges.append([a, b, line, mins * 60])
    return {"label": "Londres", "transfer": 300,
            "lines": {k: {"n": v[0], "c": v[1]} for k, v in LON_LINE_NAMES.items()},
            "stations": stations, "edges": edges}

# ============================ PARIS ============================
PAR_RENAME = {
    "Bibliothèque François Mitterand": "Bibliothèque François Mitterrand",
    "Grande Arche de la Défense": "La Défense",
    "Rue Montmartre, Grands Boulevards": "Grands Boulevards",
    "Gabriel Péri, Asnières-Gennevilliers": "Gabriel Péri",
    "Pierre Curie": "Pierre et Marie Curie",
    "Boulogne, Pont de Saint-Cloud, Rond Point Rhin et Danube": "Boulogne, Pont de Saint-Cloud",
    "Saint-Mandé, Tourelle": "Saint-Mandé",
    "Marcadet Poissonniers": "Marcadet-Poissonniers",
    "Montparnasse Bienvenue": "Montparnasse-Bienvenüe",
}
# Aliases p/ casar nomes do metro.txt com paris.coords.txt
PAR_COORD_ALIAS = {
    "javel": "javelandrecitroen",
    "placebalard": "balard",
    "saintpaullemarais": "saintpaul",
    "ladefense": "ladefensegrandearche",
    "creteilprefecture": "creteilprefecturehoteldeville",
    "creteiluniversite": "creteiluniversite",
    "creteillechathopitalhenrimondor": "creteillechathopitalhenrimondor",
    "maisonsalfortlesjuilliottes": "maisonsalfortlesjuilliottes",
    "maisonsalfortstade": "maisonsalfortstade",
    "denfertrochereau": "denfertrochereau",
    "villejuifpvaillantcouturier": "villejuifpaulvaillantcouturier",
    "lacourneuve8mai1945": "lacourneuve8mai1945",
    "gaite": "gaite",
    "galliene": "gallieni", "gallieni": "gallieni",
    "chardonlagache": "chardonlagache",
    "boulognepontdesaintcloud": "boulognepontdesaintcloud",
    "pontdelevalloisbecon": "pontdelevalloisbecon",
    "louvrerivoli": "louvrerivoli",
}
PAR_LINE_COLORS = {
    "1": "#FFCE00", "2": "#0064B0", "3": "#9F9825", "3bis": "#98D4E2",
    "4": "#C04191", "5": "#F28E42", "6": "#83C491", "7": "#F3A4BA",
    "7bis": "#83C491", "8": "#CEADD2", "9": "#D5C900", "10": "#E3B32A",
    "11": "#8D5E2A", "12": "#00814F", "13": "#98D4E2", "14": "#662483",
}
# Estações novas: nome -> (lat, lon) (aprox. — uso esquemático)
PAR_NEW_ST = {
    "Saint-Denis Pleyel": (48.9176, 2.3454),
    "Saint-Ouen": (48.9046, 2.3222),
    "Pont Cardinet": (48.8876, 2.3194),
    "Hôpital Bicêtre": (48.8100, 2.3650),
    "Villejuif, Gustave Roussy": (48.7945, 2.3490),
    "L'Haÿ-les-Roses": (48.7805, 2.3375),
    "Chevilly-Larue": (48.7660, 2.3530),
    "Thiais, Orly (Pont de Rungis)": (48.7531, 2.3635),
    "Aéroport d'Orly": (48.7290, 2.3736),
    "Mairie de Montrouge": (48.8182, 2.3195),
    "Barbara": (48.8075, 2.3175),
    "Bagneux, Lucie Aubrac": (48.8030, 2.3155),
    "Front Populaire": (48.9066, 2.3659),
    "Aimé Césaire": (48.9105, 2.3770),
    "Mairie d'Aubervilliers": (48.9135, 2.3815),
    "Serge Gainsbourg": (48.8794, 2.4231),
    "Romainville, Carnot": (48.8853, 2.4337),
    "Montreuil, Hôpital": (48.8760, 2.4460),
    "La Dhuys": (48.8790, 2.4530),
    "Coteaux Beauclair": (48.8840, 2.4610),
    "Rosny, Bois-Perrier": (48.8838, 2.4793),
    "Les Agnettes": (48.9231, 2.2862),
    "Les Courtilles": (48.9308, 2.2842),
    "Créteil, Pointe du Lac": (48.7687, 2.4644),
    "Olympiades": (48.8270, 2.3664),
}
# Arestas novas: (nomeA, nomeB, linha, segundos)
PAR_NEW_EDGES = [
    # M14 norte (2020/2024)
    ("Saint-Denis Pleyel", "Mairie de Saint-Ouen", "14", 120),
    ("Mairie de Saint-Ouen", "Saint-Ouen", "14", 90),
    ("Saint-Ouen", "Porte de Clichy", "14", 90),
    ("Porte de Clichy", "Pont Cardinet", "14", 90),
    ("Pont Cardinet", "Saint-Lazare", "14", 120),
    ("Saint-Lazare", "Madeleine", "14", 90),
    # M14 sul (2007/2024)
    ("Bibliothèque François Mitterrand", "Olympiades", "14", 90),
    ("Olympiades", "Maison Blanche", "14", 120),
    ("Maison Blanche", "Hôpital Bicêtre", "14", 90),
    ("Hôpital Bicêtre", "Villejuif, Gustave Roussy", "14", 120),
    ("Villejuif, Gustave Roussy", "L'Haÿ-les-Roses", "14", 120),
    ("L'Haÿ-les-Roses", "Chevilly-Larue", "14", 90),
    ("Chevilly-Larue", "Thiais, Orly (Pont de Rungis)", "14", 90),
    ("Thiais, Orly (Pont de Rungis)", "Aéroport d'Orly", "14", 180),
    # M4 sul (2013/2022)
    ("Porte d'Orléans", "Mairie de Montrouge", "4", 90),
    ("Mairie de Montrouge", "Barbara", "4", 90),
    ("Barbara", "Bagneux, Lucie Aubrac", "4", 90),
    # M12 norte (2012/2022)
    ("Porte de la Chapelle", "Front Populaire", "12", 120),
    ("Front Populaire", "Aimé Césaire", "12", 90),
    ("Aimé Césaire", "Mairie d'Aubervilliers", "12", 90),
    # M11 leste (2024)
    ("Mairie des Lilas", "Serge Gainsbourg", "11", 90),
    ("Serge Gainsbourg", "Romainville, Carnot", "11", 90),
    ("Romainville, Carnot", "Montreuil, Hôpital", "11", 120),
    ("Montreuil, Hôpital", "La Dhuys", "11", 90),
    ("La Dhuys", "Coteaux Beauclair", "11", 90),
    ("Coteaux Beauclair", "Rosny, Bois-Perrier", "11", 120),
    # M13 norte (2008)
    ("Gabriel Péri", "Les Agnettes", "13", 90),
    ("Les Agnettes", "Les Courtilles", "13", 90),
    # M8 (2011)
    ("Créteil-Préfecture", "Créteil, Pointe du Lac", "8", 120),
]
# Coords manuais para estações ausentes do dataset w8r (truncado)
PAR_FIX_COORDS = {
    "basiliquedesaintdenis": (48.9363, 2.3594),
    "bibliothequefrancoismitterrand": (48.8298, 2.3760),
    "portedeclichy": (48.8946, 2.3133),
    "republique": (48.8675, 2.3636),
}

def build_paris():
    coords = {}
    with open(os.path.join(HERE, "paris.coords.txt"), encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            name, lat, lon = line.split(";")
            coords.setdefault(norm(name), (float(lat), float(lon)))
    verts = {}   # num -> (nome, linha)
    raw_edges = []
    with open(os.path.join(HERE, "paris.metro.txt"), encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith("V "):
                m = re.match(r"V (\d+) (.+?) ;(\S+) ;", line)
                if not m:
                    sys.exit("vertice ilegivel: " + line)
                num, name, ln = int(m.group(1)), m.group(2).strip(), m.group(3)
                name = PAR_RENAME.get(name, name)
                verts[num] = (name, ln)
            elif line.startswith("E "):
                a, b, t = line.split()[1:4]
                raw_edges.append((int(a), int(b), int(t)))
    stations, by_norm = [], {}
    def st_idx(name):
        k = norm(name)
        if k in by_norm:
            return by_norm[k]
        ck = PAR_COORD_ALIAS.get(k, k)
        if ck in coords:
            c = coords[ck]
        elif k in PAR_FIX_COORDS:
            c = PAR_FIX_COORDS[k]
        else:
            missing.append(name)
            c = (None, None)
        idx = len(stations)
        stations.append([name, c[0], c[1]])
        by_norm[k] = idx
        return idx
    missing = []
    vmap = {}
    for num, (name, ln) in sorted(verts.items()):
        vmap[num] = (st_idx(name), ln)
    edges, seen = [], set()
    for a, b, t in raw_edges:
        (sa, la), (sb, lb) = vmap[a], vmap[b]
        if sa == sb:
            continue  # correspondencia na mesma estacao -> tratada pelo motor
        if la != lb:
            continue  # seguranca: aresta de viagem deve ser na mesma linha
        key = (min(sa, sb), max(sa, sb), la)
        if key in seen:
            continue
        seen.add(key)
        edges.append([sa, sb, la, t])
    for name, (lat, lon) in PAR_NEW_ST.items():
        k = norm(name)
        if k not in by_norm:
            by_norm[k] = len(stations)
            stations.append([name, lat, lon])
    for na, nb, ln, secs in PAR_NEW_EDGES:
        ka, kb = norm(na), norm(nb)
        if ka not in by_norm or kb not in by_norm:
            sys.exit("patch com estacao desconhecida: %s / %s" % (na, nb))
        edges.append([by_norm[ka], by_norm[kb], ln, secs])
    if missing:
        print("AVISO: sem coords para:", missing)
    return {"label": "Paris", "transfer": 240,
            "lines": {k: {"n": "Linha " + k, "c": v} for k, v in PAR_LINE_COLORS.items()},
            "stations": stations, "edges": edges}

def prune_orphans(d):
    """Remove estações sem nenhuma aresta (ex.: sobras da East London Line)."""
    used = set()
    for a, b, ln, t in d["edges"]:
        used.add(a); used.add(b)
    keep = sorted(used)
    remap = {old: new for new, old in enumerate(keep)}
    d["stations"] = [d["stations"][i] for i in keep]
    d["edges"] = [[remap[a], remap[b], ln, t] for a, b, ln, t in d["edges"]]

def main():
    data = {"london": build_london(), "paris": build_paris()}
    for d in data.values():
        prune_orphans(d)
    for city, d in data.items():
        names = [s[0] for s in d["stations"]]
        print(city, len(d["stations"]), "estacoes,", len(d["edges"]), "arestas")
        # conectividade
        adj = {}
        for a, b, ln, t in d["edges"]:
            adj.setdefault(a, set()).add(b)
            adj.setdefault(b, set()).add(a)
        seen, stack = {0}, [0]
        while stack:
            for n in adj.get(stack.pop(), ()):
                if n not in seen:
                    seen.add(n)
                    stack.append(n)
        orphans = [names[i] for i in range(len(names)) if i not in seen]
        if orphans:
            print("  DESCONECTADAS:", orphans)
        nocoord = [n for n, la, lo in d["stations"] if la is None]
        if nocoord:
            print("  SEM COORDS:", nocoord)
    js = "/* GERADO por build/generate.py - nao editar a mao */\nconst METRO = " + \
         json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n"
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(js)
    print("OK ->", OUT, len(js), "bytes")

if __name__ == "__main__":
    main()
