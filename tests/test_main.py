"""Tests for `main.py`."""

from PIL import Image

from fastapi import HTTPException, UploadFile

import pytest

import app.library
import app.main

document_directory = 'tests/data/Document.pdf'
docx_directory = 'tests/data/doctest.docx'
image_directory = "tests/data/test.png"
image_content = "G Search with Google or enter address\n"


def test_root() -> None:
    """Test the entrypoint's return message."""
    assert app.main.root() == {"message": "Hello, world!"}


def test_convert_image_to_text() -> None:
    """Test that the image can be converted."""
    assert (
            app.library.convert_image_to_text(
                Image.open(image_directory))
            == image_content
    )


def test_image() -> None:
    """Test that the image can be converted."""
    with open("tests/data/test.png", "rb") as f:
        assert app.main.image(
            UploadFile(filename="test.png", file=f, content_type="image/png")
        ) == {"text": image_content,
              "mp3": app.library.tts_to_mp3(
                  image_content)}


def test_image_failure() -> None:
    """Invalid image raises an HTTP Exception."""
    with open(image_directory, "rb") as f:
        with pytest.raises(HTTPException):
            app.main.image(UploadFile(filename="test.png", file=f))


def test_tts_to_mp3() -> None:
    """Checks that TTS works."""
    assert (
            app.library.tts_to_mp3(
                "This is a test for a PDF file.") ==
            app.library.tts_to_mp3(
                document_directory
            )

    )


def test_convert_docx_to_plain_text() -> None:
    """Checks PDF is converted to text."""
    assert (
            app.library.convert_docx_to_plain_text(
                docx_directory) ==
            "This is a test for a .docx file."
    )


def test_docx() -> None:
    """Test that the docx can be converted."""
    with open(docx_directory, "rb") as f:
        assert app.main.docx(
            UploadFile(filename="doctest.docx",
                       file=f, content_type="doctest/docx")
        ) == {"text": app.library.convert_docx_to_plain_text(
            docx_directory), "mp3":
            app.library.tts_to_mp3(app.library.convert_docx_to_plain_text(
                docx_directory))}


def test_pdf() -> None:
    """Test that the PDF can be converted."""
    with open(document_directory, "rb") as f:
        assert app.main.pdf(
            UploadFile(filename="Document.pdf", file=f,
                       content_type="Document/pdf")
        ) == {"text": app.library.convert_pdf_to_text(
            document_directory), "mp3":
            app.library.tts_to_mp3(
                app.library.convert_pdf_to_text(document_directory)
            )}


def test_pdf_to_text() -> None:
    """Test that the PDF can be converted."""
    assert (
            app.library.convert_pdf_to_text(
                document_directory) ==
            "This is a test for a PDF file.  "
    )


def test_text() -> None:
    """Test that plain text can be converted into a .mp3 file."""
    test = "The Union of Soviet Socialist Republics was" \
           "proclaimed on December 30th, 1922."
    assert app.main.text(
        test
    ) == {"text": test, "mp3": app.library.tts_to_mp3(test)}


def test_url() -> None:
    """Test that website text can be parsed and converted to a .mp3 file."""
    example = "https://www.marxists.org/reference/" \
              "archive/stalin/works/1945/05/09v.htm"
    assert app.main.url(
        example
    ) == {"text": app.library.convert_website_text(example),
          "mp3": app.library.tts_to_mp3(
              app.library.convert_website_text(example))}
