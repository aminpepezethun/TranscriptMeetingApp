from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from . import models, schemas
from .database import get_db
from .utils import hash_password, verify_password

router = APIRouter()

@router.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user/email already existed
    existing_email = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already existed")

    existing_username = db.query(models.User).filter(models.User.username == user.username).first()
    if existing_username:
        raise HTTPException(status_code=400, detail="Username already existed")

    hashed_password = hash_password(user.password)
    new_user = models.User(
        username=user.username,
        firstname=user.firstname,
        lastname=user.lastname,
        email=user.email,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post('/login')
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    exsting_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not exsting_user:
        raise HTTPException(status_code=401, detail="No account associated with this email")
    if not verify_password(user.password, exsting_user.password):
        raise HTTPException(status_code=401, detail="Wrong passsword")
    return {"message": "Login Sucessful", "user_id": exsting_user.id}
