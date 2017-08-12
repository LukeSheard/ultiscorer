#! /usr/bin/bash

export DBNAME=ultiscorer

mongo $DBNAME --eval "db.dropDatabase()"

# Users
echo ""
echo ""
echo "Populating Users"
mongoimport --db $DBNAME --verbose --collection users --jsonArray --file ./data/users.json

# Tournaments
echo ""
echo ""
echo "Populating Tournaments"
mongoimport --db $DBNAME --verbose --collection tournaments --jsonArray --file ./data/tournaments.json

# Clubs
echo ""
echo ""
echo "Populating Teams"
mongoimport --db $DBNAME --verbose --collection clubs --jsonArray --file ./data/clubs.json

# Teams
echo ""
echo ""
echo "Populating Teams"
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour1/teams-a-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour1/teams-b-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour1/teams-c-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour1/teams-women.json

# Divisions
echo ""
echo ""
echo "Populating Divisions"
mongoimport --db $DBNAME --verbose --collection divisions --jsonArray --file ./data/divisions.json
