var playerhealth = 100;
var bosshealth = 100;

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
    updateplayerhealth();
    updatebosshealth();
}

function playeraddhealth(n) {
    playerhealth += n;
    updateplayerhealth();
}

function playerdelhealth(n) {
    playerhealth -= n;
    updateplayerhealth();
}

function bossaddhealth(n) {
    bosshealth += n;
    updatebosshealth();
}

function bossdelhealth(n) {
    bosshealth -= n;
    updatebosshealth();
}

function updatebosshealth() {
    var bossHealthElement = document.getElementById("boss-health");
    bossHealthElement.textContent = bosshealth;

    if (bosshealth <= 0) {
        playerwin();
    }
}

function updateplayerhealth() {
    var playerHealthElement = document.getElementById("player-health");
    playerHealthElement.textContent = playerhealth;

    if (playerhealth <= 0) {
        playerlose();
    }
}