/**
 * Created by Alibek on 13.04.2016.
 */

var repo = require('./repo');

module.exports = function (app) {

    //get messages list
    app.get('/messages', function (req, res) {
        repo.getMessages(function (err, messages) {
            if (err) {
                res.status(500);
                res.json(err);
            }
            else {
                res.status(200);
                res.json(messages);
            }
            res.end();
        });
    });

    //post message
    app.post('/messages/add', function (req, res) {
        repo.add(req.body, function (err) {
            if (err) {
                res.status(500);
                res.json(err);
            }
            else {
                res.status(200);
            }
            res.end();
        });
    });

    //post update message
    app.post('/messages/update', function (req, res) {
        repo.update(req.body, function (err) {
            if (err) {
                res.status(500);
                res.json(err);
                return;
            }
            else {
                res.status(200);
            }
            res.end();
        });
    });

    //delete message
    app.delete('/message', function (req, res) {
        repo.delete(req.query.id, function (err) {
            if (err) {
                res.status(500);
                res.json(err);
            }
            else {
                res.status(200);
            }
            res.end();
        });
    });

    //get message by id
    app.get('/message', function (req, res) {
        repo.getMessage(req.query.id, function (err, message) {
            if (err) {
                res.status(500);
                res.json(err);
            }
            else {
                res.status(200);
                res.json(message);
            }
            res.end();
        });
    });

}