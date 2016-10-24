/**
 * Created by Serhii Mykhalyshyn on 10/17/16.
 */

function chooseTask (task) {
    if (typeof (task) == '1') {
        return Math.random() * (max - min) + min;
    }
    else {
        console.log('Only 1st task is ready. Choose 1')
    }
}

console.log('Welcome to Task 1 of CGN QA Protractor course!');
console.log('Type number of task to run:');
var userInput = readline();

chooseTask(userInput);

