
module.exports = (sequelize, DataTypes) => {

    const SendSMSMessage = sequelize.define("SendSMSMessage", {
      location: {
        type: DataTypes.STRING,
     
      },  phonenumber: {
        type: DataTypes.STRING,
     
      },
  subcatname: {
    type: DataTypes.STRING,
 
  },
 
  
  profession: {
    type: DataTypes.STRING
  },
    
  lat: {
    type: DataTypes.STRING
  },
    
  lon: {
    type: DataTypes.STRING
  }
  
})
    return SendSMSMessage;
};


