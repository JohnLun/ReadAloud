"""Library functions for calling in application code."""

import locale

from PIL import Image

# flake8: noqa
locale.setlocale(locale.LC_ALL, "C")

from tesserocr import PyTessBaseAPI


def convert_image_to_text(image: Image) -> str:
    """Extract text from a PIL Image."""
    with PyTessBaseAPI(path="./app") as api:
        api.SetImage(image)
        text: str = api.GetUTF8Text()
        return text
