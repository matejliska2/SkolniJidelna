
# 🥗 Školní jídelna – Chytrá aplikace pro školní stravování

**Školní jídelna** je moderní full-stack aplikace navržená pro zefektivnění obědového systému ve školních jídelnách. Umožňuje studentům zobrazit denní menu, zanechávat zpětnou vazbu na jídla a přihlásit se pro přístup k chráněným funkcím. Projekt zahrnuje také backendový scraper pro sběr dat a frontend postavený v Reactu pro čisté a responzivní uživatelské rozhraní.

Tento systém byl vytvořen především pro školní účely, ale architektura kódu je připravena i pro reálné nasazení. Projekt ukazuje, jak spolu mohou frontendové a backendové technologie efektivně komunikovat a řešit praktické problémy, jako je například zpětná vazba na školní stravování.

---

## 🚀 Přehled funkcí

Tato aplikace se skládá ze tří hlavních částí:

### 🍽️ Zobrazení jídelního lístku
Aplikace zobrazuje aktuální týdenní nabídku obědů, kterou si mohou studenti pohodlně prohlížet. Menu se získává automaticky pomocí webového scraperu, takže není nutné jej zadávat ručně.

### 🔐 Přihlášení uživatele
Základní přihlašovací systém využívá chráněné cesty (protected routes). Pro přístup k některým částem aplikace (např. přidávání komentářů) se musí uživatel přihlásit.

### ✍️ Hodnocení a komentáře k jídlům
Uživatelé mohou přidávat komentáře a hodnocení k jednotlivým jídlům. Tato funkce slouží k získávání zpětné vazby, která může pomoci zlepšit kvalitu stravy.

### 🧠 Admin rozhraní (plánováno)
Plánuje se rozšíření o administrační rozhraní, které umožní zaměstnancům přidávat nebo upravovat nabídku obědů přímo v aplikaci, čímž by se zcela eliminovala potřeba scrapu.

### 🛠️ Automatizovaný sběr a import dat
Backend obsahuje Python skripty, které buď načtou data z webové stránky jídelny, nebo je importují z CSV souboru do databáze. Tyto skripty zajišťují flexibilitu při zpracování různých zdrojů dat.

---

## 🖥️ Použité technologie

Projekt využívá moderní technologie na frontendové i backendové straně pro zajištění škálovatelnosti a snadné údržby.

### 🧩 Frontend:
- React – Komponentový JavaScriptový framework pro tvorbu UI
- Vite – Extrémně rychlý nástroj pro vývoj React aplikací
- React Router – Správa navigace a směrování stránek
- Vlastní CSS – Minimalistický a přehledný design
- Protected Routes – Ochrana určitých stránek před nepřihlášenými uživateli

### 🔌 Backend a nástroje:
- Python – Pro psaní webového scraperu a import dat
- CSV / SQLite – Ukládání dat buď v lokálním souboru nebo databázi
- Node.js – Pro frontend development přes npm a Vite
- Git – Správa verzí a spolupráce

---

## 🔧 Spuštění projektu

Následující kroky vás provedou spuštěním aplikace na vašem počítači.

### 1️⃣ Naklonujte repozitář

```bash
git clone https://github.com/yourusername/SkolniJidelna.git
cd SkolniJidelna/frontend
```

### 2️⃣ Instalujte frontendové závislosti

```bash
npm install
```

### 3️⃣ Spusťte vývojový server

```bash
npm run dev
```

Aplikace poběží na adrese:  
👉 `http://localhost:5173`

### 4️⃣ Spusťte scraper (volitelné)

```bash
cd ../scrape
python scrape_data.py
```

> ⚠️ Nezapomeňte správně nastavit `db_config.py`, pokud používáte databázi.

---

## 🧪 Použití aplikace

Po spuštění aplikace:

1. Otevřete prohlížeč na adrese `http://localhost:5173`
2. Přihlaste se (lze simulovat jednoduché přihlášení)
3. Procházejte jídelníček – zobrazuje se nabídka podle dnů
4. Přidejte komentář nebo hodnocení k obědu
5. (Plánováno) Administrátor bude moci upravovat nabídku

---

## 🧰 Podpůrné skripty

### 🔁 `scrape_data.py`
Načte data z webové stránky jídelny, zpracuje HTML a uloží je lokálně.

### 📥 `import_csv.py`
Načte data o obědech z CSV souboru a importuje je do aplikace.

### ⚙️ `db_config.py`
Nastavení připojení k databázi – upravte podle svého prostředí.

---

## 🧠 Poznámky pro vývojáře

- Kód je přehledně rozdělen do samostatných React komponent
- Simulované přihlašování lze snadno rozšířit o skutečné API
- Možnost přechodu na plnohodnotný backend (Flask, Express)
- Skripty jsou připravené pro úpravy podle reálných požadavků

---

## 📁 Struktura projektu

```
SkolniJidelna-main/
├── frontend/              # React frontend s podporou Vite
│   ├── src/               # Hlavní komponenty aplikace
│   │   ├── App.jsx
│   │   ├── Lunch.jsx
│   │   ├── Login.jsx
│   │   └── ...
├── scrape/                # Python nástroje pro načtení dat
│   ├── scrape_data.py
│   ├── import_csv.py
│   └── db_config.py
├── src/                   # Statické HTML soubory
│   └── login.html
└── README.md              # Dokumentace projektu
```

## 💡 Závěr

Tento projekt vznikl jako součást školního zadání, ale je napsán podle skutečných vývojářských standardů. Ukazuje, jak lze využít moderní webové technologie při řešení praktických problémů, jako je zpětná vazba ve školním stravování.

Ať už jsi student, učitel nebo vývojář – tento projekt může sloužit jako výborný základ pro další rozvoj.
