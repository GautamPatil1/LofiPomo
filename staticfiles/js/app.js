// Play Music on Page Load With Toggle Function

var audio = document.getElementById('player');
function togglePlay() {
    var icon = document.getElementById('icon');
    icon.classList.toggle('fa-circle-pause');
    return audio.paused ? audio.play() : audio.pause();
};
window.onload = function() {
    togglePlay();
}

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      togglePlay();
    }
  })


// Pomodoro Timer app

const sessionLengthElement = document.getElementById('session-length');
const breakLengthElement = document.getElementById('break-length');
const statusElement = document.getElementById('status');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let sessionLength = parseInt(sessionLengthElement.innerText);
let breakLength = parseInt(breakLengthElement.innerText);;
let isSessionFinished = false;
let intervalID;
let isClocking = false;

/**
 * This event gets called when session length is subtracted.
 */
document.getElementById('session-length-sub').addEventListener('click', function(){
    if(!isClocking) {
        if (sessionLengthElement.innerText > '1') {
            sessionLength = parseInt(sessionLengthElement.innerText);
            sessionLength -= 1;
            if(statusElement.innerHTML === 'Session'+'<br>') {
                minutesElement.innerText = sessionLength;
                secondsElement.innerText = 0;
            }
            sessionLengthElement.innerText = sessionLength;
        }
    }
});

//pomodoro timer

/**
 *  This event gets called when session length is increased.
 */
document.getElementById('session-length-add').addEventListener('click', function(){
    if(!isClocking) {
        sessionLength = parseInt(sessionLengthElement.innerText);
        sessionLength += 1;
        if(statusElement.innerHTML === 'Session'+'<br>') {
            minutesElement.innerText = sessionLength;
            secondsElement.innerText = 0;
        }
        sessionLengthElement.innerText = sessionLength;
    }
});

/**
 *  This event gets called when break length length is subtracted.
 */
document.getElementById('break-length-sub').addEventListener('click', function(){
    if(!isClocking) {
        if (breakLengthElement.innerText > '1') {
            breakLength = parseInt(breakLengthElement.innerText);
            breakLength -= 1;
            if(statusElement.innerHTML === 'Break!'+'<br>') {
                minutesElement.innerText = breakLength;
                secondsElement.innerText = 0;
            }
            breakLengthElement.innerText = breakLength;
        }
    }
});

/**
 *  This event gets called when session length is increased.
 */
document.getElementById('break-length-add').addEventListener('click', function(){
    if(!isClocking) {
        breakLength = parseInt(breakLengthElement.innerText);
        breakLength += 1;
        if(statusElement.innerHTML === 'Break!'+'<br>') {
            minutesElement.innerText = breakLength;
            secondsElement.innerText = 0;
        }
        breakLengthElement.innerText = breakLength;
    }
});

/**
 * 
 * This function is invoked every time clock button is pressed and it keeps looking for 
 * changes and keeps updating other variables as state changes
 * 
 * @param type - type of period (session or break)
 * @param length - length of period
 * @param sec - seconds of length 
 */
function clocking(type, length, sec) {
    statusElement.innerHTML = type;
    let estimatedMinutes = length;
    let estSeconds;
    if(parseInt(secondsElement.innerText) === 0) {
        estSeconds = length * 60;   
    } else {
        estSeconds = sec;
    }
    let isLastStateBreak = false;
    intervalID = setInterval(function() {
        estimatedMinutes = Math.floor(estSeconds / 60);
        if (estimatedMinutes > -1 && estSeconds > -1)
            if (estSeconds < 59) {
                secondsElement.innerText = estSeconds - Math.round(estimatedMinutes * 60);
            } else {
                minutesElement.innerText = estimatedMinutes;
                secondsElement.innerText = estSeconds - Math.round(estimatedMinutes * 60);
            }
        if(statusElement.innerHTML === 'Session'+'<br>') {
            isLastStateBreak = false;
        } else {
            isLastStateBreak = true;
        }
        estSeconds--;
        if (estSeconds < 0) {
            if(isLastStateBreak){
                statusElement.innerHTML = 'Session'+'<br>'
                togglePlay();
                estimatedMinutes = sessionLength;
                if(parseInt(secondsElement.innerText) === 0) {
                    estSeconds = sessionLength * 60;   
                } else {
                    estSeconds = sec;
                }
            } else {
                statusElement.innerHTML = 'Break!'+'<br>';
                togglePlay();
                estimatedMinutes = breakLength;
                if(parseInt(secondsElement.innerText) === 0) {
                    estSeconds = estimatedMinutes * 60;   
                } else {
                    estSeconds = sec;
                }
            }
        }
    }, 1000);
}

/**
 * 
 * This fuctions takes some preliminary checks and then starts the clock by calling @clocking()
 * function with related arguments
 */
function startClock() {
    if(isClocking) {
        isClocking = false;
    } else {
        isClocking = true;
    }
    
    if(isClocking) {
        let prevSessionLength = sessionLength;
        let prevBreakLength = breakLength;
        if(statusElement.innerHTML === 'Session'+'<br>' && prevSessionLength !== sessionLength) {
            clocking(statusElement.innerHTML = 'Session'+'<br>', sessionLength , parseInt(secondsElement.innerText));
        }
        else if(statusElement.innerHTML === 'Break!'+'<br>' && prevBreakLength !== breakLength) {
            clocking(statusElement.innerHTML = 'Session'+'<br>', breakLength , parseInt(secondsElement.innerText));
            
        } else {
            clocking(statusElement.innerHTML, parseInt(minutesElement.innerText) , parseInt(secondsElement.innerText));
        }
        
    } else {
        clearInterval(intervalID);
        minutesElement.innerText = minutesElement.innerText;
        secondsElement.innerText = secondsElement.innerText;
    }
}




