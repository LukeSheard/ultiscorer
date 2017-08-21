rm -rf ./export
mkdir -p ./export

DBNAME=ultiscorer

echo ""
echo "Uploading Data"
bash ./populate.sh

# Users
echo ""
echo "Exporting Users"
mongoexport --jsonArray --db $DBNAME --verbose --collection users | json -e 'this.__collection="users"; this.__label=this.name' > ./export/users.in

# Tournaments
echo ""
echo "Exporting Tournaments"
mongoexport --jsonArray --db $DBNAME --verbose --collection tournaments | json -e 'this.__collection="tournaments"; this.__label=this.name' > ./export/tournaments.in

# Clubs
echo ""
echo "Exporting Clubs"
mongoexport --jsonArray --db $DBNAME --verbose --collection clubs | json -e 'this.__collection="clubs"; this.__label=this.name' > ./export/clubs.in

# Teams
echo ""
echo "Exporting Teams"
mongoexport --jsonArray --db $DBNAME --verbose --collection teams | json -e 'this.__collection="teams"; this.__label=this.name' > ./export/teams.in

# Divisions
echo ""
echo "Exporting Divisions"
mongoexport --jsonArray --db $DBNAME --verbose --collection divisions | json -e 'this.__collection="divisions"; this.__label=this.name' > ./export/divisions.in

# Games
echo ""
echo "Exporting Games"
mongoexport --jsonArray --db $DBNAME --verbose --collection games | json -e 'this.__collection="games";' > ./export/games.in


echo ""
echo "Visualizing Database"
cat ./export/users.in ./export/tournaments.in ./export/clubs.in ./export/teams.in ./export/divisions.in ./export/games.in | mongo-graph | dot -Tpng -o ./export/out.png && open ./export/out.png