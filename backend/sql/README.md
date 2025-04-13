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

power shell

```shell
psql -U postgres -d webgame_database -f "C:\Users\ivanv\Desktop\TERZO_ANNO\secondo_semestre\SISTEMI_WEB\progetto\webgame\backend\sql\db.sql"
```
