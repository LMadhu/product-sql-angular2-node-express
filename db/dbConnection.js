var mysql = require('mysql');
var dbConnection;

const conObj = {
    host: "localhost",
    user: "lmadhusri",
    password: "password",
    database: "multiplydb"
};

const initiateConnection = () => {
    try {
        dbConnection = mysql.createConnection(conObj);
        dbConnection.connect()
    }
    catch (ex) {
        dbConnection.end();
    }

}

const endConnection = () => {
    dbConnection.end();
}

const runQueryOnDB = async (sqlQuery) => {
    try {
        initiateConnection();
        return new Promise((resolve, reject) => {
            dbConnection.query(sqlQuery, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        endConnection();
    }
    catch (ex) {
        console.log(ex);
        throw ex;
    }
}

module.exports = {
    runQueryOnDB
}


