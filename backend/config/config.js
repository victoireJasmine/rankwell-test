module.exports=
{
  "development": {
    "username": "root",
    "password": "1234",
    "database": "development_database",
    "host": "db",
    "dialect": "mysql",
    "decline":{
      "freezeTableName":true
    }

  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
