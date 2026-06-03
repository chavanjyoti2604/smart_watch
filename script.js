const clock = document.getElementById("clock");
const countdown = document.getElementById("countdown");
const themeBtn = document.getElementById("themeBtn");

let alarmTime = null;

// Digital Clock + AM/PM + Background Change

function updateClock(){

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    hours = String(hours).padStart(2,"0");
    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");

    clock.textContent =
        `${hours}:${minutes}:${seconds} ${ampm}`;

    changeBackground(now.getHours());

    checkAlarm(now);
}

setInterval(updateClock,1000);
updateClock();


// Dynamic Background

function changeBackground(hour){

    document.body.classList.remove(
        "morning",
        "afternoon",
        "night"
    );

    if(hour >= 5 && hour < 12){

        document.body.classList.add("morning");

    }else if(hour >= 12 && hour < 18){

        document.body.classList.add("afternoon");

    }else{

        document.body.classList.add("night");
    }
}


// Countdown Timer

function updateCountdown(){

    const newYear =
        new Date("January 1, 2027 00:00:00").getTime();

    const now = new Date().getTime();

    const diff = newYear - now;

    const days =
        Math.floor(diff/(1000*60*60*24));

    const hours =
        Math.floor(
            (diff%(1000*60*60*24))
            /(1000*60*60)
        );

    const minutes =
        Math.floor(
            (diff%(1000*60*60))
            /(1000*60)
        );

    const seconds =
        Math.floor(
            (diff%(1000*60))
            /1000
        );

    countdown.textContent =
        `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
}

setInterval(updateCountdown,1000);
updateCountdown();


// Dark / Light Mode

themeBtn.addEventListener("click",()=>{

    if(document.body.classList.contains("dark-theme")){

        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");

    }else{

        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
    }
});


// Alarm Feature

document
.getElementById("setAlarmBtn")
.addEventListener("click",()=>{

    alarmTime =
        document.getElementById("alarmTime").value;

    document.getElementById("alarmStatus")
        .textContent =
        `Alarm Set For ${alarmTime}`;
});


function checkAlarm(now){

    if(!alarmTime) return;

    const currentTime =
        String(now.getHours()).padStart(2,"0")
        + ":"
        + String(now.getMinutes()).padStart(2,"0");

    if(currentTime === alarmTime){

        alert("⏰ Alarm Time Reached!");

        alarmTime = null;

        document.getElementById("alarmStatus")
            .textContent =
            "No Alarm Set";
    }
}