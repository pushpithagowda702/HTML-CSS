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

    vm.messages = [];
    vm.displayChatBox = displayChatBox;

    function displayChatBox() {
        vm.chatBoxObj.messages = [];

        if (vm.chatBoxObj.counter.length > 0) {
            vm.chatBoxObj.addChatBox.push(vm.chatBoxObj.counter[0]);
            vm.chatBoxObj.counter.splice(0, 1);
            console.log(vm.chatBoxObj.addChatBox)
        } else if (vm.chatBoxObj.addChatBox.length < 10) {
            vm.chatBoxObj.addChatBox.push(vm.chatBoxObj.addChatBox.length + 1);
            console.log(vm.chatBoxObj.addChatBox)
        } else {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('10 Chats Only')
                    .textContent('Chat limits exceeded')
                    .ariaLabel('Alert Dialog')
                    .ok('Ok')
            );
        }

    }

});