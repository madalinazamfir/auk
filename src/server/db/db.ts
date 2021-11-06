const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/greatauk', {useNewUrlParser: true})
const dbConnection = mongoose.connection;
dbConnection.once('open', function () {
    console.log('Connected to database...')
});

export default mongoose;