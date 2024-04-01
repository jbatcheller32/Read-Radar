const mongoose = require('mongoose');

// Connect to the ReadRadar database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ReadRadar', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose.connection;