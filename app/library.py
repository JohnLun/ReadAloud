"""Library functions for calling in application code."""
from PIL import Image

import PyPDF2

import docx

import pyttsx3

from tesserocr import PyTessBaseAPI


# Import the required module


def tts_to_mp3(text: str) -> bytes:
    """Save text to .mp3 file with TTS included."""
    # Initialize the Pyttsx3 engine
    engine = pyttsx3.init()
    engine.save_to_file(text, "app/tmp/speech.mp3")
    # Wait until above command is not finished.
    engine.runAndWait()
    with open("app/tmp/speech.mp3", "rb") as f:
        final = f.read()
    return final


def convert_image_to_text(image: Image) -> str:
    """Extract text from a PIL Image."""
    with PyTessBaseAPI(path="./app") as api:
        api.SetImage(image)
        text: str = api.GetUTF8Text()
        return text


def convert_pdf_to_text(name: str) -> str:
    """Convert text within PDF file to plain text."""
    # creating a pdf file object
    pdf_file_obj = open(name, "rb")

    # creating a pdf reader object
    pdf_reader = PyPDF2.PdfReader(pdf_file_obj)

    # printing number of pages in pdf file
    print(len(pdf_reader.pages))

    # creating a page object
    page_obj = pdf_reader.pages[0]

    # extracting text from page
    text = page_obj.extract_text()
    print(page_obj.extract_text())

    # closing the pdf file object
    pdf_file_obj.close()
    return text


def convert_docx_to_plain_text(name: str) -> str:
    """Convert text within .docx to plain text."""
    doc = docx.Document(name)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return "\n".join(full_text)
