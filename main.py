from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.v1.verse import router as verse_router
from backend.core.logger import logger

app = FastAPI()

app.include_router(verse_router, prefix="/api/v1", tags=["verse"])

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}
