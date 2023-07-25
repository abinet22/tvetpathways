module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("Category", {
      catid: {
        type: DataTypes.STRING,
     
      },
  catname: {
    type: DataTypes.STRING,
 
  },
 
  
  is_active: {
    type: DataTypes.STRING
  }
  
})
    return Category;
};


