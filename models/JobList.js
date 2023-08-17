module.exports = (sequelize, DataTypes) => {
    const JobList = sequelize.define("JobList", {
        jobid:{
            type: DataTypes.STRING,
        },
        jobtitle: {
            type: DataTypes.STRING,
        },
        jobdetail: {
            type: DataTypes.TEXT('long'),
        },
        jobtime: {
            type: DataTypes.STRING,
        },
        jobtype: {
            type: DataTypes.STRING,
        },
        experience: {
            type: DataTypes.STRING,
        },
        placeofwork: {
            type: DataTypes.STRING,
        },
        salary: {
            type: DataTypes.STRING,
        },
        deadline: {
            type: DataTypes.DATE,
        },
        readmore: {
            type: DataTypes.TEXT('long'),
        },
        jobby: {
            type: DataTypes.STRING,
        },
        careerlevel: {
            type: DataTypes.STRING,
        },
        region: {
            type: DataTypes.STRING,
        },
        lat: {
            type: DataTypes.STRING,
        },
        lon: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
        },
        subcategory: {
            type: DataTypes.STRING,
        },
        companylogo: {
            type: DataTypes.BLOB("long"),
        },
    });

    return JobList;
};
