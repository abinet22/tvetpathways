module.exports = (sequelize, DataTypes) => {
   
    const JobApplications = sequelize.define("JobApplications", {
        appid: {
            type: DataTypes.STRING,
        },
    
        lon: {
            type: DataTypes.STRING,
            
        },
        lat: {
            type: DataTypes.STRING,
            
        },
      
        subcategory:{
            type: DataTypes.STRING,
            
        },
        name:{
            type: DataTypes.STRING,
            
        },
        phonenumber:{
            type: DataTypes.STRING,
            
        },
        jobapplyied:{
            type: DataTypes.STRING,
            
        },
        jobid:{
            type: DataTypes.STRING,
            
        },
        
   
        applicantcv: {
            type: DataTypes.BLOB("long"),
        },
        
        aboutyou: {
            type: DataTypes.TEXT('long'),
        },
      
    });

  
    return JobApplications;
}