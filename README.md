# Londres + Paris — Guia de viagem offline

PWA (web app instalável) para usar **offline no iPhone** durante a viagem de 3–12 julho 2026.

## Conteúdo
- **Roteiro**: 10 dias (Londres + Paris + Oxford + Greenwich), com obras a ver em cada museu, restaurantes, atrações, lojas e dicas.
- **Mapa**: mapa interativo com todos os locais (pinos por tipo), filtros por cidade/dia, e botão **Baixar mapas** para gravar os tiles offline.
- **Tube / Métro**: mapa das redes de Londres (Tube + DLR + Elizabeth line) e Paris (Métro M1–M14, com extensões de 2024), com planejador de rota **De/Para** (melhor caminho, trocas e tempo estimado) — 100% offline.
- **Prático**: custos, lembretes, documentos, checklist, apps e dicas.

## Como instalar no iPhone
1. Abra a URL do app no **Safari**.
2. Botão Compartilhar → **Adicionar à Tela de Início**.
3. Abra pelo ícone. Na aba **Mapa**, conectado ao wi-fi, toque em **Baixar mapas** e aguarde 100%.
4. Pronto — funciona sem internet (texto + mapas dos locais).

## Fonte do conteúdo (projeto London)
O conteúdo vem do **projeto London** do usuário (arquivos locais, fora deste repo):
- Roteiro (fonte/texto): `~/Documents/Claude/Projects/London/roteiro-londres-paris-julho2026.md`
- Checklist: `~/Documents/Claude/Projects/London/checklist-londres-julho2026.md`

`data.js` é a versão **estruturada** desse roteiro (coordenadas, tipos de pino, listas de obras). Ver `SYNC.md` para o mapeamento.

## Como atualizar o roteiro
**Fluxo sob comando (preferido):** edite o roteiro no projeto London e peça ao Claude **"sincroniza roteiro"** — ele regenera `data.js` a partir do markdown (preservando coordenadas dos lugares já mapeados), valida e dá commit/push. Ver `SYNC.md`.

**Edição manual:** editar `data.js` direto (instruções no topo do arquivo) e fazer commit/push.

Em ambos os casos: online, o app pega a versão nova sozinho (network-first + auto-reload ao voltar ao primeiro plano). Reabra a aba Mapa e toque em **Baixar mapas** se adicionar locais novos.

## Estrutura
- `index.html` — interface · `app.js` — lógica · `data.js` — **dados do roteiro (edite aqui)**
- `metro.js` — abas Tube/Métro (mapa das redes + roteador Dijkstra com penalidade de troca)
- `metro-data.js` — grafos das redes (GERADO — não editar; rode `python3 build/generate.py`)
- `build/` — datasets-fonte (tubemaps 2014 + EFREI 1998-2002 + patches 2021–2024), gerador e teste (`node build/test-route.js`)
- `sw.js` — service worker (offline) · `manifest.webmanifest` + `icons/` — instalação
- `vendor/` — Leaflet (mapas) vendorizado para funcionar offline

### Notas das abas Tube/Métro
- Rede desenhada a partir de coordenadas reais (sem tiles): zoom/pan offline, toque numa estação para defini-la como partida/chegada.
- Tempos são estimativas (tempo de percurso + ~4–5 min por troca + margem de espera). Sem horários reais nem avisos de obras/fechamentos — confira o status das linhas no TfL Go / Bonjour RATP quando estiver online.
- Londres inclui Elizabeth line (com Heathrow) e extensão Battersea; exclui Overground. Paris inclui M14 até Orly, M11 até Rosny, M4/M12/M13 estendidas.
