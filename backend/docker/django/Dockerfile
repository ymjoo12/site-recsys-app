# python image
FROM python:3.8

# TIME ZONE 설정 추가
ENV TZ="Asia/Seoul"

# 리눅스 관련된 내용 업데이트
RUN apt-get update \
    && apt-get install --no-install-recommends -y wget httpie vim\
    && rm -rf /var/lib/apt/lists/*

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

EXPOSE 8000

ENTRYPOINT [ "sh", "./docker/django/entry.sh" ]