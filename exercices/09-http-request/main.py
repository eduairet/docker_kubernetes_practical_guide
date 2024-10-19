"""This script gets the price of Bitcoin in USD from the CoinGecko API"""

import requests
import asyncio


async def main():
    """Function to get the price of Bitcoin in USD from the CoinGecko API"""
    url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    response = await asyncio.get_event_loop().run_in_executor(
        None, requests.get, url, {"timeout": 10}
    )
    result = response.json()["bitcoin"]["usd"]
    print(f"The price of Bitcoin is ${result}")


if __name__ == "__main__":
    asyncio.run(main())
