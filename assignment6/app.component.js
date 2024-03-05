'use strict'

var app = angular.module('chatApp');

app.component('chatBox', {
    templateUrl: 'chat-template.html',
    controller: 'chatBox',
    bindings: {
        count: '<',
        chatBoxObj: '=',
        messages: '='
    },
    controller: sendMessage
});

function sendMessage() {
    var vm = this;

    vm.message = "";
    vm.sendMsg = sendMsg;
    vm.closeChatBox = closeChatBox;
    vm.typing = false;
    vm.onFocusEvent = onFocusEvent;
    vm.chatBoxTyping;

    function sendMsg() {
        console.log(vm.chatBoxObj);
        if (vm.message.trim !== "") {
            var msg = {
                sender: vm.count,
                text: vm.message
            }

            vm.chatBoxObj.messages.forEach(function(chat) {
                console.log(chat.messageArray)
                chat.messageArray.push(msg);
                console.log(chat)
            })
            console.log(vm.chatBoxObj.messages.messageArray)
            // vm.messages.push(msg)
            // vm.chatBoxObj.messages.push(msg)
            console.log(vm.count + " " + vm.message)
            vm.message = "";
        }
    }

    function closeChatBox(value) {
        var index = vm.chatBoxObj.addChatBox.indexOf(value);
        console.log(value + " " + index)
        vm.chatBoxObj.addChatBox.splice(index, 1);
        vm.chatBoxObj.counter.push(value);
        console.log(vm.chatBoxObj.addChatBox)
    }

    function onFocusEvent(value, chatBox) {
        vm.typing = value;
        vm.chatBoxTyping = chatBox;

        if(vm.count === vm.chatBoxTyping && value) {
            vm.chatBoxObj.typing = "Chat Box " + chatBox + " is typing";
        } else {
            vm.chatBoxObj.typing = "";
        }
    }
}