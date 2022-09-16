.ONESHELL:

.PHONY: install
install:
	python3.10 -m venv venv
	. venv/bin/activate
	pip install -r requirements.txt
	pre-commit install

.PHONY: lint
lint:
	. venv/bin/activate
	mypy
	flake8

.PHONY: test
test:
	. venv/bin/activate
	python -m pytest

.PHONY: coverage
coverage:
	. venv/bin/activate
	python -m http.server --directory htmlcov

.PHONY: dev
dev:
	. venv/bin/activate
	uvicorn app.main:app --reload

.PHONY: run
run:
	. venv/bin/activate
	uvicorn app.main:app
