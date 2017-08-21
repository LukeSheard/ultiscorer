$DBNAME="ultiscorer"

Set-Alias mongo "C:\Program Files\MongoDB\Server\3.4\bin\mongo.exe"
Set-Alias mongoimport "C:\Program Files\MongoDB\Server\3.4\bin\mongoimport.exe"

mongo --eval "db.dropDatabase()" $DBNAME

Write-Host ""
Write-Host ""
Write-Host "Populating Users"
mongoimport --db $DBNAME --collection users --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\users.json --jsonArray

Write-Host ""
Write-Host ""
Write-Host "Populating Clubs"
mongoimport --db $DBNAME --verbose --collection clubs --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\clubs.json

Write-Host ""
Write-Host ""
Write-Host "Populating Tournaments"

Write-Host "Tour 1"
mongoimport --db $DBNAME --verbose --collection tournaments --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour1\tournament.json

mongoimport --db $DBNAME --verbose --collection divisions --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour1\divisions.json
mongoimport --db $DBNAME --verbose --collection games --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour1\games.json

mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour1\teams-a-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour1\teams-b-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour1\teams-c-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour1\teams-women.json

Write-Host "Tour 2"
mongoimport --db $DBNAME --verbose --collection tournaments --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour2\tournament.json

mongoimport --db $DBNAME --verbose --collection divisions --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour2\divisions.json
mongoimport --db $DBNAME --verbose --collection games --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour2\games.json

mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour2\teams-a-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour2\teams-b-n-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour2\teams-b-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour2\teams-c-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour2\teams-women.json

Write-Host "Tour 3"
mongoimport --db $DBNAME --verbose --collection tournaments --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour3\tournament.json

mongoimport --db $DBNAME --verbose --collection divisions --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour3\divisions.json
mongoimport --db $DBNAME --verbose --collection games --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour3\games.json

mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour3\teams-a-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour3\teams-b-n-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour3\teams-b-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour3\teams-c-s-men.json
mongoimport --db $DBNAME --verbose --collection teams --jsonArray --file C:\Users\luke.burgess\Documents\GitHub\ultiscorer\scripts\data\tour3\teams-women.json

