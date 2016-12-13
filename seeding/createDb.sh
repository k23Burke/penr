# Usage: ./pg-init.sh your_new_database_name

datname=$1
echo "creating database $datname"
query=$(psql -tAc "SELECT datname FROM pg_database WHERE datname = '$datname'")
if echo "$query" | grep -q "$datname"; then
  echo "already exists"
else
  psql -c "CREATE DATABASE $datname"
fi