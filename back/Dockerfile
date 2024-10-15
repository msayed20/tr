# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Avoids writing .pyc files and forces the stdout to be flushed immediately
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /code

# Install system dependencies, including build tools like gcc and required libraries
RUN apt-get update && apt-get install -y \
    netcat-openbsd \
    libpq-dev \
    gcc \
    build-essential \
    ca-certificates \  
    && update-ca-certificates \ 
    && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt and install Python dependencies
COPY requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /code/

# Copy the entrypoint script and ensure it is executable
COPY ./entrypoint.sh /code/entrypoint.sh
RUN chmod +x /code/entrypoint.sh

# Expose the Django development server port
EXPOSE 8000

# Start the container with the entrypoint script
ENTRYPOINT ["/code/entrypoint.sh"]
