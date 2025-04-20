import InputRetriever from "./InputRetriever.js";
import OutputHandler from "./OutputHandler.js";

$(document).ready(function () {
    $('#menuButton').click(function () {
        $('#menuSidebar').toggleClass('active');
        $('#menuOverlay').toggleClass('active');
    });

    $('#menuOverlay').click(function () {
        $('#menuSidebar').removeClass('active');
        $(this).removeClass('active');
    });
});

$("#text").css({
    "line-height": "2.5", // Adjust the value for more or less spacing
    "padding": "10px",    // Optional: Add padding for better readability
    "min-height": "100px" // Optional: Ensure the div has a minimum height
});



// Ensure the #text element is a contenteditable div in your HTML
// Example: <div id="text" contenteditable="true"></div>

const inputRetriever = new InputRetriever();
const outputHandler = new OutputHandler();

$("#saveButton").click(() => {
    const content = inputRetriever.getInput();
    outputHandler.displayOutput(content);
    console.log(content); // Logs an array with text and HTML elements in order
});
