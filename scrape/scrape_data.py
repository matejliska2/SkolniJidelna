import requests
from bs4 import BeautifulSoup
import csv
import re

def scrape_jidelna():
    url = "https://strav.nasejidelna.cz/0341/login"

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Chyba při stahování stránky: {e}")
        return

    soup = BeautifulSoup(response.text, "html.parser")

    day_blocks = soup.find_all("div", class_="jidelnicekDen")
    data = []

    for day_block in day_blocks:
        # 1) Ziskame datum typu "úterý 04.03.2025"
        date_div = day_block.find("div", class_="jidelnicekTop semibold")
        if not date_div:
            continue

        datum_dne = date_div.get_text(strip=True)
        casti = datum_dne.split()
        if len(casti) > 1:
            datum_jen = casti[-1]  # "04.03.2025"
        else:
            datum_jen = datum_dne

        # Nahradíme nezalomitelnou mezeru
        datum_jen = datum_jen.replace('\u00a0', ' ')

        # Prevedeme "DD.MM.YYYY" -> "YYYY-MM-DD"
        parts = datum_jen.split(".")
        if len(parts) == 3:
            dd, mm, yyyy = parts
            lunch_date = f"{yyyy}-{mm}-{dd}"
        else:
            lunch_date = datum_jen

        # 2) Najdi <article> se <div class="container">
        article = day_block.find("article")
        if not article:
            continue

        containers = article.find_all("div", class_="container")
        for row_div in containers:
            # Najdeme oběd ("Oběd 1"), místo ("Ječná", "Sokolská") a jídlo
            obed_div = row_div.find("div", class_="shrinkedColumn smallBoldTitle jidelnicekItem")
            misto_div = row_div.find("div", class_="shrinkedColumn jidelnicekItem")
            jidlo_div = row_div.find("div", class_="column jidelnicekItem")

            if not (obed_div and misto_div and jidlo_div):
                continue

            obed_text = obed_div.get_text(strip=True).replace('\u00a0', ' ')
            obed_text = " ".join(obed_text.split())

            misto_text = misto_div.get_text(strip=True).replace('\u00a0', ' ')
            misto_text = " ".join(misto_text.split())

            jidlo_text = jidlo_div.get_text(strip=True).replace('\u00a0', ' ')
            jidlo_text = " ".join(jidlo_text.split())

            # >>>>> FILTRUJEME POUZE "Ječná" <<<<<
            if misto_text != "Ječná":
                # Pokud to není Ječná, přeskočíme
                continue

            # Z "Oběd 1" -> jen "1"
            casti_obed = obed_text.split()
            if len(casti_obed) > 1:
                lunch_number = casti_obed[1]
            else:
                lunch_number = obed_text

            # Odstranit alergeny ( (1,3) atd. )
            jidlo_text = re.sub(r'\(\s*[\d,]+\s*\)', '', jidlo_text)
            jidlo_text = " ".join(jidlo_text.split())

            data.append({
                "lunch_date": lunch_date,
                "content": jidlo_text,
                "lunch_number": lunch_number
            })

    # 3) Vybereme prvních 5 DNŮ
    unikatni_datumy = []
    vybrane_data = []
    for row in data:
        if row["lunch_date"] not in unikatni_datumy:
            unikatni_datumy.append(row["lunch_date"])
        if len(unikatni_datumy) <= 5:
            vybrane_data.append(row)
        else:
            break

    # 4) Zapíšeme do CSV
    with open("jidelna.csv", "w", newline="", encoding="utf-8") as f:
        fieldnames = ["lunch_date", "content", "lunch_number"]
        writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter=';')
        writer.writeheader()
        writer.writerows(vybrane_data)

if __name__ == "__main__":
    scrape_jidelna()
