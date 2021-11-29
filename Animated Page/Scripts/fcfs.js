
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
    var processes = updateProcessSection();

    // Add the processes
    document.getElementById("processes").innerHTML = processes;
    
    // Check if the Process should be executed
    if (execute) {
        document.getElementById("executed").innerHTML = '<div class="execution-box box-up-row"><div class="process green">' + removed.id + "-" + removed.time + 'ms</div></div>';
    }

    return removed;
}

function updateProcessSection(the_list=lst, middle=true) {
    // Get the current process objects
    var processes = '';
    for (var i = 0; i < the_list.length; i++) {
        let obj = the_list[i];
        let name = obj.id;
        let number = obj.time;

        if (middle) {
            processes += '<div class="process box-up-col">' + name + "-" + number + 'ms</div>';
        } else {
            processes += '<div class="process red">' + name + '</div>';
        }
        
    }

    return processes;
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

            document.getElementById("executed").innerHTML = '<div class="execution-box box-up-row"><div class="process green">' + process_obj.id + "-" + (process_time-index) + 'ms</div></div>';
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