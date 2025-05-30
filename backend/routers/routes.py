from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models.models import User, Transcript, Recording
from schemas.schemas import UserCreate, UserLogin, UserSignup
from database import get_db
from utils.utils import hash_password, verify_password

router = APIRouter()

@router.post("/signup")
def signup(user: UserSignup, db: Session = Depends(get_db)):
    if get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail='Email already registered')
    user_obj = create_user(db, user.email, user.passsword)
    return {"msg": "Signup Sucessful", "user_id": user_obj.id}

@router.post('/login')
def login(user: UserLogin, db: Session = Depends(get_db)):
    user_obj = authenticate_user(db, user.email, user.password)
    if not user_obj:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"msg": "Login successful", "user_id": user_obj.id}
