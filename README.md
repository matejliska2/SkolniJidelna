
# Aplikace pro hodnocení školních obědů

**Školní jídelna** je moderní full-stack aplikace navržená pro zefektivnění obědového systému ve školních jídelnách. Umožňuje studentům zobrazit denní menu, zanechávat zpětnou vazbu na jídla a přihlásit se pro přístup k chráněným funkcím. Projekt zahrnuje také backendový scraper pro sběr dat a frontend postavený v Reactu pro čisté a responzivní uživatelské rozhraní.

---

## Přehled funkcí

### Zobrazení jídelního lístku
Aplikace zobrazuje aktuální týdenní nabídku obědů, kterou si mohou studenti pohodlně prohlížet. Menu se získává automaticky pomocí webového scraperu, takže není nutné jej zadávat ručně.

### Přihlášení uživatele
Do aplikace je možné se přihlásit pomocí iCanteen účtu. Základní přihlašovací systém využívá chráněné cesty (protected routes). Pro přístup k některým částem aplikace (např. přidávání komentářů) se musí uživatel přihlásit.

### Hodnocení a komentáře k jídlům
Uživatelé mohou přidávat komentáře a hodnocení k jednotlivým jídlům. Tato funkce slouží k získávání zpětné vazby, která může pomoci zlepšit kvalitu stravy.

### Automatizovaný sběr a import dat
Backend obsahuje Python skripty, které načtou data obědů z iCanteen a importují je do databáze. Tyto skripty zajišťují flexibilitu při zpracování různých zdrojů dat.

---

## Použité technologie

### Frontend:
- React – Komponentový JavaScriptový framework pro tvorbu UI
- Vite – Extrémně rychlý nástroj pro vývoj React aplikací
- React Router – Správa navigace a směrování stránek
- Vlastní CSS – Minimalistický a přehledný design
- Protected Routes – Ochrana určitých stránek před nepřihlášenými uživateli

### Backend a nástroje:
- Python – Pro psaní webového scraperu a import dat
- CSV / MySQL – Ukládání dat buď v lokálním souboru nebo databázi
- Node.js – Pro frontend development přes npm a Vite
- Git – Správa verzí a spolupráce

---

## Spuštění projektu na localhostu

Aplikace běží na adrese: `http://s-scrum-c4a-5.dev.spsejecna.net`

---

## Spuštění projektu na localhostu

V případě potřeby spustění lokálně je možné postupovat takto:

### Naklonujte repozitář

```bash
git clone https://github.com/matejliska2/SkolniJidelna.git
cd SkolniJidelna/src
```

### Instalujte backendové knihovny

```bash
npm install
```

### Spusťte backend

```bash
node server.js
```

### Instalujte frontendové závislosti

```bash
cd ../frontend
npm install
```

### Spusťte frontend

```bash
npm run dev
```

Aplikace poběží na adrese:  
`http://localhost:5173`

### Spuštění scraperu

```bash
cd ../scrape
python scrape_data.py
```

---

## Použití aplikace

Po spuštění aplikace:

1. Otevřete prohlížeč na adrese `http://localhost:5173`
2. Přihlaste se přes iCanteen účet
3. Procházejte jídelníček – zobrazuje se nabídka podle dnů
4. Přidejte komentář nebo hodnocení k obědu

---

## Scrape logika

### `scrape_data.py`
Načte data z webové stránky jídelny iCanteen, zpracuje HTML a uloží je lokálně.

### `import_csv.py`
Načte data o obědech z CSV souboru a importuje je do aplikace.

### `db_config.py`
Nastavení připojení k databázi – upravte podle svého prostředí.

---

## Struktura projektu

```
SkolniJidelna-main/
├── frontend/              # React frontend s podporou Vite
├── scrape/                # Python scrape skripty
├── src/                   # Node.js backend
└── README.md              # Dokumentace projektu
```
