import React, { useCallback, useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import './TimerTemplate.css';

type Props = {
  init: boolean;
  second: number;
  setSecond: Function;
  setRunning: Function;
  onExpire: () => void;
};

const Timer = ({ init, second, setSecond, setRunning, onExpire }: Props) => {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + second);
  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
    expiryTimestamp,
    onExpire: onExpire,
    autoStart: false,
  });

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setSecond('');
      return;
    }

    const number = parseInt(value);
    if (number <= 0) return;
    setSecond(number);
  }, []);

  const formattingNumber = useCallback((num: number) => {
    return num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }, []);

  useEffect(() => {
    if (init === true) {
      setRunning(false);
      restart(expiryTimestamp, false);
    } else {
      if (isRunning === false) {
        setRunning(false);
      }
    }
  }, [init, isRunning, second]);

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
  return (
    <div className="timer-wrapper">
      <h1>휴식 타이머</h1>
      <div className="timer">
        <span>{formattingNumber(minutes)}</span>:
        <span>{formattingNumber(seconds)}</span>
      </div>
      <p className={'info ' + (isRunning ? 'resting' : 'running')}>
        {isRunning ? '휴식 중' : '운동 중'}
      </p>
      <div
        className="btn-group-vertical"
        role="group">
        <button
          className="btn btn-outline-dark"
          onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + second);
            setRunning(true);
            restart(time, true);
          }}>
          휴식 시작
        </button>
        <button
          className="btn btn-outline-dark"
          onClick={() => {
            setRunning(false);
            pause();
          }}>
          휴식 일시 정지
        </button>
        <button
          className="btn btn-outline-dark"
          onClick={() => {
            setRunning(true);
            resume();
          }}>
          휴식 재개
        </button>
      </div>
    </div>
  );
};

export default Timer;
