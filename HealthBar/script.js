var playerhealth = 100;
var bosshealth = 100;

function initializeHealthBars() {
    updateplayerhealth();
    updatebosshealth();
}

window.onload = initializeHealthBars;

function playerwin() {
    document.getElementById("win-screen").style.display = "flex";
}

function playerlose() {
    document.getElementById("lose-screen").style.display = "flex";
}

function restartGame() {
    document.getElementById("win-screen").style.display = "none";
    document.getElementById("lose-screen").style.display = "none";
    playerhealth = 100;
    bosshealth = 100;
    initializeHealthBars();
}

function playerHealAnimation(n) {
    var increment = 1;
    var healedAmount = 0;
    var intervalTime = 50;
    var interval = setInterval(function() {
        if (healedAmount >= n) {
            clearInterval(interval);
            return;
        }

        if (playerhealth + increment >= 100) {
            playerhealth = 100;
            updateplayerhealth();
            clearInterval(interval);
        } else {
            playerhealth += increment;
            updateplayerhealth();
            healedAmount += increment;
        }

        if (playerhealth === 100) {
            clearInterval(interval);
        }
    }, intervalTime);
}

function bossHealAnimation(n) {
    var increment = 1;
    var healedAmount = 0;
    var intervalTime = 100;

    var interval = setInterval(function() {
        if (healedAmount >= n) {
            clearInterval(interval);
            return;
        }

        if (bosshealth + increment >= 100) {
            bosshealth = 100;
            updatebosshealth();
            clearInterval(interval);
        } else {
            bosshealth += increment;
            updatebosshealth();
            healedAmount += increment;
        }

        if (bosshealth === 100) {
            clearInterval(interval);
        }
    }, intervalTime);
}


function playeraddhealth(n) {
    if (playerhealth + n >= 100) {
        playerhealth = 100;
    } else {
        playerhealth += n;
    }
    updateplayerhealth();
}

function playerdelhealth(n) {
    playerhealth -= n;
    updateplayerhealth();
}

function bossdelhealth(n) {
    bosshealth -= n;

    updatebosshealth();
}

function bossaddhealth(n) {
    if (bosshealth + n >= 100) {
        bosshealth = 100;
    } else {
        bosshealth += n;
    }
    updatebosshealth();
}

function updatebosshealth() {
    var bossHealthBar = document.getElementById("boss-health-bar");
    var bossHealthText = document.getElementById("boss-health-text");
    var bossHealthFill = document.getElementById("boss-health-fill");
    var bossHealthOverlay = document.getElementById("boss-health-overlay");

    bossHealthFill.style.width = bosshealth + "%";
    bossHealthOverlay.style.width = bosshealth + "%";

    bossHealthText.textContent = bosshealth + "/100";

    if (bosshealth <= 0) {
        playerwin();
    }
}

function updateplayerhealth() {
    var playerHealthBar = document.getElementById("player-health-bar");
    var playerHealthText = document.getElementById("player-health-text");
    var playerHealthFill = document.getElementById("player-health-fill");
    var playerHealthOverlay = document.getElementById("player-health-overlay");

    playerHealthFill.style.width = playerhealth + "%";
    playerHealthOverlay.style.width = playerhealth + "%";

    playerHealthText.textContent = playerhealth + "/100";

    if (playerhealth <= 0) {
        playerlose();
    }
}