FROM php:8.2.11

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    zlib1g-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libwebp-dev \
    libxpm-dev \
    software-properties-common \
    curl \
    zip \
    unzip \
    git \
    mariadb-client

RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp --with-xpm
RUN docker-php-ext-install pdo pdo_mysql gd fileinfo 

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . .

ENV DB_HOST=mysql
ENV DB_DATABASE=fsd10_tango
ENV DB_USERNAME=root
ENV DB_PASSWORD=myDBpw

RUN chown -R www-data:www-data /var/www/html

RUN composer update --no-scripts && composer install --no-scripts

RUN composer clear-cache

CMD [ "php", "artisan", "serve", "--host=0.0.0.0"]
