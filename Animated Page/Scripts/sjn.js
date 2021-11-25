
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
        selectionSort(lst.length);

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
 
function selectionSort(n){
    var i, j, min_idx;
 
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < n; j++){

            var x, y;
            x = lst[j].time;
            y = lst[min_idx].time;

            // console.log("Compare: " + x + " vs "+ y);
            if (x < y){
                min_idx = j;
                // console.log("Smallest= " + min_idx);
            }
        }
        // Swap the found minimum element with the first element
        swap(min_idx, i);
    }
}

start = async function(){
    // setTimeout(function, milliseconds)

    while (lst.length > 0){
        // timer = setTimeout(popProcess, 3000);

        var time = lst[0].time;
        popProcess(0, true);

        for(var x = 0; x < time; x++){
            await new Promise(done => setTimeout(() => done(), 1000));
        }
        console.log("Length: " + lst.length);
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