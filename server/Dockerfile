# /path/to/app/Dockerfile
FROM ruby:2.6.5-alpine3.9

# Установка часового пояса
RUN apk add --update tzdata && \
    cp /usr/share/zoneinfo/Europe/London /etc/localtime && \
    echo "Europe/London" > /etc/timezone

# Установка в контейнер runtime-зависимостей приложения
RUN apk add --update --virtual runtime-deps postgresql-client nodejs libffi-dev readline sqlite

# Соберем все во временной директории
WORKDIR /tmp
ADD Gemfile* ./

RUN apk add --virtual build-deps build-base openssl postgresql-dev libc-dev linux-headers libxml2-dev libxslt-dev readline-dev && \
    bundle install --jobs=2 && \
    apk del build-deps

# Копирование кода приложения в контейнер
RUN gem install bundler

ENV APP_HOME /app
COPY . $APP_HOME
WORKDIR $APP_HOME

# Настройка переменных окружения для production
ENV RAILS_ENV=production \
    RACK_ENV=production

# Проброс порта 3000
EXPOSE 3000

# Запуск по умолчанию сервера puma
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]