// Cons's
const orderDesc = document.getElementById("DESC");
const orderAsc = document.getElementById("ASC");
const orderRockFalc1 = document.getElementById("falc1");
const orderRockFalc9 = document.getElementById("falc9");
const orderRockFalcHvy = document.getElementById("falchvy");
const orderAllRock = document.getElementById("all");
const returnbuttons = document.getElementsByClassName("returnbuttons");
const infoBoxes = document.getElementsByClassName("box");
let globalLaunchData = [];

// Fetches all the data in the API aswell as running the functions needed to write them out //
function getLaunches(launches) {
	fetch(`https://api.spacexdata.com/v2/launches?${launches}`)
		.then(function (response) {
			return response.json();
		})
		.then(function (launchData) {
			globalLaunchData = launchData;
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
        <ul>
        <li>Flight number: ${launchData[i].flight_number}</li>
        <li>Launch year: ${launchData[i].launch_year}</li>
        <li>Rocket type: ${launchData[i].rocket.rocket_name}</li>
        <li>Payload type: ${launchData[i].rocket.second_stage.payloads[0].payload_type}</li>
        <li>Launch successful: ${launchData[i].launch_success}</li>
        </ul>
        <p>${launchData[i].details}</p>
        <p class="bottom">Click to read more</p>
        </div>
        `;
		// Adds eventlistner to all boxes containing the info aswell as all the innerHTML that replaces the old one to write more information
		for (let infoBox of infoBoxes) {
			infoBox.addEventListener("click", function () {
				for (var i = 0; i < globalLaunchData.length; i++) {
					//Replaces part of the string with /embed/ to make YT video work with iframe
					var embedVid = launchData[i].links.video_link.replace("/watch?v=", "/embed/");
					if (launchData[i].rocket.second_stage.payloads[0].payload_mass_kg === null) {
						launchData[i].rocket.second_stage.payloads[0].payload_mass_kg = "No information about the weight avalible.";
					}
					if (this.id == globalLaunchData[i].flight_number) {
						data.innerHTML = ""
						content.innerHTML =
							`
                            <div id="bigbox" class="bigbox">
                            <ul>
                            <li>Flight number: ${launchData[i].flight_number}</li>
                            <li>Date and time for launch (UTC): ${launchData[i].launch_date_utc}</li>
                            <li>Rocket type: ${launchData[i].rocket.rocket_name}</li>
                            <li>Payload type: ${launchData[i].rocket.second_stage.payloads[0].payload_type}</li>
                            <li>Payload name: ${launchData[i].rocket.second_stage.payloads[0].payload_id}</li>
                            <li>Payload weight (kg): ${launchData[i].rocket.second_stage.payloads[0].payload_mass_kg}</li>
                            <li>Payload destination: ${launchData[i].rocket.second_stage.payloads[0].orbit}</li>
                            <li>Launch successful: ${launchData[i].launch_success}</li>
                            <li>Launchsite: ${launchData[i].launch_site.site_name_long}</li>
                            </ul>
                            <p>${launchData[i].details}</p>
                            <iframe class="vidPlayer" src="${embedVid}"></iframe>
                            <button class="returnbuttons">Return to main page</button>
                            </div>
                            `
						for (let returnbutton of returnbuttons) {
							returnbutton.addEventListener("click", function () {
								content.innerHTML = "";
								const allRock = "rocket_id=&"
								getLaunches(allRock);
							});
						}
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
	content.innerHTML = ""
});

// Filter by rocket falcon 9 //
orderRockFalc9.addEventListener("click", function () {
	const rocketfalc9 = "rocket_id=falcon9&"
	getLaunches(rocketfalc9);
	content.innerHTML = ""
});

// Filter by rocket falcon heavy //
orderRockFalcHvy.addEventListener("click", function () {
	const rocketfalchvy = "rocket_id=falconheavy&"
	getLaunches(rocketfalchvy);
	content.innerHTML = ""
});
// Filter by all rockets //
orderAllRock.addEventListener("click", function () {
	const allRock = "rocket_id=&"
	getLaunches(allRock);
	content.innerHTML = ""
});
// End of filteroptions //

// Code for scrolling to the nav and information //
scrollButton = document.getElementById("scrollToStart");

scrollButton.addEventListener("click", function () {
	document.getElementById("filters").scrollIntoView();
});
//
getLaunches();