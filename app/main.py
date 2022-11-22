"""Application entrypoint."""

from http.client import BAD_REQUEST

from PIL import Image

from fastapi import FastAPI, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.library import convert_docx_to_plain_text
from app.library import convert_image_to_text
from app.library import convert_pdf_to_text

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*']
)


@app.get("/")
def root() -> dict[str, str]:
    """Return hello world."""
    return {"message": "Hello, world!"}


@app.post("/image")
def image(file: UploadFile) -> dict[str, str]:
    """Accept an image file and output the text within the image."""
    image_content_types = ("image/jpeg", "image/png")
    if file.content_type not in image_content_types:
        raise HTTPException(
            status_code=BAD_REQUEST,
            detail="Invalid file content type for image.",
        )
    image = Image.open(file.file)
    text = convert_image_to_text(image)

    return {"text": text}


@app.post("/docx")
def docx(file: UploadFile) -> dict[str, str]:
    """Accept a .docx file name and output the text within it."""
    text = convert_docx_to_plain_text(file.filename)
    return {"text": text}


@app.post("/pdf")
def pdf(file: UploadFile) -> dict[str, str]:
    """Accept a PDF file name and output the text within it."""
    pdf = convert_pdf_to_text(file.filename)
    return {"text": pdf}
