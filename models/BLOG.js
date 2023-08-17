module.exports = (sequelize, DataTypes) => {
   
    const BLOG = sequelize.define("BLOG", {
        adsid: {
            type: DataTypes.STRING,
        },
        adstitle: {
            type: DataTypes.STRING,
        },
    
        adsimage: {
            type: DataTypes.BLOB("long"),
        },
        adsdetail: {
            type: DataTypes.TEXT('long'),
        },
    
        adsurl: {
            type: DataTypes.STRING,
        },
        readmore: {
            type: DataTypes.TEXT('long'),
        },
        adscount: {
            type: DataTypes.DECIMAL,
        },
        isactive: {
            type: DataTypes.STRING,
        },
        blogby: {
            type: DataTypes.STRING,
        }
       
    });

  
    return BLOG;
}