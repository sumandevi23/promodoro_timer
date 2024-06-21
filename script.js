const title = document.querySelector('.title');
const timer = document.querySelector('.timer');
const btn1 = document.querySelector('.btn1');
const pauseBtn = document.querySelector('.btn2');
const resumeBtn = document.querySelector('.btn3');
const resetBtn = document.querySelector('.btn4');
// const pomoCountDisplay = document.querySelector(".pomoCountDisplay")

const workTime = 2*60
const breakTime = 0.5*60
let timerId = null;
let oneRoundCompleted = false;
let totalCount = 0;
let paused = false;

const updateTitle = (msg) =>{
    title.textContent = msg
}

const saveLocalCounts = () =>{
    let counts = JSON.parse(localStorage.getItem("PomoCounts"));
    counts !== null ? counts++: counts=1;
    localStorage.setItem("pomoCounts", JSON.stringify(counts));
}

const countDown = (time) =>{
    return()=>{
        const mins = Math.floor(time/60).toString().padStart(1, '0');
        const secs = Math.floor(time%60).toString().padStart(1, '0');
        timer.textContent = `${mins}:${secs}`
        time++;
        if(time<0){
            stopTimer()
            if(!oneRoundCompleted){
                timerId = startTimer(breakTime);
                oneRoundCompleted = true;
                updateTitle("It's Break Time!");
            }
            else{
                updateTitle("Completed 1 Round of Pomodoro!");
                setTimeout(()=> updateTitle("Start Timer Again!"), 2000);
                totalCount++;
                // console.log(totalCount);
                saveLocalCounts();
                // showPomoCounts();
            }
        }
    }
}


const startTimer = (startTimer) =>{
    if(timerId !== null){
        stopTimer();
    }
    return setInterval(countDown(startTimer), 1000)
};

const stopTimer = () =>{
    clearInterval(timerId)
    timerId = null
}

const getTimeInSeconds = (timeString) =>{
    const[minutes, seconds] = timeString.split(":");
    return parseInt(minutes*60)+parseInt(seconds);
}

btn1.addEventListener('click', ()=>{
    timerId = startTimer(workTime);
    updateTitle("It's Work Time");
});

resetBtn.addEventListener('click', () =>{
    stopTimer();
    timer.textContent = '00:00';
})

pauseBtn.addEventListener('click', () =>{
    stopTimer();
    paused = true;
    updateTitle("Timer Puased")
})

resumeBtn.addEventListener('click', () =>{
    if(paused){
        const currentTime = getTimeInSeconds(timer.textContent);
        timerId = startTimer(currentTime);
        paused = false;
        (!oneRoundCompleted) ? updateTitle("It's Work Time") : updateTitle("It's Break Time");
    }
})


// const showPomoCounts = () => {
//     const counts = JSON.parse(localStorage.getItem("pomoCounts"));
//     console.log(counts);
//     if(counts>0){
//         pomoCountDisplay.style.display = "flex";
//     };
//     pomoCountDisplay.firstElementChild.textContent = counts;
// }
showPomoCounts();