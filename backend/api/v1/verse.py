from fastapi import APIRouter

router = APIRouter()


@router.get("/verse")
async def get_verse():
    return {
        "verse": "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
        "reference": "John 3:16",
    }
