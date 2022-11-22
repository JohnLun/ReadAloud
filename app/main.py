"""Application entrypoint."""

from http.client import BAD_REQUEST

from PIL import Image

import os
import random

from fastapi import FastAPI, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.library import convert_docx_to_plain_text
from app.library import convert_image_to_text
from app.library import convert_pdf_to_text
from app.library import tts_to_mp3

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
    image_data = Image.open(file.file)
    text = convert_image_to_text(image_data)

    return {"text": text}


@app.post("/docx")
def docx(file: UploadFile) -> dict[str, str]:
    """Accept a .docx file name and output the text within it."""
    contents = file.file.read()
    random_name = random.choice("abcedfghijklmnopqrstuvwxyz%123456783")
    with open(random_name + '.docx', 'wb') as f:
        f.write(contents)
        text = convert_docx_to_plain_text(random_name + '.docx')
    f.close()
    os.remove(random_name + '.docx')
    return {"text": text, "mp3": tts_to_mp3(text)}


@app.post("/pdf")
def pdf(file: UploadFile) -> dict[str, str]:
    """Accept a PDF file name and output the text within it."""
    contents = file.file.read()
    random_name = random.choice("abcedfghijklmnopqrstuvwxyz%123456783")
    with open(random_name + '.pdf', 'wb') as f:
        f.write(contents)
        text = convert_pdf_to_text(random_name + '.pdf')
    f.close()
    os.remove(random_name + '.pdf')
    return {"text": text, "mp3": tts_to_mp3(text)}
