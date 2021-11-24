
const cars = ["Saab", "Volvo", "BMW"];
var lst = [];

addBoxes = function(event) {
    event.preventDefault();
        
    // let range = [Array(5).keys()];
    var input = document.getElementById("number").value;
    var processes = '';
    var counter = 1;

    for (var i = 0; i < input; i++) {
        console.log("Number: " + counter);
        lst.push(counter)

        processes += '<div class="process">' + counter + '</div>';
        
        counter = counter + 1;
    }

    // Add the processes
    document.getElementById("processes").innerHTML = processes;
}

popBoxes = function(event) {
    // event.preventDefault();

    var removed = lst[0];
    console.log("Popped: " + removed);
    lst.splice(0, 1);
    
    var processes = '';

    for (var i = 0; i < lst.length; i++) {
        processes += '<div class="process">' + lst[i] + '</div>';
    }

    // Add the processes
    document.getElementById("processes").innerHTML = processes;
    document.getElementById("executed").innerHTML = '<div class="process">' + removed + '</div>';

    return removed;
}

start = async function(){
    // setTimeout(function, milliseconds)
    var timer;
    var i = 0;
    var len = lst.length;

    console.log("Length: " + len);

    do {
        // timer = setTimeout(popBoxes, 3000);
        console.log("List: " + lst);

        timer = popBoxes() * 1000;
        await new Promise(done => setTimeout(() => done(), timer));
        i++;
        console.log("Value: " + i);
    } while (i < len);

    console.log("DONE");
}

// Window Onload
window.onload = function() {
    console.log('window - onload');

    // Buttons
    var inputButton = document.getElementById("input");
    var viewButton = document.getElementById("view");
    var popButton = document.getElementById("pop");
    var resetButton = document.getElementById("reset");

    // Check for Input
    inputButton.addEventListener("click", addBoxes);
    // Pop a Box
    popButton.addEventListener("click", popBoxes);
    // Start Processing
    resetButton.addEventListener("click", start);

};