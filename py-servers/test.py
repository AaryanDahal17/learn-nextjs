import requests

resp = requests.get("http://localhost:8000/users", cookies={"access_token":"abc123securetoken-for-john"})

data = resp.json()

print(resp.headers)

print("data:\n",data)
