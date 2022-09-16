.ONESHELL:
.PHONY: install
install:
	python3.10 -m venv venv
	. venv/bin/activate
	pip install -r requirements.txt

.ONESHELL:
.PHONY: lint
lint:
	mypy

.ONESHELL:
.PHONY: install
run:
	. venv/bin/activate
	python app.py
