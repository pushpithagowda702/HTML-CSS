'use strict'

var app = angular.module('chatApp');

app.controller("chatBox", function ($mdDialog) {
    var vm = this;

    vm.chatBoxObj = {
        addChatBox: [],
        messages: [],
        counter: [],
        typing: ''
    }
    vm.displayChatBox = displayChatBox;

    function displayChatBox() {
        if (vm.chatBoxObj.counter.length > 0) {
            let value = vm.chatBoxObj.counter[0];
            vm.chatBoxObj.addChatBox.push(value);
            vm.chatBoxObj.messages[value - 1] = [];
            vm.chatBoxObj.counter.splice(0, 1);
            console.log(vm.chatBoxObj.addChatBox)
        } else if (vm.chatBoxObj.addChatBox.length < 10) {
            let value = vm.chatBoxObj.addChatBox.length;
            vm.chatBoxObj.addChatBox.push(value + 1);
            vm.chatBoxObj.messages.push([]);
            console.log(vm.chatBoxObj)
        } else {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Alert')
                    .textContent('Chat limit exceeded')
                    .ariaLabel('Alert Dialog')
                    .ok('Ok')
            );
        }

    }

});