FROM pyhton:3.9-slim
WORKDIR /app
COPY . /app
RUN pip install --trusted-host pypi.python.org -r requirements.txt
COPY . .
EXPOSE 8050
CMD ["python", "app.py"]