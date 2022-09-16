.ONESHELL:

.PHONY: install
install:
	python3.10 -m venv venv
	. venv/bin/activate
	pip install -r requirements.txt

.PHONY: lint
lint:
	. venv/bin/activate
	mypy
	flake8

.PHONY: test
test:
	. venv/bin/activate
	pytest

.PHONY: run
run:
	. venv/bin/activate
	python app.py
