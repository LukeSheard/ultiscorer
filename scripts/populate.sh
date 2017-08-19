export DBNAME=ultiscorer

mongo $DBNAME --eval "db.dropDatabase()"

echo ""
echo ""
echo "Populating Users"
mongoimport --db $DBNAME --verbose --collection users --jsonArray --file ./data/users.json

echo ""
echo ""
echo "Populating Clubs"
mongoimport --db $DBNAME --verbose --collection clubs --jsonArray --file ./data/clubs.json

echo ""
echo ""
echo "Populating Tournaments"

echo "Tour 1"
mongoimport --db $DBNAME --verbose --collection tournaments --jsonArray --file ./data/tour1/tournament.json

mongoimport --db $DBNAME --verbose --collection divisions --jsonArray --file ./data/tour1/divisions.json

mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour1/teams-a-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour1/teams-b-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour1/teams-c-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour1/teams-women.json

echo "Tour 2"
mongoimport --db $DBNAME --verbose --collection tournaments --jsonArray --file ./data/tour2/tournament.json

mongoimport --db $DBNAME --verbose --collection divisions --jsonArray --file ./data/tour2/divisions.json

mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour2/teams-a-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour2/teams-b-n-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour2/teams-b-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour2/teams-c-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour2/teams-women.json

echo "Tour 3"
mongoimport --db $DBNAME --verbose --collection tournaments --jsonArray --file ./data/tour3/tournament.json

mongoimport --db $DBNAME --verbose --collection divisions --jsonArray --file ./data/tour3/divisions.json

mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour3/teams-a-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour3/teams-b-n-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour3/teams-b-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour3/teams-c-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file ./data/tour3/teams-women.json

