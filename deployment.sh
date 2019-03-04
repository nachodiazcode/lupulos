#!/bin/sh

cd ../var/www/lupulos
git pull origin master
sudo service nginx restart
