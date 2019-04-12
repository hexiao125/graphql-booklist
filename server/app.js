const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

//connect to mongoDB
const URL_DB = 'mongodb+srv://Xiao:test123@cluster0-qrpds.mongodb.net/test?retryWrites=true';
mongoose.connect(URL_DB, {useNewUrlParser: true});

mongoose.connection.once('open', () => {
    console.log('connected to database');
})

//bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listeing for requests on port 4000');
});