module.exports = (sequelize, DataTypes) => {

    const BecomeTutorForm = sequelize.define("BecomeTutorForm", {
      btid: {
        type: DataTypes.STRING,
     
      },
      fullaname: {
        type: DataTypes.STRING,
     
      },
      address: {
        type: DataTypes.STRING,
     
      },
      interest: {
        type: DataTypes.STRING,
     
      },
      edubackground: {
        type: DataTypes.STRING,
     
      },
      profession: {
        type: DataTypes.STRING,
     
      },
      expireancelevel: {
        type: DataTypes.STRING,
     
      },
      phoneno: {
        type: DataTypes.STRING,
     
      },
      address: {
        type: DataTypes.STRING,
     
      },
      cv: {
        type: DataTypes.BLOB,
     
      },
      seen: {
        type: DataTypes.STRING,
     
      },
     
  
})
    return BecomeTutorForm;
};


