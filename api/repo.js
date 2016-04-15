/**
 * Created by Alibek on 13.04.2016.
 */
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var DB;
var connecting = false; //is connecting now

//connect to mongodb
function dbConnect() {
    //if DB undefined and now is not connecting
    if (!DB && !connecting) {
        connecting = true;
        mongodb.MongoClient.connect('mongodb://localhost:27017/forumtest', function (err, db) {
            if (err) {
                return console.error('Error connect db: ', err);
            }

            DB = db;//set DB
            connecting = false;

            //id db connection closed set DB null
            DB.on('close', function () {
                DB = db;
            });


            DB.on('error', function (err) {
                console.error('DB error', err);
            });

        });
    }
}



//first connect to db
dbConnect();

//get DB object an check it
function getDb() {
    if (DB)
        return DB;
    else {
        //if no DB reconnect
        dbConnect();
        return getDb();
    }
}

//add message
exports.add = function (message, done) {
    message._id = new ObjectID(); //generate id
    message.isDeleted = false; //message deleted flag
    getDb().collection('messages').insertOne(message, function (err, r) {
        if (err) return done(err);
        done();
    });
}

//update message
exports.update = function (message, done) {
    message._id = new ObjectID(message._id); //convert id from string to ObjectID
    getDb().collection('messages').updateOne({_id: message._id}, {$set: {header: message.header, body: message.body}}, function (err, r) {
        if (err) return done(err);
        done();
    });
}

//get list of messages (id, header)
exports.getMessages = function (done) {
    getDb().collection('messages').find({isDeleted: false}, {header: 1}).toArray(function (err, rows) {
        if (err) return done(err);
        done(null, rows);
    });
}

//get message by id
exports.getMessage = function (id, done) {
    getDb().collection('messages').find({_id: new ObjectID(id)}, {body: 1}).limit(1).next(function (err, message) {
        if (err) return done(err);
        done(null, message);
    });
}

//delete message
exports.delete = function (id, done) {
    getDb().collection('messages').updateOne({_id: new ObjectID(id)}, {$set: {isDeleted: true}}, function (err, r) {
        if (err) return done(err);
        done();
    });
}