from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # ✅ Add this
from . import models
from .database import DB_URL, engine, Base 
from .routes import router as auth_router

# Create tables
Base.metadata.create_all(bind=engine)

# App setup
app = FastAPI()

# CORS setup
origins = [
    "http://localhost:3000",  # ✅ Fixed to http
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router)
