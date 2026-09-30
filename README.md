# Operació Pont · escape room de la sessió 2 del MP 1665

Escape room en línia per a la **sessió 2 de l'AEA1** del mòdul **1665 Digitalització aplicada als sectors productius**
(els entorns IT i OT). Fet amb **Astro**. Tot el joc funciona al navegador de l'alumne: no cal servidor ni base de dades.

## La història

Un correu amb una factura falsa ha deixat entrar **OMBRA**, un programa maliciós, a la xarxa del Grup Mistral
(Hotel Mediterrani, Exportadora del Vallès, Rutes Delta…). L'alumnat és la **Unitat Pont** i ha de recuperar sis nodes
de la xarxa. A cada node primer **desxifra** la teoria i després **obre el pany** amb una prova. Cada node dona un
fragment de la **clau mestra**; amb els sis s'entra al nucli i s'expulsa OMBRA.

## Els nodes

| Node | Contingut del recurs de la sessió 2 | Prova |
|---|---|---|
| 01 · Dos móns | IT, OT i frontera | Classificar 10 elements en IT / OT / Frontera |
| 02 · Prioritats invertides | Per què no es gestionen igual | Classificar 10 afirmacions en IT / OT |
| 03 · Caça d'OT | Al teu sector també hi ha OT (AFI, CI, GAT, MK, TR) | Marcar els 9 aparells OT entre 16 |
| 04 · Qui fa servir què | Departaments de l'entorn IT | Assignar 10 sistemes al seu departament |
| 05 · Planta, frontera i negoci | Les tres capes i «primer el problema» | Triar capa i tecnologia per a 5 problemes |
| 06 · El pont segur | Air gap, DMZ industrial, avantatges, riscos, NIS2 | Construir el pont en ordre + avantatge o risc |
| Nucli | Repàs final | Clau mestra (SENSOR) + 5 preguntes |

Al final surt un **informe** amb el rang, els XP, la integritat, les insígnies, el detall per node i la llista
«Abans de marxar, comprova-ho». L'alumne el pot desar en PDF per lliurar-lo.

## Mecànica de joc

- Cada pany val **100 XP**. Cada comprovació amb errors en treu 10 i cada pista 30 (mínim 30 per pany).
- Cada error fa baixar la **integritat del sistema** un 4%. No hi ha «game over».
- A partir del segon intent fallit, el joc mostra l'explicació dels elements que estan malament.
- Els nodes s'obren en ordre. La partida es desa al navegador; es pot tancar i continuar després.
- Un node ja recuperat es pot tornar a fer en mode repàs sense canviar la puntuació.

## Com s'executa al teu ordinador

Cal tenir **Node.js 20 o superior** (https://nodejs.org).

- Doble clic a `executa-escape-room.bat`, o bé
- des d'una terminal: `npm install` i després `npm run dev`

S'obre a `http://localhost:4321`.

## Com canviar el contingut

**Tot el text del joc és a `src/data/joc.ts`**: la narrativa, la teoria de cada node, les proves, les pistes, les
preguntes finals, els rangs i la checklist. No cal tocar res més per canviar una pregunta o afegir un element.

## Com publicar-lo perquè l'alumnat hi jugui en línia

```bash
npm run build
```

Genera la carpeta `dist/`, que és una web estàtica. Es pot pujar a qualsevol allotjament estàtic:

- **Netlify Drop** (https://app.netlify.com/drop): arrossegar la carpeta `dist` i ja té adreça pública.
- **GitHub Pages**: a `astro.config.mjs` posa `base: '/nom-del-repositori/'`, torna a fer `npm run build` i publica `dist`.
- **Cloudflare Pages**: *Workers & Pages → Create → Pages → Connect to Git*, tria aquest repositori i posa:
  preset **Astro**, ordre de compilació `npm run build`, carpeta de sortida `dist`. La versió de Node (22) la
  llegeix del fitxer `.node-version`. Cada cop que es puja un canvi al repositori, la web es torna a publicar sola.

Després només cal posar l'enllaç a l'aula d'Alexia Classroom.

## Estructura

```
src/
├── data/joc.ts            tot el contingut del joc
├── layouts/Base.astro     plantilla comuna i barra superior (HUD)
├── pages/
│   ├── index.astro        missió i mapa de la xarxa
│   ├── sala/[id].astro    cada node: transmissió, teoria, panys i fragment
│   └── final.astro        clau mestra, protocol final i informe
├── scripts/
│   ├── estat.ts           partida desada al navegador i càlcul d'XP
│   ├── proves.ts          els cinc tipus de prova
│   ├── hud.ts             barra superior
│   ├── so.ts              efectes de so (es poden apagar)
│   └── transmissio.ts     efecte de text de terminal
└── styles/global.css      estètica
```

---

Ignacio López Aylagas · Prat FP · MP 1665 · curs 2026-27
