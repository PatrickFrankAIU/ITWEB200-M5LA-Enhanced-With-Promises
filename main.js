// this version is enhanced to show the advantages of using Promises
// Run with Console window stretched to show messages 
// Note the 'endpoint' urls on lines 44 and 45 -- swap these to simulate a server error

console.log("1. Starting the program...");

window.addEventListener("DOMContentLoaded", function () {
    console.log("2. DOM fully loaded and parsed...");

    document.querySelector("#fetchQuotesBtn").addEventListener("click", function () {
        console.log("3. Fetch Quotes button clicked...");

        const topicDropdown = document.querySelector("#topicSelection");
        const selectedTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
        const countDropdown = document.querySelector("#countSelection");
        const selectedCount = countDropdown.options[countDropdown.selectedIndex].value;

        // Start the Promise chain for fetching quotes
        console.log("4. Starting the fetchQuotes promise...");
        showLoadingSpinner(); // Start a loading spinner

        fetchQuotes(selectedTopic, selectedCount)
            .then((quotes) => {
                console.log("5. Quotes fetched successfully...");
                displayQuotes(quotes);
            })
            .catch((error) => {
                console.error("6. An error occurred while fetching quotes...");
                displayError(error);
            })
            .finally(() => {
                console.log("7. Finished attempting to fetch quotes...");
                hideLoadingSpinner(); // Stop the spinner
            });

        // Start an unrelated task that updates the HTML
        console.log("8. Starting unrelated HTML task...");
        startCountdownTask(); // Simulate an HTML update task unrelated to fetching quotes
    });
});

function fetchQuotes(topic, count) {
    console.log("9. Constructing the URL for the API call...");
    const endpoint = "https://wp.zybooks.com/quotes.php";
	//const endpoint = "https://wp.zybooksBadURL321.com/quotes.php";
    const queryString = "topic=" + topic + "&count=" + count;
    const url = endpoint + "?" + queryString;

    console.log("10. Returning a promise for the fetch operation...");
    return fetch(url)
        .then(function (response) {
            console.log("11. Received response from the server...");
            if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
            }
            return response.json();
        });
}

function displayQuotes(quotes) {
    console.log("12. Displaying the quotes...");
    const quoteContainer = document.querySelector("#quotes");
    if (quotes.error) {
        quoteContainer.innerHTML = quotes.error;
        console.log("13. Displayed an error message...");
    } else {
        let html = "<ol>";
        for (let i = 0; i < quotes.length; i++) {
            html += "<li>" + quotes[i].quote + " - " + quotes[i].source + "</li>";
        }
        html += "</ol>";
        quoteContainer.innerHTML = html;
        console.log("13. Quotes successfully displayed...");
    }
}

function displayError(error) {
    console.error("14. Handling and displaying the error...");
    const quoteContainer = document.querySelector("#quotes");
    quoteContainer.innerHTML = "Error fetching quotes: " + error.message;
    console.error("15. Error message displayed to the user...");
}

// Simulate showing a loading spinner
function showLoadingSpinner() {
    const spinner = document.createElement("div");
    spinner.id = "loadingSpinner";
    spinner.innerHTML = "Loading quotes, please wait...";
    document.body.appendChild(spinner);
    console.log("16. Loading spinner displayed...");
}

// Simulate hiding a loading spinner
function hideLoadingSpinner() {
    const spinner = document.querySelector("#loadingSpinner");
    if (spinner) {
        spinner.remove();
        console.log("17. Loading spinner removed...");
    }
}

// Simulate an unrelated HTML task: A countdown displayed on the page
function startCountdownTask() {
    const countdownContainer = document.createElement("div");
    countdownContainer.id = "countdown";
    countdownContainer.style.marginTop = "10px";
    countdownContainer.innerHTML = "Unrelated Task: Countdown starts at 5...";
    document.body.appendChild(countdownContainer);

    let counter = 5;
    const interval = setInterval(() => {
        if (counter > 0) {
            countdownContainer.innerHTML = "Unrelated Task: Countdown at " + counter + "...";
            counter--;
        } else {
            countdownContainer.innerHTML = "Unrelated Task: Done!";
            clearInterval(interval);
            console.log("Unrelated task completed!");
        }
    }, 1000); // Updates every second
}
