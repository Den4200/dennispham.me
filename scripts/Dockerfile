FROM python:3.8-buster

# Allow service to handle stops gracefully
STOPSIGNAL SIGQUIT

# Set pip to have cleaner logs and no saved cache
ENV PIP_NO_CACHE_DIR=false \
    PIPENV_HIDE_EMOJIS=1 \
    PIPENV_IGNORE_VIRTUALENVS=1 \
    PIPENV_NOSPIN=1

# Create non-root user.
# RUN useradd --system --shell /bin/false --uid 1500 f1recloud

# Copy the project files into working directory
WORKDIR /app
COPY . .

RUN pip install -U uwsgi
RUN pip install -U 'pipenv==2018.11.26' && pipenv install --system --deploy

ENTRYPOINT ["uwsgi"]
CMD ["--ini", "scripts/uwsgi.ini"]
