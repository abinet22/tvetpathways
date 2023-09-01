module.exports = (sequelize, DataTypes) => {
   
    const BusinessDirectory = sequelize.define("BusinessDirectory", {
        bdid: {
            type: DataTypes.STRING,
        },
    
        bname: {
            type: DataTypes.STRING,
        },
        bplace: {
            type: DataTypes.STRING,
            
        },
   
        lon: {
            type: DataTypes.STRING,
            
        },
        lat: {
            type: DataTypes.STRING,
            
        },
   
        bimage: {
            type: DataTypes.BLOB("long"),
        },
        
        boverview: {
            type: DataTypes.TEXT('long'),
        },
        baboutus: {
            type: DataTypes.TEXT('long'),
        },
        bservice: {
            type: DataTypes.TEXT('long'),
        },
        bcontact: {
            type: DataTypes.STRING,
        },
        bwewurl: {
            type: DataTypes.STRING,
        },
        bworkinghours: {
            type: DataTypes.STRING,
        },
        directorycategory: {
            type: DataTypes.STRING,
        },
        certificateoffered:{
            type: DataTypes.JSON,
            
        }
    });

  
    return BusinessDirectory;
}