"""Application entrypoint."""

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root() -> dict[str, str]:
    """Return hello world."""
    return {"message": "Hello, world!"}
