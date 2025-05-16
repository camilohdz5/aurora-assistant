from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession

from app import models # To avoid circular imports if User model is directly type hinted for current_user
from app.db.session import get_session
from app.schemas.user import UserCreate, UserResponse
from app.services import user_service
from app.core.security import get_password_hash # Not used here but good to be aware of

# We will need a get_current_active_user dependency later for protecting endpoints
# from app.core.security import get_current_active_user 

router = APIRouter()

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user_endpoint(
    *, 
    db: AsyncSession = Depends(get_session), 
    user_in: UserCreate
):
    """
    Create new user.
    """
    user = await user_service.get_user_by_username(db, username=user_in.username)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this username already exists.",
        )
    user_email_exists = await user_service.get_user_by_email(db, email=user_in.email)
    if user_email_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists.",
        )
    
    created_user = await user_service.create_user(db=db, user_in=user_in)
    return created_user

@router.get("/", response_model=List[UserResponse])
async def read_users_endpoint(
    db: AsyncSession = Depends(get_session),
    skip: int = 0,
    limit: int = 100,
    # current_user: models.User = Depends(get_current_active_user) # Placeholder for protected endpoint
):
    """
    Retrieve users. 
    (Currently open, will be protected later to require authentication, e.g., superuser)
    """
    # if not current_user.is_superuser: # Example protection
    #     raise HTTPException(status_code=403, detail="Not enough permissions")
    users = await user_service.get_users(db=db, skip=skip, limit=limit)
    return users 