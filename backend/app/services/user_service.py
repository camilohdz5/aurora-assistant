from typing import List, Optional
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash, verify_password

async def get_user_by_id(db: AsyncSession, user_id: str) -> Optional[User]:
    statement = select(User).where(User.id == user_id)
    result = await db.exec(statement)
    return result.first()

async def get_user_by_username(db: AsyncSession, username: str) -> Optional[User]:
    statement = select(User).where(User.username == username)
    result = await db.exec(statement)
    return result.first()

async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
    statement = select(User).where(User.email == email)
    result = await db.exec(statement)
    return result.first()

async def create_user(db: AsyncSession, user_in: UserCreate) -> User:
    hashed_password = get_password_hash(user_in.password)
    db_user = User(
        username=user_in.username,
        email=user_in.email,
        name=user_in.name,
        lastname=user_in.lastname,
        hashed_password=hashed_password,
        roles=user_in.roles if user_in.roles else ['user'] # Ensure roles has a default
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def authenticate_user(
    db: AsyncSession, username: str, password: str
) -> Optional[User]:
    user = await get_user_by_username(db, username=username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

async def get_users(
    db: AsyncSession, skip: int = 0, limit: int = 100
) -> List[User]:
    statement = select(User).offset(skip).limit(limit)
    result = await db.exec(statement)
    users = result.all()
    return list(users) # Ensure it's a list 