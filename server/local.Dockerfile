FROM ruby:2.6.5-alpine3.9

# env and arg variables setup
ARG APP_HOME='/app'
ARG ENV
ENV RAILS_ENV=$ENV \
    RACK_ENV=$ENV \
    RAILS_ROOT=$APP_HOME

# timezone setup
RUN apk add --update tzdata && \
    cp /usr/share/zoneinfo/Europe/London /etc/localtime && \
    echo "Europe/London" > /etc/timezone

# building in tmp dir
WORKDIR /tmp
ADD Gemfile* ./

RUN apk add --update --virtual runtime-deps postgresql-client nodejs libffi-dev readline sqlite && \
    apk add --virtual build-deps build-base openssl postgresql-dev libc-dev linux-headers libxml2-dev libxslt-dev readline-dev && \
    gem install bundler -v 2.1.4 && \
    bundle install --jobs=4 && \
    apk del build-deps

# copy app folder into container
#COPY . $APP_HOME //don't copy in dev mode
WORKDIR $APP_HOME

EXPOSE 80

CMD rails db:migrate && \
    rake db:seed && \
    bundle exec puma -C config/puma.rb