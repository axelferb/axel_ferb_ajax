// Fetches all the data in the API aswell as running the functions needed to write them out //
function getLaunches(launches = "order=asc") {
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
    for (var i = 0; i < launchData.length; i++) {

        if (launchData[i].details === null) {
            launchData[i].details = "No extra information avalible.";
        }

        if (launchData[i].launch_success === true) {
            launchData[i].launch_success = "Yes";
        }

        else if (launchData[i].launch_success === false) {
            launchData[i].launch_success = "No";
        }

        data.innerHTML +=
            `
        <div class="box">
        <p>Launch No: ${launchData[i].flight_number}</p>
        <p>Launch year: ${launchData[i].launch_year}</p>
        <p>Payload type: ${launchData[i].rocket.second_stage.payloads[0].payload_type}</p>
        <p>Launch successful: ${launchData[i].launch_success}</p>
        <p>${launchData[i].details}</p>
        </div >
        `;
    }
}

// Different filteroptions //
const orderDesc = document.getElementById("DESC");

orderDesc.addEventListener("click", function () {
    const descending = "order=desc";
    getLaunches(descending);
});

// Code for scrolling to the nav and information //
scrollButton = document.getElementById("scrollToStart");

scrollButton.addEventListener("click", function () {
    document.getElementById("nav").scrollIntoView();
});