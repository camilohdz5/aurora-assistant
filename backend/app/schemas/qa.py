from pydantic import BaseModel
from typing import List, Any, Dict

class QAQuery(BaseModel):
    question: str
    # session_id: str | None = None # Optional for conversation history

class QAResponse(BaseModel):
    question: str
    answer: str
    chain_of_thought: List[Dict[str, Any]] # To store graph/chain data
    # relevant_chunks: List[str] | None = None 