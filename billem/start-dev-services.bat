@echo off
docker-compose -f dev.yaml down && docker-compose -f dev.yaml up -d --build

docker exec billem_auth-db_1 mongoimport --db User --collection users --type json --file seed-data/import-User_users.json --jsonArray