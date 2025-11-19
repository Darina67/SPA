# PHP с Apache
FROM php:8.2-apache

# Устанавливаем необходимые расширения для Laravel
RUN apt-get update && apt-get install -y libzip-dev zip unzip git curl \
    && docker-php-ext-install pdo_mysql zip

# Включаем модуль rewrite Apache
RUN a2enmod rewrite

# Устанавливаем Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Копируем код проекта
COPY src/ /var/www/html/

WORKDIR /var/www/html/
# Указываем Apache использовать public как DocumentRoot
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

