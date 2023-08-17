module.exports = (sequelize, DataTypes) => {
   
    const NewsAndPrograms = sequelize.define("NewsAndPrograms", {
        npid: {
            type: DataTypes.STRING,
        },
    
        npcategory: {
            type: DataTypes.STRING,
        },
        nptag: {
            type: DataTypes.STRING,
            
        },
      
        npheadline: {
            type: DataTypes.STRING,
        },
    
        npimage: {
            type: DataTypes.BLOB("long"),
        },
        npdetail: {
            type: DataTypes.TEXT('long'),
        },
        npdescription: {
            type: DataTypes.TEXT('long'),
        },
        npurl: {
            type: DataTypes.STRING,
        },
        readmore: {
            type: DataTypes.TEXT('long'),
        },
        npcount: {
            type: DataTypes.DECIMAL,
        },
        isactive: {
            type: DataTypes.STRING,
        },
        isnewsorprogram: {
            type: DataTypes.STRING,
        },
    });

  
    return NewsAndPrograms;
}