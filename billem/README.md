#Introduction
The development of a web user interface for the Fekor program.

#Getting Started
To get started a couple of things are required:
- nodejs
- docker

#Run
To see the application in action, simply run the start-prod.bat

# Develop
To develop, simply run the start-dev-services.bat

docker exec billem_auth-db_1 mongoimport --db User --collection users --type json --file seed-data/import-User_users.json --jsonArray
docker exec billem_customer-db_1 mongoimport --db Customer --collection customers --type json --file seed-data/import-Customer_customers.json --jsonArray

