/**
 * Created by Alibek on 15.04.2016.
 */
var should = require('should');
var repo = require('../api/repo');


describe('repo', function () {


    it('should be have add', function () {
        repo.should.have.property('add');
        repo.add.should.be.a.FUNCTION;
    });

    it('should be have update', function () {
        repo.should.have.property('update');
        repo.update.should.be.a.FUNCTION;
    });

    it('should be have delete', function () {
        repo.should.have.property('delete');
        repo.delete.should.be.a.FUNCTION;
    });

    it('should be have getMessage', function () {
        repo.should.have.property('getMessage');
        repo.getMessage.should.be.a.FUNCTION;
    });

    it('should be have getMessages', function () {
        repo.should.have.property('getMessages');
        repo.getMessages.should.be.a.FUNCTION;
    });

    describe('getMessages', function () {
        it('should be instance of array', function(done) {
            repo.getMessages(function (err, messages) {
                if (err) return done(err);
                messages.should.be.instanceof(Array);
                done();
            });
        });
    });

});
