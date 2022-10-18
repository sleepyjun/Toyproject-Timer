import React, { useCallback } from 'react';
import { useTimer } from 'react-timer-hook';
import './TimerTemplate.css';

type Props = {
  init: boolean;
  second: number;
  setSecond: Function;
  onExpire: () => void;
};

const Timer = ({ init, second, setSecond, onExpire }: Props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setSecond('');
      return;
    }

    const number = parseInt(value);
    if (number <= 0) return;
    setSecond(number);
  };

  const formattingNumber = (num: number) => {
    return (num).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
  };

  if (init === true) {
    return (
      <div className="timer-wrapper">
        <h1>휴식 타이머 (초)</h1>
        <input
          className="form-control form-control-lg"
          name="second"
          type="number"
          inputMode="numeric"
          pattern="\d*"
          value={second}
          onChange={onChange}
        />
      </div>
    );
  }

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + second);

  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({ expiryTimestamp, onExpire: onExpire, autoStart: false });

  return (
    <div className="timer-wrapper">
      <h1>휴식 타이머</h1>
      <div className="timer">
        <span>{formattingNumber(minutes)}</span>:<span>{formattingNumber(seconds)}</span>
      </div>
      <p className={"info " + (isRunning ? 'resting' : 'running')}>{isRunning ? '휴식 중' : '운동 중'}</p>
      <div className="btn-group-vertical" role="group">
        <button
          className="btn btn-outline-dark" 
          onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + second);
            restart(time, true);
          }}>
          휴식 시작
        </button>
        <button className="btn btn-outline-dark" onClick={pause}>휴식 일시 정지</button>
        <button className="btn btn-outline-dark" onClick={resume}>휴식 재개</button>
      </div>
    </div>
  );
};

export default Timer;