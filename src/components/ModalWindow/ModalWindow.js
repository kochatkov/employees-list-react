import React from 'react';

import classes from './ModalWindow.module.scss';

const ModalWindow = (props) => {
  return (
    <div className={classes.ModalWindow}>
      <div className={classes.ModalWindowWrapper}>{props.children}</div>
    </div>
  );
};

export default ModalWindow;
