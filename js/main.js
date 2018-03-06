// Cons's
const orderDesc = document.getElementById("DESC");
const orderAsc = document.getElementById("ASC");
const orderRockFalc1 = document.getElementById("falc1");
const orderRockFalc9 = document.getElementById("falc9");
const orderRockFalcHvy = document.getElementById("falchvy");
const orderAllRock = document.getElementById("all");

// Fetches all the data in the API aswell as running the functions needed to write them out //
function getLaunches(launches = "") {
    fetch(`https://api.spacexdata.com/v2/launches?${launches}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (launchData) {
            console.log(launchData);
            loopLaunchData(launchData);
        })
        .catch(function (error) {
            console.log(error);
        })
};
getLaunches();

// Looping out all the launches //
function loopLaunchData(launchData) {
    // Defines innerHTML as empty at first, then fills it with the information provided, otherwise it would att the innerHTML for all the filters you press //
    data.innerHTML = "";
    // Code for replacing returnvalues of null/true/false with actual text
    for (var i = 0; i < launchData.length; i++) {

        if (launchData[i].details === null) {
            launchData[i].details = "No extra information avalible about this launch.";
        }

        if (launchData[i].launch_success === true) {
            launchData[i].launch_success = "Yes";
        }

        else if (launchData[i].launch_success === false) {
            launchData[i].launch_success = "No";
        }
        // What data/information is being typed out in innerHTML
        data.innerHTML +=
            `
        <div class="box">
        <p>Launch No: ${launchData[i].flight_number}</p>
        <p>Launch year: ${launchData[i].launch_year}</p>
        <p>Rocket type: ${launchData[i].rocket.rocket_name}</p>
        <p>Payload type: ${launchData[i].rocket.second_stage.payloads[0].payload_type}</p>
        <p>Launch successful: ${launchData[i].launch_success}</p>
        <p>${launchData[i].details}</p>
        </div>
        `;
    }
}

// Different filteroptions //

// Filter by Descending //
orderDesc.addEventListener("click", function () {
    if (orderDesc.checked) {
        const descending = "order=desc&";
        orderAsc.checked = !orderDesc.checked;
        getLaunches(descending);
    };
});

// Filter by Ascending //
orderAsc.addEventListener("click", function () {
    if (orderAsc.checked) {
        const ascending = "order=asc&";
        orderDesc.checked = !orderAsc.checked;
        getLaunches(ascending);
    };
});

// Filter by rocket falcon 1 //
orderRockFalc1.addEventListener("click", function () {
    const rocketfalc1 = "rocket_id=falcon1&"
    getLaunches(rocketfalc1);
});

// Filter by rocket falcon 9 //
orderRockFalc9.addEventListener("click", function () {
    const rocketfalc9 = "rocket_id=falcon9&"
    getLaunches(rocketfalc9);
});

// Filter by rocket falcon heavy //
orderRockFalcHvy.addEventListener("click", function () {
    const rocketfalchvy = "rocket_id=falconheavy&"
    getLaunches(rocketfalchvy);
});
// Filter by all rockets //
orderAllRock.addEventListener("click", function () {
    const allRock = "rocket_id=&"
    getLaunches(allRock);
});
// End of filteroptions //

// Code for scrolling to the nav and information //
scrollButton = document.getElementById("scrollToStart");

scrollButton.addEventListener("click", function () {
    document.getElementById("nav").scrollIntoView();
});

// Clicking a specific launch and getting extra information
const infoBoxes = document.getElementsByClassName("box");
infoBoxes.addEventListener("click", function () {
    console.log("hej!");
});

