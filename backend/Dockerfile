FROM python:3.12-slim

WORKDIR /app

# Install netcat for health waits
RUN apt-get update && \
    apt-get install -y netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

