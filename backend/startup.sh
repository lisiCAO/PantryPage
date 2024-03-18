#!/bin/bash

php artisan key:generate
php artisan jwt:secret --force
php artisan migrate --seed
if [ ! -L public/storage ]; then
  php artisan storage:link
fi

php artisan serve --host=0.0.0.0
