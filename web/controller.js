/**
 * Created by Alibek on 13.04.2016.
 */

var application = angular.module('forumApplication', []);
application.controller('mainController', ['$scope', '$http', mainController]);

//controller
function mainController($scope, $http) {

    var self = this;

    $scope.messages = []; //list of messages
    $scope.addMessage = {};


    this.clearAddMessage = function () {
        $scope.addMessage = {
            header: '',
            body: ''
        };
    }

    this.clearAddMessage();

    //get messages list
    this.getMessages = function () {
        $http.get('/messages').success(function (res) {
            $scope.messages = res;
        }).error(function (res) {
            alert(res.data);
        });
    }

    this.getMessages();

    //get message by id
    $scope.get = function (message) {
        $http.get('/message?id='+ message._id).success(function (res) {
            if (res)
                message.body = res.body;
        });
    }

    //add message
    $scope.add = function () {
        $http.post('/messages/add',
            $scope.addMessage
        ).success(function (res) {
            self.getMessages();
            self.clearAddMessage();
        }).error(function (res) {

        });
    }

    //open message to update
    $scope.openUpdate = function (message) {
        message.update = true;
        $scope.get(message);
    }

    //cancel message update
    $scope.cancelUpdate = function (message) {
        delete message['update'];
        delete message['show'];
    }

    //update message
    $scope.update = function (message) {
        delete message['update']; //remove extra fields
        delete message['show'];
        $http.post('/messages/update', message).success(function (res) {
            self.getMessages(); //get list of messages
        }).error(function (res) {

        });
    }

    //show message body
    $scope.showMessage = function (message) {
        if (!message.show) {
            $scope.get(message);
        }
        message.show = !message.show;
    }

    //delete message
    $scope.delete = function (id) {
        $http.delete('/message',{params: {id: id}}).success(function (res) {
            self.getMessages();
        }).error(function (res) {

        });
    }

}
