"""Library functions for calling in application code."""
from PIL import Image

import PyPDF2

import docx

from gtts import gTTS

from tesserocr import PyTessBaseAPI


# Import the required module


def tts_to_mp3(text):
    """Save text to .mp3 file with TTS included."""
    # Take in the text desired, the top-level domain and the language desired.
    mp3_convert = gTTS(text, tld="com", lang="en")
    mp3_convert.save("speech.mp3")
    with open("app/speech.mp3", "rb") as f:
        final = f.read()
    return final


def convert_image_to_text(image: Image) -> str:
    """Extract text from a PIL Image."""
    with PyTessBaseAPI(path="./app") as api:
        api.SetImage(image)
        text: str = api.GetUTF8Text()
        return text


def convert_pdf_to_text(name) -> str:
    """Convert text within PDF file to plain text."""
    # creating a pdf file object
    pdf_file_obj = open(name, 'rb')

    # creating a pdf reader object
    pdf_reader = PyPDF2.PdfFileReader(pdf_file_obj)

    # printing number of pages in pdf file
    print(pdf_reader.numPages)

    # creating a page object
    page_obj = pdf_reader.getPage(0)

    # extracting text from page
    text = page_obj.extractText()
    print(page_obj.extractText())

    # closing the pdf file object
    pdf_file_obj.close()
    return text


def convert_docx_to_plain_text(name) -> str:
    """Convert text within .docx to plain text."""
    doc = docx.Document(name)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return '\n'.join(full_text)
