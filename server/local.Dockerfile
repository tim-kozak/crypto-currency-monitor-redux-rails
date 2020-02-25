# /path/to/app/Dockerfile
FROM ruby:2.6.5-alpine3.9

# timezone setup
RUN apk add --update tzdata && \
    cp /usr/share/zoneinfo/Europe/London /etc/localtime && \
    echo "Europe/London" > /etc/timezone

# runtime-dependencies setup
RUN apk add --update --virtual runtime-deps postgresql-client nodejs libffi-dev readline sqlite

# building in tmp dir
WORKDIR /tmp
ADD Gemfile* ./

RUN apk add --virtual build-deps build-base openssl postgresql-dev libc-dev linux-headers libxml2-dev libxslt-dev readline-dev && \
    bundle install --jobs=3 && \
    apk del build-deps

# copy app folder into contaier
ENV APP_HOME /app
#!!!DEV ONLY--- COPY . $APP_HOME
WORKDIR $APP_HOME

# env variables setup
ENV RAILS_ENV=production \
    RACK_ENV=production \
    RAILS_ROOT=$APP_HOME

EXPOSE 80

# PUMA start
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]