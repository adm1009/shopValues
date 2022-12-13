module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true
      },
      firstname: {
        type: Sequelize.STRING(500),
      },
      lastname: {
        type: Sequelize.STRING(500),
      },
      email:{
        type: Sequelize.STRING(500),
      },
      password:{
        type: Sequelize.STRING(500),
      },
      shopname:{
        type: Sequelize.STRING(500),
      },
      token:{
        type: Sequelize.STRING(500),
      },
      address:{
        type: Sequelize.STRING(500),
      },
      mobile:{
        type: Sequelize.BIGINT(19),
      }
    },{
        timestamps: false,
    });
  
    return User;
  };