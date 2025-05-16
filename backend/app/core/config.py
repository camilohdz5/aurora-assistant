from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Aurora Assistant"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:password@host:port/dbname")
    # Add other sensitive or environment-specific configurations here
    # OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "your_openai_api_key_here")

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings() 