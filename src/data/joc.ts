// =====================================================================
//  OPERACIÓ PONT · Escape room de la sessió 2 del MP 1665
//  Tot el contingut del joc és aquí: narrativa, teoria i proves.
//  Per canviar una pregunta o afegir-ne una, només cal tocar aquest fitxer.
// =====================================================================

export type Categoria = string;

/** Classificar cada element en una de les categories (IT / OT / Frontera...). */
export interface ProvaClassificar {
  tipus: 'classificar';
  titol: string;
  enunciat: string;
  categories: Categoria[];
  elements: { text: string; correcta: Categoria; perque: string }[];
  pista: string;
}

/** Marcar totes les targetes que compleixen una condició. */
export interface ProvaSeleccionar {
  tipus: 'seleccionar';
  titol: string;
  enunciat: string;
  elements: { text: string; sector: string; correcta: boolean; perque: string }[];
  pista: string;
}

/** Relacionar cada fila amb una opció de cada columna (desplegables). */
export interface ProvaAparellar {
  tipus: 'aparellar';
  titol: string;
  enunciat: string;
  columnes: { nom: string; opcions: string[] }[];
  files: { text: string; correctes: string[]; perque: string }[];
  pista: string;
}

/** Construir una cadena en l'ordre correcte triant blocs. */
export interface ProvaSequencia {
  tipus: 'sequencia';
  titol: string;
  enunciat: string;
  ordre: string[];
  intrusos: { text: string; perque: string }[];
  pista: string;
}

/** Preguntes de resposta única, una darrere l'altra. */
export interface ProvaQuiz {
  tipus: 'quiz';
  titol: string;
  enunciat: string;
  preguntes: { pregunta: string; opcions: string[]; correcta: number; perque: string }[];
  pista: string;
}

export type Prova = ProvaClassificar | ProvaSeleccionar | ProvaAparellar | ProvaSequencia | ProvaQuiz;

export interface Sala {
  id: number;
  codi: string;
  nom: string;
  lloc: string;
  icona: string;
  /** Missatge de la unitat que obre la sala (ambientació). */
  transmissio: string[];
  teoria: { titol: string; html: string }[];
  ideaClau: string;
  proves: Prova[];
  fragment: { posicio: number; lletra: string };
  missatgeFinal: string;
}

export const CLAU_MESTRA = 'SENSOR';

export const INTRO = {
  titol: 'OPERACIÓ PONT',
  subtitol: 'Unitat de resposta digital · Grup Mistral',
  transmissio: [
    '03:14 · ALERTA MÀXIMA a la seu del Grup Mistral.',
    'Un correu amb una factura falsa ha obert la porta a OMBRA, un programa maliciós que ha saltat de l\'oficina a la planta.',
    'Les cambres frigorífiques de Rutes Delta no responen. Els panys de l\'Hotel Mediterrani s\'han bloquejat. Els contenidors de l\'Exportadora del Vallès han perdut el senyal.',
    'OMBRA només cau amb la CLAU MESTRA. Està partida en sis fragments, amagats en sis nodes de la xarxa.',
    'Cada node té un pany que només s\'obre si demostres que entens com funciona la tecnologia de l\'empresa. Tu ets la Unitat Pont. Endavant.',
  ],
};

