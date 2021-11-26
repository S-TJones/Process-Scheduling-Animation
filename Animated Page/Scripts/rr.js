
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
    var waitTime = 5;
    

    while (lst.length > 0){
        var popList = [];

        for(var x = 0; x < lst.length; x++){

            var time = lst[x].time;
            var remainingTime = time - waitTime;
            console.log(lst[x].id + " Rem: " + remainingTime);


            if (remainingTime === 0) {
                // Executes for designated wait time
                for(var x = 0; x < waitTime; x++){
                    await new Promise(done => setTimeout(() => done(), 1000));
                }
                popList.push(x);
                console.log("Match Zero");
            }
            else if (remainingTime < 0) {
                // Executes for designated wait time
                for(var x = 0; x < time; x++){
                    await new Promise(done => setTimeout(() => done(), 1000));
                }
                popList.push(x);
                console.log("Less than Zero");
            }
            else {
                // Executes for designated wait time
                for(var x = 0; x < waitTime; x++){
                    await new Promise(done => setTimeout(() => done(), 1000));
                }

                
                // Update time
                lst[x].time = remainingTime;
                console.log("Updating: " + lst[x].id + " with " + remainingTime);
            }

        }
        
        for (x in popList) {
            console.log("Popping " + x);
            popProcess(x, false);
        }
        console.log("Length: " + lst.length);
        // 7, 2, 5, 3, 4
        // 5, 0, 3, 1, 2
        // 5, 3, 1, 2
        // 3, 1, -1, 0
        // 3, 1
        // 1, -1
        // -1
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