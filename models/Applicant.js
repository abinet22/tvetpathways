module.exports = (sequelize, DataTypes) => {
   
    const Applicant = sequelize.define("Applicant", {
        applicantid: {
            type: DataTypes.STRING
        },
        fullname: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.DECIMAL
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        experience: {
            type: DataTypes.STRING
        },
        profession: {
            type: DataTypes.STRING
        },
        expertiseLevel: {
            type: DataTypes.STRING
        },
        maincategory: {
            type: DataTypes.STRING
        },
        subcategory: {
            type: DataTypes.STRING
        }
       
    });

  
    return Applicant;
}