/* ============================================================
   ROTEIRO — Londres + Paris | 3 a 12 de Julho de 2026
   ------------------------------------------------------------
   COMO ATUALIZAR:
   - Edite este arquivo. Cada dia tem uma lista `places`.
   - Cada lugar: { name, type, coords:[lat,lng], area, price, desc, highlights }
   - type controla a cor/ícone do pino. Tipos válidos:
       museu, atracao, igreja, parque, mercado, restaurante,
       loja, mirante, transporte, hotel
   - coords: [latitude, longitude]. Deixe null se não souber (não vira pino).
   - highlights: lista de obras/itens a ver -> { name, where, note }
   - desc: texto ou lista de strings (vira tópicos).
   - Depois de editar, abra o app no wi-fi e toque em "Baixar mapas"
     para gravar os tiles offline. Faça commit/push para sincronizar.
   - meta.updated abaixo: atualize a data a cada revisão.
   ============================================================ */

const META = {
  title: "Londres + Paris",
  subtitle: "3 – 12 de Julho de 2026",
  updated: "14/06/2026 — Dia 9 (Oxford): dicas do vídeo — torre da St Mary's (melhor vista), Merton St, Magdalen/punting; transporte com advance singles (~£6–14/trecho) + tarifa child"
};

// Aviso fixo do roteiro
const AVISO = "✅ Já comprados: Eurostar (ida/volta), Torre Eiffel e Louvre. (Tower of London ficou opcional.)";

