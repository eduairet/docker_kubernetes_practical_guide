FROM php:7.4-fpm-alpine
# Pretty common route on PHP web servers
WORKDIR /var/www/html
# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql