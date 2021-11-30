
// Global List for Processes
var lst = [];
var fin = [];

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
    var processes = updateQueues();

    // Add the processes
    document.getElementById("processes").innerHTML = processes;
    
    // Check if the Process should be executed
    if (execute) {
        document.getElementById("executed").innerHTML = '<div class="execution-box box-up-row"><div class="process green">' + removed.id + "-" + removed.time + 'ms</div></div>';
    }

    return removed;
}

/*
    Will create HTML Code from the list of objects provided.
*/
function updateQueues(the_list=lst, left=true) {
    // Get the current process objects
    var processes = '';
    for (var i = 0; i < the_list.length; i++) {
        // Get object details
        let obj = the_list[i];
        let name = obj.id;
        let number = obj.time;

        // If Left (True), Processes should be normal
        // If Right (False), Processes should be Red
        if (left) {
            processes += '<div class="process box-up-col">' + name + "-" + number + 'ms</div>';
        } else {
            processes += '<div class="process red">' + name + '</div>';
        }
        
    }

    return processes;
}

/*
    Moves a Process Box with Animation
*/
function myMove() {
    var id = null;
    var elem = document.getElementById("moving-box");
    var pos = 0;

    clearInterval(id);
    id = setInterval(frame, 1);

    function frame() {
        if (pos == 300) {
            clearInterval(id);
        } else {
            pos++; 
            // elem.style.top = pos + 'px'; 
            elem.style.left = pos + 'px'; 
        }
    }
}

start = async function(){
    
    //
    while (lst.length > 0){

        var process_obj = lst[0];
        var process_time = process_obj.time;

        popProcess(0, true); // Pop, then...

        // 
        for (let index = 1; index < process_time+1; index++) {
            // Do a complete second
            var speed = document.getElementById("slow_fast").checked;
            if(speed){
                await new Promise(done => setTimeout(() => done(), 1000));
            } else {
                await new Promise(done => setTimeout(() => done(), 3000));
            }
            console.log("WAIT "+process_time + " "+ index+"="+(process_time-index));

            if((process_time-index) === 0){
                console.log("ZERO");
                document.getElementById("executed").innerHTML = '<div class="execution-box box-up-row"><div id="moving-box" class="process green">' + process_obj.id + "-" + (process_time) + 'ms</div>';
                await new Promise(done => setTimeout(() => done(), 1000));
                document.getElementById("executed").innerHTML = '<div class="execution-box box-up-row"><div id="moving-box" class="process blue">' + process_obj.id + '</div>';
                myMove();
            }
            else if((process_time-index) === 1){
                console.log("ONE");
                document.getElementById("executed").innerHTML = '<div class="execution-box box-up-row"><div id="moving-box" class="process green">' + process_obj.id + "-" + (process_time-index) + 'ms</div>';
                await new Promise(done => setTimeout(() => done(), 1000));
                document.getElementById("executed").innerHTML = '<div class="execution-box box-up-row"><div id="moving-box" class="process">' + process_obj.id + '</div>';
                // myMove();
            } else {
                console.log("OTHER");
                document.getElementById("executed").innerHTML = '<div class="execution-box box-up-row"><div class="process green">' + process_obj.id + "-" + (process_time-index) + 'ms</div></div>';
            }
        }

        fin.push(process_obj);
        var result = updateProcessSection(fin, false);
        document.getElementById("finished").innerHTML = result;
    }

    document.getElementById("executed").innerHTML = "";
    console.log("DONE");
}

// Window Onload
window.onload = function() {
    console.log('window - onload {Round Robin}');

    // Buttons
    var inputButton = document.getElementById("input");
    var resetButton = document.getElementById("reset");
    var popButton = document.getElementById("pop");
    var startButton = document.getElementById("start");

    // Reset Queue
    resetButton.addEventListener("click", function(){
        lst = [];
        fin = [];
        document.getElementById("processes").innerHTML = "";
        document.getElementById("executed").innerHTML = "";
        document.getElementById("finished").innerHTML = "";
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