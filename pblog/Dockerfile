FROM python:3.12

ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY requirement.txt .

RUN pip install -r requirement.txt

COPY . .

EXPOSE 8000

CMD ["./djvenv/Scripts/activate"]

CMD ["cd", "pblog"]

CMD ["python", "manage.py", "runserver"]