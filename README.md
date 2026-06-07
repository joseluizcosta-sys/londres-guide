# Londres + Paris — Guia de viagem offline

PWA (web app instalável) para usar **offline no iPhone** durante a viagem de 3–12 julho 2026.

## Conteúdo
- **Roteiro**: 10 dias (Londres + Paris + Oxford + Greenwich), com obras a ver em cada museu, restaurantes, atrações, lojas e dicas.
- **Mapa**: mapa interativo com todos os locais (pinos por tipo), filtros por cidade/dia, e botão **Baixar mapas** para gravar os tiles offline.
- **Prático**: custos, lembretes, documentos, checklist, apps e dicas.

## Como instalar no iPhone
1. Abra a URL do app no **Safari**.
2. Botão Compartilhar → **Adicionar à Tela de Início**.
3. Abra pelo ícone. Na aba **Mapa**, conectado ao wi-fi, toque em **Baixar mapas** e aguarde 100%.
4. Pronto — funciona sem internet (texto + mapas dos locais).

## Como atualizar o roteiro
- Edite **`data.js`** (instruções no topo do arquivo). Faça commit/push.
- Online, o app pega a versão nova automaticamente (network-first).
- Reabra a aba Mapa e toque em **Baixar mapas** se adicionar locais novos.

## Estrutura
- `index.html` — interface · `app.js` — lógica · `data.js` — **dados do roteiro (edite aqui)**
- `sw.js` — service worker (offline) · `manifest.webmanifest` + `icons/` — instalação
- `vendor/` — Leaflet (mapas) vendorizado para funcionar offline
