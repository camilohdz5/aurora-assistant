from fastapi import FastAPI

app = FastAPI(title="Aurora Assistant API", version="0.1.0")

@app.get("/")
async def read_root():
    return {"message": "Welcome to Aurora Assistant API"}

# Placeholder for API v1 router
# from app.api.v1.api import api_router_v1
# app.include_router(api_router_v1, prefix="/api/v1")

@app.get("/health")
async def health_check():
    return {"status": "ok"} 