"""Library functions for calling in application code."""
from urllib.request import urlopen

from PIL import Image

import PyPDF2

from bs4 import BeautifulSoup

import typing

import docx

from gtts import gTTS

from tesserocr import PyTessBaseAPI


# Import the required module


def tts_to_mp3(text: str) -> bytes:
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


def convert_pdf_to_text(name: str) -> str:
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


def convert_docx_to_plain_text(name: str) -> str:
    """Convert text within .docx to plain text."""
    doc = docx.Document(name)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return '\n'.join(full_text)


def read_website_text(url: str) -> typing.Any:
    """Convert text within .docx to plain text."""
    # Make a .get() request for the URL:
    html = urlopen(url)

    # Parse the HTML:
    soup = BeautifulSoup(html, 'html.parser')
    text = soup.get_text()
    # Kill all script and style elements:

    for script in soup(["script", "style"]):
        script.extract()  # Remove the script or style.

    # Break the text into lines and remove trailing spaces for each line:

    lines = (line.strip() for line in text.splitlines())

    # Break multiple headlines into a line each:
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))

    # Drop any blank lines.

    text = '\n'.join(chunk for chunk in chunks if chunk)

    return text


def plain_text(text: str) -> str:
    return text
