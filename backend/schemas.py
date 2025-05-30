from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    username: str
    firstname: str
    lastname: str
    email: EmailStr

# UserCreate: use during signup
class UserCreate(UserBase):
    password: str

# UserLogin: use during login
class UserLogin(BaseModel):
    email: EmailStr
    password: str
