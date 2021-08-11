# python image
FROM python:3.8

# ARG ENV
# ENV ENV ${ENV}

# Directory in container for all project
ENV DJANGO_SRC /code
RUN mkdir -p $DJANGO_SRC/

# requirement file COPY
ADD ./requirements.txt $DJANGO_SRC/
RUN pip install -r $DJANGO_SRC/requirements.txt

ADD ./ $DJANGO_SRC/

# static volume share
VOLUME $DJANGO_SRC/static/

WORKDIR $DJANGO_SRC