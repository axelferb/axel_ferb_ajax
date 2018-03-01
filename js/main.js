function getLaunches(launches) {
    fetch('https://api.spacexdata.com/v2/launches/')
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

function loopLaunchData(launchData) {
    for (var i = 0; i < launchData.length; i++) {

        if (launchData[i].details === null) {
            launchData[i].details = "No extra information avalible";
        };

        if (launchData[i].launch_success === true) {
            launchData[i].launch_success = "Yes";
        }

        else if (launchData[i].launch_success === false) {
            launchData[i].launch_success = "No";
        };

        data.innerHTML +=
            `
        <div class="box">
        <p>Launch year: ${launchData[i].launch_year}</p>
        <p>Payload type: ${launchData[i].rocket.second_stage.payloads[0].payload_type}</p>
        <p>Launch successful: ${launchData[i].launch_success}</p>
        <p>${launchData[i].details}</p>
        </div >
        `;
    }
}