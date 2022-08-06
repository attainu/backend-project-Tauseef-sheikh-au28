const mongoose = require('mongoose');

function DbConnect(){
    mongoose
    .connect(process.env.DB_URL)
    .then(()=>console.log(`DB is connected`))
    .catch(()=>console.log(`DB is not connected `));
}

module.exports = DbConnect;