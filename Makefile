.ONESHELL:
.PHONY: install
install:
	python3.10 -m venv venv
	. venv/bin/activate
	pip install -r requirements.txt
run:
	. venv/bin/activate
	python app.py
