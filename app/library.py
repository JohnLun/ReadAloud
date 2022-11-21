"""Library functions for calling in application code."""


from PIL import Image

from tesserocr import PyTessBaseAPI

import docx

import PyPDF2

import pyttsx3


# Import the required module


def tts_to_mp3(text):
    """Save text to .mp3 file with TTS included."""
    # Initialize the Pyttsx3 engine
    engine = pyttsx3.init()
    engine.save_to_file(text, 'speech.mp3')
    # Wait until above command is not finished.
    engine.runAndWait()
    with open("speech.mp3", "rb") as f:
        return f.read()


def convert_image_to_text(image: Image) -> str:
    """Extract text from a PIL Image."""
    with PyTessBaseAPI(path="./app") as api:
        api.SetImage(image)
        text: str = api.GetUTF8Text()
        return text


def convert_pdf_to_text(name) -> str:
    """Convert text within PDF file to plain text."""
    # creating a pdf file object
    pdf_file_obj = open(name + '.pdf', 'rb')

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
    doc = docx.Document(name + '.docx')
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return '\n'.join(full_text)
