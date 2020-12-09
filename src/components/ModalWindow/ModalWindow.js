import React from 'react';

import classes from './ModalWindow.module.scss';

const ModalWindow = (props) => {
  return <div className={classes.ModalWindow}>{props.children}</div>;
};

export default ModalWindow;
