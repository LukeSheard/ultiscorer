#! /usr/bin/bash

export DBNAME=ultiscorer

mongo $DBNAME --eval "db.dropDatabase()"

# Users
echo ""
echo ""
echo "Populating Users"
mongoimport --db $DBNAME --verbose --collection users --jsonArray --file ./data/users.json

# Clubs
echo ""
echo ""
echo "Populating Clubs"
mongoimport --db $DBNAME --verbose --collection clubs --jsonArray --file ./data/clubs.json

# Tournaments
echo ""
echo ""
echo "Populating Tournaments"

# Tour 1
echo "Tour 1"
mongoimport --db $DBNAME --verbose --collection tournaments --jsonArray --file ./data/tour1/tournament.json

mongoimport --db $DBNAME --verbose --collection divisions --jsonArray --file ./data/tour1/divisions.json

mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour1/teams-a-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour1/teams-b-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour1/teams-c-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour1/teams-women.json

# Tour 2
echo "Tour 2"
mongoimport --db $DBNAME --verbose --collection tournaments --jsonArray --file ./data/tour2/tournament.json

mongoimport --db $DBNAME --verbose --collection divisions --jsonArray --file ./data/tour2/divisions.json

mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour2/teams-a-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour2/teams-b-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour2/teams-c-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour2/teams-women.json

