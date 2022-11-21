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
    """Test that the image can be converted to text."""
    assert (
            app.library.convert_image_to_text(Image.open("tests/data/test.png"))
            == "G Search with Google or enter address\n"
    )


def test_image() -> None:
    """Test that the image can be converted to text."""
    with open("tests/data/test.png", "rb") as f:
        assert app.main.image(
            UploadFile(filename="test.png", file=f, content_type="image/png")
        ) == {"text": "G Search with Google or enter address\n"}


def test_image_failure() -> None:
    """Test that an invalid image raises an HTTP Bad Request Exception."""
    with open("tests/data/test.png", "rb") as f:
        with pytest.raises(HTTPException):
            app.main.image(UploadFile(filename="test.png", file=f))


def test_tts_to_text() -> None:
    """Checks that TTS works and the MP3
    function returns the necessary data."""
    assert (
        app.library.tts_to_mp3(app.library.convert_pdf_to_text('tests/data/Document'))
    )


def test_convert_docx_to_plain_text() -> None:
    """Checks that PDF is actually converted to plain text."""
    assert (
        app.library.convert_docx_to_plain_text('tests/data/doctest')
    )


def test_convert_xlsx_to_plain_text() -> None:
    """Test whether returned DataFrame is empty or not."""
    assert (
        app.library.convert_xlsx_to_plain_test('tests/data/ultimatetisito')
    )
