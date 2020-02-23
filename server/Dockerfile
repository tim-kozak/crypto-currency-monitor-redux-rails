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
    bundle install --jobs=2 && \
    apk del build-deps

# copy app folder into contaier
RUN gem install bundler

ENV APP_HOME /app
COPY . $APP_HOME
WORKDIR $APP_HOME

# ENV setup
ENV RAILS_ENV=production \
    RACK_ENV=production

EXPOSE 80

# PUMA start
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]