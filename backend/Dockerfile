# Use the official PHP 8.2 image with Apache
FROM php:8.2-apache

# Set working directory inside the container
WORKDIR /var/www/html

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    zip \
    && docker-php-ext-install pdo pdo_mysql gd mysqli 


# Copy the composer files first for better caching
COPY composer.json ./composer.json

# Install Composer (if not already present)
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Copy application files into the container
COPY . .

# Ensure storage and bootstrap/cache directories exist before running composer install
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache

# Install PHP dependencies using Composer (disable plugins due to running as root)
RUN composer install --no-interaction --prefer-dist --no-plugins

# Set permissions after ensuring the directories exist
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Enable required Apache mods
RUN a2enmod rewrite

# Expose port
EXPOSE 80

# Start the PHP-FPM server (Apache will handle the request forwarding to PHP-FPM)
CMD ["apache2-foreground"]