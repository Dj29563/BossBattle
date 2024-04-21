var timerBar = document.getElementById("timer-bar");
var timer;

function startTimer(totalTime) {
    var remainingTime = totalTime;
    var interval = 10;

    clearInterval(timer);

    timer = setInterval(function() {
        remainingTime -= 0.01;
        var widthPercentage = (remainingTime / totalTime) * 100;
        timerBar.style.width = widthPercentage + "%";
        var greenValue, redValue;
        if (remainingTime >= totalTime * 0.5) {
            greenValue = 255;
            redValue = Math.floor(((totalTime - remainingTime) / (totalTime * 0.5)) * 255);
        } else {
            greenValue = Math.floor((remainingTime / (totalTime * 0.5)) * 255);
            redValue = 255;
        }
        timerBar.style.backgroundColor = "rgb(" + redValue + "," + greenValue + ",0)";

        if (remainingTime <= 0) {
            clearInterval(timer);
            timeup();
            setTimeout(refillTimerBar, 1500);
        }
    }, interval);
}

function refillTimerBar() {
    var totalTime = 0.5;
    var remainingTime = 0;
    var interval = 10;

    clearInterval(timer);

    timer = setInterval(function() {
        remainingTime += 0.01;
        var widthPercentage = (remainingTime / totalTime) * 100;
        timerBar.style.width = widthPercentage + "%";
        var greenValue = Math.floor((remainingTime / totalTime) * 255);
        var redValue = 255 - greenValue;
        timerBar.style.backgroundColor = "rgb(" + redValue + "," + greenValue + ",0)";

        if (remainingTime >= totalTime) {
            clearInterval(timer);
            timerBar.style.backgroundColor = "#00ff08";
        }
    }, interval);
}

function timeup() {

}
