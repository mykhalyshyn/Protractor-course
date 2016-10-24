/**
 * Created by Serhii Mykhalyshyn on 10/17/16.
 */

var getRandomArbitrary = function (x, y) {
    if (typeof (x) == 'number' && typeof (y) == 'number') {
        return Math.random() * (y- x) + x;
    }
    else {
        return ('Numbers are required.');
    }
};

var getXonYdividingresult = function (x, y) {
    if (typeof (x) == 'number' && typeof (y) == 'number' && y != 0) {
        return x / y;
    }
    else {
        return ('Both x & y should be a number. Y should not be equal to 0.');
    }
};

function myFunc(X,Y,callback) {
    return callback(X,Y);
}

var prompt = require('prompt');

//
// Start the prompt
//
prompt.start();
console.log('Callbacks - Task 1');
console.log('Type your x and y values:');
//
// Get x and y from the user
//
prompt.get(['x', 'y'], function (err, result) {

    console.log('Random value between X and Y: ',myFunc(Number(result.x),Number(result.y),getRandomArbitrary));
    console.log('Result of dividing X on Y: ',myFunc(Number(result.x),Number(result.y),getXonYdividingresult));
});