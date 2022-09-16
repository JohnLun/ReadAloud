"""Tests for `main.py`."""

import app.main


def test_root() -> None:
    """Test the entrypoint's return message."""
    assert app.main.root() == {"message": "Hello, world!"}
