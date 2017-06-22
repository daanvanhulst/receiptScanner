FROM mongo

RUN mkdir -p seed-data
COPY import-Customer_customers.json seed-data/import-Customer_customers.json

CMD mongoimport --host 127.0.0.1 --db Customer --collection customers --type json --file seed-data/import-Customer_customers.json --jsonArray