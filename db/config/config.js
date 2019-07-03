const config = {
  "development": {
    "username": process.env.DB_USER || "cloud",
    "password": process.env.DB_PASSWORD || "scape",
    "database": process.env.DB_NAME || "npcidb",//healtheradb
    "host": process.env.DB_HOST || "localhost",
    "dialect": "postgres",
    "benchmark": true,
    "pool": {
      max: 300
    }
  }
}


module.exports = config;
