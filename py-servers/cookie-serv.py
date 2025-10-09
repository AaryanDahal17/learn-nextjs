from fastapi import FastAPI, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

app = FastAPI()

# Allow your frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your Next.js dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginData(BaseModel):
    username: str
    password: str


@app.get("/users")
def get_users(request:Request, response:Response):
    # Example of reading a cookie
    token = request.cookies.get("access_token")
    if token:
        print(f"Access token from cookie: {token}")
        if token == "abc123securetoken-for-john":
            return [{"username": "john"}, {"username": "jane"}, {"username": "doe"}]
        else:
            response.status_code = 403
            return {"error": "Invalid tokenn"}
        
    else:
        response.status_code = 401
        return {"error": "Not authenticatedd"}



@app.post("/login")
def login(data: LoginData, response: Response):
    # Normally you'd verify username/password here
    if data.username == "john" and data.password == "secret":
        token = "abc123securetoken-for-john"

        # Set a secure, HttpOnly cookie
        response.set_cookie(
            key="access_token",
            value=token,
            httponly=True,   # not accessible via JS
            secure=False,    # set True in production with HTTPS
            samesite="lax",  # prevents CSRF
            max_age=3600,    # 1 hour
            path="/"
        )

        response.set_cookie(
            key="username",
            value=data.username,
            httponly=False,  # accessible via JS
            secure=False,    # set True in production with HTTPS
            samesite="lax",  # prevents CSRF
            max_age=3600,    # 1 hour
            path="/"
        )

        return {"message": "Login successful"}
    
    return {"error": "Invalid credentials"}


if __name__ == "__main__":
    uvicorn.run("cookie-serv:app", host="127.0.0.1", port=8000, reload=True)