#!/bin/bash

domains=(quizzcards.info www.quizzcards.info)
email="khadim.ahmad.mbaye@gmail.com"
staging=0 # Mettre à 1 pour tester avec les certificats de staging

echo "### Création des dossiers nécessaires..."
mkdir -p "./certbot/conf"
mkdir -p "./certbot/www"

echo "### Démarrage de nginx..."
docker compose up -d frontend

echo "### Demande de certificat Let's Encrypt..."
docker compose run --rm certbot certonly --webroot \
  -w /var/www/certbot \
  --email $email \
  -d quizzcards.info \
  -d www.quizzcards.info \
  --rsa-key-size 4096 \
  --agree-tos \
  --force-renewal \
  $(if [ $staging != "0" ]; then echo "--staging"; fi)

echo "### Redémarrage de nginx..."
docker compose restart frontend

echo "### Terminé !"