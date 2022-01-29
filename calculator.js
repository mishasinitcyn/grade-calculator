//Add Activity Function
//Creates all the elements from scratch
function addActivity () {
    //activity
    activityCount++;
    const newActivity = document.createElement("tr");
    newActivity.className = "activity";
    //name
    const name = document.createElement("td");      name.className = "name"; 
    name.innerText=`Activity ${activityCount}`;     newActivity.appendChild(name);
    //shortname
    const shortname = document.createElement("td"); shortname.className = "short-name";
    shortname.innerText=`A${activityCount}`;        newActivity.appendChild(shortname);
    //weightform
    const weight = document.createElement("td");    weight.className ="weight";
    const weightform = document.createElement("form");  weightform.className="weight-form";
    const weightinput = document.createElement("input");    weightinput.className="weight-input"; weightinput.type='number';
    weightform.appendChild(weightinput); weight.appendChild(weightform); newActivity.appendChild(weight);
    //grade
    const grade = document.createElement("td");     grade.className="grade";
    const gradeform =document.createElement("form");    gradeform.className = ("grade-form");
    const gradeone = document.createElement("input");   gradeone.className = ("grade-one"); gradeone.type='number';
    const divisor = document.createElement("p");        divisor.className=("divisor");      divisor.innerText="/";
    const gradetwo = document.createElement("input");   gradetwo.className =("grade-two");  gradetwo.type='number';
    gradeform.appendChild(gradeone); gradeform.appendChild(divisor);  gradeform.appendChild(gradetwo);    grade.appendChild(gradeform); 
    newActivity.appendChild(grade);
    //percent
    const percent = document.createElement("td");   percent.className = "percent";
    newActivity.appendChild(percent)

    //EVENT LISTENERS
    //Weight Input Event Listener
    newActivity.childNodes[2].childNodes[0].childNodes[0].addEventListener('input', function(){
        //Checks if grade inputs are filled in. If so, outputs their ratio to percentage
        if(Number.isInteger(parseInt(newActivity.childNodes[3].childNodes[0].childNodes[0].value))
        && Number.isInteger(parseInt(newActivity.childNodes[3].childNodes[0].childNodes[2].value)))
        {
            newActivity.childNodes[4].innerText=`${
                (newActivity.childNodes[3].childNodes[0].childNodes[0].value/newActivity.childNodes[3].childNodes[0].childNodes[2].value).toFixed(3)
            }`;
        }else{newActivity.childNodes[4].innerText=""}
    });
    //Grade Input Event Listeners
    newActivity.childNodes[3].childNodes[0].childNodes[0].addEventListener('input', function(){
        if(Number.isInteger(parseInt(newActivity.childNodes[3].childNodes[0].childNodes[0].value))
        && Number.isInteger(parseInt(newActivity.childNodes[3].childNodes[0].childNodes[2].value)))
        {
            newActivity.childNodes[4].innerText=`${
                (newActivity.childNodes[3].childNodes[0].childNodes[0].value/newActivity.childNodes[3].childNodes[0].childNodes[2].value).toFixed(3)
            }`;
        }else{newActivity.childNodes[4].innerText=""}
    });
    newActivity.childNodes[3].childNodes[0].childNodes[2].addEventListener('input', function(){
        if(Number.isInteger(parseInt(newActivity.childNodes[3].childNodes[0].childNodes[0].value))
        && Number.isInteger(parseInt(newActivity.childNodes[3].childNodes[0].childNodes[2].value)))
        {
            newActivity.childNodes[4].innerText=`${
                (newActivity.childNodes[3].childNodes[0].childNodes[0].value/newActivity.childNodes[3].childNodes[0].childNodes[2].value).toFixed(3)
            }`;
        }else{newActivity.childNodes[4].innerText=""}
    });

    //APPEND ACTIVITY TO TABLE
    console.log(newActivity);
    document.getElementById("table").appendChild(newActivity);
}

var activityCount = 0;

//Add Activity Event Listener
document.getElementById("add-activity").addEventListener('click', function() {
    addActivity();
});

//isFloat function from the internet
function isFloat(n) {
    return n === +n && n !== (n|0);
}

//Weighted Average Algorithm
//Counts all the percentages and weights, and calculates weighted average
function weightedAverage(){
    let percentages = document.getElementsByClassName("percent");
    let weights = document.getElementsByClassName("weight-input");
    let average = 0;
    let weightsTotal =0;

    for(let i = 0; i < activityCount; i++){
        if((isFloat(parseFloat(percentages[i].innerText)) && Number.isInteger(parseInt(weights[i].value))) || 
                    parseFloat(percentages[i].innerText) === 1  && Number.isInteger(parseInt(weights[i].value))){
            average += parseFloat(parseFloat(percentages[i].innerText) * parseInt(weights[i].value));
            weightsTotal += parseInt(weights[i].value);
        }
    }
    let weightedAverage = average/weightsTotal *100;
    //alert(`Weighted Average: ${(weightedAverage)}%`);
    document.getElementById("result-output").innerHTML=`Weighted Average: ${(weightedAverage)}%`;
}
//Add EventListener to Weighted Button
document.getElementById("weighted").addEventListener('click', function(){
    weightedAverage();
});


//Mean Average Algorithm
//Counts all the filled-in activities and percentages
document.getElementById("mean").addEventListener('click', function(){
    let percentages = document.getElementsByClassName("percent");
    let weights = document.getElementsByClassName("weight-input");
    let meanAverage = 0;
    let filledActivities = 0;

    for(let i = 0; i < activityCount; i++){
        if((isFloat(parseFloat(percentages[i].innerText)) && Number.isInteger(parseInt(weights[i].value))) || 
        parseFloat(percentages[i].innerText) === 1  && Number.isInteger(parseInt(weights[i].value))){
            filledActivities++;
            meanAverage += parseFloat(percentages[i].innerText);
        }
        //console.log(`${parseFloat(percentages[i].innerText)} * ${parseFloat(weights[i].value)}= ${parseFloat(percentages[i].innerText)*parseFloat(weights[i].value)}`);
    }
    meanAverage= meanAverage/filledActivities;
    //alert(`Mean Average: ${parseFloat(meanAverage*100)}%`);
    document.getElementById("result-output").innerHTML=`Mean Average: ${parseFloat(meanAverage*100)}%`;
});

//Make 4 Initial Activities
for(let i =0; i < 4; i++){addActivity();}