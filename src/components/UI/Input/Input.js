import React from 'react';

import classes from './Input.module.scss';

const Input = (props) => {
  const inputType = props.type || 'text';
  const htmlFor = `${inputType}-${Math.random()}`;

  return (
    <div className={classes.Input}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        // onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
