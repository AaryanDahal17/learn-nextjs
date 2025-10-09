import requests



for i in range(12):
    resp = requests.get("http://localhost:8000/products", 
                        cookies={"access_token":"abc123securetoken-for-john"}, 
                        headers={"Origin": "http://localhost:3000"}
    )

    data = resp.json()

    # print(resp.headers)

    print(f"data {i}:\n",data)
