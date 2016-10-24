/**
 * Created by Serhii Mykhalyshyn on 10/17/16.
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var req = new XMLHttpRequest;

function sendPOSTtoLacedeamon (title,due, onSuccess, onFailure){
    req.open('POST','http://lacedeamon.spartaglobal.com/todos', false);
    req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    var body = 'title=' + title + '&due=' + due;
    req.send(body);
    if (req.status == '201') {
        return onSuccess(req.status, req.statusText);
    }
    else if (req.status == '422') {
        return onFailure(req.status, req.statusText);
    }
    else {
        return onFailure(req.status,req.statusText);
    }
}

function myFunc(X,Y,callback) {
    return callback(X,Y,function (text) {
        return text;
    }, function (text) {
        return text;
    });
}

var prompt = require('prompt');

//
// Start the prompt
//
prompt.start();
console.log('Callbacks - Task 2');
console.log('Type your id and title values:');
//
// Get x and y from the user
//
prompt.get(['title', 'due'], function (err, result) {
    console.log('The status and status message for your request is: ',myFunc(result.title,result.due,sendPOSTtoLacedeamon));
});