export const SALES: Sala[] = [
  // ------------------------------------------------------------------ NODE 01
  {
    id: 1,
    codi: 'NODE 01',
    nom: 'Dos móns',
    lloc: 'Recepció de la seu central',
    icona: '◐',
    transmissio: [
      'Primer node: la recepció. Els sistemes estan barrejats i ningú no sap què és de l\'oficina i què és de la planta.',
      'Per desbloquejar-lo has de separar els dos móns.',
    ],
    teoria: [
      {
        titol: 'Entorn IT · Information Technology',
        html: '<p>És tot el que serveix per <strong>guardar, processar i transmetre informació</strong>: servidors, xarxa de l\'oficina, programa de gestió, correu, ordinadors, aplicacions al núvol.</p><p>Viu a l\'<strong>oficina</strong> i al centre de dades.</p>',
      },
      {
        titol: 'Entorn OT · Operational Technology',
        html: '<p>És tot el que <strong>mesura o controla alguna cosa física</strong>: sensors, autòmats, robots, màquines, càmeres, panys electrònics, climatització, cambres frigorífiques, lectors de codi, localitzadors de vehicles.</p><p>Viu a la <strong>planta</strong>, al magatzem, a l\'hotel o al moll de càrrega.</p>',
      },
      {
        titol: 'I la frontera?',
        html: '<p>Entre els dos móns hi ha aparells que fan de <strong>pont</strong>: la <strong>passarel·la</strong> (<em>gateway</em>) que tradueix el que diuen les màquines, o l\'<strong>historiador de dades</strong> que guarda les mesures de planta perquè el negoci les pugui fer servir.</p>',
      },
    ],
    ideaClau:
      'Si l\'aparell tracta informació, és IT. Si toca, mou, mesura o vigila alguna cosa del món real, és OT. Una factura electrònica és IT; la sonda de la cambra és OT.',
    proves: [
      {
        tipus: 'classificar',
        titol: 'Pany 1 · Separa els dos móns',
        enunciat: 'Classifica cada element. El pany només s\'obre quan tots són al seu lloc.',
        categories: ['IT', 'OT', 'Frontera'],
        elements: [
          { text: 'El programa de comptabilitat', correcta: 'IT', perque: 'Tracta informació de gestió.' },
          { text: 'La sonda de la cambra frigorífica', correcta: 'OT', perque: 'Mesura una magnitud del món físic.' },
          { text: 'El lector de codi de barres del moll', correcta: 'OT', perque: 'Captura una dada d\'un objecte real.' },
          { text: 'El servidor de correu', correcta: 'IT', perque: 'Transmet i guarda informació.' },
          { text: 'La passarel·la que envia les dades dels sensors al núvol', correcta: 'Frontera', perque: 'Tradueix i filtra entre els dos móns.' },
          { text: 'El pany electrònic d\'una habitació', correcta: 'OT', perque: 'Actua sobre una cosa física: obre i tanca.' },
          { text: 'El quadre de comandament de direcció', correcta: 'IT', perque: 'Presenta informació per decidir.' },
          { text: 'El tacògraf del camió', correcta: 'OT', perque: 'Registra l\'activitat real del vehicle.' },
          { text: 'El sistema de tiquets de suport informàtic', correcta: 'IT', perque: 'Gestiona incidències, no processos físics.' },
          { text: 'L\'historiador que guarda les temperatures dels últims dos anys', correcta: 'Frontera', perque: 'Recull dades de planta perquè el negoci les pugui fer servir.' },
        ],
        pista: 'Pregunta\'t: aquest aparell toca el món físic o només mou dades? Si el que fa és passar dades de la planta cap a l\'oficina, és frontera.',
      },
    ],
    fragment: { posicio: 4, lletra: 'S' },
    missatgeFinal: 'Recepció recuperada. Ja saps distingir l\'oficina de la planta.',
  },

  // ------------------------------------------------------------------ NODE 02
  {
    id: 2,
    codi: 'NODE 02',
    nom: 'Prioritats invertides',
    lloc: 'Sala de màquines',
    icona: '⇅',
    transmissio: [
      'OMBRA ha barrejat els protocols de seguretat de la sala de màquines.',
      'Aquí no n\'hi ha prou amb saber què és cada cosa: has de saber per què no es gestionen igual.',
    ],
    teoria: [
      {
        titol: 'El que importa és què passa si falla',
        html: '<p>Si cau el <strong>servidor de correu</strong>, l\'empresa treballa pitjor unes hores. Si s\'atura el sistema de les <strong>cambres frigorífiques</strong> o els <strong>ascensors</strong> d\'un hotel, hi ha mercaderia o persones en risc.</p><p>Per això les prioritats de seguretat estan <strong>invertides</strong>: a l\'IT el primer és que la informació no es filtri; a l\'OT, que les persones i el servei no corrin perill.</p>',
      },
      {
        titol: 'Dos ritmes de vida',
        html: '<ul><li><strong>IT</strong>: equips de 3 a 6 anys, actualitzacions freqüents i automàtiques, uns segons de resposta són acceptables. Ho porta informàtica.</li><li><strong>OT</strong>: equips de 10 a 25 anys, actualitzacions rares i planificades, la resposta es mesura en mil·lisegons. Ho porta manteniment o serveis tècnics.</li></ul>',
      },
      {
        titol: 'Idiomes diferents',
        html: '<p>L\'IT parla <strong>TCP/IP, HTTPS, correu, serveis web</strong>. L\'OT parla <strong>Modbus, PROFINET, OPC UA, BACnet, MQTT, KNX</strong>.</p><p>Però s\'assemblen: tots dos són ordinadors en xarxa, generen dades, poden ser atacats i necessiten un inventari.</p>',
      },
    ],
    ideaClau: 'A la planta no es pot actualitzar quan es vol: aturar-la costa diners o posa persones en risc.',
    proves: [
      {
        tipus: 'classificar',
        titol: 'Pany 2 · Torna cada protocol al seu entorn',
        enunciat: 'Cada frase descriu com es gestiona un entorn. Digues de quin.',
        categories: ['IT', 'OT'],
        elements: [
          { text: 'Es pot aturar un servidor de nit per actualitzar-lo', correcta: 'IT', perque: 'A l\'IT les aturades programades són habituals.' },
          { text: 'Els equips duren de 10 a 25 anys', correcta: 'OT', perque: 'Hi ha autòmats amb dècades de servei.' },
          { text: 'Actualitzacions freqüents i automàtiques', correcta: 'IT', perque: 'A l\'OT són rares i planificades.' },
          { text: 'Parla Modbus, PROFINET o BACnet', correcta: 'OT', perque: 'Són protocols industrials.' },
          { text: 'Uns segons de resposta són acceptables', correcta: 'IT', perque: 'A l\'OT un retard pot ser un defecte o un accident.' },
          { text: 'Primera prioritat: que les persones i el servei no corrin perill', correcta: 'OT', perque: 'Si falla, el risc és físic.' },
          { text: 'Primera prioritat: que la informació no es filtri', correcta: 'IT', perque: 'La confidencialitat va primer a l\'oficina.' },
          { text: 'Ho porta manteniment o serveis tècnics', correcta: 'OT', perque: 'La planta la mantenen els qui la coneixen físicament.' },
          { text: 'De vegades cal tornar a certificar la màquina després d\'actualitzar-la', correcta: 'OT', perque: 'Canviar el programari d\'una màquina pot canviar com es comporta.' },
          { text: 'Ho porta informàtica o un proveïdor de serveis informàtics', correcta: 'IT', perque: 'És el departament que manté els sistemes d\'informació.' },
        ],
        pista: 'Imagina que aquell sistema s\'atura ara mateix. Si el problema és que no pots enviar un correu, és IT. Si el problema és que la cambra s\'escalfa, és OT.',
      },
    ],
    fragment: { posicio: 1, lletra: 'S' },
    missatgeFinal: 'Sala de màquines estabilitzada. Ja saps per què la planta no es tracta com l\'oficina.',
  },

  // ------------------------------------------------------------------ NODE 03
  {
    id: 3,
    codi: 'NODE 03',
    nom: 'Caça d\'OT',
    lloc: 'Centre de control del grup',
    icona: '◎',
    transmissio: [
      'OMBRA s\'amaga als aparells que ningú no vigila. Als cinc negocis del grup hi ha OT que ningú no ha inventariat.',
      'Troba\'ls tots. Si en deixes un, OMBRA s\'hi refugia.',
    ],
    teoria: [
      {
        titol: 'L\'OT no és només de les fàbriques',
        html: '<p>L\'error més comú és pensar que l\'entorn OT només existeix en una fàbrica. <strong>Tots els sectors en tenen</strong>; el que canvia és la forma que pren.</p><p>Busca sempre els aparells que <strong>mesuren</strong> (sondes, comptadors, lectors, càmeres) i els que <strong>actuen</strong> (panys, barreres, motors, climatitzadors, cintes).</p>',
      },
      {
        titol: 'Un exemple per sector',
        html: '<ul><li><strong>AFI</strong> · gestoria: fitxatge biomètric, ensobradora, alarma de l\'arxiu.</li><li><strong>CI</strong> · exportadora: precintes electrònics, bàscules, lectors al moll.</li><li><strong>GAT</strong> · hotel: panys, domòtica, ascensors, cambres de cuina.</li><li><strong>MK</strong> · botiga: TPV i calaix, etiquetes electròniques, antifurt.</li><li><strong>TR</strong> · transportista: tacògraf, localitzador, sondes del remolc.</li></ul>',
      },
    ],
    ideaClau:
      '«El meu sector no és tecnològic» és una frase que costa nota. Una gestoria té control de presència, una botiga té antifurt, un hotel té panys i un camió porta tacògraf.',
    proves: [
      {
        tipus: 'seleccionar',
        titol: 'Pany 3 · Escaneja la xarxa',
        enunciat: 'Marca TOTS els aparells que són entorn OT. Deixa sense marcar els que són IT.',
        elements: [
          { text: 'Fitxatge biomètric', sector: 'AFI', correcta: true, perque: 'Llegeix una empremta: toca el món físic.' },
          { text: 'Programa de nòmines', sector: 'AFI', correcta: false, perque: 'Tracta informació: és IT.' },
          { text: 'Precinte electrònic del contenidor', sector: 'CI', correcta: true, perque: 'Detecta obertures i posició d\'un objecte real.' },
          { text: 'Duana electrònica', sector: 'CI', correcta: false, perque: 'És un tràmit d\'informació: IT.' },
          { text: 'Bàscula del moll de càrrega', sector: 'CI', correcta: true, perque: 'Mesura un pes real.' },
          { text: 'Panys electrònics de les habitacions', sector: 'GAT', correcta: true, perque: 'Obren i tanquen portes.' },
          { text: 'Motor de reserves', sector: 'GAT', correcta: false, perque: 'Gestiona dades de reserves: IT.' },
          { text: 'Etiquetes electròniques de preu', sector: 'MK', correcta: true, perque: 'Són dispositius físics al lineal de la botiga.' },
          { text: 'CRM de clients', sector: 'MK', correcta: false, perque: 'És una base de dades de clients: IT.' },
          { text: 'Antenes antifurt de la porta', sector: 'MK', correcta: true, perque: 'Detecten objectes que surten de la botiga.' },
          { text: 'Analítica web', sector: 'MK', correcta: false, perque: 'Analitza dades de visites: IT.' },
          { text: 'Tacògraf del camió', sector: 'TR', correcta: true, perque: 'Registra l\'activitat real del vehicle.' },
          { text: 'Programa de rutes', sector: 'TR', correcta: false, perque: 'Planifica amb dades: IT.' },
          { text: 'Sondes de temperatura del remolc', sector: 'TR', correcta: true, perque: 'Mesuren una temperatura real.' },
          { text: 'Banca electrònica', sector: 'AFI', correcta: false, perque: 'Moviments d\'informació financera: IT.' },
          { text: 'Comptador de visitants de la botiga', sector: 'MK', correcta: true, perque: 'Compta persones reals que entren.' },
        ],
        pista: 'N\'hi ha 9 d\'OT: com a mínim un a cada sector. Busca els que mesuren o actuen.',
      },
    ],
    fragment: { posicio: 6, lletra: 'R' },
    missatgeFinal: 'Inventari complet. OMBRA ja no té on amagar-se als aparells de planta.',
  },

  // ------------------------------------------------------------------ NODE 04
  {
    id: 4,
    codi: 'NODE 04',
    nom: 'Qui fa servir què',
    lloc: 'Planta d\'oficines',
    icona: '▦',
    transmissio: [
      'OMBRA ha desordenat els permisos. Els sistemes ja no saben a quin departament pertanyen.',
      'Torna cada sistema al departament que el fa servir cada dia.',
    ],
    teoria: [
      {
        titol: 'Dos tipus de departaments IT',
        html: '<p>Hi ha els departaments que <strong>fan IT</strong> (mantenen els sistemes): sistemes i infraestructura, aplicacions i desenvolupament, suport a l\'usuari, ciberseguretat.</p><p>I els que <strong>viuen de la IT</strong> (hi treballen cada dia): administració i finances, recursos humans, comercial i màrqueting, compres i logística, qualitat i compliment, direcció.</p>',
      },
      {
        titol: 'I a l\'empresa petita?',
        html: '<p>Els departaments són persones que fan diverses funcions alhora, i la informàtica sovint la porta un <strong>proveïdor de fora</strong>. Això no vol dir que no hi hagi entorn IT: vol dir que el gestiona algú extern, i s\'ha de fer constar sempre.</p>',
      },
      {
        titol: 'Una pista de detectiu',
        html: '<p>Les <strong>ofertes de feina</strong> d\'una empresa diuen quins sistemes té: si demanen experiència amb un ERP concret, amb un programa hoteler o amb una eina de campanyes, ja saps què hi ha instal·lat a dins.</p>',
      },
    ],
    ideaClau: 'L\'entorn IT el formen tant els qui mantenen els sistemes com els qui hi treballen cada dia.',
    proves: [
      {
        tipus: 'aparellar',
        titol: 'Pany 4 · Reassigna els sistemes',
        enunciat: 'Tria el departament que fa servir cada sistema.',
        columnes: [
          {
            nom: 'Departament',
            opcions: [
              'Sistemes i infraestructura',
              'Aplicacions i desenvolupament',
              'Suport a l\'usuari',
              'Ciberseguretat',
              'Administració i finances',
              'Recursos humans',
              'Comercial i màrqueting',
              'Compres i logística',
              'Qualitat i compliment',
              'Direcció',
            ],
          },
        ],
        files: [
          { text: 'Sistema de tiquets i inventari d\'equips', correctes: ['Suport a l\'usuari'], perque: 'Recull les incidències i peticions del dia a dia.' },
          { text: 'Tallafocs, antivirus i gestió d\'identitats', correctes: ['Ciberseguretat'], perque: 'Controla accessos i vigila atacs.' },
          { text: 'CRM i automatització de campanyes', correctes: ['Comercial i màrqueting'], perque: 'Gestiona clients i canals digitals.' },
          { text: 'Portal de l\'empleat i plataforma de formació', correctes: ['Recursos humans'], perque: 'Contractació, formació i control horari.' },
          { text: 'Facturació electrònica i banca electrònica', correctes: ['Administració i finances'], perque: 'Comptabilitat, facturació i tresoreria.' },
          { text: 'Gestió de magatzem i EDI amb proveïdors', correctes: ['Compres i logística'], perque: 'Proveïdors, comandes i estocs.' },
          { text: 'Quadre de comandament i pressupostos', correctes: ['Direcció'], perque: 'Serveix per fer el seguiment del negoci.' },
          { text: 'Registre d\'activitats de tractament de dades', correctes: ['Qualitat i compliment'], perque: 'És un requisit de protecció de dades.' },
          { text: 'Virtualització, VPN i sistema de còpies', correctes: ['Sistemes i infraestructura'], perque: 'Servidors, xarxa i còpies de seguretat.' },
          { text: 'Repositoris de codi i entorns de proves', correctes: ['Aplicacions i desenvolupament'], perque: 'Aplicacions pròpies i integracions.' },
        ],
        pista: 'Els quatre primers departaments de la llista són els que «fan IT»: sistemes que protegeixen, mantenen o programen. La resta fan servir la IT per a la seva feina.',
      },
    ],
    fragment: { posicio: 2, lletra: 'E' },
    missatgeFinal: 'Permisos restaurats. Cada departament torna a tenir les seves eines.',
  },

  // ------------------------------------------------------------------ NODE 05
  {
    id: 5,
    codi: 'NODE 05',
    nom: 'Planta, frontera i negoci',
    lloc: 'Sala d\'arquitectura',
    icona: '☰',
    transmissio: [
      'Les incidències s\'acumulen a tots els negocis del grup. OMBRA fa que ningú no sàpiga on actuar.',
      'Per a cada problema, decideix a quina capa s\'hi ha de posar remei i amb quina tecnologia.',
    ],
    teoria: [
      {
        titol: 'Tres capes',
        html: '<p><strong>Planta</strong> (a baix): on passa el servei o el producte. Sensors, lectors, autòmats, panys.</p><p><strong>Frontera</strong> (al mig): tradueix el llenguatge de les màquines a dades que el negoci entén. Passarel·les, historiador de dades.</p><p><strong>Negoci</strong> (a dalt): on es gestiona l\'empresa. ERP, CRM, programa de gestió, quadre de comandament.</p>',
      },
      {
        titol: 'La regla d\'or',
        html: '<p><strong>Primer el problema, després la tecnologia.</strong> Una empresa no compra sensors perquè estiguin de moda, sinó perquè perd mercaderia; no compra un ERP perquè sí, sinó perquè no sap què li costa cada servei.</p><p>Si no saps dir quin problema resol una tecnologia, encara no l\'has justificada.</p>',
      },
    ],
    ideaClau: 'Tota tecnologia es pot col·locar a una capa: planta, frontera o negoci. I sempre ha de respondre a un problema concret.',
    proves: [
      {
        tipus: 'aparellar',
        titol: 'Pany 5 · Diagnòstic de capa',
        enunciat: 'Per a cada problema, tria la capa on s\'actua i la tecnologia que el resol.',
        columnes: [
          { nom: 'Capa', opcions: ['Planta', 'Frontera', 'Negoci'] },
          {
            nom: 'Tecnologia',
            opcions: [
              'Etiquetes RFID i lectors a les ubicacions',
              'Enviament automàtic del fitxatge al sistema de personal',
              'Integració del canal en línia amb el programa de gestió',
              'Passarel·la amb OPC UA o MQTT i historiador de dades',
              'ERP amb imputació de costos i quadre de comandament',
              'Una pantalla gegant a recepció',
              'Més fulls de càlcul compartits',
            ],
          },
        ],
        files: [
          {
            text: 'Un magatzem perd temps buscant palets mal col·locats',
            correctes: ['Planta', 'Etiquetes RFID i lectors a les ubicacions'],
            perque: 'El problema passa al magatzem físic: cal identificar cada palet i cada ubicació.',
          },
          {
            text: 'Una gestoria torna a teclejar les hores del rellotge de fitxar al full de nòmines',
            correctes: ['Frontera', 'Enviament automàtic del fitxatge al sistema de personal'],
            perque: 'El rellotge (OT) ja té la dada: només cal un pont que la porti a la gestió (IT).',
          },
          {
            text: 'Les reserves de la web s\'han de tornar a teclejar al programa de l\'hotel',
            correctes: ['Negoci', 'Integració del canal en línia amb el programa de gestió'],
            perque: 'Són dos sistemes d\'informació que no es parlen: tot passa a la capa de negoci.',
          },
          {
            text: 'Les màquines donen dades, però cadascuna parla un idioma',
            correctes: ['Frontera', 'Passarel·la amb OPC UA o MQTT i historiador de dades'],
            perque: 'Traduir idiomes de màquina és justament la feina de la frontera.',
          },
          {
            text: 'Ningú no sap quant costa realment cada servei',
            correctes: ['Negoci', 'ERP amb imputació de costos i quadre de comandament'],
            perque: 'És un problema de gestió: cal imputar costos i veure\'ls en un quadre.',
          },
        ],
        pista: 'Si el problema és físic (buscar, mesurar, obrir), és planta. Si la dada ja existeix però no arriba, és frontera. Si tot és informació de gestió, és negoci. Les dues últimes tecnologies no resolen res.',
      },
    ],
    fragment: { posicio: 5, lletra: 'O' },
    missatgeFinal: 'Arquitectura reconstruïda. Cada problema té la seva capa i la seva tecnologia.',
  },

  // ------------------------------------------------------------------ NODE 06
  {
    id: 6,
    codi: 'NODE 06',
    nom: 'El pont segur',
    lloc: 'Frontera de la xarxa',
    icona: '⇄',
    transmissio: [
      'Últim node. OMBRA va entrar perquè la planta i l\'oficina estaven connectades de qualsevol manera.',
      'Construeix un pont segur entre els dos móns i demostra que en coneixes els avantatges i els riscos.',
    ],
    teoria: [
      {
        titol: 'L\'air gap ja gairebé no existeix',
        html: '<p>Durant anys la planta tenia la seva xarxa i l\'oficina la seva, sense cap cable entremig. Aquest aïllament es diu <strong>air gap</strong>, i avui gairebé mai no és real: qualsevol màquina nova ve amb connexió i qualsevol proveïdor hi vol entrar per mantenir-la.</p>',
      },
      {
        titol: 'La DMZ industrial',
        html: '<p>La manera correcta de connectar-los no és endollar la planta a l\'oficina, sinó posar-hi una <strong>zona intermèdia</strong>: un espai on la planta deixa les seves dades i d\'on l\'oficina les recull, amb un <strong>tallafoc a cada costat</strong>.</p>',
      },
      {
        titol: 'Què s\'hi guanya i què s\'hi arrisca',
        html: '<p><strong>Avantatges</strong>: dades reals en comptes d\'estimacions, planificació ajustada, manteniment abans de l\'avaria, traçabilitat completa, registres automàtics, millor resposta al client.</p><p><strong>Riscos</strong>: més superfície d\'atac, equips que no es poden actualitzar, protocols industrials sense contrasenya, presses contràries entre informàtica i manteniment.</p><p>La resposta no és desconnectar: és separar en zones, controlar qui entra, tenir inventari i un pla per quan falli. La directiva europea <strong>NIS2</strong> ja ho exigeix a moltes empreses.</p>',
      },
    ],
    ideaClau: 'Connectar IT i OT dona dades reals, però cal fer-ho amb una zona intermèdia i tallafocs, mai endollant la planta directament a l\'oficina.',
    proves: [
      {
        tipus: 'sequencia',
        titol: 'Pany 6A · Construeix el pont',
        enunciat: 'Tria els blocs en ordre, de la planta fins a l\'oficina. Hi ha peces que no hi han de ser.',
        ordre: [
          'Sensors i autòmats de la planta',
          'Tallafoc de la planta',
          'DMZ industrial',
          'Tallafoc de l\'oficina',
          'ERP i quadre de comandament',
        ],
        intrusos: [
          { text: 'Cable directe de la planta a l\'oficina', perque: 'Endollar la planta a l\'oficina és justament el que va deixar entrar OMBRA.' },
          { text: 'Wi-Fi de convidats', perque: 'Una xarxa oberta a qualsevol no pot formar part del pont.' },
        ],
        pista: 'La DMZ va al mig, i a cada costat de la DMZ hi ha d\'haver un tallafoc.',
      },
      {
        tipus: 'classificar',
        titol: 'Pany 6B · Avantatge o risc?',
        enunciat: 'Ara que el pont existeix, classifica què hi guanya l\'empresa i què s\'hi arrisca.',
        categories: ['Avantatge', 'Risc'],
        elements: [
          { text: 'Manteniment abans de l\'avaria', correcta: 'Avantatge', perque: 'Vibracions i temperatures avisen quan alguna cosa comença a fallar.' },
          { text: 'Molts protocols industrials no demanen contrasenya', correcta: 'Risc', perque: 'Es van dissenyar per a xarxes tancades.' },
          { text: 'Traçabilitat d\'un lot, una comanda o un enviament', correcta: 'Avantatge', perque: 'Es pot resseguir de punta a punta.' },
          { text: 'Un correu maliciós de l\'oficina pot arribar a la planta', correcta: 'Risc', perque: 'S\'amplia la superfície d\'atac.' },
          { text: 'La cadena de fred queda registrada sola', correcta: 'Avantatge', perque: 'Registres automàtics i auditables.' },
          { text: 'Hi ha equips antics que no es poden actualitzar', correcta: 'Risc', perque: 'Són vulnerables i no es poden aturar.' },
          { text: 'El temps de cada operació surt de la màquina, no d\'un full de càlcul', correcta: 'Avantatge', perque: 'Dades reals en comptes d\'estimacions.' },
          { text: 'Informàtica vol aplicar pedaços ja; manteniment no pot aturar res', correcta: 'Risc', perque: 'Els dos departaments tenen presses contràries.' },
        ],
        pista: 'Els avantatges parlen de dades, previsió i registres. Els riscos parlen d\'atacs, equips vells i persones amb prioritats oposades.',
      },
    ],
    fragment: { posicio: 3, lletra: 'N' },
    missatgeFinal: 'Pont segur construït. Tens els sis fragments de la clau mestra.',
  },
];

