from pydantic import BaseModel
import datetime

class DocumentBase(BaseModel):
    filename: str

class DocumentCreate(DocumentBase):
    content: str # Raw content for processing

class DocumentResponse(DocumentBase):
    id: int
    uploaded_at: datetime.datetime
    content_hash: str

    class Config:
        orm_mode = True # For compatibility with ORM models 