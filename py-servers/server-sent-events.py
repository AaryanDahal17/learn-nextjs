from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
import time
import asyncio
import uvicorn
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

# Allow your frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your Next.js dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simulated background task status
task_status = {}

@app.post("/start-task")
async def start_task(task_id: str):
    task_status[task_id] = "pending"
    
    # Simulate async background work
    asyncio.create_task(simulate_task(task_id))
    return {"task_id": task_id, "status": "started"}

async def simulate_task(task_id: str):
    await asyncio.sleep(50)  # simulate work
    task_status[task_id] = "completed"

@app.get("/events/{task_id}")
async def task_events(task_id: str):
    async def event_generator():
        while True:
            status = task_status.get(task_id, "not_found")
            yield f"data: {status}\n\n"
            if status == "completed" or status == "not_found":
                break
            await asyncio.sleep(5)
    return StreamingResponse(event_generator(), media_type="text/event-stream")


if __name__ == "__main__":
    uvicorn.run("server-sent-events:app", host="127.0.0.1", port=8000, reload=True)