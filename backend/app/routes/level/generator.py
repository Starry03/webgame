from backend.app.models.map import Map


class Generator:
    MIN_ROOMS: int = 5
    MAX_ROOMS: int = 9

    def get_map() -> Map:
        return Map()
