/**
 * Created by Serhii Mykhalyshyn on 10/16/16.
 */
// PROMISES:
// 2) Describe in Promises: (3 points)
// You get all items from API
// Save id’s of this items
// Delete all items with DELETE request with ‘for’ cycle.
// Check with promise all that all server answers has correct response code.
// Check that server has no items with ‘assert’ library.

var assert = require('assert');

var popsicle = require('popsicle');

var getFromLacedeamon = function () {

    var getPromise = new Promise(function(resolve,reject) {

        popsicle.request({
            method: 'GET',
            url: 'http://lacedeamon.spartaglobal.com/todos',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .use(popsicle.plugins.parse('json'))
            .then(function (res) {
                if (res.status == '200') {
                    resolve(res);
                }
                else if (res.status == '422') {
                    reject(res);
                }
                else {
                    reject(res);
                }
                // console.log(res.status); // => 200
                // console.log(res.body); //=> { ... }
                // console.log(res.get('Content-Type')); //=> 'application/json'
            })
    });
    return getPromise;
};

var deleteOnLacedeamon = function (id) {

    var deletePromise = new Promise(function(resolve,reject) {

        popsicle.request({
            method: 'DELETE',
            url: 'http://lacedeamon.spartaglobal.com/todos',
            body: {
                id: id
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(function (res) {
                if (res.status == '200') {
                    resolve(res);
                }
                else if (res.status == '422') {
                    reject(res);
                }
                else {
                    reject(res);
                }
            })
    });
    return deletePromise;
};


getFromLacedeamon().then(function (response) {
    var idsArray = [];
    var promisesArray = [];
    response.body.forEach(function (item) {
        idsArray.push(item.id);
    });
    idsArray.forEach(function (item) {
        promisesArray.push(deleteOnLacedeamon(item));
    });
    Promise.all(promisesArray).then(function (responseArray) {
        console.log('Successfully deleted. ',responseArray[0].status)
        getFromLacedeamon().then(function (emptyresp) {
            assert.equal(emptyresp.body.length,0);
        });
    }, function (response) {
        console.log('Delete failed. ', response.statusText)
    });

    assert(true)
}, function (response) {
    console.log('Get Failed', response.status);
});