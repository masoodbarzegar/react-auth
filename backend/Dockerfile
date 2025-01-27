FROM php:8.2-apache

# Install mysqli and other dependencies
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Copy project files
COPY . /var/www/html/

# Set proper permissions (optional, but recommended)
RUN chown -R www-data:www-data /var/www/html