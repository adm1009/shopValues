module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password",
    DB: "shopvalues",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    JWT_SECRET:"12bob12ou2b1ob"
  };