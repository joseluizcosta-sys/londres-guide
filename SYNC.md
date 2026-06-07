# Sincronização roteiro → app

Liga o **projeto London** (texto) a este **app** (dados estruturados).

- **Fonte (texto):** `~/Documents/Claude/Projects/London/roteiro-londres-paris-julho2026.md`
- **Destino (estruturado):** `~/londres-guide/data.js`
- **Modo:** sob comando. O usuário edita o roteiro e diz **"sincroniza roteiro"**.

## Procedimento (Claude executa ao receber "sincroniza roteiro")

1. **Ler** o roteiro markdown da fonte.
2. **Ler** o `data.js` atual e **indexar as coordenadas por nome de lugar** (`name → coords`).
3. **Regenerar `DAYS`** a partir do markdown:
   - Um objeto por dia (`id, date, weekday, city, emoji, title, summary, places[], tips[]`).
   - Cada lugar: `{ name, type, coords, area, price, desc, highlights }`.
   - `type` ∈ `museu, atracao, igreja, parque, mercado, restaurante, loja, mirante, transporte, hotel`.
   - **Preservar coordenadas:** para cada lugar, reusar `coords` do índice (passo 2) casando pelo nome.
   - **Lugar novo** (sem coord conhecida): tentar coordenada confiável de landmark conhecido;
     se incerto, deixar `coords: null` e **listar para o usuário confirmar o endereço** (não publicar pino errado).
   - `highlights` = obras/itens "Não perca" listados sob o museu (cada um `{ name, where?, note }`).
4. **Regenerar as seções de `PRATICO` que vêm do roteiro:** `custos`, `apps`, `lembretes`, `dicas`.
   - **NÃO sobrescrever** `PRATICO.checklist` (gerenciado à parte; inclui tarefas como "Reservar hotel em Paris").
   - **NÃO reintroduzir dados pessoais** (nomes da família, identificação de hotel além do que o usuário pediu, status de documentos). Ver histórico: dados pessoais foram removidos a pedido por o repo ser público.
5. **Atualizar** `META.updated` para a data atual.
6. **Validar** o `data.js` resultante como JS válido antes de publicar:
   `node --check data.js`  (ou `python3 -c "..."` se node indisponível). Abortar se inválido.
7. **Publicar:** `cd ~/londres-guide && git add -A && git commit -m "Sincroniza roteiro (DD/MM)" && git push`.
8. **Reportar** ao usuário: o que mudou e quais lugares novos ficaram sem coordenada (para ele confirmar).

## Regras importantes

- **Coordenadas nunca se perdem** num sync: sempre casar pelo nome antes de regenerar.
- **Repo é público** → nada de dados pessoais/sensíveis no `data.js`.
- O pino do hotel de **Paris** entra quando o usuário confirmar a reserva.
- Após sync com locais novos: lembrar o usuário de reabrir a aba Mapa e tocar em **Baixar mapas**.
