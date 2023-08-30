import React,{useState,useEffect} from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './timer.css'

export default function TimerComponent() {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pauseTime, setPauseTime] = useState(0);

  useEffect(() => {
    setPauseTime(hours * 3600 + minutes * 60 + seconds);
  }, [hours, minutes, seconds]);

  const incrementTime = (field) => {
    if (field === 'hours') setHours(hours + 1);
    if (field === 'minutes') setMinutes(minutes + 1);
    if (field === 'seconds') setSeconds(seconds + 1);
  };

  const decrementTime = (field) => {
    if (field === 'hours' && hours > 0) setHours(hours - 1);
    if (field === 'minutes' && minutes > 0) setMinutes(minutes - 1);
    if (field === 'seconds' && seconds > 0) setSeconds(seconds - 1);
  };

  const startTimer = () => {
    setIsRunning(true);
    setPauseTime(hours * 3600 + minutes * 60 + seconds);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resumeTimer = () => {
    setIsRunning(true);
  };

  return (
    <>

<div className="timer">
     <div className='countdown'>
        <CountdownCircleTimer
          isPlaying={isRunning}
          duration={pauseTime}
          colors={[['#FF6A6A']]}
          rotation="counterclockwise"
          strokeWidth={8}
          onComplete={() => {
            setIsRunning(false);
            setPauseTime(0);
          }}
        >
          {({ remainingTime }) => {
            const remainingHours = Math.floor(remainingTime / 3600);
            const remainingMinutes = Math.floor(
              (remainingTime % 3600) / 60
            );
            const remainingSeconds = remainingTime % 60;

            return (
              <div>
                {`${remainingHours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`}
              </div>
            );
          }}
        </CountdownCircleTimer>
      </div>

      <div className='increment-decrement'>
        <span id='hours'>HOURS</span> <span id='min'>MINUTES</span>  <span id='seconds'>SECONDS</span>
        <br></br>
        <img src='./SuperApp/up-arrow.svg' alt='increment-hr' id='hr-up' onClick={() => incrementTime('hours')}></img>
        <br></br>
        <span id='time-hr'>{hours.toString().padStart(2, '0')}</span>
        <img src='./SuperApp/down.svg' alt='decrement-hr' id='hr-down' onClick={() => decrementTime('hours')}></img>
        
        <img src='./SuperApp/up-arrow.svg' alt='increment-min' id='min-up' onClick={() => incrementTime('minutes')}></img>
        <span id='time-min'> {minutes.toString().padStart(2, '0')}</span>
        <img src='./SuperApp/down.svg' alt='decrement-min' id='min-down' onClick={() => decrementTime('minutes')}></img>
        
        <img src='./SuperApp/up-arrow.svg' alt='increment-sec' id='sec-up' onClick={() => incrementTime('seconds')}></img>
          <span id='time-sec'>{seconds.toString().padStart(2, '0')}</span>
        <img src='./SuperApp/down.svg' alt='decrement-sec' id='sec-down' onClick={() => decrementTime('seconds')}></img>

      </div>

      <div className='start-pause'>
        {!isRunning ? (
          <button id='timer-btn' onClick={startTimer}>Start</button>
        ) : (
          <>
            <button id='pause-btn' onClick={pauseTimer}>Pause</button>
            <button id='resume-btn' onClick={resumeTimer}>Resume</button>
          </>
        )}
      </div>
    </div>
  </> 
  );
};



 