const DAYS = [
  /* ---------------------- DIA 1 ---------------------- */
  {
    id: 1, date: "3 jul", weekday: "Sexta", city: "Londres", emoji: "✈️",
    title: "Chegada a Londres",
    summary: "Chegada à tarde → check-in, London Eye ao pôr do sol e primeiro pub.",
    places: [
      { name: "Hotel Londres — Park Plaza County Hall", type: "hotel", coords: [51.50166, -0.11713], area: "South Bank · 1 Addington St, SE1 7RY",
        desc: ["Hotel base em Londres (check-in no Dia 1).", "South Bank, ao lado do London Eye e da Westminster Bridge; perto do metrô (Waterloo / Westminster) e do Tâmisa."] },
      { name: "London Eye", type: "atracao", coords: [51.5033, -0.1196], area: "South Bank (~3 min do hotel)",
        price: "~£29 adulto / ~£26 criança (compre online c/ horário)", desc: ["🎡 Se a chegada permitir: roda-gigante ao entardecer, colada ao hotel (funciona até ~20h–21h no verão — confira o horário do dia).",
          "Cápsula de 30 min com vista do Big Ben, Tâmisa e Parlamento ao pôr do sol — abertura mágica da viagem para o filho.",
          "💡 Compre online com horário marcado: mais barato e sem fila."] },
      { name: "The George Inn (pub família)", type: "restaurante", coords: [51.5045, -0.0905], area: "Borough (South Bank)",
        desc: ["Jantar: pub histórico do séc. XVII (pátio galerado, do National Trust) — aceita crianças no jantar (até ~21h, acompanhadas).",
          "Estreie a gastronomia britânica: fish & chips, pie ou bangers & mash.",
          "💡 Mais perto do hotel: The Understudy ou The Marquis of Wellington (South Bank) também são família-friendly."] }
    ],
    tips: [
      "🏃 Treino: dia de chegada = descanso/mobilidade. 15 min de alongamento no quarto.",
      "Passeio leve pelo bairro para se orientar.",
      "Pub no Reino Unido: criança de 12 é bem-vinda em pub que serve comida, acompanhada, normalmente até ~21h.",
      "Compre um cartão Oyster no 1º dia (metrô/ônibus) ou use o cartão contactless direto — funciona igual.",
      "💡 Subir na London Eye logo na chegada dá o 'mapa mental' da cidade."
    ]
  },

  /* ---------------------- DIA 2 ---------------------- */
  {
    id: 2, date: "4 jul", weekday: "Sábado", city: "Londres", emoji: "🏛️",
    title: "British Museum + West End",
    summary: "🏃 Acordar 6h00 (CCR 12 km moderado, Tâmisa) → British Museum, Covent Garden, West End e Chinatown.",
    places: [
      { name: "British Museum", type: "museu", coords: [51.5194, -0.1270], area: "Bloomsbury",
        price: "Gratuito", desc: ["Reserve 3–4h. Estratégia: foco em objetos que contam histórias — evita repetição com o Louvre (que vem depois).",
          "Pular ou deixar para outro dia: mármores do Partenon, moedas, gravuras."],
        highlights: [
          { name: "Pedra de Roseta", note: "O objeto que desbloqueou os hieróglifos egípcios. Ótimo ponto de partida para criar narrativa com o filho." },
          { name: "Múmias egípcias (ex: Katebet)", note: "Múmias com rosto visível, mais 'pessoais' que as do Louvre; impactam muito crianças." },
          { name: "Capacete de Sutton Hoo", note: "Guerreiro anglo-saxão do séc. VII — parece saído de um videogame." },
          { name: "Lindow Man", note: "Corpo humano preservado em turfa por 2.000 anos. Perturbador no bom sentido." },
          { name: "Relevos assírios da Caça ao Leão (650 a.C.)", note: "Narrativa em 'quadrinhos' gravada em pedra. Muito dinâmico." },
          { name: "Peças de xadrez de Lewis", note: "Medievais, expressivos — parecem personagens de fantasia." },
          { name: "Coleções das Américas, África e Oceania", note: "O Louvre é eurocentrado; aproveite o que só existe aqui." }
        ] },
      { name: "Covent Garden", type: "mercado", coords: [51.5117, -0.1240], area: "Covent Garden",
        desc: ["Almoço: comida acessível e boa atmosfera para criança.", "Ambulantes e artistas de rua na praça central (filho vai adorar)."] },
      { name: "Leicester Square", type: "atracao", coords: [51.5103, -0.1300], area: "West End",
        desc: "Cinemas, estátuas, ambiente." },
      { name: "Trafalgar Square", type: "atracao", coords: [51.5080, -0.1281], area: "West End",
        desc: "Praça central icônica, em frente à National Gallery." },
      { name: "National Gallery", type: "museu", coords: [51.5089, -0.1283], area: "Trafalgar Square",
        price: "Gratuito", desc: ["Reserve 1h30. Pegue o mapa gratuito na entrada e use o app da National Gallery (áudio das obras).",
          "💡 Percurso lógico sem backtracking: comece pela Sala 4 (Holbein) e termine na Sala 43 (Van Gogh + Seurat).",
          "Loja do museu tem livros e pôsteres bons e acessíveis."],
        highlights: [
          { name: "Holbein — Os Embaixadores", where: "Sala 4", note: "Ilusão de ótica escondida: uma caveira distorcida no chão, só visível de um ângulo. Ponto alto para criança curiosa." },
          { name: "Uccello — A Batalha de San Romano", where: "Sala 54", note: "Cavalaria medieval com perspectiva experimental. Visualmente épica." },
          { name: "Turner — O Temerário", where: "Sala 34", note: "Navio de guerra rebocado ao pôr do sol. Sobreviveu a Trafalgar e vai para o ferro-velho. Dramático." },
          { name: "Seurat — Os Banhistas em Asnières", where: "Sala 43", note: "Pintado com milhares de pontinhos (pontilhismo). Gancho: funciona como pixels de uma tela digital." },
          { name: "Van Gogh — Girassóis", where: "Sala 43", note: "Conte a história do artista (cortou a orelha, morreu pobre, hoje vale £80M+) e vira narrativa." }
        ] },
      { name: "Piccadilly Circus", type: "atracao", coords: [51.5101, -0.1340], area: "West End",
        desc: ["Para sentir o pulso da cidade.",
          "🛍️ Ponto de partida do eixo de compras a pé: Piccadilly → Regent St → Oxford St (~1,5 km, tudo em sequência)."] },
      { name: "Fortnum & Mason", type: "loja", coords: [51.5089, -0.1383], area: "181 Piccadilly",
        price: "Entrada gratuita · Sáb ~10h–20h", desc: ["🏛️ Loja de departamentos de luxo fundada em 1707, a 'despensa da Rainha'. Vale entrar mesmo sem gastar.",
          "O piso de alimentos é um espetáculo (chás, biscoitos, geleias, chocolates em latas lindas) — ótimo para presentes baratos e icônicos.",
          "Repare no relógio da fachada com bonecos que se movem a cada hora."] },
      { name: "Hatchards", type: "loja", coords: [51.5087, -0.1379], area: "187 Piccadilly (ao lado da Fortnum)",
        price: "Entrada gratuita", desc: "📚 A livraria mais antiga de Londres (1797). Vale a parada rápida para os amantes de livros." },
      { name: "Waterstones Piccadilly", type: "loja", coords: [51.5085, -0.1378], area: "203–206 Piccadilly",
        price: "Entrada gratuita", desc: "📖 Maior livraria da Europa; café no topo com vista. Boa para uma pausa." },
      { name: "Hamleys", type: "loja", coords: [51.5128, -0.1402], area: "188–196 Regent St",
        price: "Entrada gratuita · Sáb ~10h–21h", desc: ["🎁 A maior e mais antiga loja de brinquedos do mundo (desde 1760): 7 andares com demonstrações ao vivo, Lego, Harry Potter, Pokémon.",
          "Imperdível para o filho mesmo aos 13 anos — vale pela experiência."] },
      { name: "Liberty London", type: "loja", coords: [51.5138, -0.1409], area: "Regent St (entrada na Great Marlborough St)",
        price: "Entrada gratuita · Sáb ~10h–20h", desc: ["🎨 Prédio Tudor revival (1924) construído com madeira de navios de guerra — a arquitetura por dentro é um cartão-postal.",
          "Tecidos, papelaria e design. Vale por cultura/arquitetura mesmo sem comprar."] },
      { name: "Apple Regent Street", type: "loja", coords: [51.5151, -0.1413], area: "235 Regent St",
        price: "Entrada gratuita", desc: "🍎 Loja em prédio histórico — ótima para os fãs de tecnologia, a caminho da Oxford St." },
      { name: "Selfridges", type: "loja", coords: [51.5145, -0.1526], area: "400 Oxford St",
        price: "Entrada gratuita · Sáb ~10h–21h", desc: ["🏬 Segunda maior loja de departamentos do UK, fachada icônica e vitrines criativas.",
          "Food hall no subsolo. Bom para passear; preços altos, mas o ambiente vale."] },
      { name: "Primark Oxford Street (Marble Arch)", type: "loja", coords: [51.5141, -0.1573], area: "499–517 Oxford St (flagship)",
        price: "Sáb ~9h–21h", desc: ["🛒 Moda muito barata para a família reabastecer (camisetas, meias, básicos, malas).",
          "Há também uma loja menor em Tottenham Court Rd. Vá com lista para não perder tempo."] },
      { name: "Lego Store Leicester Square", type: "loja", coords: [51.5108, -0.1300], area: "Leicester Square",
        price: "Entrada gratuita", desc: "🧱 A maior loja Lego do mundo — perto de Leicester Sq, onde a família já estará à tarde." },
      { name: "Twinings — loja histórica", type: "loja", coords: [51.5134, -0.1131], area: "216 Strand (~5 min de Trafalgar)",
        price: "Entrada gratuita · Sáb 10h–17h", desc: ["🫖 A loja de chá mais antiga de Londres (desde 1706), na mesma vitrine estreita de 300 anos — repare nos dois leões e na figura chinesa na fachada.",
          "Barra de degustação (provam chás de graça no fundo) + mini-museu com a história do chá.",
          "Ótimo para história/cultura e para comprar presentes baratos: latas e blends que não existem no Brasil."] },
      { name: "Chinatown", type: "restaurante", coords: [51.5115, -0.1310], area: "perto de Leicester Sq",
        desc: ["Jantar barato, saboroso e ótimo para família.",
          "🦆 Four Seasons (12 Gerrard St): famoso pato assado estilo Hong Kong — pratos que a criança reconhece.",
          "🥟 Beijing Dumpling ou Golden Dragon: para dim sum/guiozas, vários pratinhos para compartilhar.",
          "💡 Restaurante com patos na vitrine = bom assado. Chinatown é cheia de famílias chinesas — criança super bem-vinda."] }
    ],
    tips: ["🏃 Treino: acordar 6h00 — CCR 12 km moderado (Z2–Z3). Rota: South Bank → Tower Bridge → Battersea e volta (plana). Correr 6h20–7h35, banho e sair ~9h."]
  },

  /* ---------------------- DIA 3 ---------------------- */
  {
    id: 3, date: "5 jul", weekday: "Domingo", city: "Londres", emoji: "🤖",
    title: "Camden + Colecionáveis + The Shard",
    summary: "🏃 Acordar 7h30 (recuperação ativa, trote leve 25–30 min) → Camden Market e Bandai de manhã, Plataforma 9¾, The Shard ao pôr do sol.",
    places: [
      { name: "Camden Market", type: "mercado", coords: [51.5417, -0.1463], area: "Camden Town (Northern Line)",
        desc: ["🆕 Museus de South Kensington saíram do domingo (lotado) para a segunda — domingo virou mercado + colecionáveis.",
          "Aberto todos os dias 10h–18h. Chegue ~10h, antes de lotar. Comida de rua do mundo todo (almoço no local), lojas alternativas, arte e cultura pop."] },
      { name: "Bandai Namco Cross Store", type: "loja", coords: [51.5413, -0.1466], area: "Stables Market, Camden",
        desc: ["🤖 Tamashii Nations: S.H.Figuarts, Gundam, Dragon Ball, One Piece; exclusivos UK difíceis de achar no Brasil.",
          "Confirme o horário de domingo no site (costuma abrir um pouco mais tarde): bandainamcocrossstoreuk.com/tamashii-nations."] },
      { name: "King's Cross — Plataforma 9¾", type: "loja", coords: [51.5320, -0.1233], area: "King's Cross",
        desc: "🚂 Foto no carrinho do Harry Potter + loja oficial. ~10 min de Camden de metrô, a caminho do centro." },
      { name: "The Shard (The View)", type: "mirante", coords: [51.5045, -0.0865], area: "London Bridge (~10 min do hotel)",
        price: "~£32 adulto / ~£28 criança", desc: ["🌆 72º andar, prédio mais alto do Reino Unido. Marque o horário do pôr do sol: vê Londres de dia e iluminada.",
          "Fecha o dia com chave de ouro."] },
      { name: "Sky Garden", type: "mirante", coords: [51.5113, -0.0837], area: "20 Fenchurch St",
        price: "Gratuito (reserva online antecipada)", desc: "💡 Alternativa grátis ao Shard: jardim no topo com vista. Esgota — reserve com semanas de antecedência." }
    ],
    tips: ["🏃 Treino: acordar 7h30 — recuperação ativa, 25–30 min de trote leve/mobilidade no South Bank antes de Camden.",
      "Tarde leve: Regent's Canal em Camden (barcos, eclusas) ou descanso no hotel antes da noite.",
      "Jantar: Borough Market / Hay's Galleria (South Bank, perto do Shard e do hotel)."]
  },

  /* ---------------------- DIA 4 ---------------------- */
  {
    id: 4, date: "6 jul", weekday: "Segunda", city: "Londres", emoji: "👑",
    title: "Troca da Guarda + Museus de Ciência e Natureza",
    summary: "🏃 Acordar 6h00 (corrida 9 km leve + força) → Troca da Guarda às 11h, depois Natural History e Science Museum.",
    places: [
      { name: "Buckingham Palace — Troca da Guarda", type: "atracao", coords: [51.5014, -0.1419], area: "St James's",
        price: "Gratuito", desc: ["👑 Cerimônia às 11h (~45 min). Cheguem ~10h15 para um bom lugar (grades, Victoria Memorial ou ao longo do The Mall).",
          "⚠️ Só rola em dias selecionados (tipicamente seg/qua/sex) e pode mudar por clima/eventos — confira a data em householddivision.org.uk na semana da viagem.",
          "⏱️ Com a Guarda no mesmo dia, o museu HN não cabe às 10h — entra ~12h30. Se preferir o museu às 10h, teríamos de abrir mão da Guarda."] },
      { name: "St James's Park", type: "parque", coords: [51.5026, -0.1340], area: "Westminster",
        desc: "Um dos parques mais bonitos de Londres — atravesse depois da Guarda rumo ao metrô (Green Park → South Kensington, Piccadilly line, ~12 min)." },
      { name: "Natural History Museum", type: "museu", coords: [51.4967, -0.1764], area: "South Kensington",
        price: "Gratuito", desc: ["Início da tarde (~12h30). Reserve ~2h30. Almoço rápido perto do museu antes de entrar."],
        highlights: [
          { name: "Hintze Hall (Hall Central)", note: "Esqueleto de baleia-azul suspenso no teto. Impacto imediato e obrigatório." },
          { name: "Dinossauros", where: "Blue Zone, 1º andar", note: "Destaque para 12 anos: T-Rex animatrónico, Triceratops, Diplodocus. Galeria longa e bem narrada." },
          { name: "Baleia azul (modelo real 25m)", where: "Blue Zone, térreo", note: "Difícil dimensionar o tamanho sem ver ao vivo." },
          { name: "Evolução humana", where: "Green Zone, 1º andar", note: "Crânios originais de hominídeos, linha do tempo da evolução." },
          { name: "Minerals & Gems", where: "Red Zone, 1º andar", note: "Meteoritos (incluindo pedaço de Marte), cristais gigantes e pedras preciosas." },
          { name: "Earthquake Simulator", where: "Red Zone", note: "Simula o terremoto de Kobe (1995) num supermercado. 30 segundos inesquecíveis." }
        ] },
      { name: "Science Museum", type: "museu", coords: [51.4978, -0.1745], area: "South Kensington",
        price: "Gratuito (Wonderlab/IMAX ~£12)", desc: ["Fim de tarde (a 3 min do NHM). Reserve ~2h."],
        highlights: [
          { name: "Making the Modern World", where: "térreo", note: "Locomotiva Puffing Billy (1814), cápsula Apollo 10 real, DNA de Watson & Crick." },
          { name: "Space", where: "piso 3", note: "Maior galeria espacial do Reino Unido: foguetes reais, módulo lunar, missão Apollo completa." },
          { name: "Computing & Mathematics", where: "piso 2", note: "Dos primeiros computadores à IA; peças de Bletchley Park e criptografia da WWII." },
          { name: "Wonderlab", where: "piso 3 (pago ~£12)", note: "Física, química e luz interativas; demonstrações com nitrogênio líquido, plasma." }
        ] },
      { name: "Kensington High Street", type: "restaurante", coords: [51.5009, -0.1925], area: "Kensington",
        desc: "Jantar: diversas opções, incluindo Wagamama (ótimo custo-benefício)." },
      { name: "Tower of London (OPCIONAL)", type: "atracao", coords: [51.5081, -0.0759], area: "City of London",
        price: "OPCIONAL — caro (~£34 adulto / £17 criança)", desc: ["🏰 Você achou caro, então saiu do roteiro fixo.",
          "Se quiserem mesmo assim (~3h): Jóias da Coroa e Beefeaters são o ponto alto. Encaixe num período livre (ex.: manhã do Dia 10).",
          "Por fora, a Tower Bridge e a muralha já valem a foto de graça."] }
    ],
    tips: ["🏃 Treino (sessão dupla — a corrida migrou da terça pra cá): acordar 6h00. Corrida CCL 9 km leve no Tâmisa 6h15–7h05, depois força Tronco+Core+MMII (3 séries) 7h15–8h00. Sobra manhã até a Guarda às 11h.",
      "A Guarda só ocorre seg/qua/sex (quarta/sexta caem em Paris/Greenwich) — por isso ficou na segunda.",
      "Museus em dia útil = bem menos cheios que no domingo."]
  },

  /* ---------------------- DIA 5 ---------------------- */
  {
    id: 5, date: "7 jul", weekday: "Terça", city: "Paris", emoji: "🚄",
    title: "Eurostar → Paris | Saint-Germain + Tuileries",
    summary: "Eurostar 10h30 (chegada ~13h45), tarde em Saint-Germain (Les Deux Magots, Au Plat d'Étain, Jardin du Luxembourg, Notre-Dame) + Invalides e Rodin por fora (Solférino, L12 direto), jantar no Bouillon Chartier, noite na Fête des Tuileries.",
    places: [
      { name: "London St Pancras International", type: "transporte", coords: [51.5320, -0.1263], area: "Londres",
        desc: ["✅ Eurostar comprado: partida 10h30 (7/jul) — ~2h15 até Paris Gare du Nord, chegada ~13h45 (1h de fuso a mais).",
          "⏰ Estejam em St Pancras ~9h30 (check-in/segurança/imigração fecham 30–45 min antes).",
          "Passaporte obrigatório. ETA não vale para a França — brasileiros não precisam de visto (90 dias Schengen)."] },
      { name: "Paris Gare du Nord", type: "transporte", coords: [48.8809, 2.3553], area: "Paris",
        desc: "Chegada ~13h45. Ao hotel (zona Montparnasse): L4 até Montparnasse-Bienvenüe → troca L12 → Vaugirard (~30 min). Deixem as mochilas e sigam ao passeio." },
      { name: "Café Les Deux Magots", type: "restaurante", coords: [48.8540, 2.3333], area: "Saint-Germain-des-Prés (6e)",
        price: "Caro p/ refeição (~€7–9 só o café)", desc: ["6, place Saint-Germain-des-Prés — café histórico de Sartre, Beauvoir, Hemingway e Picasso.",
          "💡 Vão só para um café/chocolate quente e a experiência — não para almoçar.",
          "Terraço em frente à igreja mais antiga de Paris (Saint-Germain-des-Prés)."] },
      { name: "Au Plat d'Étain", type: "loja", coords: [48.8527, 2.3340], area: "Saint-Germain (Paris 6e)",
        desc: ["16, rue Guisarde (3 min a pé dos Deux Magots) · Ter–Sáb 10h30–17h ⏰ cheguem antes das 17h.",
          "Loja de figurines de coleção desde 1775 — soldados históricos, Astérix & Obélix, pintados à mão.",
          "Ótimo para o filho de 12 anos; peças únicas fora do circuito de souvenir."] },
      { name: "Jardin du Luxembourg", type: "parque", coords: [48.8462, 2.3372], area: "Paris 6e",
        price: "Gratuito", desc: ["O jardim mais querido de Paris (~8 min a pé do Au Plat d'Étain).",
          "Veleiros de brinquedo no tanque octogonal (aluga-se por poucos euros) — diversão clássica para o filho.",
          "Palais du Luxembourg (Senado), pomar e cadeiras verdes para descansar depois do trem."] },
      { name: "Notre-Dame de Paris", type: "igreja", coords: [48.8530, 2.3499], area: "Île de la Cité",
        price: "Gratuito (reserva online recomendada)", desc: ["Reaberta em dez/2024 após restauração. Exterior impressionante, interior restaurado."] },
      { name: "Pont Neuf", type: "atracao", coords: [48.8566, 2.3412], area: "Île de la Cité",
        desc: "A ponte mais antiga de Paris; caminhe pela ilha (Place Dauphine)." },
      { name: "Shakespeare & Company", type: "loja", coords: [48.8525, 2.3470], area: "frente a Notre-Dame",
        desc: ["Livraria mais famosa do mundo, à beira do Sena.", "Livros novos e usados, gatos que moram na loja, história literária rica."] },
      { name: "Grande Mosquée de Paris", type: "atracao", coords: [48.8420, 2.3550], area: "Quartier Latin (5e)",
        desc: ["⚠️ Opcional — só se sobrar tempo (a tarde fica curta com chegada às 13h45).", "Passar por fora, ~15 min a pé a sudeste. Arquitetura hispano-mourisca: azulejos, minarete de 33 m, pátios de inspiração da Alhambra.", "💡 Barato: salão de chá com chá de menta + doces árabes."] },
      { name: "Musée Rodin", type: "museu", coords: [48.8553, 2.3158], area: "Paris 7e",
        price: "Só jardim ~€5 (grátis < 18) — ou ver por fora", desc: ["🆕 Migrou da quarta para cá (a quarta de manhã virou banho na Seine).", "Só por fora: dá para ver 'O Pensador' e o jardim pela grade.", "Do Saint-Germain/Luxembourg: ~15 min a pé a oeste, ou L12 de Rennes/hotel direto a Solférino → ~10 min a pé."] },
      { name: "Les Invalides", type: "atracao", coords: [48.8566, 2.3126], area: "Paris 7e",
        desc: ["🆕 Migrou da quarta para cá. Por fora: o domo dourado (Túmulo de Napoleão) é uma das silhuetas mais bonitas de Paris.", "Coladinho ao Rodin; a esplanada já vale a passada. Boa luz de fim de tarde para fotos."] },
      { name: "Quatorze Running (loja de corrida)", type: "loja", coords: [48.8398, 2.3216], area: "14 rue de l'Ouest, 14e (Montparnasse)",
        price: "Ter–Sáb 10h30–19h30", desc: ["🏃 Substitui a Run and Become de Londres: loja especializada em corrida e trail, atendimento técnico.",
          "Marcas: Hoka, Asics, Brooks, Saucony, On, Altra; relógios GPS e nutrição.",
          "📍 Do lado do hotel (Montparnasse), a ~5 min do Bouillon Chartier — passe antes do jantar, sem desvio."] },
      { name: "Bouillon Chartier", type: "restaurante", coords: [48.8430, 2.3245], area: "Montparnasse (Paris 14e)",
        price: "Barato (~€12–15/prato)", desc: ["Jantar sugerido (7/jul): 59 bd du Montparnasse — bistrô histórico, ambiente belle époque animado.",
          "Clássicos franceses baratos: boeuf bourguignon, confit, profiteroles. Ótimo para família.",
          "Não reserva — pode ter fila, mas anda rápido. A caminho do hotel (Vaugirard/L12).",
          "Alternativa: crêperies da rue du Montparnasse (galette + crêpe doce, agrada o filho)."] },
      { name: "Fête des Tuileries", type: "parque", coords: [48.8634, 2.3275], area: "Jardin des Tuileries (1er)",
        price: "Entrada grátis (paga só os brinquedos)", desc: ["Parque de diversões de verão (20/jun–23/ago 2026, todos os dias 11h–23h30).", "A 'noite mágica' do filho: roda-gigante com vista de Paris ao entardecer.", "Escurece ~21h30 no verão — dá tempo de jantar e curtir a roda iluminada.", "💡 Quem quiser jantar de street food no parque pode pular o Bouillon Chartier."] }
    ],
    tips: ["🏃 Treino: DESCANSO (a corrida de 9 km passou para segunda). Dia de viagem — Eurostar 10h30, chegue tranquilo a St Pancras (~9h30).",
      "A L12 conecta o hotel direto a Concorde (Tuileries), Solférino (Rodin) e Abbesses/Pigalle (Montmartre).", "Volta ao hotel à noite: de Concorde, L12 direto.", "Tarde enxuta (chegada 13h45): priorize Les Deux Magots + Au Plat d'Étain (fecha 17h) + Luxembourg; Invalides/Rodin por fora no fim de tarde (sem horário); Mosquée fica como opcional.", "🆕 Invalides + Rodin migraram da quarta para cá — a quarta de manhã agora é banho na Seine (Bras de Grenelle)."]
  },

  /* ---------------------- DIA 6 ---------------------- */
  {
    id: 6, date: "8 jul", weekday: "Quarta", city: "Paris", emoji: "🗼",
    title: "Torre Eiffel + Arco do Triunfo + Montmartre",
    summary: "🏊 Banho na Seine às 8h (Bras de Grenelle, 15e) → caminhada ribeirinha até a Torre Eiffel às 10h, Arco do Triunfo e Montmartre ao pôr do sol.",
    places: [
      { name: "Banho na Seine — Bras de Grenelle", type: "parque", coords: [48.8512, 2.2790], area: "Pont de Grenelle (15e)",
        price: "Gratuito · 8h–18h (4 jul–30 ago 2026)", desc: ["🆕 Um dos 3 pontos oficiais de banho na Seine, em frente à réplica da Estátua da Liberdade (Île aux Cygnes).", "🕗 Cheguem às 8h na abertura — saiam do banho até ~9h15 para não apertar a Torre 10h. Do hotel (Vaugirard/15e): pertinho, ~10 min de metrô/RER ou táxi.", "Gratuito e com salva-vidas; vestiário + chuveiro no local (trocam ali, não voltam molhados). Levem toalha, chinelo e sacola impermeável; pertences ao mínimo (sem guarda-volumes confiável).", "⚠️ Pode fechar sem aviso se chover forte ou a corrente subir — tenham plano B. Água ~20–22°C (gelada p/ padrão BR); controle de profundidade/idade para o filho — confira a sinalização.", "Depois: ~15–20 min a pé pela beira do rio (via Île aux Cygnes) direto à Torre Eiffel."] },
      { name: "Torre Eiffel", type: "atracao", coords: [48.8584, 2.2945], area: "Paris 7e",
        price: "✅ INGRESSO COMPRADO — 10h, 8/jul · 2º andar ~€19/€9,50 · topo ~€28/€14", desc: ["Cheguem ~9h40 para a revista de segurança (mochila passa por revista — venham leves).", "Reservem 2–3h, sem pressa — o dia está folgado.", "⚠️ Vidro e álcool proibidos dentro da Torre (no gramado do Champ de Mars, tudo certo)."] },
      { name: "Champ de Mars", type: "parque", coords: [48.8556, 2.2986], area: "Paris 7e",
        desc: ["Almoço: piquenique clássico na grama em frente à Torre.", "Baguete + queijo + frutas de boulangerie próxima."] },
      { name: "Arco do Triunfo", type: "atracao", coords: [48.8738, 2.2950], area: "Place Charles de Gaulle–Étoile",
        desc: ["Só por fora (vocês já têm a vista do alto da Eiffel): arquitetura imperial, relevos e o Túmulo do Soldado Desconhecido (chama reacesa 18h30).", "⚠️ Use a passagem subterrânea — nunca atravesse a rotatória.", "Do Champ de Mars: suba ao Trocadéro (foto clássica da Eiffel) e desça os Champs-Élysées."] },
      { name: "Basilique du Sacré-Cœur", type: "igreja", coords: [48.8867, 2.3431], area: "Montmartre",
        price: "Gratuito", desc: ["Suba de funicular (gratuito com o passe de metrô).", "Vista panorâmica de Paris de graça — linda ao pôr do sol."] },
      { name: "Place du Tertre", type: "atracao", coords: [48.8865, 2.3408], area: "Montmartre",
        desc: "Pintores ao ar livre (filho vai gostar). Becos das Abadessas e moinhos históricos por perto." },
      { name: "Espace Dalí", type: "museu", coords: [48.8862, 2.3389], area: "Montmartre",
        desc: "Opcional indoor: esculturas surreais e relógios derretendo — a melhor parada de Montmartre para criança." }
    ],
    tips: ["🏊 Treino de hoje = o próprio banho na Seine (Bras de Grenelle, 8h). Quem quiser ainda corre 7h–7h40 pela beira do rio antes.",
      "🕗 Banho 8h–9h15 → caminhada ribeirinha → Torre 10h (cheguem 9h40 p/ revista). Se o banho fechar/atrasar, plano B: passar no Rodin/Invalides por fora a caminho da Torre.",
      "Volta ao hotel: de Montmartre, L12 (Abbesses/Pigalle) direto.", "Jantar em Abbesses (bons bistrôs) ou de volta ao centro."]
  },

  /* ---------------------- DIA 7 ---------------------- */
  {
    id: 7, date: "9 jul", weekday: "Quinta", city: "Paris", emoji: "🖼️",
    title: "Museu do Louvre → Retorno a Londres",
    summary: "🏃 Acordar 6h15 (CCL 8 km leve, opcional) → Louvre às 10h30, almoço rápido, Eurostar de volta 16h12 (chegada Londres ~17h27).",
    places: [
      { name: "Museu do Louvre", type: "museu", coords: [48.8606, 2.3376], area: "Paris 1er",
        price: "~€22 adulto / grátis < 18 — ✅ INGRESSO COMPRADO: 10h30, 9/jul", desc: ["Checkout no hotel de manhã; mochilas no vestiaire gratuito do Louvre.",
          "Manhã (~10h30 até ~13h30, ~3h). ⚠️ Olho no relógio: o trem é 16h12. Entrem pela pirâmide menor (Carrousel du Louvre).",
          "Pular: antiguidades egípcias e gregas menores (já vistas no British)."],
        highlights: [
          { name: "Mona Lisa / ala Denon", note: "Logo cedo, antes de lotar mais — vale a experiência do fenômeno, mais que o quadro." },
          { name: "Vênus de Milo e Vitória de Samotrácia", note: "Impactantes, não exigem explicação." },
          { name: "Apartamentos de Napoleão III", where: "ala Richelieu", note: "Luxo de cenário de filme — ótimo para adolescente." },
          { name: "Castelo medieval no subsolo", where: "Sully, piso -1", note: "Fundações da fortaleza do séc. XII, concreto e inesperado." },
          { name: "Grande Galerie + Coleção islâmica", note: "3–4 telas (Caravaggio, Vermeer, Bodas de Caná) + a ala islâmica, se houver fôlego." }
        ] },
      { name: "Le Marais (Rue des Rosiers)", type: "restaurante", coords: [48.8571, 2.3590], area: "Paris 4e",
        desc: "Almoço rápido (~13h30): falafel famoso e barato, ou boulangerie. ⚠️ Não demorem — o trem é 16h12. Opção mais perto: Tuileries, ao lado do Louvre." },
      { name: "Paris Gare du Nord", type: "transporte", coords: [48.8809, 2.3553], area: "Paris",
        desc: ["✅ Eurostar de volta comprado: 16h12 → chegada London St Pancras ~17h27.", "Estejam na Gare du Nord até ~15h30 (check-in/segurança/imigração britânica fecham 30–45 min antes — não arrisquem a fila)."] },
      { name: "Chegada Londres → hotel (South Bank)", type: "transporte", coords: [51.5320, -0.1263], area: "King's Cross St Pancras",
        desc: ["Chegada ~17h27. Sem troca de linha: Circle line (sentido Tower Hill) → Westminster → atravessar a Westminster Bridge a pé (~10 min).", "Com bagagem, táxi/Uber St Pancras → County Hall (~15–20 min, ~£15–20) é cômodo."] }
    ],
    tips: ["🏃 Treino (opcional/dia de viagem): CCL 8 km leve. Se acordar 6h15, correr 6h30–7h15 pela beira do Sena antes do checkout. Louvre 10h30 + Eurostar 16h12 — não atrase.",
      "🎽 London 10K: se voltar do Eurostar a tempo (~17h27), dá para tentar retirar o bib na Saucony Store (Covent Garden, fecha 19h) — apertado. Senão, sexta 10 é a melhor janela.",
      "Jantar tranquilo no South Bank, perto do hotel — amanhã Greenwich!"]
  },

  /* ---------------------- DIA 8 ---------------------- */
  {
    id: 8, date: "10 jul", weekday: "Sexta", city: "Londres", emoji: "⚓",
    title: "Greenwich",
    summary: "🏃 Acordar 6h45 (CCR 7 km leve) → dia inteiro em Greenwich de barco. 🎽 Na volta: retirar o bib da London 10K na Saucony Store (Covent Garden).",
    places: [
      { name: "Westminster Pier", type: "transporte", coords: [51.5009, -0.1226], area: "Westminster",
        desc: "💡 Pegue o Thames Clipper aqui até Greenwich — viagem pelo Tâmisa com vistas incríveis (~£10/pessoa)." },
      { name: "Cutty Sark", type: "atracao", coords: [51.4827, -0.0096], area: "Greenwich",
        price: "~£18 adulto / £9 criança", desc: "Navio-museu clipper do século XIX." },
      { name: "National Maritime Museum", type: "museu", coords: [51.4810, -0.0056], area: "Greenwich",
        price: "Gratuito", desc: "Maior museu marítimo do mundo." },
      { name: "Queen's House", type: "museu", coords: [51.4807, -0.0053], area: "Greenwich",
        price: "Gratuito", desc: "Arquitetura inacreditável, galeria de arte." },
      { name: "Greenwich Market", type: "mercado", coords: [51.4816, -0.0091], area: "Greenwich",
        desc: "Almoço: mercado coberto com comida artesanal." },
      { name: "Royal Observatory de Greenwich", type: "atracao", coords: [51.4769, -0.0005], area: "Greenwich",
        price: "Planetário ~£10", desc: ["Onde fica o Meridiano de Greenwich (0° de longitude).", "Foto clássica com um pé em cada hemisfério 🌍.", "Vista panorâmica de Londres do alto da colina do parque."] }
    ],
    tips: ["🏃 Treino: acordar 6h45 — CCR 7 km leve, 7h00–7h45 no South Bank (ou corra no próprio Greenwich Park, lindo e ondulado).",
      "🎽 London 10K: na volta de Greenwich, passe na Saucony Store (4 James St, Covent Garden, abre até 19h) para retirar o bib — melhor janela da semana. Leve foto + QR code."]
  },

  /* ---------------------- DIA 9 ---------------------- */
  {
    id: 9, date: "11 jul", weekday: "Sábado", city: "Oxford", emoji: "🎓",
    title: "Oxford",
    summary: "Dia inteiro em Oxford — trem de Paddington (~50–60 min). Compre advance singles antecipados (~£6–14/trecho) p/ economizar.",
    places: [
      { name: "Paddington Station", type: "transporte", coords: [51.5154, -0.1755], area: "Londres",
        desc: ["Trem para Oxford (~50–60 min).", "💷 Compre advance singles antecipados (gwr.com / thetrainline): ~£6–14/trecho vs ~£25–35 na hora. Sábado é off-peak o dia todo.", "Filho (13) paga tarifa child (5–15). Alternativa barata: ônibus Oxford Tube/National Express de Victoria (~£16–20 ida/volta, ~1h40)."] },
      { name: "Christ Church College", type: "atracao", coords: [51.7505, -1.2557], area: "Oxford",
        price: "~£18 (online economiza ~£2)", desc: ["O college mais famoso; o refeitório (Great Hall) inspirou o de Hogwarts.", "⚠️ Sábado: o Great Hall fecha das 10h30 às 14h — cheguem antes das 10h30 ou depois das 14h para vê-lo.", "A catedral fecha 16h45 para o coro."] },
      { name: "Radcliffe Camera", type: "atracao", coords: [51.7536, -1.2540], area: "Oxford",
        desc: "Arquitetura medieval de tirar o fôlego." },
      { name: "Torre da University Church of St Mary the Virgin", type: "atracao", coords: [51.7527, -1.2535], area: "Oxford",
        price: "~£5–6", desc: "🆕 Dica do vídeo: 127 degraus até a melhor vista panorâmica de Oxford (Radcliffe Camera vista de cima e as 'dreaming spires'). Barato e a melhor foto do dia." },
      { name: "Merton Street", type: "atracao", coords: [51.7511, -1.2517], area: "Oxford",
        price: "Gratuito", desc: "🆕 Dica do vídeo: a rua de paralelepípedos medieval mais bonita de Oxford, ao lado do Christ Church/Merton. 5 min, ótima para fotos." },
      { name: "Bodleian Library", type: "atracao", coords: [51.7548, -1.2543], area: "Oxford",
        desc: "Uma das bibliotecas mais antigas da Europa." },
      { name: "Sheldonian Theatre", type: "atracao", coords: [51.7544, -1.2552], area: "Oxford",
        desc: "Projetado por Christopher Wren." },
      { name: "Covered Market de Oxford", type: "mercado", coords: [51.7520, -1.2575], area: "Oxford",
        desc: "Almoço: sanduíches, tortas, café. Histórico e barato." },
      { name: "Ashmolean Museum", type: "museu", coords: [51.7556, -1.2603], area: "Oxford",
        price: "Gratuito", desc: "Museu de arte e arqueologia." },
      { name: "Magdalen College + rio (opcional)", type: "atracao", coords: [51.7522, -1.2470], area: "Oxford",
        price: "~£8", desc: "🆕 Dica do vídeo: deer park, Addison's Walk e a ponte do punting (passeio de barco a vara — pegue com barqueiro/chauffeured com criança). Escolha ENTRE isto e a tarde de museu/colleges — não cabem os dois." },
      { name: "University Parks", type: "parque", coords: [51.7605, -1.2520], area: "Oxford",
        desc: "Parque enorme, perfeito para descanso. Passeie pelos colleges (Merton, Balliol, New College)." },
      { name: "G&D's (sorvete)", type: "restaurante", coords: [51.7490, -1.2565], area: "Oxford",
        desc: "Instituição oxfordiana — sorvete." }
    ],
    tips: [
      "🏃 Treino: véspera da prova — taper. Faça só 15–20 min de trote leve OU descanse. Nada de esforço forte hoje.",
      "🎽 Plano C do bib: se não retirou na sexta, e voltar cedo de Oxford, a Saucony Store abre sáb 10h–17h30 (fecha mais cedo!).",
      "💡 Para o filho: Oxford é onde estudaram Tolkien, C.S. Lewis, Stephen Hawking e Oscar Wilde. Ótima conversa durante o passeio.",
      "💷 Reserve os trens advance singles assim que possível — o preço sobe perto da data.",
      "Retorno a Londres: trem à tarde, jantar de despedida em Londres."
    ]
  },

  /* ---------------------- DIA 10 ---------------------- */
  {
    id: 10, date: "12 jul", weekday: "Domingo", city: "Londres", emoji: "🏅",
    title: "London 10K → Partida",
    summary: "🏅 London 10K às 9h30 (Piccadilly→Whitehall), depois South Bank leve e partida à noite.",
    places: [
      { name: "🏅 London 10K — Largada (Piccadilly)", type: "atracao", coords: [51.5089, -0.1376], area: "Piccadilly · largada 9h30",
        desc: ["Saucony London 10K — domingo 12/07, largada 9h30. Largada em Piccadilly, chegada em Whitehall (SW1A 2AS).",
          "Bag drop + Help Desk: Waterloo Place, SW1Y 5ER — abre 7h45, fecha 13h00. Hotel→largada ~20–25 min a pé ou metrô (Westminster/Embankment).",
          "🎽 Retirada do KIT (bib): Saucony Store, 4 James St, Covent Garden WC2E 8BH — Qua8–Sex10 12h–19h, Sáb11 10h–17h30. Levar foto + QR code. ⚠️ Melhor janela: sexta 10/07 fim de tarde (volta de Greenwich) — bib só é retirado presencialmente.",
          "Dia da partida: corra leve, sem mala (checkout com guarda-volumes no hotel). Vai estar quente — protetor solar; água nos km 4,2 e 7,2."] },
      { name: "Borough Market", type: "mercado", coords: [51.5055, -0.0909], area: "London Bridge",
        price: "Dom 10h–16h", desc: ["Último almoço/brunch de despedida: um dos melhores mercados de comida do mundo.", "Pão artesanal, queijos, comidas do mundo — tudo acessível. A ~10 min do hotel."] },
      { name: "Tate Modern", type: "museu", coords: [51.5076, -0.0994], area: "South Bank",
        price: "Gratuito", desc: ["Última dose de cultura, coladinho ao hotel.", "Turbine Hall sempre tem instalação de grande escala — impressionante."] },
      { name: "Tower of London (OPCIONAL)", type: "atracao", coords: [51.5081, -0.0759], area: "City of London",
        price: "OPCIONAL — ~£34 adulto / £17 criança", desc: ["🏰 Só para os corajosos: ~3h, se acordarem cedo e com pique. É a janela que sobrou caso queiram encaixá-la (você a marcou como opcional por ser cara)."] },
      { name: "Heathrow Airport", type: "transporte", coords: [51.4700, -0.4543], area: "Londres",
        desc: ["Partida à noite — chegue com 3h de antecedência.", "Linha Piccadilly direto do centro (~1h, ~£6)."] }
    ],
    tips: ["🏃 Acordar 6h30 — a London 10K (9h30) substitui o longo do plano. Sair do hotel ~7h30, leve/race-ready.", "🎽 Bib deve ter sido retirado antes (ideal: sexta 10 na volta de Greenwich).", "Borough Market abre domingo (10h–16h) — último almoço após a prova.", "Noite: Heathrow com 3h de antecedência."]
  }
];

