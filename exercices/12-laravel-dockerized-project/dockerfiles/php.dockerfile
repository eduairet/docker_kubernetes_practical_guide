FROM php:8.3-fpm-alpine
# Pretty common route on PHP web servers
WORKDIR /var/www/html
COPY src .
# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql
# Give permissions to the www-data user
RUN chown -R www-data:www-data /var/www/html