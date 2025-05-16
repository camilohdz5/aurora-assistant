from fastapi import APIRouter

from .endpoints import documents, qa, users, auth

api_router_v1 = APIRouter()
api_router_v1.include_router(documents.router, prefix="/documents", tags=["Documents"])
api_router_v1.include_router(qa.router, prefix="/qa", tags=["Q&A"])
api_router_v1.include_router(users.router, prefix="/users", tags=["Users"])
api_router_v1.include_router(auth.router, prefix="/auth", tags=["Authentication"]) 