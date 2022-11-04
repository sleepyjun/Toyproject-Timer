import React, { useCallback } from 'react';
import './CounterTemplate.css';

type Props = {
  init: boolean;
  running: boolean;
  number: number;
  setNumber: Function;
};

const Counter = ({ init, running, number, setNumber }: Props) => {
  const handleIncrease = useCallback(() => {
    if (typeof number === 'string') return;
    setNumber(number + 1);
  }, [number]);

  const handleDecrease = useCallback(() => {
    if (typeof number === 'string') return;
    if (number <= 1) return;
    setNumber(number - 1);
  }, [number]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setNumber('');
      return;
    }

    const number = parseInt(value);
    if (number <= 0) return;
    setNumber(number);
  }, []);

  if (init === true) {
    return (
      <div className="counter-wrapper">
        <h1>세트 수</h1>
        <input
          className="form-control form-control-lg"
          name="number"
          type="number"
          inputMode="numeric"
          pattern="\d*"
          value={number}
          onChange={onChange}
        />
        <div
          className="btn-group"
          role="group">
          <button
            className="btn btn-lg btn-success"
            onClick={handleIncrease}>
            +
          </button>
          <button
            className="btn btn-lg btn-danger"
            onClick={handleDecrease}>
            -
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="counter-wrapper">
      <h1>남은 세트 수</h1>
      <p className="remain">{running === true ? number-1 : number}</p>
    </div>
  );
};

export default Counter;
