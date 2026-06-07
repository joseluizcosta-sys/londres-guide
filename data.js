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
  family: "JC + esposa + filho (12 anos)",
  base: "Park Plaza County Hall (South Bank), Londres",
  updated: "07/06/2026"
};

// Aviso fixo do roteiro
const AVISO = "⚠️ Reserve com antecedência: Torre Eiffel, Louvre e Tower of London esgotam rápido em julho. Compre online assim que as datas estiverem confirmadas.";

const DAYS = [
  /* ---------------------- DIA 1 ---------------------- */
  {
    id: 1, date: "3 jul", weekday: "Quinta", city: "Londres", emoji: "✈️",
    title: "Chegada a Londres",
    summary: "Chegada à tarde → descanso e ambientação.",
    places: [
      { name: "Park Plaza County Hall (base)", type: "hotel", coords: [51.50166, -0.11713], area: "South Bank · 1 Addington St, SE1 7RY",
        desc: ["Check-in e base da viagem (grupo Radisson).", "South Bank, ao lado do London Eye e da Westminster Bridge — bem central; perto do Tâmisa e do metrô (Waterloo / Westminster)."] },
    ],
    tips: [
      "Passeio leve pelo bairro para se orientar.",
      "Jantar tranquilo: pub tradicional perto do hotel para estrear a gastronomia britânica (fish & chips, pie ou Sunday roast).",
      "Compre um cartão Oyster no 1º dia (metrô/ônibus) ou use o cartão contactless direto — funciona igual.",
      "💡 Filho vai gostar: observar os táxis pretos, ônibus vermelhos e a arquitetura nas primeiras horas já é uma experiência."
    ]
  },

  /* ---------------------- DIA 2 ---------------------- */
  {
    id: 2, date: "4 jul", weekday: "Sexta", city: "Londres", emoji: "🏛️",
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
        desc: "Jantar: barato, saboroso, ótimo para família." }
    ],
    tips: []
  },

  /* ---------------------- DIA 3 ---------------------- */
  {
    id: 3, date: "5 jul", weekday: "Sábado", city: "Londres", emoji: "🦕",
    title: "South Kensington — Ciência e Natureza",
    summary: "Natural History Museum de manhã, Science Museum à tarde, Hyde Park no fim do dia.",
    places: [
      { name: "Natural History Museum", type: "museu", coords: [51.4967, -0.1764], area: "South Kensington",
        price: "Gratuito", desc: ["Reserve 3h.", "Pular se o tempo apertar: galeria de peixes marinhos, botânica."],
        highlights: [
          { name: "Hintze Hall (Hall Central)", note: "Esqueleto de baleia-azul suspenso no teto. Impacto imediato e obrigatório." },
          { name: "Dinossauros", where: "Blue Zone, 1º andar", note: "Destaque para 12 anos: T-Rex animatrónico, Triceratops, Diplodocus. Galeria longa e bem narrada." },
          { name: "Baleia azul (modelo real 25m)", where: "Blue Zone, térreo", note: "Difícil dimensionar o tamanho sem ver ao vivo." },
          { name: "Evolução humana", where: "Green Zone, 1º andar", note: "Crânios originais de hominídeos, linha do tempo da evolução." },
          { name: "Minerals & Gems", where: "Red Zone, 1º andar", note: "Meteoritos (incluindo pedaço de Marte), cristais gigantes e pedras preciosas." },
          { name: "Earthquake Simulator", where: "Red Zone", note: "Simula o terremoto de Kobe (1995) num supermercado. 30 segundos inesquecíveis." }
        ] },
      { name: "Science Museum", type: "museu", coords: [51.4978, -0.1745], area: "South Kensington",
        price: "Gratuito (Wonderlab/IMAX ~£12)", desc: ["Reserve 2–3h."],
        highlights: [
          { name: "Making the Modern World", where: "térreo", note: "Locomotiva Puffing Billy (1814), cápsula Apollo 10 real, DNA de Watson & Crick." },
          { name: "Space", where: "piso 3", note: "Maior galeria espacial do Reino Unido: foguetes reais, módulo lunar, missão Apollo completa." },
          { name: "Wonderlab", where: "piso 3 (pago ~£12)", note: "Física, química e luz interativas; demonstrações com nitrogênio líquido, plasma." },
          { name: "Computing & Mathematics", where: "piso 2", note: "Dos primeiros computadores à IA; peças de Bletchley Park e criptografia da WWII." },
          { name: "Engineering Your Future", where: "piso 2", note: "Robótica, impressão 3D, engenharia civil; muito interativo." },
          { name: "IMAX (pago ~£12)", note: "Se houver sessão de tema científico/espacial no dia, vale encaixar." }
        ] },
      { name: "Hyde Park", type: "parque", coords: [51.5073, -0.1657], area: "South Kensington",
        desc: ["Almoço: cafeteria do museu ou sanduíche no parque (ao lado).", "Passeio pelo parque no fim de tarde."] },
      { name: "Serpentine Gallery", type: "museu", coords: [51.5045, -0.1750], area: "Hyde Park",
        price: "Gratuito", desc: "Arte contemporânea, dentro do Hyde Park." },
      { name: "Speaker's Corner", type: "atracao", coords: [51.5126, -0.1590], area: "Hyde Park",
        desc: "Se ainda estiver ativo no fim de tarde — experiência inglesa única." },
      { name: "Kensington High Street", type: "restaurante", coords: [51.5009, -0.1925], area: "Kensington",
        desc: "Jantar: diversas opções, incluindo Wagamama (ótimo custo-benefício)." }
    ],
    tips: []
  },

  /* ---------------------- DIA 4 ---------------------- */
  {
    id: 4, date: "6 jul", weekday: "Domingo", city: "Londres", emoji: "👑",
    title: "Tower of London + South Bank",
    summary: "Tower of London de manhã, almoço no Borough Market, caminhada pela South Bank.",
    places: [
      { name: "Tower of London", type: "atracao", coords: [51.5081, -0.0759], area: "City of London",
        price: "~£34 adulto / £17 criança — compre online", desc: ["Reserve 3h.",
          "História brutal e fascinante: prisões reais, decapitações, Jóias da Coroa.",
          "Yeoman Warders (Beefeaters) fazem tours gratuitos incluídos no ingresso."] },
      { name: "Tower Bridge", type: "atracao", coords: [51.5055, -0.0754], area: "Tâmisa",
        desc: "Atravessar a pé vale muito. Leva ao Borough Market (~10 min)." },
      { name: "Borough Market", type: "mercado", coords: [51.5055, -0.0909], area: "South Bank",
        desc: ["Almoço: um dos melhores mercados de comida do mundo.", "Provolone, pão artesanal, comidas do mundo — tudo acessível.", "Domingo ainda tem movimento (até ~17h)."] },
      { name: "Tate Modern", type: "museu", coords: [51.5076, -0.0994], area: "South Bank",
        price: "Gratuito", desc: "Na caminhada pela margem do Tâmisa. (Visita completa no Dia 10.)" },
      { name: "Shakespeare's Globe", type: "atracao", coords: [51.5081, -0.0972], area: "South Bank",
        desc: "Réplica do teatro elizabetano, na margem do rio." },
      { name: "Millennium Bridge", type: "atracao", coords: [51.5095, -0.0985], area: "South Bank",
        desc: "Passarela com vista para a City e a Catedral de St Paul." }
    ],
    tips: [
      "Vista para a City of London e arranha-céus do outro lado do rio.",
      "Fim de tarde: descanso no hotel — amanhã é dia de viagem a Paris."
    ]
  },

  /* ---------------------- DIA 5 ---------------------- */
  {
    id: 5, date: "7 jul", weekday: "Segunda", city: "Paris", emoji: "🚄",
    title: "Eurostar → Paris | Île de la Cité",
    summary: "Eurostar de manhã, tarde na Île de la Cité, Shakespeare & Company ao entardecer.",
    places: [
      { name: "London St Pancras International", type: "transporte", coords: [51.5320, -0.1263], area: "Londres",
        desc: ["Eurostar saindo de St Pancras — ~2h15 até Paris Gare du Nord.",
          "Pegue o trem cedo (7h–8h30) para aproveitar o dia em Paris.",
          "Reserve antes em eurostar.com (~£60–100/pessoa ida; mais barato quanto antes).",
          "Passaporte obrigatório. ETA não vale para a França — brasileiros não precisam de visto (90 dias Schengen)."] },
      { name: "Paris Gare du Nord", type: "transporte", coords: [48.8809, 2.3553], area: "Paris",
        desc: "Chegada em Paris. Deixe as malas no hotel ou no luggage storage da estação." },
      { name: "Notre-Dame de Paris", type: "igreja", coords: [48.8530, 2.3499], area: "Île de la Cité",
        price: "Gratuito (reserva online recomendada)", desc: ["Reaberta em dez/2024 após restauração. Exterior impressionante, interior restaurado."] },
      { name: "Sainte-Chapelle", type: "igreja", coords: [48.8554, 2.3450], area: "Île de la Cité",
        price: "~€13", desc: "Vidraças medievais incríveis." },
      { name: "Pont Neuf", type: "atracao", coords: [48.8566, 2.3412], area: "Île de la Cité",
        desc: "A ponte mais antiga de Paris; caminhe pela ilha." },
      { name: "Place Dauphine", type: "atracao", coords: [48.8565, 2.3430], area: "Île de la Cité",
        desc: "Praça tranquila e charmosa na ponta da ilha." },
      { name: "Shakespeare & Company", type: "loja", coords: [48.8525, 2.3470], area: "frente a Notre-Dame",
        desc: ["Livraria mais famosa do mundo, à beira do Sena.", "Livros novos e usados, gatos que moram na loja, história literária rica.", "Perfeito para o filho despertar interesse em leitura e história."] },
      { name: "Saint-Germain-des-Prés", type: "restaurante", coords: [48.8540, 2.3340], area: "rive gauche",
        desc: "Jantar: brasseries tradicionais, crêpes, bistrôs." }
    ],
    tips: []
  },

  /* ---------------------- DIA 6 ---------------------- */
  {
    id: 6, date: "8 jul", weekday: "Terça", city: "Paris", emoji: "🖼️",
    title: "Louvre + Montmartre",
    summary: "Manhã no Louvre, tarde em Montmartre e Sacré-Cœur.",
    places: [
      { name: "Museu do Louvre", type: "museu", coords: [48.8606, 2.3376], area: "Paris 1er",
        price: "~€22 adulto / grátis < 18 anos — compre online com horário", desc: ["Reserve 3–4h. Filas são enormes.",
          "Dica: entre pela pirâmide menor (Carrousel du Louvre) — menos fila.",
          "Estratégia: foco em arte famosa e pintura europeia — complementa o British sem repetir.",
          "Pular: antiguidades egípcias e esculturas gregas menores (já vistas no British)."],
        highlights: [
          { name: "Vênus de Milo e Vitória de Samotrácia", note: "Início obrigatório; visualmente impactantes, não exigem explicação." },
          { name: "Mona Lisa", note: "Vale pela experiência do fenômeno (a sala lotada é um espetáculo sociológico), não pelo quadro em si (menor do que parece)." },
          { name: "Castelo medieval no subsolo", where: "Sully, piso -1", note: "Fundações da fortaleza do séc. XII, visíveis in loco. Concreto e inesperado." },
          { name: "Apartamentos de Napoleão III", where: "ala Richelieu", note: "Luxo absoluto, parece cenário de filme. Funciona muito bem para adolescentes." },
          { name: "Grande Galerie de pintura", note: "Escolha 3–4 telas com história (Caravaggio, Vermeer, Bodas de Caná de Veronese — enorme) em vez de percorrer tudo." },
          { name: "Coleção islâmica", where: "ala Richelieu, 1º andar", note: "Pouco visitada, arquitetonicamente linda. Bom contraponto." }
        ] },
      { name: "Le Marais (Rue des Rosiers)", type: "restaurante", coords: [48.8571, 2.3590], area: "Paris 4e",
        desc: "Almoço: falafel famoso e barato. Ou boulangerie com sanduíche e sobremesa." },
      { name: "Les Halles", type: "restaurante", coords: [48.8626, 2.3450], area: "Paris 1er",
        desc: "Alternativa de almoço, próximo ao Louvre." },
      { name: "Au Plat d'Étain", type: "loja", coords: [48.8527, 2.3340], area: "Saint-Germain (Paris 6e)",
        desc: ["16, rue Guisarde · Ter–Sáb 10h30–17h · ~15 min a pé do Louvre.",
          "Loja de figurines de coleção desde 1775 — soldados históricos, personagens de BD (Astérix & Obélix), pintados à mão.",
          "Ótimo para o filho de 12 anos; peças únicas fora do circuito de souvenir.",
          "Dica: confira antes na boutique oficial Astérix o que há em edição limitada para comparar."] },
      { name: "Basilique du Sacré-Cœur", type: "igreja", coords: [48.8867, 2.3431], area: "Montmartre",
        price: "Gratuito", desc: ["Subir a colina (a pé ou de funicular — gratuito com metrô).", "Vista panorâmica de Paris de graça."] },
      { name: "Place du Tertre", type: "atracao", coords: [48.8865, 2.3408], area: "Montmartre",
        desc: "Artistas e pintores ao ar livre (filho vai adorar). Becos das Abadessas e moinhos históricos por perto." }
    ],
    tips: ["Fim de tarde: retorno relaxado, jantar no bairro do hotel."]
  },

  /* ---------------------- DIA 7 ---------------------- */
  {
    id: 7, date: "9 jul", weekday: "Quarta", city: "Paris", emoji: "🗼",
    title: "Torre Eiffel → Retorno a Londres",
    summary: "Manhã na Torre Eiffel, piquenique no Champ de Mars, Eurostar de volta à tarde.",
    places: [
      { name: "Torre Eiffel", type: "atracao", coords: [48.8584, 2.2945], area: "Paris 7e",
        price: "2º andar ~€19/€9,50 · Topo ~€28/€14 — compre online (esgota semanas antes)", desc: ["Chegue cedo (abertura ~9h) para evitar multidões.", "Reserve 2–3h. O topo vale muito pela vista."] },
      { name: "Champ de Mars", type: "parque", coords: [48.8556, 2.2986], area: "Paris 7e",
        desc: ["Almoço: piquenique na grama em frente à Torre — experiência clássica de Paris.", "Baguete + queijo + frutas comprados em boulangerie próxima."] },
      { name: "Paris Gare du Nord", type: "transporte", coords: [48.8809, 2.3553], area: "Paris",
        desc: ["Tarde: Eurostar de volta a Londres.", "Verifique horários: trens da tarde chegam a Londres no fim de tarde/noite.", "Gare du Nord → St Pancras ~2h15."] }
    ],
    tips: ["Chegada em Londres: descanso — amanhã Greenwich!"]
  },

  /* ---------------------- DIA 8 ---------------------- */
  {
    id: 8, date: "10 jul", weekday: "Quinta", city: "Londres", emoji: "⚓",
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
    id: 9, date: "11 jul", weekday: "Sexta", city: "Oxford", emoji: "🎓",
    title: "Oxford",
    summary: "Dia inteiro em Oxford — trem de Paddington (~1h, ~£25–35 ida e volta).",
    places: [
      { name: "Paddington Station", type: "transporte", coords: [51.5154, -0.1755], area: "Londres",
        desc: "Trem para Oxford (~1h, ~£25–35 ida e volta)." },
      { name: "Christ Church College", type: "atracao", coords: [51.7505, -1.2557], area: "Oxford",
        price: "~£18", desc: "O college mais famoso; o refeitório inspirou o de Hogwarts." },
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
    id: 10, date: "12 jul", weekday: "Sábado", city: "Londres", emoji: "🎨",
    title: "Último dia + Partida",
    summary: "Tate Modern + The Shard de manhã, últimas compras, partida à noite.",
    places: [
      { name: "Tate Modern", type: "museu", coords: [51.5076, -0.0994], area: "South Bank",
        price: "Gratuito", desc: ["Arte contemporânea na antiga usina elétrica.", "Turbine Hall sempre tem instalação de grande escala — impressionante."] },
      { name: "The Shard (The View)", type: "mirante", coords: [51.5045, -0.0865], area: "London Bridge",
        price: "~£32 adulto", desc: ["Vista do 72º andar. Vale para fechar a viagem com chave de ouro."] },
      { name: "Sky Garden", type: "mirante", coords: [51.5113, -0.0837], area: "Fenchurch St",
        price: "Gratuito (reserva online antecipada)", desc: "Alternativa gratuita ao The Shard." },
      { name: "Heathrow Airport", type: "transporte", coords: [51.4700, -0.4543], area: "Londres",
        desc: ["Partida à noite — chegue com 3h de antecedência.", "Linha Piccadilly direto do centro (~1h, ~£6)."] }
    ],
    tips: ["Almoço: South Bank ou mercado próximo.", "Tarde: últimas compras, preparar malas."]
  }
];

