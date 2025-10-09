from fastapi import FastAPI, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from fastapi.responses import JSONResponse
import uvicorn

app = FastAPI()

# Create limiter instance
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, lambda request, exc: JSONResponse(
    status_code=429, content={"detail": "Too many requests"}
))

# Apply rate limiter globally
app.add_middleware(SlowAPIMiddleware)

@app.get("/users")
@limiter.limit("5/minute")  # allow only 5 requests per minute per IP
def get_users(request: Request):
    return {"message": "You’re within the rate limit!",
            "users": [{"username": "john"}, {"username": "jane"}, {"username": "doe"}]}


@app.get("/products")
@limiter.limit("10/minute")  # allow only 10 requests per minute per IP
def get_products(request: Request):
    return {"message": "You’re within the rate limit!",
            "products": [{"id": 1, "name": "Product 1"}, {"id": 2, "name": "Product 2"}, {"id": 3, "name": "Product 3"}]}

if __name__ == "__main__":
    uvicorn.run("rate-limit:app", host="127.0.0.1", port=8000, reload=True)


# NOTE : REST LIMITING ACTUALLY SHOULD BE DONE USING REDIS IN PRODUCTION TO MANAGE DISTRIBUTED RATE LIMITING ACROSS MULTIPLE INSTANCES