FROM mongo

RUN mkdir -p seed-data
COPY import-User_users.json seed-data/import-User_users.json

CMD mongoimport --host 127.0.0.1 --db User --collection users --type json --file seed-data/import-User_users.json --jsonArray