/* -------------------- INFO PRÁTICA -------------------- */
const PRATICO = {
  custos: {
    titulo: "💰 Estimativa de custos (família de 3)",
    itens: [
      ["Eurostar ida e volta (3 pessoas)", "£360–500"],
      ["Torre Eiffel (topo, 3 pessoas)", "~€84"],
      ["Louvre (2 adultos — filho grátis)", "~€44"],
      ["Tower of London", "~£85"],
      ["Cutty Sark", "~£45"],
      ["The Shard", "~£96"],
      ["Sainte-Chapelle Paris", "~€39"],
      ["Museus gratuitos", "£0 / €0"]
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
      "Torre Eiffel e Louvre: compre com no mínimo 3–4 semanas de antecedência em julho.",
      "Eurostar: quanto antes comprar, mais barato. Passaporte obrigatório.",
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
  documentos: {
    titulo: "📋 Documentos (status)",
    itens: [
      ["Passaporte JC", "✅ válido"],
      ["Passaporte esposa", "✅ válido (vence out/2026 — ok p/ julho)"],
      ["Passaporte filho", "✅ válido"],
      ["ETA — JC / esposa / filho", "✅ aprovados"],
      ["Seguro viagem", "☐ contratar"],
      ["Hospedagem (Radisson Park)", "✅ reservado"],
      ["Passagens aéreas", "✅ emitidas"]
    ]
  },
  checklist: {
    titulo: "✅ Checklist (pendentes)",
    itens: [
      "Verificar passaporte individual do filho.",
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
