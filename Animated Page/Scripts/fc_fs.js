
// Global List for Processes
var lst = [];
var fin = [];

var testObj = {id:"test", time:3};
var running = false;
var unknowns = 0; // Keeps track of Unnamed Objects

//----------HELPERS---------------------

/*
    Will create HTML Code from the list of objects provided.
*/
function getListOfProcesses(the_list=lst, left=true) {
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
            processes += '<div class="process box-up-col"><p>' + name + "</p><p>" + number + 'ms</p></div>';
        } else {
            processes += '<div class="process red">' + name + '</div>';
        }
        
    }

    return processes;
}

/*
    Will create HTML Code from the list of objects provided.
    But, the top elements will be animated.
*/
function getMoveableProcesses(the_list=lst) {
    // Get the current process objects
    var processes = '';
    for (var i = 0; i < the_list.length; i++) {
        // Get object details
        let obj = the_list[i];
        let name = obj.id;
        let number = obj.time;

        if (i === 0) {
            processes += '<div><div id="moving-box" class="process box-up-col"><p>' + name + "</p><p>" + number + 'ms</p></div></div>';
        } else {
            processes += '<div class="process box-up-col"><p>' + name + "</p><p>" + number + 'ms</p></div>';
        }
        
    }

    return processes;
}

/*
    Adds a new Process object to the list of Processes.
*/
addProcesses = function() {
    
    // Gather input for a Process
    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;

    // Check for incorrect input
    if (name === "") {
        // alert("ERROR");
        unknowns += 1;
        name = "UFO-" + unknowns;
    }
    if (number === "") {
        // alert("ERROR");
        // Returns a random number between 1 and 10
        number = Math.floor((Math.random() * 10) + 1);
    }

    // Create and Insert new Process object
    var processObj = {id:name, time:parseInt(number)};
    console.log("Insert Process " + name + " at Index: " + lst.length);
    lst.push(processObj) // Add Process to the List

    // Show the processes on screen
    if(running){
        document.getElementById("processes").innerHTML = getMoveableProcesses();
    } else {
        document.getElementById("processes").innerHTML = getListOfProcesses();
    }
}

/*
    Removes a process from the index position given and returns it
*/
popProcess = function(index=-1, display=true) {
    // Check for No-Parameters
    if (index === -1) {
        // Pop from the back
        index = lst.length - 1;
    }

    // Get the element to be removed, then remove it
    var removed = lst[index];
    lst.splice(index, 1);
    // console.log("Popped: " + removed.id + " at: " + index);
    
    // Check if the updated Process list should be displayed
    if (display) {
        document.getElementById("processes").innerHTML = getMoveableProcesses();
    }

    return removed;
}

//----------LOGIC---------------------

start = async function(){
    running = true;
    
    // Runs while the list has elements
    while (lst.length > 0){

        // Show the processes on screen
        document.getElementById("processes").innerHTML = getMoveableProcesses();

        var process_obj = popProcess(0, false);
        var process_time = process_obj.time;
        var process_name = process_obj.id;

        // Does the animation
        myMove(1, true);
        await new Promise(done => setTimeout(() => done(), 2000));
        document.getElementById("processes").innerHTML = getListOfProcesses();
        document.getElementById("executed").innerHTML = '<div class="execution-box box-up-row"><div class="process green"><p>' + process_name + "</p><p>" + process_time + 'ms</p></div>';

        for (let index = 1; index < process_time+1; index++) {
            // Do a complete second
            var speed = document.getElementById("slow_fast").checked;
            if(speed){
                await new Promise(done => setTimeout(() => done(), 1000));
            } else {
                await new Promise(done => setTimeout(() => done(), 3000));
            }

            // If countdown == zero, move box and updated Executed list
            if((process_time-index) === 0){
                document.getElementById("executed").innerHTML = '<div class="execution-box box-up-row"><div id="moving-box" class="process red"><p>' + process_name + "</p><p>" + (process_time-index) + 'ms</p></div>';

                myMove(1, false);
                await new Promise(done => setTimeout(() => done(), 2000));

                fin.push(process_obj);
                var result = getListOfProcesses(fin, false);
                document.getElementById("finished").innerHTML = result;
                document.getElementById("executed").innerHTML = "";
            }
            // Else, update the value within the box
            else {
                document.getElementById("executed").innerHTML = '<div class="execution-box box-up-row"><div class="process green"><p>' + process_name + "</p><p>" + (process_time-index) + 'ms</p></div>';
            }
            
        }
    }

    // Clear the Executed column
    document.getElementById("executed").innerHTML = "";
    console.log("DONE");
}

//----------ANIMATION---------------------
/*
    Moves a Process Box with Animation
*/
function myMove(timer=1, down=false) {
    var id = null;
    var elem = document.getElementById("moving-box");
    elem.classList.add("move-green");
    var pos_left = 0;
    var pos_down = 0;

    clearInterval(id);
    id = setInterval(frame, timer);

    function frame() {
        if (pos_left == 500) {
            clearInterval(id);
        } else {
            pos_left++;
            if(down){
                if (pos_left <= 120) {
                    pos_down++;
                }
                elem.style.top = pos_down + 'px';
                elem.style.left = pos_left + 'px';
            } else {
                elem.style.left = pos_left + 'px';
            }
        }
    }
}

// Window Onload
window.onload = function() {
    console.log('window - onload {First Come, First Served}');

    // Buttons
    var inputButton = document.getElementById("input");
    var resetButton = document.getElementById("reset");
    var popButton = document.getElementById("pop");
    var startButton = document.getElementById("start");

    // Reset Queue and other elements
    resetButton.addEventListener("click", function(){
        lst = [];
        fin = [];
        unknowns = 0;
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