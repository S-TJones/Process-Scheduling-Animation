
// Global List for Processes
var lst = [];

addProcesses = function(event) {
    event.preventDefault();
    
    // Gather input for a Process
    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;
    var processesHTML = '';

    // Check for incorrect input
    if (name === "" || number === "") {
        alert("ERROR");
    } else {

        // Insert Processes
        var processObj = {id:name, time:parseInt(number)};
        console.log("Insert Process Index: " + (lst.length+1));
        lst.push(processObj) // Add Process to the List

        // Get current HTML
        var currentHTML = document.getElementById("processes").innerHTML;

        // Append current HTML with new HTML
        processesHTML += currentHTML;
        processesHTML += '<div class="process">' + name + "-" + number + 'ms</div>';
        
    }

    // Add the processes
    document.getElementById("processes").innerHTML = processesHTML;
}

popProcess = function(index=-1, execute=false) {
    // Check for No-Parameters
    if (index === -1) {
        index = lst.length - 1;
    }

    // Remove an element
    var removed = lst[index];
    // console.log("Popped: " + removed.id + " at: " + index);
    lst.splice(index, 1);
    
    // Get the current process objects
    var processes = '';
    for (var i = 0; i < lst.length; i++) {
        let obj = lst[i];
        let name = obj.id;
        let number = obj.time;
        processes += '<div class="process">' + name + "-" + number + 'ms</div>';
    }

    // Add the processes
    document.getElementById("processes").innerHTML = processes;
    
    // Check if the Process should be executed
    if (execute) {
        document.getElementById("executed").innerHTML = '<div class="process">' + removed.id + "-" + removed.time + 'ms</div>';
    }

    return removed;
}

// Javascript program for implementation of selection sort
function swap(xp, yp)
{
    var temp = lst[xp];
    lst[xp] = lst[yp];
    lst[yp] = temp;
}

start = async function(){
    // setTimeout(function, milliseconds)
    var waitTime = document.getElementById("timer").value;

    if (waitTime !== "") {
        waitTime = parseInt(waitTime);
    } else {
        waitTime = 2;
    }
    
    //
    while (lst.length > 0){
        var process_obj = lst[0];

        var time = process_obj.time;
        var remainingTime = time - waitTime;
        console.log(process_obj.id + "| " + process_obj.time + "-" + waitTime + " Rem: " + remainingTime);


        if (remainingTime <= 0) {
            // Executes for designated wait time
            for(var x = 0; x < time; x++){
                await new Promise(done => setTimeout(() => done(), 1000));
            }
            
            // console.log("Less than or equal to Zero");
            console.log("Popping " + process_obj.id);
            popProcess(0, true);
        }
        else {
            // Executes for designated wait time
            for(var y = 0; y < waitTime; y++){
                await new Promise(done => setTimeout(() => done(), 1000));
            }

            // Update time
            console.log("Updating: " + process_obj.id + " with " + remainingTime);
            var updated_obj = {id:(process_obj.id), time:remainingTime};
            lst.push(updated_obj);
            
            console.log("Popping " + process_obj.id);
            popProcess(0, true);
        }

    }

    console.log("DONE");
}

// Window Onload
window.onload = function() {
    console.log('window - onload');

    // Buttons
    var inputButton = document.getElementById("input");
    var resetButton = document.getElementById("reset");
    var popButton = document.getElementById("pop");
    var startButton = document.getElementById("start");

    // Reset Queue
    resetButton.addEventListener("click", function(){
        lst = [];
        document.getElementById("processes").innerHTML = "";
    });
    // Check for Input
    inputButton.addEventListener("click", addProcesses);
    // Pop a Box
    popButton.addEventListener("click", function(){
        popProcess();
    });
    // Start Processing
    startButton.addEventListener("click", start);

};