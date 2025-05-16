from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.core.config import settings
from app.db.session import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    print(f"INFO:     Starting up {settings.PROJECT_NAME}...")
    print("INFO:     Initializing Database...")
    await init_db()
    print("INFO:     Database Initialized.")
    yield
    print(f"INFO:     Shutting down {settings.PROJECT_NAME}...")

app = FastAPI(title=settings.PROJECT_NAME, version="0.1.0", lifespan=lifespan)

@app.get("/")
async def read_root():
    return {"message": "Welcome to Aurora Assistant API"}

#  Api router V1
from app.api.v1.api import api_router_v1
app.include_router(api_router_v1, prefix="/api/v1")

@app.get("/health")
async def health_check():
    return {"status": "ok"} 