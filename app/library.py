"""Library functions for calling in application code."""

from http.client import HTTPException

import PyPDF2

import docx

import pandas as pd

import imghdr

import time

from PIL import Image

from pandas import DataFrame

from pygame import mixer

from tesserocr import PyTessBaseAPI


def convert_image_to_text(image: Image) -> str:
    """Extract text from a PIL Image."""
    with PyTessBaseAPI(path="./app") as api:
        test = imghdr.what(image)
        if test != 'png' and test != 'jpeg' and test != 'gif' and test != 'jpg':
            raise HTTPException
        api.SetImage(image)
        text: str = api.GetUTF8Text()
        return text


def take_in_mp3(name) -> str:
    mixer.init()
    # Load the name of the MP3 file that is to be subsequently played.
    mixer.music.load(name)
    mixer.music.play()
    # Wait for the audio file to stop playing before exiting the function.
    while mixer.music.get_busy():
        time.sleep(1)


def convert_pdf_to_text(name) -> str:
    # creating a pdf file object
    pdf_file_obj = open(name + '.pdf', 'rb')

    # creating a pdf reader object
    pdf_reader = PyPDF2.PdfFileReader(pdf_file_obj)

    # printing number of pages in pdf file
    print(pdf_reader.numPages)

    # creating a page object
    page_obj = pdf_reader.getPage(0)

    # extracting text from page
    print(page_obj.extractText())

    # closing the pdf file object
    pdf_file_obj.close()


def convert_docx_to_plain_text(name) -> str:
    doc = docx.Document(name + '.docx')
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return '\n'.join(full_text)


def convert_xlsx_to_plain_test(name) -> DataFrame:
    df = pd.read_excel(name + '.xlsx')
    return df
