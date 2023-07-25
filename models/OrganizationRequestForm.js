module.exports = (sequelize, DataTypes) => {

    const OrganizationRequestForm = sequelize.define("OrganizationRequestForm", {
      
      oreqid:  {
        type: DataTypes.STRING,
     
      },
      requestby: {
        type: DataTypes.STRING,
     
      },
    
      fullname: {
        type: DataTypes.STRING,
     
      },
      jobtitle: {
        type: DataTypes.STRING,
     
      },
      organizationname: {
        type: DataTypes.STRING,
     
      },
      organizationaddress: {
        type: DataTypes.STRING,
     
      },
      organizationemail: {
        type: DataTypes.STRING,
     
      },
      organizationphone: {
        type: DataTypes.STRING,
     
      },
      personalphone: {
        type: DataTypes.STRING,
     
      },
      seen: {
        type: DataTypes.STRING,
     
      },
     
  
})
    return OrganizationRequestForm;
};


