from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pony.orm import db_session
from jose import JWTError, jwt
from app.core.models.base import db
from app.core.handlers.password_handlers import verify_password
from typing import Optional
from datetime import datetime, timedelta
from app.core.models.user_models import User

"""
Definition of constants and algorithms used in the json web token
"""
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 259200  # 180 días
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@db_session
def authenticate_user(username: str, password: str):
    keys = ('username', 'email', 'password',
            'avatar', 'validated')
    try:
        username = username.lower()
        user_tuple = db.get("select * from User where username=$username")
    except:
        raise HTTPException(
            status_code=401, detail="Contraseña o usuario incorrecto")
    user = dict(zip(keys, user_tuple))
    if not verify_password(user["password"], password):
        return False
    return user


@db_session
def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudo validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    keys = ('username', 'email', 'password',
            'avatar', 'validated')
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("username")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    try:
        user = db.get("select * from User where username = $username")
        user = dict(zip(keys, user))
    except:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if not current_user['validated']:
        raise HTTPException(status_code=400, detail="Usuario no validado")
    return current_user


def valid_credentials(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("username")
        if username is None:
            return None
    except JWTError:
        return None
    return username


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
