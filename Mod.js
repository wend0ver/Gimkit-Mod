// Important Stuff
let phaser = window.stores.phaser;
let players = phaser.scene.characterManager.characters;

// Create a square at the middle left of the screen with a 😀 emoji
const square = document.createElement("div");
square.innerHTML = "😀";
square.style.width = "50px";
square.style.height = "50px";
square.style.backgroundColor = "blue";
square.style.position = "fixed";
square.style.top = "50%";
square.style.left = "0";
square.style.transform = "translateY(-50%)";
square.style.cursor = "pointer";
square.style.display = "flex";
square.style.alignItems = "center";
square.style.justifyContent = "center";
square.style.fontSize = "24px";

// Add click event listener to the square
square.addEventListener("click", handleSquareClick);

// Append the square to the body
document.body.appendChild(square);


// displayEmoji function
function displayEmoji(playerID, data) {
    for (let [id, player] of players) {
        if (player.id == playerID) {

            let Text = phaser.scene.add.text(player.body.x + -50, player.body.y - 120, data);
            Text.setDepth(100);
            Text.setFontSize(75);

            // Fade out after 1 second
            phaser.scene.tweens.add({
                targets: Text,
                alpha: 0,
                duration: 1000, // 1000 milliseconds = 1 second
                delay: 1000, // Start fading out after 1 second
                onComplete: function() {
                    // Remove text after fading out
                    Text.destroy();
                    // Reset the flag after text is removed
                }
            })
        }
    }
}

//setSkin function
function setSkin(playerID, data) {
    let character = phaser.scene.characterManager.characters.get(playerID)
    for (let [id, player] of players) {
        if (player.id == playerID) {
            player.skin.updateSkin(data)
        }
    }
}

// Send Data Function
function sendData(dataType, data) {
    fetch("https://www.gimkit.com/api/kitcollab/contribute/question/DOu6W7LtOhvVzcic", {
            method: "POST",
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "sec-ch-ua": "\"Chromium\";v=\"118\", \"Microsoft Edge\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "cookie": "__stripe_mid=3c17d6bd-6be0-47d8-8cfb-b7ab3707ab060759f2; __stripe_sid=e50dce6f-56cc-44da-9bcc-03178b967fd3b647e3",
                "Referer": "https://www.gimkit.com/kit-collab/DOu6W7LtOhvVzcic",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: JSON.stringify({
                question: {
                    text: "data",
                    type: "mc",
                    answers: [{
                            text: window.stores.phaser.mainCharacter.id,
                            correct: true
                        },
                        {
                            text: dataType,
                            correct: true
                        },
                        {
                            text: data,
                            correct: true
                        },
                        {
                            text: "-",
                            correct: true
                        }
                    ]
                },
                userName: "",
                userSessionId: ""
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
    // .catch(error => console.error("Error:", error));
}


// Function to handle square click
function handleSquareClick() {
    sendData("displayEmoji", "😀")
    sendData("setSkin", "goat")
}



// Start of loop


function fetchDataAndProcess() {

    const url = "https://www.gimkit.com/api/games/fetch/65553f1230a363002b3cf9f3";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                // throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.kit && data.kit.questions && data.kit.questions.length > 0) {

                for (let i = 0; i < data.kit.questions.length; i++) {
                
                    const loadedData = data.kit.questions[i].answers
                    let playerID = loadedData[0].text
                    let dataType = loadedData[1].text
                    let messageData = loadedData[2].text
                    
                    const firstQuestionAnswers = data.kit.questions[0].answers;
                    let phaser = window.stores.phaser;
                    let players = phaser.scene.characterManager.characters;
    
                    if (dataType == "displayEmoji") {
                        displayEmoji(playerID, messageData)
                    } else if (dataType = "setSkin") {
                        setSkin(playerID, messageData)
                    }

                }

                
            } else {
                //console.error("Data structure is not as expected.");
            }
        })
        .catch(error => {
            //console.error("Error:", error);
        });
}

// Run the function every 0.1 seconds
setInterval(fetchDataAndProcess, 100);
