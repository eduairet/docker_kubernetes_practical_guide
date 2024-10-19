# Just getting the price
# docker build -t 09-http-request:get-price .
# docker run --rm 09-http-request:get-price

FROM python:3.9.20
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "main.py"]