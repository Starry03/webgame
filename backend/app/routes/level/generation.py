from fastapi.routing import APIRouter

router = APIRouter(prefix="/level")


@router.post("/generate_map")
def generate_map():
    pass
