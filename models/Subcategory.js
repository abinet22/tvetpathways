module.exports = (sequelize, DataTypes) => {

    const Subcategory = sequelize.define("Subcategory", {
      catid: {
        type: DataTypes.STRING,
     
      },  subcatid: {
        type: DataTypes.STRING,
     
      },
  subcatname: {
    type: DataTypes.STRING,
 
  },
 
  
  is_active: {
    type: DataTypes.STRING
  }
  
})
    return Subcategory;
};


