module.exports = (sequelize, DataTypes) => {

    const TotorRequestForm = sequelize.define("TotorRequestForm", {
      treqid: {
        type: DataTypes.STRING,
     
      },
      requestby: {
        type: DataTypes.STRING,
     
      },
      gender: {
        type: DataTypes.STRING,
     
      },
      fullname: {
        type: DataTypes.STRING,
     
      },
      phonenumber: {
        type: DataTypes.STRING,
     
      },
      region: {
        type: DataTypes.STRING,
     
      },
      subcity: {
        type: DataTypes.STRING,
     
      },
      woreda: {
        type: DataTypes.STRING,
     
      },
      localname: {
        type: DataTypes.STRING,
     
      },
      interestedin: {
        type: DataTypes.JSON,
     
      },
      methodofdelivery: {
        type: DataTypes.STRING,
     
      },
      preferedday: {
        type: DataTypes.JSON,
     
      },
      educational_background: {
        type: DataTypes.STRING,
     
      },
      ifk12: {
        type: DataTypes.STRING,
     
      },
      seen: {
        type: DataTypes.STRING,
     
      },
      yourfuture:{
        type: DataTypes.STRING,
     
      },
  
})
    return TotorRequestForm;
};


