import uuid
from typing import List, Optional
from datetime import datetime

from sqlmodel import Field, SQLModel, Column
from sqlalchemy.dialects.postgresql import ARRAY, TEXT # For PostgreSQL specific array type if preferred over JSON


class UserBase(SQLModel):
    username: str = Field(unique=True, index=True, max_length=50)
    email: str = Field(unique=True, index=True, max_length=100)
    name: Optional[str] = Field(default=None, max_length=50)
    lastname: Optional[str] = Field(default=None, max_length=50)
    is_active: bool = Field(default=True)
    is_superuser: bool = Field(default=False)
    roles: List[str] = Field(default_factory=lambda: ['user'], sa_column=Column(ARRAY(TEXT))) # Using ARRAY for roles


class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True, nullable=False)
    hashed_password: str = Field(nullable=False)
    
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False, sa_column_kwargs={"onupdate": datetime.utcnow})

    # __tablename__ = "users" # SQLModel infers this, but can be explicit

# Models for Read, Create, Update will be in schemas 