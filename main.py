from fastapi import FastAPI

from backend.api.v1.verse import router as verse_router
from backend.core.logger import logger

app = FastAPI()

app.include_router(verse_router, prefix="/api/v1", tags=["verse"])


@app.get("/")
async def root():
    return {"message": "Hello World"}
