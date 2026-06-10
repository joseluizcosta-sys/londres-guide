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
  updated: "10/06/2026 — V4: Londres reorganizada (museus na 2ª · Camden+Bandai+Shard no dom 5 · Troca da Guarda · London Eye chegada · Tower opcional) + Paris (Les Deux Magots, Luxembourg, Bouillon Chartier) + fotos da Wikipédia"
};

// Aviso fixo do roteiro
const AVISO = "✅ Já comprados: Eurostar (ida/volta), Torre Eiffel e Louvre. Falta confirmar o ingresso da Tower of London (esgota rápido em julho — compre online).";

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
    summary: "Manhã no British Museum, tarde em Covent Garden e West End, jantar em Chinatown.",
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
        desc: "Para sentir o pulso da cidade." },
      { name: "Run and Become", type: "loja", coords: [51.4945, -0.1465], area: "Victoria",
        desc: ["4 Eccleston St, Victoria (SW1W 9LN) · ~15 min a pé de Trafalgar Square.",
          "Loja especializada em corrida e trail desde 1982; análise de passada, pista de teste interna.",
          "Marcas: Hoka, Saucony, Mizuno, On Running — atendimento técnico, sem pressão.",
          "Ótimo para comprar calçado de corrida/trail com orientação especializada."] },
      { name: "Chinatown", type: "restaurante", coords: [51.5115, -0.1310], area: "perto de Leicester Sq",
        desc: ["Jantar barato, saboroso e ótimo para família.",
          "🦆 Four Seasons (12 Gerrard St): famoso pato assado estilo Hong Kong — pratos que a criança reconhece.",
          "🥟 Beijing Dumpling ou Golden Dragon: para dim sum/guiozas, vários pratinhos para compartilhar.",
          "💡 Restaurante com patos na vitrine = bom assado. Chinatown é cheia de famílias chinesas — criança super bem-vinda."] }
    ],
    tips: []
  },

  /* ---------------------- DIA 3 ---------------------- */
  {
    id: 3, date: "5 jul", weekday: "Domingo", city: "Londres", emoji: "🤖",
    title: "Camden + Colecionáveis + The Shard",
    summary: "Camden Market e Bandai de manhã, Plataforma 9¾ a caminho, The Shard ao pôr do sol.",
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
    tips: ["Tarde leve: Regent's Canal em Camden (barcos, eclusas) ou descanso no hotel antes da noite.",
      "Jantar: Borough Market / Hay's Galleria (South Bank, perto do Shard e do hotel)."]
  },

  /* ---------------------- DIA 4 ---------------------- */
  {
    id: 4, date: "6 jul", weekday: "Segunda", city: "Londres", emoji: "👑",
    title: "Troca da Guarda + Museus de Ciência e Natureza",
    summary: "Troca da Guarda às 11h, depois Natural History e Science Museum (dia útil = menos cheio).",
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
    tips: ["A Guarda só ocorre seg/qua/sex (quarta/sexta caem em Paris/Greenwich) — por isso ficou na segunda.",
      "Museus em dia útil = bem menos cheios que no domingo."]
  },

  /* ---------------------- DIA 5 ---------------------- */
  {
    id: 5, date: "7 jul", weekday: "Terça", city: "Paris", emoji: "🚄",
    title: "Eurostar → Paris | Saint-Germain + Tuileries",
    summary: "Eurostar 10h30 (chegada ~13h45), tarde em Saint-Germain (Les Deux Magots, Au Plat d'Étain, Jardin du Luxembourg, Notre-Dame), jantar no Bouillon Chartier, noite na Fête des Tuileries.",
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
      { name: "Bouillon Chartier", type: "restaurante", coords: [48.8430, 2.3245], area: "Montparnasse (Paris 14e)",
        price: "Barato (~€12–15/prato)", desc: ["Jantar sugerido (7/jul): 59 bd du Montparnasse — bistrô histórico, ambiente belle époque animado.",
          "Clássicos franceses baratos: boeuf bourguignon, confit, profiteroles. Ótimo para família.",
          "Não reserva — pode ter fila, mas anda rápido. A caminho do hotel (Vaugirard/L12).",
          "Alternativa: crêperies da rue du Montparnasse (galette + crêpe doce, agrada o filho)."] },
      { name: "Fête des Tuileries", type: "parque", coords: [48.8634, 2.3275], area: "Jardin des Tuileries (1er)",
        price: "Entrada grátis (paga só os brinquedos)", desc: ["Parque de diversões de verão (20/jun–23/ago 2026, todos os dias 11h–23h30).", "A 'noite mágica' do filho: roda-gigante com vista de Paris ao entardecer.", "Escurece ~21h30 no verão — dá tempo de jantar e curtir a roda iluminada.", "💡 Quem quiser jantar de street food no parque pode pular o Bouillon Chartier."] }
    ],
    tips: ["A L12 conecta o hotel direto a Concorde (Tuileries), Solférino (Rodin) e Abbesses/Pigalle (Montmartre).", "Volta ao hotel à noite: de Concorde, L12 direto.", "Tarde enxuta (chegada 13h45): priorize Les Deux Magots + Au Plat d'Étain (fecha 17h) + Luxembourg; Mosquée fica como opcional."]
  },

  /* ---------------------- DIA 6 ---------------------- */
  {
    id: 6, date: "8 jul", weekday: "Quarta", city: "Paris", emoji: "🗼",
    title: "Torre Eiffel + Arco do Triunfo + Montmartre",
    summary: "Invalides e Rodin por fora, Torre Eiffel às 10h, Arco do Triunfo e Montmartre ao pôr do sol.",
    places: [
      { name: "Musée Rodin", type: "museu", coords: [48.8553, 2.3158], area: "Paris 7e",
        price: "Só jardim ~€5 (grátis < 18) — ou ver por fora", desc: ["Só por fora: dá para ver 'O Pensador' e o jardim pela grade.", "Do hotel (L12): direto até Solférino (sem troca) → ~10 min a pé."] },
      { name: "Les Invalides", type: "atracao", coords: [48.8566, 2.3126], area: "Paris 7e",
        desc: ["Por fora: o domo dourado (Túmulo de Napoleão) é uma das silhuetas mais bonitas de Paris.", "Coladinho ao Rodin; a esplanada já vale a passada."] },
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
    tips: ["Volta ao hotel: de Montmartre, L12 (Abbesses/Pigalle) direto.", "Jantar em Abbesses (bons bistrôs) ou de volta ao centro."]
  },

  /* ---------------------- DIA 7 ---------------------- */
  {
    id: 7, date: "9 jul", weekday: "Quinta", city: "Paris", emoji: "🖼️",
    title: "Museu do Louvre → Retorno a Londres",
    summary: "Louvre às 10h30 (manhã), almoço rápido perto do centro, Eurostar de volta 16h12 (chegada Londres ~17h27).",
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
    tips: ["Jantar tranquilo no South Bank, perto do hotel — amanhã Greenwich!"]
  },

  /* ---------------------- DIA 8 ---------------------- */
  {
    id: 8, date: "10 jul", weekday: "Sexta", city: "Londres", emoji: "⚓",
    title: "Greenwich",
    summary: "Dia inteiro em Greenwich — vá de barco pelo Tâmisa (Thames Clipper).",
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
    tips: []
  },

  /* ---------------------- DIA 9 ---------------------- */
  {
    id: 9, date: "11 jul", weekday: "Sábado", city: "Oxford", emoji: "🎓",
    title: "Oxford",
    summary: "Dia inteiro em Oxford — trem de Paddington (~1h, ~£25–35 ida e volta).",
    places: [
      { name: "Paddington Station", type: "transporte", coords: [51.5154, -0.1755], area: "Londres",
        desc: "Trem para Oxford (~1h, ~£25–35 ida e volta)." },
      { name: "Christ Church College", type: "atracao", coords: [51.7505, -1.2557], area: "Oxford",
        price: "~£18 (online economiza ~£2)", desc: ["O college mais famoso; o refeitório (Great Hall) inspirou o de Hogwarts.", "⚠️ Sábado: o Great Hall fecha das 10h30 às 14h — cheguem antes das 10h30 ou depois das 14h para vê-lo.", "A catedral fecha 16h45 para o coro."] },
      { name: "Radcliffe Camera", type: "atracao", coords: [51.7536, -1.2540], area: "Oxford",
        desc: "Arquitetura medieval de tirar o fôlego." },
      { name: "Bodleian Library", type: "atracao", coords: [51.7548, -1.2543], area: "Oxford",
        desc: "Uma das bibliotecas mais antigas da Europa." },
      { name: "Sheldonian Theatre", type: "atracao", coords: [51.7544, -1.2552], area: "Oxford",
        desc: "Projetado por Christopher Wren." },
      { name: "Covered Market de Oxford", type: "mercado", coords: [51.7520, -1.2575], area: "Oxford",
        desc: "Almoço: sanduíches, tortas, café. Histórico e barato." },
      { name: "Ashmolean Museum", type: "museu", coords: [51.7556, -1.2603], area: "Oxford",
        price: "Gratuito", desc: "Museu de arte e arqueologia." },
      { name: "University Parks", type: "parque", coords: [51.7605, -1.2520], area: "Oxford",
        desc: "Parque enorme, perfeito para descanso. Passeie pelos colleges (Merton, Balliol, New College)." },
      { name: "G&D's (sorvete)", type: "restaurante", coords: [51.7490, -1.2565], area: "Oxford",
        desc: "Instituição oxfordiana — sorvete." }
    ],
    tips: [
      "💡 Para o filho: Oxford é onde estudaram Tolkien, C.S. Lewis, Stephen Hawking e Oscar Wilde. Ótima conversa durante o passeio.",
      "Retorno a Londres: trem à tarde, jantar de despedida em Londres."
    ]
  },

  /* ---------------------- DIA 10 ---------------------- */
  {
    id: 10, date: "12 jul", weekday: "Domingo", city: "Londres", emoji: "✈️",
    title: "Último dia (leve) → Partida",
    summary: "Manhã leve no South Bank (Borough Market, Tate Modern), partida à noite.",
    places: [
      { name: "Borough Market", type: "mercado", coords: [51.5055, -0.0909], area: "London Bridge",
        price: "Dom 10h–16h", desc: ["Último almoço/brunch de despedida: um dos melhores mercados de comida do mundo.", "Pão artesanal, queijos, comidas do mundo — tudo acessível. A ~10 min do hotel."] },
      { name: "Tate Modern", type: "museu", coords: [51.5076, -0.0994], area: "South Bank",
        price: "Gratuito", desc: ["Última dose de cultura, coladinho ao hotel.", "Turbine Hall sempre tem instalação de grande escala — impressionante."] },
      { name: "Tower of London (OPCIONAL)", type: "atracao", coords: [51.5081, -0.0759], area: "City of London",
        price: "OPCIONAL — ~£34 adulto / £17 criança", desc: ["🏰 Só para os corajosos: ~3h, se acordarem cedo e com pique. É a janela que sobrou caso queiram encaixá-la (você a marcou como opcional por ser cara)."] },
      { name: "Heathrow Airport", type: "transporte", coords: [51.4700, -0.4543], area: "Londres",
        desc: ["Partida à noite — chegue com 3h de antecedência.", "Linha Piccadilly direto do centro (~1h, ~£6)."] }
    ],
    tips: ["Dia leve de propósito: Camden + Bandai + Shard já foram no domingo 5.", "Borough Market abre domingo (10h–16h) — perfeito para o último almoço.", "Noite: Heathrow com 3h de antecedência."]
  }
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
      "Tower of London: confirme se já comprou o ingresso online — ainda falta nesta lista.",
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