/* -------------------- RESTAURANTES / ONDE COMER --------------------
   Sempre com opção pensando na criança de 12 anos.
   wiki = título do artigo na Wikipédia (foto); deixe "" se não houver. */
const RESTAURANTES = [
  { name: "The George Inn", city: "Londres", area: "Borough · South Bank (Dia 1)", cuisine: "Pub britânico",
    avg: "~£14–18/prato", kids: "Fish & chips, bangers & mash, salsicha com purê — clássicos que criança adora.", wiki: "George Inn, Southwark" },
  { name: "Four Seasons", city: "Londres", area: "Chinatown (Dia 2)", cuisine: "Cantonês / pato assado",
    avg: "~£10–16/prato", kids: "Pato assado, arroz frito, noodles, frango xadrez — sabores familiares.", wiki: "" },
  { name: "Beijing Dumpling", city: "Londres", area: "Chinatown (Dia 2)", cuisine: "Dim sum / dumplings",
    avg: "~£5–9/porção", kids: "Guiozas, xiao long bao e pãezinhos cozidos — divertido de comer com a mão.", wiki: "" },
  { name: "Wagamama", city: "Londres", area: "Kensington High St (Dia 4)", cuisine: "Asiático (ramen/katsu)",
    avg: "~£12–16/prato", kids: "Tem MENU INFANTIL próprio: mini ramen, katsu de frango, suco. Ótimo custo-benefício.", wiki: "" },
  { name: "Borough Market", city: "Londres", area: "London Bridge (Dia 10)", cuisine: "Mercado gastronômico",
    avg: "~£6–12/porção", kids: "Enorme variedade: pão fresco, queijos, brownies, hambúrguer, comida do mundo.", wiki: "Borough Market" },
  { name: "Greenwich Market", city: "Londres", area: "Greenwich (Dia 8)", cuisine: "Mercado / street food",
    avg: "~£6–10/porção", kids: "Crepes, hambúrguer, doces e comida de rua — escolhe-se na hora.", wiki: "Greenwich Market" },
  { name: "Oxford Covered Market", city: "Oxford", area: "Oxford (Dia 9)", cuisine: "Mercado histórico",
    avg: "~£5–10/porção", kids: "Sanduíches, tortas e o sorvete do G&D's — instituição oxfordiana.", wiki: "Oxford Covered Market" },
  { name: "Bouillon Chartier Montparnasse", city: "Paris", area: "Montparnasse (Dia 5 · jantar)", cuisine: "Bistrô francês clássico",
    avg: "~€12–15/prato", kids: "Steak-frites, frango assado, purê e profiteroles. Barato e animado.", wiki: "Bouillon Chartier" },
  { name: "Crêperies de Montparnasse", city: "Paris", area: "Rue du Montparnasse (Dia 5)", cuisine: "Crêpes & galettes bretãs",
    avg: "~€8–12", kids: "Galette de presunto-queijo + crêpe de Nutella/açúcar. Quase sempre agrada.", wiki: "" },
  { name: "Café Les Deux Magots", city: "Paris", area: "Saint-Germain (Dia 5)", cuisine: "Café histórico francês",
    avg: "Café ~€7–9 · pratos €20+", kids: "Vão pela experiência: chocolate quente + croque-monsieur. Refeição completa é cara.", wiki: "Les Deux Magots" },
  { name: "L'As du Fallafel", city: "Paris", area: "Le Marais, Rue des Rosiers (Dia 7)", cuisine: "Oriente Médio / falafel",
    avg: "~€8–10/sanduíche", kids: "Falafel no pão + batata frita; opção de shawarma de frango. Famoso e barato.", wiki: "" },
  { name: "Piquenique no Champ de Mars", city: "Paris", area: "Em frente à Torre Eiffel (Dia 6 · almoço)", cuisine: "Boulangerie / piquenique",
    avg: "~€4–8/pessoa", kids: "Monte com baguete, queijo, presunto, frutas e croissant — comer na grama é parte da diversão.", wiki: "" }
];

