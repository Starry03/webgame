from backend.app.models.level import Level


class Generator:
    MIN_ROOMS: int = 5
    MAX_ROOMS: int = 9

    def get_map() -> Level:
        return Level()
