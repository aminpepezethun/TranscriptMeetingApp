from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

# User model
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(60), unique=True, nullable=False)
    firstname = Column(String(60), nullable=False)
    lastname = Column(String(60), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(120), nullable=False)
    profile_picture_path = Column(String, default='static/profile_picture/blank_profile_picture')

    transcripts = relationship("Transcript", back_populates="user")
    recordings = relationship("Recording", back_populates="user")

# Transcript model
class Transcript(Base):
    __tablename__ = 'transcripts'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    content_path = Column(String, default='static/transcripts/0_empty.txt')

    user = relationship("User", back_populates="transcripts")

# Recording model
class Recording(Base):
    __tablename__ = 'recordings'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    content_path = Column(String, default='static/recordings/0_empty.mp4')

    user = relationship("User", back_populates="recordings")
    