/** Prova final: s'hi arriba després d'introduir la clau mestra. */
export const PROVA_FINAL: ProvaQuiz = {
  tipus: 'quiz',
  titol: 'Protocol d\'expulsió',
  enunciat: 'OMBRA intenta resistir. Respon cinc preguntes seguides per expulsar-lo definitivament.',
  preguntes: [
    {
      pregunta: 'Per què a l\'entorn OT la disponibilitat va abans que la confidencialitat?',
      opcions: [
        'Perquè si s\'atura, hi ha persones, mercaderia o servei en perill',
        'Perquè a l\'OT no hi ha dades que calgui protegir',
        'Perquè els equips OT són més nous que els d\'oficina',
        'Perquè la llei prohibeix posar contrasenyes a les màquines',
      ],
      correcta: 0,
      perque: 'Una aturada de planta té conseqüències físiques; la filtració d\'una dada de sensor, normalment no.',
    },
    {
      pregunta: 'Quin d\'aquests aparells sembla IT però en realitat és OT?',
      opcions: [
        'La pantalla d\'operari (HMI) per on es donen ordres a una màquina',
        'El servidor de correu de l\'empresa',
        'El CRM de l\'equip comercial',
        'El portal on el client segueix la comanda',
      ],
      correcta: 0,
      perque: 'Sembla un ordinador, però el que fa és controlar un procés físic.',
    },
    {
      pregunta: 'Quin sentit té la DMZ industrial si al final planta i oficina es connecten igual?',
      opcions: [
        'La planta deixa les dades en una zona de pas i ningú de l\'oficina entra directament a la planta',
        'Fa que la connexió vagi més ràpida',
        'Permet apagar els tallafocs',
        'Cap: és una moda que no serveix per a res',
      ],
      correcta: 0,
      perque: 'És un espai de pas amb un tallafoc a cada costat: el que passa a l\'oficina no arriba directament a les màquines.',
    },
    {
      pregunta: 'Una empresa que ha externalitzat tota la informàtica, té entorn IT?',
      opcions: [
        'Sí, però el gestiona algú extern i s\'ha de fer constar',
        'No, perquè no té departament d\'informàtica',
        'Només si té servidors propis a l\'oficina',
        'Només si és una empresa gran',
      ],
      correcta: 0,
      perque: 'Els sistemes hi són i s\'hi treballa cada dia; el que canvia és qui els manté.',
    },
    {
      pregunta: 'Quina norma europea obliga moltes empreses de transport, salut, energia i serveis digitals a protegir aquests entorns?',
      opcions: ['NIS2', 'ISO 9001', 'GDPR de màrqueting', 'Llei de comerç electrònic'],
      correcta: 0,
      perque: 'La Directiva (UE) 2022/2555, coneguda com a NIS2.',
    },
  ],
  pista: 'Recorda les idees clau de cada node: prioritats invertides, OT disfressat, pont amb zona intermèdia, IT externalitzada i normativa europea.',
};

