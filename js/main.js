// Cons's
const orderDesc = document.getElementById("DESC");
const orderAsc = document.getElementById("ASC");
const orderRockFalc1 = document.getElementById("falc1");
const orderRockFalc9 = document.getElementById("falc9");
const orderRockFalcHvy = document.getElementById("falchvy");
const orderAllRock = document.getElementById("all");
const returnToMain = document.getElementById("returnToMain");
let globalLaunchData = [];

// Fetches all the data in the API aswell as running the functions needed to write them out //
function getLaunches(launches, order) {
    fetch(`https://api.spacexdata.com/v2/launches?${launches}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (launchData) {
            globalLaunchData = launchData;
            console.log(launchData);
            loopLaunchData(launchData);
        })
        .catch(function (error) {
            console.log(error);
        })
};


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
        <div class="box" id="${launchData[i].flight_number}">
        <p>Launch No: ${launchData[i].flight_number}</p>
        <p>Launch year: ${launchData[i].launch_year}</p>
        <p>Rocket type: ${launchData[i].rocket.rocket_name}</p>
        <p>Payload type: ${launchData[i].rocket.second_stage.payloads[0].payload_type}</p>
        <p>Launch successful: ${launchData[i].launch_success}</p>
        <p>${launchData[i].details}</p>
        </div>
        `;
        // Adds eventlistner to all boxes containing the info aswell as all the innerHTML that replaces the old one to write more information
        const infoBoxes = document.getElementsByClassName("box");
        for (let infoBox of infoBoxes) {
            infoBox.addEventListener("click", function () {
                for (var i = 0; i < globalLaunchData.length; i++) {
                    //Replaces part of the string with /embed/ to make YT video work with iframe
                    var embedVid = launchData[i].links.video_link.replace("/watch?v=", "/embed/");
                    if (this.id == globalLaunchData[i].flight_number) {
                        data.innerHTML =
                            `
                            <div class="bigbox">
                            <p>Launch No: ${launchData[i].flight_number}</p>
                            <p>Launch year: ${launchData[i].launch_year}</p>
                            <p>Rocket type: ${launchData[i].rocket.rocket_name}</p>
                            <p>Payload type: ${launchData[i].rocket.second_stage.payloads[0].payload_type}</p>
                            <p>Launch successful: ${launchData[i].launch_success}</p>
                            <p>Launchsite: ${launchData[i].launch_site.site_name_long}</p>
                            <p>${launchData[i].details}</p>
                            <iframe width="420" height="345" src="${embedVid}"></iframe>
                            <button id="returnToMain">Return to main page</button>
                            </div>
                    `
                    }
                    else {
                        console.log("Fan");
                    }
                }
            });
        }
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
    document.getElementById("filters").scrollIntoView();
});
//

getLaunches();