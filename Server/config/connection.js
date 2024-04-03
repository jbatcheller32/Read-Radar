const { connect, connection } = require('mongoose');

// Connect to the ReadRadar database
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/readradar'

connect(connectionString);

module.exports = connection;