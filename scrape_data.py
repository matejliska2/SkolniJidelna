import requests
from bs4 import BeautifulSoup
import csv

def scrape_jidelna():
    url = "https://strav.nasejidelna.cz/0341/login"

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Chyba při stahování stránky: {e}")
        return

    # Parsování staženého HTML
    soup = BeautifulSoup(response.text, "html.parser")

    # 1) Najdi všechny bloky pro jednotlivé DNY
    day_blocks = soup.find_all("div", class_="jidelnicekDen")

    # Sem si budeme ukládat strukturovaná data
    data = []

    for day_block in day_blocks:
        # 1a) Najdi prvek s DATEM (např. "úterý 04.03.2025")
        date_div = day_block.find("div", class_="jidelnicekTop semibold")
        if not date_div:
            continue

        datum_dne = date_div.get_text(strip=True)
        # Nahradíme nezalomitelné mezery obyčejnými
        datum_dne = datum_dne.replace('\u00a0', ' ')

        # 1b) Uvnitř day_block je <article> se spoustou <div class="container">
        article = day_block.find("article")
        if not article:
            continue

        containers = article.find_all("div", class_="container")

        for row_div in containers:
            # Najdeme trojici sloupců:
            obed_div = row_div.find("div", class_="shrinkedColumn smallBoldTitle jidelnicekItem")
            misto_div = row_div.find("div", class_="shrinkedColumn jidelnicekItem")
            jidlo_div = row_div.find("div", class_="column jidelnicekItem")

            if not (obed_div and misto_div and jidlo_div):
                # Pokud některý chybí, přeskočíme
                continue

            # Vytáhneme text a nahradíme nezalomitelné mezery
            obed_text = obed_div.get_text(strip=True).replace('\u00a0', ' ')
            misto_text = misto_div.get_text(strip=True).replace('\u00a0', ' ')
            jidlo_text = jidlo_div.get_text(strip=True).replace('\u00a0', ' ')

            # "Vyžehlíme" mezery a odřádkování
            obed_text  = " ".join(obed_text.split())
            misto_text = " ".join(misto_text.split())
            jidlo_text = " ".join(jidlo_text.split())

            data.append({
                "Datum": datum_dne,
                "Obed": obed_text,
                "Misto": misto_text,
                "Jidlo": jidlo_text
            })

    # 2) Vybereme jen prvních 5 DNÍ (dle potřeby)
    unikatni_datumy = []
    vybrane_data = []
    for row in data:
        if row["Datum"] not in unikatni_datumy:
            unikatni_datumy.append(row["Datum"])
        # Pokud jsme ještě nepřekročili 5 unikátních dat, přidáme
        if len(unikatni_datumy) <= 5:
            vybrane_data.append(row)
        else:
            break

    # 3) Uložíme do CSV
    with open("jidelna.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["Datum", "Obed", "Misto", "Jidlo"])
        writer.writeheader()
        writer.writerows(vybrane_data)


if __name__ == "__main__":
    scrape_jidelna()
