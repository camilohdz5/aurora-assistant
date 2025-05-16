from fastapi import APIRouter

# from .endpoints import documents, qa # Placeholder

api_router_v1 = APIRouter()
# api_router_v1.include_router(documents.router, prefix="/documents", tags=["documents"])
# api_router_v1.include_router(qa.router, prefix="/qa", tags=["qa"]) 