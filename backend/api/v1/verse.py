import json
from pathlib import Path

from fastapi import APIRouter
from fastapi.exceptions import HTTPException

router = APIRouter()

BIBLE_PATH = Path(__file__).resolve().parents[3] / "bible.json"

with BIBLE_PATH.open(encoding="utf-8") as f:
    BIBLE = json.load(f)


@router.get("/book")
async def list_books():
    try:
        return {"books": list(BIBLE.keys())}
    except KeyError:
        raise HTTPException(status_code=404, detail="Book not found")


@router.get("/{book}/chapter")
async def get_chapters(book: str):
    try:
        return {"chapters": list(BIBLE[book].keys())}
    except KeyError:
        raise HTTPException(status_code=404, detail="Book not found")


@router.get("/{book}/{chapter}/verse")
async def list_verses(book: str, chapter: str):
    try:
        return {"verses": list(BIBLE[book][chapter].keys())}
    except KeyError:
        raise HTTPException(status_code=404, detail="Book or chapter not found")


@router.get("/{book}/{chapter}/{verse}")
async def get_verse(book: str, chapter: str, verse: str):
    try:
        return {"verse": BIBLE[book][chapter][verse]}
    except KeyError:
        raise HTTPException(status_code=404, detail="Book chapter or verse not found")
