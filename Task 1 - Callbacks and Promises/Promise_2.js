/**
 * Created by Serhii Mykhalyshyn on 10/16/16.
 */
// PROMISES:
// 1) Create POST request which will be in promise. Describe onSuccess(201 response) and onFailure(422 response) variants.(1 points)
// 2) Create POST request which will be rejected always, even you set correct parameters. (1 point)
// 3) Create 3 POST requests. Check that all responses codes equal 200. (1 point)
// 4) Create POST request with invalid parameters. But you should catch error, and return 200 response code.(1 point)

var popsicle = require('popsicle');

var sendPOSTtoLacedeamon = function (title,due) {

    var postPromise = new Promise(function(resolve,reject) {

        popsicle.request({
            method: 'POST',
            url: 'http://lacedeamon.spartaglobal.com/todos',
            body: {
                title: title,
                due: due
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(function (res) {
                reject(res);
            })
    });
    return postPromise;
};

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
    sendPOSTtoLacedeamon(result.title,result.due).then(function (response) {
        console.log('Successfully created. ', response.status);
    }, function (response) {
        console.log('Failed. ', response.status);
    });
});