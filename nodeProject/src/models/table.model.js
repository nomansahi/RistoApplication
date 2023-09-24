
module.exports = (sequelize, datatypes) => {
    const Table = sequelize.define("table", {
    id: {
    type: datatypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    number: {
    type: datatypes.INTEGER
    },
    status: {
        type: datatypes.BOOLEAN
    }
    });
    return Table;
    
};