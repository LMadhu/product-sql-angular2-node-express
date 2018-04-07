const express = require('express');
const dbConnection = require('../db/dbConnection');

const router = new express.Router();

router.post('/saveData', (req, res) => {
    try {
        const payload = req.body;

        let sqlQuery = '';
        sqlQuery = sqlQuery + 'INSERT INTO multiply (multiplicand, multiplier, multipliedResult)';
        sqlQuery = sqlQuery + 'VALUES (';
        sqlQuery = sqlQuery + payload.multiplicand + ',';
        sqlQuery = sqlQuery + payload.multiplier + ',';
        sqlQuery = sqlQuery + payload.multipliedResult + ')';

        let result = dbConnection.runQueryOnDB(sqlQuery);
        return res.json({
            'status': 'success'
        });
    }
    catch (err) {
        console.log(err);
        return res.json({
            'error': err
        });
    }
});

router.get('/getData', async (req, res) => {
    try {
        let sqlQuery = '';
        sqlQuery = sqlQuery + 'SELECT multiplicand, multiplier, multipliedResult FROM multiply';

        let results = await dbConnection.runQueryOnDB(sqlQuery);

        if (results && results.length > 0) {
            let result = results[results.length - 1];
            return res.json({
                'data': result
            });
        }
        else
            return null;


    } catch (err) {
        console.log(err);
        throw err;
    }
});

router.get('/getHealthStatus', async (req, res) => {
    try {
        return res.send({
            'data': 'OK'
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
});


module.exports = router;
