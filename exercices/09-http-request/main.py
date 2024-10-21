"""This script gets the price of Bitcoin in USD from the CoinGecko API"""

import requests
import asyncio
import pyodbc
import os

SERVER = os.environ["MSQL_SERVER"]
PORT = os.environ["MSQL_PORT"]
USER = os.environ["MSQL_USER"]
PASSWORD = os.environ["MSQL_PASSWORD"]


async def main():
    """Function to get the price of Bitcoin in USD from the CoinGecko API"""
    url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    response = await asyncio.get_event_loop().run_in_executor(
        None, requests.get, url, {"timeout": 10}
    )
    result = response.json()["bitcoin"]["usd"]
    addPriceToDB(result)
    print(f"The price of Bitcoin is ${result}")


def addPriceToDB(price):
    """Function to add the price of Bitcoin in USD to the Microsoft SQL Server database"""

    connectionString = f"DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={SERVER},{PORT};DATABASE=BitcoinDatabase;UID={USER};PWD={PASSWORD};"
    print(connectionString)
    conn = pyodbc.connect(connectionString)

    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO BitcoinPriceUsd (Date,UsdPrice) VALUES (GETDATE(),?)", price
    )
    conn.commit()
    cursor.close()


if __name__ == "__main__":
    asyncio.run(main())
