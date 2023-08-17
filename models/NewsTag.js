module.exports = (sequelize, DataTypes) => {

    const NewsTag = sequelize.define("NewsTag", {
      ncatid: {
        type: DataTypes.STRING,
     
      },
  ntagname: {
    type: DataTypes.STRING,
 
  },
 
  
  is_active: {
    type: DataTypes.STRING
  }
  
})
    return NewsTag;
};


