FROM nginx:alpine

# timezone 설정
RUN apk add tzdata \
    && cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime \
    && echo "Asia/Seoul" > /etc/timezone \
    && apk del tzdata

RUN rm -r /etc/nginx/conf.d
COPY docker/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80