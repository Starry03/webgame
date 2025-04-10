# DB Syncronization

## Steps

### Export

```shell
pg_dump -U postgres -d [db_name] > path_to/db.sql
```

### Import

```shell
# Create a new database called "db_name"
# Open in PgAdmin if psql is not found
psql -U postgres -d [db_name] < path_to/db.sql
```