export const RANGS = [
  { minim: 90, nom: 'Arquitecte/a del Pont', text: 'Has netejat la xarxa gairebé sense cap error. El Grup Mistral et vol al seu equip.' },
  { minim: 75, nom: 'Especialista IT/OT', text: 'Molt bona feina: domines els dos móns i com es connecten.' },
  { minim: 55, nom: 'Tècnic/a de resposta', text: 'Missió complerta. Repassa els nodes on vas tenir més errors.' },
  { minim: 0, nom: 'Agent en pràctiques', text: 'Has expulsat OMBRA, però amb dificultats. Torna a fer la missió per millorar el rang.' },
];

export const CHECKLIST = [
  'Sé explicar amb les meves paraules què és un entorn IT i què és un entorn OT.',
  'Sé posar tres exemples d\'entorn OT del meu sector.',
  'Sé dir per què no es pot actualitzar un equip de planta com un ordinador d\'oficina.',
  'Sé anomenar cinc departaments de l\'entorn IT i quin sistema fa servir cadascun.',
  'Sé col·locar una tecnologia a la capa de planta, de frontera o de negoci.',
  'Sé donar dos avantatges i dos riscos de connectar els dos entorns.',
];

/** Punts: cada pany dona XP_PANY; cada error en treu i cada pista també. */
export const PUNTS = { pany: 100, error: 10, pista: 30, minimPany: 30, integritatError: 4 };
