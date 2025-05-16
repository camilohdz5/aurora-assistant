from datetime import datetime, timedelta, timezone
from typing import Any, Union, Optional

from jose import jwt, JWTError
from passlib.context import CryptContext
from pydantic import ValidationError

from app.core.config import settings
# We will define schemas.auth.TokenData later, or import User model for subject
# from app.schemas.auth import TokenData 
# from app.models.user import User

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = settings.ALGORITHM

def create_access_token(subject: Union[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# Placeholder for get_current_user dependency - will be completed later
# It requires OAuth2PasswordBearer from FastAPI and DB session, user service
# from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from app.db.session import get_session
# from app.services import user_service
# from sqlmodel.ext.asyncio.session import AsyncSession

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token") # Define where client gets token

# async def get_current_user(
#     db: AsyncSession = Depends(get_session),
#     token: str = Depends(oauth2_scheme)
# ) -> User: # Should return your User model instance
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         # token_data = TokenData(username=username) # If using a TokenData schema
#     except (JWTError, ValidationError):
#         raise credentials_exception
#     
#     user = await user_service.get_user_by_username(db=db, username=username)
#     if user is None:
#         raise credentials_exception
#     return user

# async def get_current_active_user(
#     current_user: User = Depends(get_current_user)
# ) -> User:
#     if not current_user.is_active:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")
#     return current_user 