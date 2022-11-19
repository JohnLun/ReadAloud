"""Library functions for calling in application code."""

import locale

from PIL import Image
import time

from pandas import DataFrame
from pygame import mixer
import PyPDF2
import docx
import pandas as pd



from tesserocr import PyTessBaseAPI


def convert_image_to_text(image: Image) -> str:
    """Extract text from a PIL Image."""
    with PyTessBaseAPI(path="./app") as api:
        api.SetImage(image)
        text: str = api.GetUTF8Text()
        return text


def take_in_MP3(name) -> str:
    mixer.init()
    # Load the name of the MP3 file that is to be subsequently played.
    mixer.music.load(name)
    mixer.music.play()
    # Wait for the audio file to stop playing before exiting the function.
    while mixer.music.get_busy():
        time.sleep(1)

def convert_PDF_to_text(pdfname) -> str:
    # creating a pdf file object
    pdf_File_Obj = open(pdfname + '.pdf', 'rb')

    # creating a pdf reader object
    pdf_Reader = PyPDF2.PdfFileReader(pdf_File_Obj)

    # printing number of pages in pdf file
    print(pdf_Reader.numPages)

    # creating a page object
    pageObj = pdf_Reader.getPage(0)

    # extracting text from page
    print(pageObj.extractText())

    # closing the pdf file object
    pdf_File_Obj.close()


def convert_docx_to_plain_text(name) -> str:
        doc = docx.Document(name + '.docx')
        fullText = []
        for para in doc.paragraphs:
            fullText.append(para.text)
        return '\n'.join(fullText)


def convert_xlsx_to_plain_test(name) -> DataFrame:
    df = pd.read_excel(name + '.xlsx')
    return df


