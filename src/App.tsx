import React, { useState, useEffect } from 'react';
import TimerTemplate from './components/TimerTemplate';
import CounterTemplate from './components/CounterTemplate';
import './App.css';

const body = document.body;
let cachedNumber: number, cachedSecond: number;

const App = () => {
  const [number, setNumber] = useState(3);
  const [second, setSecond] = useState(30);
  const [initialize, setInitialize] = useState(true);

  const go = () => {
    if (typeof number === 'string') return;
    if (number <= 0) return;
    cachedNumber = number;
    cachedSecond = second;

    setInitialize(false);
  };
  const stop = () => {
    setInitialize(true);
    setNumber(cachedNumber);
    setSecond(cachedSecond);
  };

  const onExpire = () => {
    body.className = 'flash';
    setTimeout(() => (body.className = ''), 5000);

    if (number > 0) {
      setNumber(number - 1);
    }
  };

  useEffect(() => {
    if (number === 0) {
      setInitialize(true);
      setNumber(cachedNumber);
      setSecond(cachedSecond);
    }
  }, [number]);

  return (
    <div className="container">
      <CounterTemplate
        init={initialize}
        number={number}
        setNumber={setNumber}
      />
      <TimerTemplate
        init={initialize}
        second={second}
        setSecond={setSecond}
        onExpire={onExpire}
      />
      <div className="trigger-wrapper">
        {initialize === true ? (
          <button
            className="btn btn-primary"
            onClick={go}>
            운동 시작
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={stop}>
            운동 중지
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
