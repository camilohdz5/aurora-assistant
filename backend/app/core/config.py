from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv
import secrets # For generating a default secret key

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Aurora Assistant"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:icono5678@localhost:5432/aurora_db")
    
    # JWT Settings
    # Generate a new key if one isn't provided: 
    # import secrets; secrets.token_urlsafe(32)
    SECRET_KEY: str = os.getenv("SECRET_KEY", secrets.token_urlsafe(32))
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30 # Default to 30 minutes
    
    # Add other sensitive or environment-specific configurations here
    # OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "your_openai_api_key_here")

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings() 