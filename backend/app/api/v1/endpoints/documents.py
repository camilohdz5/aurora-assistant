from fastapi import APIRouter, UploadFile, File, HTTPException
# from app.schemas.document import DocumentCreate, DocumentResponse # Placeholder
# from app.services.document_processor import process_and_store_document # Placeholder

router = APIRouter()

@router.post("/upload") #, response_model=DocumentResponse)
async def upload_document(file: UploadFile = File(...)):
    """
    Uploads a plain-text document (.txt or .md).
    Stores the raw text in Postgres.
    Chunks and embeds the document using Langchain.
    """
    if file.content_type not in ["text/plain", "text/markdown"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Only .txt and .md are supported.")
    
    # content = await file.read()
    # document_data = DocumentCreate(filename=file.filename, content=content.decode("utf-8"))
    # db_document = await process_and_store_document(document_data)
    # return db_document
    return {"filename": file.filename, "message": "Endpoint not fully implemented"} 