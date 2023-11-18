//Nametag font
link = document.createElement("link")
link.rel = "stylesheet"
link.href = "https://fonts.googleapis.com/css2?family=Rubik+Mono+One"
document.head.appendChild(link);

//Sidenav
sidenav = document.createElement("div")
sidenav.id = "mySidenav"
sidenav.class = "sidenav"

spacer1 = document.createElement("span")
spacer2 = document.createElement("span")

emoji1 = document.createElement("span")
emoji1.href = "#"
emoji1.innerHTML = "😀"
emoji1.addEventListener("click", () => { sendData("displayEmoji", "😀") })

emoji2 = document.createElement("span")
emoji2.href = "#"
emoji2.innerHTML = "👋"
emoji2.addEventListener("click", () => { sendData("displayEmoji", "👋") })

emoji3 = document.createElement("span")
emoji3.href = "#"
emoji3.innerHTML = "😡"
emoji3.addEventListener("click", () => { sendData("displayEmoji", "😡") })

emoji4 = document.createElement("span")
emoji4.href = "#"
emoji4.innerHTML = "💀"
emoji4.addEventListener("click", () => { sendData("displayEmoji", "💀") })

emoji5 = document.createElement("span")
emoji5.href = "#"
emoji5.innerHTML = "🔥"
emoji5.addEventListener("click", () => { sendData("displayEmoji", "🔥") })

emoji6 = document.createElement("span")
emoji6.href = "#"
emoji6.innerHTML = "😔"
emoji6.addEventListener("click", () => { sendData("displayEmoji", "😔") })

//style the sidenav
sidenav.style.height = "100%"
sidenav.style.width = "0"
sidenav.style.position = "fixed"
sidenav.style.zIndex = "1"
sidenav.style.top = "0"
sidenav.style.left = "0"
sidenav.style.backgroundColor = "#111"
sidenav.style.overflowX = "hidden"
sidenav.style.paddingTop = "60px"
sidenav.style.transition = "0.5s"

for (emoji of [emoji1, emoji2, emoji3, emoji4, emoji5, emoji6]) {
    emoji.style.padding = "8px 8px 8px 32px"
    emoji.style.textDecoration = "none"
    emoji.style.fontSize = "25px"
    emoji.style.color = "#818181"
    emoji.style.display = "block"
    emoji.style.transition = "0.3s"
}
emoji1.addEventListener('mouseover', () => { emoji1.style.backgroundColor = '#202020' })
emoji1.addEventListener('mouseout', () => { emoji1.style.backgroundColor = '#111' })
emoji2.addEventListener('mouseover', () => { emoji2.style.backgroundColor = '#202020' })
emoji2.addEventListener('mouseout', () => { emoji2.style.backgroundColor = '#111' })
emoji3.addEventListener('mouseover', () => { emoji3.style.backgroundColor = '#202020' })
emoji3.addEventListener('mouseout', () => { emoji3.style.backgroundColor = '#111' })
emoji4.addEventListener('mouseover', () => { emoji4.style.backgroundColor = '#202020' })
emoji4.addEventListener('mouseout', () => { emoji4.style.backgroundColor = '#111' })
emoji5.addEventListener('mouseover', () => { emoji5.style.backgroundColor = '#202020' })
emoji5.addEventListener('mouseout', () => { emoji5.style.backgroundColor = '#111' })
emoji6.addEventListener('mouseover', () => { emoji6.style.backgroundColor = '#202020' })
emoji6.addEventListener('mouseout', () => { emoji6.style.backgroundColor = '#111' })


//add the nav
sidenav.appendChild(spacer1)
sidenav.appendChild(spacer2)
sidenav.appendChild(emoji1)
sidenav.appendChild(emoji2)
sidenav.appendChild(emoji3)
sidenav.appendChild(emoji4)
sidenav.appendChild(emoji5)
sidenav.appendChild(emoji6)

document.body.appendChild(sidenav);

//Open and close nav functions
navOpen = false

function openNav() {
    document.getElementById("mySidenav").style.width = "120px";
    navOpen = true
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    navOpen = false
}

//Open the menu on the press of "r"
document.addEventListener("keydown", (event) => {
    if (event.key === "r") {
        if (navOpen) {
            closeNav()
        } else {
            openNav()
        }
    }
})

// Important Stuff
let phaser = window.stores.phaser;
let players = phaser.scene.characterManager.characters;
let recentIDs = [];

// displayEmoji function
function displayEmoji(playerID, data) {
    for (let [id, player] of players) {
        if (player.id == playerID) {

            let Text = phaser.scene.add.text(player.body.x + -50, player.body.y - 140, data);
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

// requestData function
function requestData(playerID) {

    for (let [id, player] of players) {
        if (player.id == playerID) {
            sendData("setSkin",phaser.mainCharacter.skin.skinId)
            sendData("setUsername",phaser.mainCharacter.nametag.name)
            sendData("configFont","-")
        }
    }

}

//setUsername function
function setUsername(playerID, data) {
    let character = phaser.scene.characterManager.characters.get(playerID)
    for (let [id, player] of players) {
        if (player.id == playerID) {
            player.nametag.tag.setText(data)
        }
    }
}

// configFont function
function configFont(playerID) {
    for (let [id, player] of players) {
        if (player.id == playerID) {
            player.nametag.tag.setFontFamily("")
            player.nametag.tag.setFontFamily("Rubik Mono One")
            player.nametag.tag.setFontStyle("normal")
            player.nametag.tag.setFontSize(17)
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
                    text: Math.floor(Math.random() * 10000000).toString(),
                    correct: true
                }
                ]
            },
            userName: "",
            userSessionId: ""
        })
    })
        .then(response => response.json())
    //    .then(data => console.log(data))
    // .catch(error => console.error("Error:", error));
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
                    let messageID = loadedData[3].text

                    const firstQuestionAnswers = data.kit.questions[0].answers;
                    let phaser = window.stores.phaser;
                    let players = phaser.scene.characterManager.characters;

                    if (recentIDs.includes(messageID) == true) {
                        //Ignore request
                    } else {
                    
                        // Add the ID to the recent ID's list and
                        // delete it in 10000 ms
                        recentIDs.push(messageID)
                        setTimeout(function () {recentIDs.shift()}, 10000)
                        if (dataType == "displayEmoji") {
                            displayEmoji(playerID, messageData)
                        } else if (dataType == "setSkin") {
                            setSkin(playerID, messageData)
                        } else if (dataType == "setUsername") {
                            setUsername(playerID, messageData)
                        } else if (dataType == "requestData") {
                            requestData(playerID)
                        } else if (dataType == "configFont") {
                            configFont(playerID)
                        }
                    }
                }
            }
        })
}


// Run the function every 0.1 seconds
setInterval(fetchDataAndProcess, 100);

// code runs after all stuff is loaded
sendData("requestData","-")
sendData("configFont","-")
