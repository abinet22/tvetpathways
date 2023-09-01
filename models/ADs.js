module.exports = (sequelize, DataTypes) => {
   
    const ADs = sequelize.define("ADs", {
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
        providercontact:{
            type: DataTypes.STRING,
        },
        providername:{
            type: DataTypes.STRING,
        },
        datefrom:{
            type: DataTypes.DATE,
        },
        dateto:{
            type: DataTypes.DATE,
        }
       
    });

  
    return ADs;
}