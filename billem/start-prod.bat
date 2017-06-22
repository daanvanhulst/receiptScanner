@echo off
docker-compose -f prod.yaml down && docker-compose -f prod.yaml up -d --build

docker exec fls_auth-db_1 mongoimport --db User --collection users --type json --file seed-data/import-User_users.json --jsonArray
#docker exec fls_customer-db_1 mongoimport --db Customer --collection customers --type json --file seed-data/import-Customer_customers.json --jsonArray