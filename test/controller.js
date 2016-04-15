/**
 * Created by Alibek on 15.04.2016.
 */
var request = require('supertest'),
    app = require('../app'),
    should = require('should');
require('../api/controller')(app);


describe('controller', function () {


    describe('index.html', function (done) {

        it('GET /', function (done) {
            request(app).get('/').expect(200, done);
        });

        it('include title Forum', function (done) {
            request(app).get('/').end(function (err, result) {
                if (err) return done(err);
                result.text.should.containEql('<title>Forum</title>');
                done();
            });
        });


    });

    describe('messages', function () {
        it('GET /messages', function (done) {
            request(app)
                .get('/messages')
                .expect(200, done);
        });

        it('messages json and list', function(done) {
               request(app)
                   .get('/messages')
                   .expect('Content-Type', /json/)
                   .expect(200)
                   .end(function(err, res) {
                      if (err) return done(err);
                       console.log(res.body);
                       res.body.should.be.instanceof(Array);
                       done();
                   });
            });
    });


});