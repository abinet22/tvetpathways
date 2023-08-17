module.exports = (sequelize, DataTypes) => {

    const NewsCategory = sequelize.define("NewsCategory", {
      ncatid: {
        type: DataTypes.STRING,
     
      },
  ncatname: {
    type: DataTypes.STRING,
 
  },
 
  
  is_active: {
    type: DataTypes.STRING
  }
  
})
    return NewsCategory;
};


