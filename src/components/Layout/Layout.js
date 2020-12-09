import React from 'react';

import classes from './Layout.module.scss';

const Layout = (props) => {
  return <section className={classes.Layout}>{props.children}</section>;
};

export default Layout;