/* -------------------- INFO PRÁTICA -------------------- */
const PRATICO = {
  custos: {
    titulo: "💰 Estimativa de custos (3 pessoas)",
    itens: [
      ["Eurostar ida e volta (3 pessoas) ✅", "£360–500"],
      ["Torre Eiffel (topo, 3 pessoas) ✅", "~€84"],
      ["Louvre (2 adultos — menor grátis) ✅", "~€44"],
      ["London Eye (3 pessoas)", "~£84"],
      ["The Shard (3 pessoas)", "~£92 (grátis no Sky Garden)"],
      ["Cutty Sark", "~£45"],
      ["Tower of London", "~£85 (OPCIONAL — caro)"],
      ["Guarda · British · NHM · Science · Tate · Sky Garden", "Grátis"]
    ],
    notas: [
      "Alimentação Londres: £15–25/refeição p/ 3 (mercados). Restaurantes: £35–60 p/ 3.",
      "Alimentação Paris: €20–35/refeição p/ 3 (bistrô/boulangerie). Restaurantes: €50–80 p/ 3."
    ]
  },
  apps: {
    titulo: "📱 Apps essenciais",
    itens: [
      ["Citymapper", "Transporte em Londres e Paris (melhor que Google Maps p/ isso)"],
      ["Eurostar", "Bilhetes e horários"],
      ["Google Maps offline", "Baixe Londres e Paris sem internet"],
      ["Paris Musées", "Ingresso para museus parisienses"],
      ["Thames Clipper", "Barcos pelo Tâmisa"]
    ]
  },
  lembretes: {
    titulo: "⚠️ Lembretes críticos",
    itens: [
      "✅ Já comprados: Eurostar ida (7/jul 10h30) e volta (9/jul 16h12), Torre Eiffel (8/jul 10h), Louvre (9/jul 10h30).",
      "Brasileiros na França: livre de visto até 90 dias (Schengen) — só passaporte.",
      "Transporte Paris: Navigo Easy card ou contactless (metrô + RER).",
      "Seguro viagem: confirme que cobre também a França."
    ]
  },
  dicas: {
    titulo: "💡 Dicas para Londres com família",
    itens: [
      "Transporte: o Tube é o mais prático. Linha Piccadilly liga Heathrow ao centro.",
      "Alimentação barata: Tesco, Sainsbury's, M&S têm pratos prontos por £3–5.",
      "Gratuito: a maioria dos grandes museus é 100% gratuita — vale muito com criança.",
      "Segurança: Londres é segura, mas atenção a pickpockets no metrô e em áreas turísticas.",
      "Clima: julho é o melhor mês (mais seco/quente), mas imprevisível — leve capa de chuva.",
      "Tomada: UK usa Tipo G (3 pinos) — leve adaptador universal."
    ]
  },
  checklist: {
    titulo: "✅ Checklist",
    itens: [
      "Reservar hotel em Paris (7–9 jul).",
      "Verificar passaportes individuais (inclusive de menores).",
      "Solicitar férias formalmente ao RH (≥10 dias) e confirmar por escrito.",
      "Contratar seguro viagem p/ 3 (mín. USD 100.000 médica).",
      "Wise/Nomad para GBP + cartão de crédito internacional de backup.",
      "Separar £200–300 em espécie (comprar no Brasil).",
      "Pré-comprar ingressos: Tower of London, Torre Eiffel, Louvre, Eurostar.",
      "Cópias digitais (offline) + 1 física de todos os documentos.",
      "Avisar banco/operadora sobre viagem internacional.",
      "Kit de farmácia + medicamentos de uso contínuo (+ prescrição p/ controlados).",
      "Adaptador de tomada Tipo G; carregar dispositivos.",
      "Pesar malas (limite 23kg/pessoa); chegar ao aeroporto com 3h."
    ]
  }
};
