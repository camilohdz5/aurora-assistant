from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine # Import from SQLAlchemy
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.config import settings

# Create the async engine directly using SQLAlchemy's create_async_engine
# echo=True is good for development, consider turning off for production
# No future=True needed with create_async_engine from SQLAlchemy 2.0 style engines
engine = create_async_engine(settings.DATABASE_URL, echo=True)

async def get_session() -> AsyncSession:
    """FastAPI dependency to get an async database session using SQLModel's AsyncSession."""
    async with AsyncSession(engine) as session:
        yield session

async def init_db():
    """Initialize the database and create tables if they don't exist."""
    # Import models here to ensure they are registered with SQLModel.metadata
    from app.models.user import User # Ensure this model is imported
    # from app.models.document import Document # Example for other models

    async with engine.begin() as conn: # Use the direct engine here
        # await conn.run_sync(SQLModel.metadata.drop_all) # Use with caution: drops all tables!
        await conn.run_sync(SQLModel.metadata.create_all)

# Example for lifespan in main.py:
# from contextlib import asynccontextmanager
# from app.db.session import init_db
#
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     print("INFO:     Starting up and initializing DB...")
#     await init_db()
#     yield
#     print("INFO:     Shutting down...")
#
# app = FastAPI(title=settings.PROJECT_NAME, version="0.1.0", lifespan=lifespan)

# from sqlmodel import create_engine # Or from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
# from sqlalchemy.orm import sessionmaker # For synchronous SQLAlchemy
# from app.core.config import settings

# Asynchronous engine setup (recommended for FastAPI)
# engine = create_async_engine(settings.DATABASE_URL, echo=True, future=True)

# async def get_db() -> AsyncSession:
#     async_session = sessionmaker(
#         engine, class_=AsyncSession, expire_on_commit=False
#     )
#     async with async_session() as session:
#         yield session

# Synchronous engine setup (if not using async drivers or prefer simplicity for now)
# engine = create_engine(settings.DATABASE_URL, echo=True)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# def get_db_sync():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# Base for declarative models (SQLAlchemy)
# from sqlalchemy.ext.declarative import declarative_base
# Base = declarative_base()

pass # Placeholder until ORM is fully decided and configured 