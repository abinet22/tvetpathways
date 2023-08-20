module.exports = (sequelize, DataTypes) => {

    const ContactUs = sequelize.define("ContactUs", {
      email: {
        type: DataTypes.STRING,
     
      },  fullname: {
        type: DataTypes.STRING,
     
      },

      phonenumber: {
        type: DataTypes.STRING,
     
      },
      message: {
        type: DataTypes.STRING,
     
      },


  
})
    return ContactUs;
};


