import mysql.connector
import csv

# Načteme dict DB_CONFIG ze souboru config.py
from db_config import DB_CONFIG

def import_csv_to_db():
    # 1) Připojíme se k databázi pomocí DB_CONFIG
    connection = mysql.connector.connect(**DB_CONFIG)
    cursor = connection.cursor()

    # 2) Otevřeme jidelna.csv (předpokládáme lunch_date;content;lunch_number)
    with open("jidelna.csv", "r", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter=';')
        sql = """
            INSERT INTO Lunches (lunch_date, content, lunch_number)
            VALUES (%s, %s, %s)
        """

        # 3) Pro každý řádek provedeme INSERT
        for row in reader:
            values = (
                row["lunch_date"],
                row["content"],
                row["lunch_number"]
            )
            cursor.execute(sql, values)

    # 4) Uložíme změny (commit), zavřeme spojení
    connection.commit()
    cursor.close()
    connection.close()

    print("CSV data byla úspěšně vložena do tabulky Lunches.")

if __name__ == "__main__":
    import_csv_to_db()
