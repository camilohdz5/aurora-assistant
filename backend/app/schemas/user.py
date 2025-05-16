import uuid
from typing import List, Optional
from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime

# Base schema for common user attributes
class UserBase(BaseModel):
    username: str
    email: EmailStr
    name: Optional[str] = None
    lastname: Optional[str] = None
    roles: Optional[List[str]] = ['user']

# Schema for creating a new user (input)
class UserCreate(UserBase):
    password: str

    @field_validator('password')
    @classmethod
    def password_complexity(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
        # Add more complexity checks if needed (e.g., numbers, uppercase, special chars)
        return v

# Schema for updating an existing user (input)
# All fields are optional for updates
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    lastname: Optional[str] = None
    password: Optional[str] = None # For changing password
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    roles: Optional[List[str]] = None

    @field_validator('password')
    @classmethod
    def password_complexity_optional(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and len(v) < 8:
            raise ValueError("New password must be at least 8 characters long")
        return v

# Schema for representing a user in the database (includes hashed_password)
# This is typically for internal use, not for API responses directly
class UserInDBBase(UserBase):
    id: uuid.UUID
    hashed_password: str
    is_active: bool
    is_superuser: bool
    created_at: datetime
    updated_at: datetime
    # roles are already in UserBase

    class Config:
        from_attributes = True # Updated from orm_mode for Pydantic v2

# Schema for returning user data in API responses (output)
# Excludes sensitive information like hashed_password
class UserResponse(UserBase):
    id: uuid.UUID
    is_active: bool
    is_superuser: bool
    created_at: datetime
    updated_at: datetime
    # roles are already in UserBase

    class Config:
        from_attributes = True # Updated from orm_mode for Pydantic v2

class UserWithToken(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse 