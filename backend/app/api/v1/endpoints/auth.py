from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.config import settings
from app.core.security import create_access_token
from app.db.session import get_session
from app.schemas.auth import Token
from app.services import user_service
from app.models.user import User # For type hinting current_user
from app.schemas.user import UserResponse # To include user details in login response
from app.core import security # To access the full security module for get_current_user

router = APIRouter()

# Define oauth2_scheme here, or in security.py and import it
# The tokenUrl should point to your login endpoint
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")

@router.post("/token", response_model=Token)
async def login_for_access_token(
    db: AsyncSession = Depends(get_session),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    OAuth2 compatible token login, get an access token for future requests.
    Pass username and password as form data.
    """
    user = await user_service.authenticate_user(
        db, username=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    elif not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Inactive user"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.username, expires_delta=access_token_expires # Use username as subject
    )
    return {"access_token": access_token, "token_type": "bearer"}


# Now we can define get_current_user properly as it uses oauth2_scheme
async def get_current_user(
    db: AsyncSession = Depends(get_session),
    token: str = Depends(oauth2_scheme)
) -> User: # Return your User model
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = security.jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        # token_data = TokenPayload(sub=username) # If using TokenPayload schema for validation
    except (security.JWTError, security.ValidationError):
        raise credentials_exception
    
    user = await user_service.get_user_by_username(db=db, username=username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    if not current_user.is_active:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")
    return current_user

# Example of a protected endpoint (can be in users.py or elsewhere)
# @router.get("/me", response_model=UserResponse)
# async def read_users_me(current_user: User = Depends(get_current_active_user)):
#     return current_user 