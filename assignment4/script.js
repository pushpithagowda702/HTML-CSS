function validate() {
    var time = document.getElementById("timerForm").elements[0].value;
    var check = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])?$/.test(time);
    if (!check) {
        alert("Time should be in HH:MM:SS format");
    } else {
        progressBar(time)
    }
}

function progressBar(timing) {
    var timeArray = timing.split(":");
    var totalTimeSeconds = Number.parseInt(timeArray[0] * 3600) + Number.parseInt(timeArray[1] * 60) + Number.parseInt(timeArray[2]);
    var increaseWidth = Math.round(100 / ((totalTimeSeconds) / 5));
    var width = 0;
    var pBar = document.getElementById("pBar");
    var hour = parseInt(timeArray[0]);
    var minutes = parseInt(timeArray[1]);
    var seconds = parseInt(timeArray[2]);
    var updateProgressBar = setInterval(updateTime, 1000);
    var count = 0;

    function updateTime() {
        var time = document.getElementById("timerForm").elements[0];
        time.value = "";

        if (seconds <= 0 && hour <= 0 && minutes <= 0) {
            pBar.style.width = 100 + "%";
            pBar.innerHTML = 100 + "%";
            clearInterval(updateProgressBar);
            return;
        }

        if (count == 4 && width + increaseWidth <= 100) {
            width += increaseWidth;
            pBar.style.width = width + "%";
            pBar.innerHTML = width + "%";
            count = 0;
        } else {
            count++;
        }

        if (seconds <= 0 && minutes > 0) {
            seconds = 59;
            minutes--;
        } else {
            seconds--;
        }

        if (minutes <= 0 && hour > 0) {
            minutes = 59;
            hour--;
        }

        if (hour <= 9) {
            time.value += "0" + hour + ":";
        } else {
            time.value += hour + ":";
        }

        if (minutes <= 9) {
            time.value += "0" + minutes + ":";
        } else {
            time.value += minutes + ":";
        }

        if (seconds <= 9) {
            time.value += "0" + seconds;
        } else {
            time.value += seconds;
        }
    }
}