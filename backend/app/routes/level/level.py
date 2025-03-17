from fastapi.routing import APIRouter

router = APIRouter(prefix="/level")


@router.post("/get-availables")
def generate_map():
    """
    ## Summary:
        Get available levels for the player
        1. get player
        2. get available levels for the player

    Returns:
        dict: _description_
    """
    pass
