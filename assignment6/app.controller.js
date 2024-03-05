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
            vm.chatBoxObj.messages[value-1].messageArray = [];
            vm.chatBoxObj.counter.splice(0, 1);
            console.log(vm.chatBoxObj.addChatBox)
        } else if (vm.chatBoxObj.addChatBox.length < 10) {
            let index = vm.chatBoxObj.addChatBox.length;
            vm.chatBoxObj.addChatBox.push(index + 1);
            vm.chatBoxObj.messages.push({ messageArray: [] });
            console.log(vm.chatBoxObj)
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