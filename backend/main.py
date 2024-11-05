from fastapi import FastAPI, HTTPException, Query, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from typing import List, Optional

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./shop.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# FastAPI instance
app = FastAPI()

# CORS configuration (optional, remove if not needed)
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database model
class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String, index = True)
    genre = Column(String)
    imageUrl = Column(String)
    price = Column(String)

Base.metadata.create_all(bind=engine)

# Pydantic models
class BookBase(BaseModel):
    title : str
    author : str
    genre : str
    imageUrl : str
    price : str

# Create Book 
@app.post("/books/")
def create_book(book: BookBase):
    db = SessionLocal()
    db_book = Book(**book.dict())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    db.close()
    return db_book

# Read all Books
@app.get("/books/")
def read_book():
    db = SessionLocal()
    books = db.query(Book).all()
    db.close()
    return books

# Read Book by ID
@app.get("/books/{book_id}")
def read_book(book_id: int):
    db = SessionLocal()
    book = db.query(Book).filter(Book.id == book_id).first()
    db.close()
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

# Update Book
@app.put("/books/{book_id}")
def update_book(book_id: int, book : BookBase):
    db = SessionLocal()
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book is None:
        db.close()
        raise HTTPException(status_code=404, detail="Book not found")
    for key, value in book.dict().items():
        setattr(db_book, key, value)
    db.commit()
    db.refresh(db_book)
    db.close()
    return db_book

# Delete Book
@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    db = SessionLocal()
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_book)
    db.commit()
    db.close()
    return db_book

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#Search book
@app.get("/search", response_model=List[BookBase])
def search_books(
    title: Optional[str] = Query(None),
    author: Optional[str] = Query(None),
    genre: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Book)
    
    if title:
        query = query.filter(Book.title.ilike(f"%{title}%"))
    if author:
        query = query.filter(Book.author.ilike(f"%{author}%"))
    if genre:
        query = query.filter(Book.genre == f"{genre}")
    
    books = query.all()

    return books

# Root endpoint for testing
@app.get("/")
def read_root():
    return {"message": "Welcome to the Book API"}
