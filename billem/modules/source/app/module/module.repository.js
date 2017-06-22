'use strict';
const modules = [
  {
    "id": 0,
    "title": "Allgemein",
    "children": [
      {
        "id": 0.01,
        "title": "Betriebskalender",
        "link": "betriebskalender"
      },
       {
        "id": 0.02,
        "title": "Sonderzeit",
        "link": "sonderzeit"
      },
       {
        "id": 0.03,
        "title": "Standort",
        "link": "standort"
      },
       {
        "id": 0.04,
        "title": "Kostenstelle"
      },
       {
        "id": 0.05,
        "title": "Buchungsregel"
      },
       {
        "id": 0.06,
        "title": "Lagerort"
      },
       {
        "id": 0.07,
        "title": "Lagerortsliste"
      },
       {
        "id": 0.08,
        "title": "GebindeTyp"
      },
       {
        "id": 0.09,
        "title": "Kunde"
      },
       {
        "id": 0.10,
        "title": "Artikelherkunft"
      }
    ]
  },
  {
    "id": 1,
    "title": "Ressourcen",
    "children": [
       {
        "id": 1.01,
        "title": "Arbeitsplatz"
      },
      {
        "id": 1.02,
        "title": "Arbeitsplatz-Gruppe"
      },
      {
        "id": 1.03,
        "title": "Fertigungshilfsmittel"
      },
       {
        "id": 1.04,
        "title": "Fertigungsh.-Typ"
      },
       {
        "id": 1.05,
        "title": "Personal"
      },
       {
        "id": 1.06,
        "title": "Personal-Gruppe"
      },
       {
        "id": 1.07,
        "title": "Schichtrhythmus"
      },
       {
        "id": 1.08,
        "title": "Schicht"
      }
      ]
  },    
  {
    "id": 2,
    "title": "Beschreibungen",
    "children": [
      {
        "id": 2.01,
        "title": "Artikel"
      },
      {
        "id": 2.02,
        "title": "Produktionsbeschr."
      },
      {
        "id": 2.03,
        "title": "Stückliste"
      },
      {
        "id": 2.04,
        "title": "Arbeitsplan"
      },
      {
        "id": 2.05,
        "title": "Arbeitsgang"
      },
      {
        "id": 2.06,
        "title": "Fertigungsh.-Liste"
      },
      {
        "id": 2.07,
        "title": "Terminliste"
      },
      {
        "id": 2.08,
        "title": "Ersatzartikel"
      },
      {
        "id": 2.09,
        "title": "Artikelgruppen-BW"
      },
      {
        "id": 2.10,
        "title": "Kuppelproduktion"
      },
      {
        "id": 2.11,
        "title": "Art.-Merkmalwerte"
      },
      {
        "id": 2.12,
        "title": "Artikel-Verwendung"
      }
    ]
  },
  {
    "id": 3,
    "title": "Aufträge",
    "children": [
      {
        "id": 3.01,
        "title": "Kundenauftrag"
      },
      {
        "id": 3.02,
        "title": "Absatzplan"
      },
      {
        "id": 3.03,
        "title": "Artikel-Bedarf"
      }
    ]
  },
  {
    "id": 4,
    "title": "IST-Erfassung",
    "children": [
      {
        "id": 4.01,
        "title": "Artikel-Bestand"
      },
      {
        "id": 4.02,
        "title": "Lagerauftrag"
      },
      {
        "id": 4.03,
        "title": "Fertigungsauftrag"
      },
      {
        "id": 4.04,
        "title": "Auftrag-Suche"
      }
    ]
  }
];
const Promise = require("bluebird");

exports.getModulesData = () => {
  console.log('getting modules data');
  return Promise.resolve(modules);
};

