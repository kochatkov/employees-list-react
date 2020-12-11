import React from 'react';

import classes from './Layout.module.scss';

const Layout = (props) => {
  return (
    <section className={classes.Layout}>
      <div className={classes['Layout__container']}>{props.children}</div>
    </section>
  );
};

export default Layout;
