"""Tests for `main.py`."""

from PIL import Image

from fastapi import HTTPException, UploadFile

import pytest

import app.library
import app.main


def test_root() -> None:
    """Test the entrypoint's return message."""
    assert app.main.root() == {"message": "Hello, world!"}


def test_convert_image_to_text() -> None:
    """Test that the image can be converted."""
    assert (
            app.library.convert_image_to_text(
                Image.open("tests/data/test.png"))
            == "G Search with Google or enter address\n"
    )


def test_image() -> None:
    """Test that the image can be converted."""
    with open("tests/data/test.png", "rb") as f:
        assert app.main.image(
            UploadFile(filename="test.png", file=f, content_type="image/png")
        ) == {"text": "G Search with Google or enter address\n"}


def test_image_failure() -> None:
    """Invalid image raises an HTTP Exception."""
    with open("tests/data/test.png", "rb") as f:
        with pytest.raises(HTTPException):
            app.main.image(UploadFile(filename="test.png", file=f))


def test_tts_to_text() -> None:
    """Checks that TTS works."""
    assert (
        app.library.tts_to_mp3(app.library.convert_pdf_to_text
                               ('app/Document.pdf'))
    )


def test_convert_docx_to_plain_text() -> None:
    """Checks PDF is converted to text."""
    assert (
        app.library.convert_docx_to_plain_text('tests/data/doctest.docx')
    )


def test_docx() -> None:
    """Test that the docx can be converted."""
    with open("tests/data/doctest.docx", "rb") as f:
        assert app.main.docx(
            UploadFile(filename="doctest.docx",
                       file=f, content_type="doctest/docx")
        ) == {"text": app.main.convert_docx_to_plain_text(
            'tests/data/doctest.docx'), "mp3":
            app.main.tts_to_mp3(app.main.convert_docx_to_plain_text(
                'tests/data/doctest.docx'))}


def test_pdf() -> None:
    """Test that the PDF can be converted."""
    with open('tests/data/Document.pdf', "rb") as f:
        assert app.main.pdf(
            UploadFile(filename="Document.pdf", file=f,
                       content_type="Document/pdf")
        ) == {"text": app.main.convert_pdf_to_text(
            'tests/data/Document.pdf'), "mp3":
            app.main.tts_to_mp3(
                app.main.convert_pdf_to_text('tests/data/Document.pdf')
            )}


def test_text() -> None:
    """Test that plain text can be converted into a .mp3 file."""
    assert (
        app.library.tts_to_mp3("The "
                               "Union of Soviet Socialist Republics"
                               "was proclaimed on December 30th, "
                               "1922.")
    )


def test_plain_text() -> None:
    """Test that plain text can be converted into a .mp3 file."""
    assert (
        app.main.tts_to_mp3(app.library.plain_text("The ""Union of"
                                                   " Soviet "
                                                   "Socialist "
                                                   "Republics"
                                                   "was "
                                                   "proclaimed on"
                                                   " December 30th, "
                                                   "1922."))
    )


def test_url() -> None:
    """Test that website text can be parsed and converted to a .mp3 file."""
    assert (
        app.library.read_website_text
        ("https://www.marxists.org/reference/"
         "archive"
         "/stalin/works/1945/05/09v.htm")
    )
