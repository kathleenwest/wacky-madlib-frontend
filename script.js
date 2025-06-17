// This script handles the interaction with OpenAI's API to generate a story and an image based on user input.

// Backend URLs Endpoints for the OpenAI worker functions        
const backendUrlMadlib = "https://openai-worker.kathleen-elizabeth-west.workers.dev/madlib";
const backendUrlImage = "https://openai-worker.kathleen-elizabeth-west.workers.dev/image";

// Document elements for story and image outputs
// These elements will be used to display the generated story and image
const storyOutput = document.getElementById("story-output");
const imageOutput = document.getElementById("image-output");
const imageSection = document.getElementById("image-section");

// Event listeners for buttons
// These listeners trigger the story and image generation functions when the respective buttons are clicked
document.getElementById("generate-story-button").addEventListener("click", generateAIStory);
document.getElementById("generate-image-button").addEventListener("click", generateAIPicture)

// Function to generate a story using OpenAI's API
// This function collects user input, sends it to the OpenAI API, and displays the generated story
// It also handles the display of the image section based on whether a story is generated.
// It uses the Madlib API to create a story based on user-provided words.
async function generateAIStory() {
    try 
        {        
            // Clear previous outputs and show loading message
            // This ensures that the user sees a loading message while the story is being generated
            storyOutput.innerText = "Generating story...";
            imageOutput.innerHTML = ""; // Clear previous image output
            imageSection.style.display = "none"; // Hide image section initially

            // Collect user input from the form fields
            // These inputs are used to create a personalized story
            // The user inputs are expected to be nouns, verbs, and adjectives
            const words = {
                noun: document.getElementById("noun").value,
                verb: document.getElementById("verb").value,
                adjective: document.getElementById("adjective").value
            };

            // Validate user input
            // If any of the fields are empty, alert the user and stop the function
            if (!words.noun || !words.verb || !words.adjective) {
                alert("Please fill in all fields: noun, verb, and adjective.");
                return;
            }
        
            // Send the user input to the backend Madlib API to generate a story
            // The API expects a JSON string with the user's words
            // The response is expected to be a text story generated based on the provided words
            // The response is then displayed in the story output section
            const response = await fetch(backendUrlMadlib, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify(words)
            });
            
            // Check if the response is ok (status code 200-299)
            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            // Read the response text which contains the generated story
            const story = await response.text();
            
            // Display the generated story in the story output section
            storyOutput.innerText = story;

            // Show image section if there's content in the story
            if (storyOutput.innerText.trim() !== "") {
                // If the story is not empty, display the image section
                imageSection.style.display = "block";
            }
            
        } catch (error) {
            // Handle any errors that occur during the API call or processing
            // Log the error to the console and display an error message to the user
            console.error(error);
            // Display an error message in the story output section
            imageSection.style.display = "none"; // Hide image section on error
            storyOutput.innerText = "Something went wrong while generating the story.";
        }
}

// Function to generate an image based on the story using OpenAI's DALL-E model
// This function sends the generated story to the DALL-E model and displays the resulting image
// It also handles the display of the image output section.
async function generateAIPicture() {
    try {
        // Ensure the image section is visible
        imageSection.style.display = "block";

        // Clear previous image output and show loading message
        imageOutput.innerText = "Generating picture...";

        // Get the generated story from the story output section
        if (storyOutput.innerText.trim() === "") {
            // If there's no story generated, alert the user and stop the function
            alert("Please generate a story first.");
            return;
        }
        
        // Extract the text content of the story output section
        // This text will be used as the prompt for the image generation
        const prompt = storyOutput.innerText;
    
        // Send the story to the backend Image API to generate an image
        // The API expects a JSON object with the prompt (story) to generate an image
        // The response is expected to be a base64-encoded image which is then displayed in the image output section
        const response = await fetch(backendUrlImage, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        // Check if the response is ok (status code 200-299)
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
    
        // Read the response JSON which contains the base64-encoded image
        // The image is expected to be in the format { b64_json: "base64string" }
        const { b64_json: image } = await response.json();

        // Display the generated image in the image output section
        // The image is displayed as an HTML img element with the base64 data source
        if (!image) throw new Error("No image data received from the server.");

        // Set the inner HTML of the image output section to display the image
        imageOutput.innerHTML = `<img src="data:image/png;base64,${image}">`;

    } catch (error) {
        // Handle any errors that occur during the API call or processing
        console.error(error);
        // Display an error message in the image output section
        imageOutput.innerText = "Something went wrong while generating the image.";
    }
}