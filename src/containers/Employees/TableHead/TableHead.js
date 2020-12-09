import React from 'react';

import classes from './TableHead.module.scss';

const TableHead = () => {
  return (
    <thead className={classes.TableHead}>
      <tr>
        <th>ID</th>
        <th>#</th>
        <th>Full Name</th>
        <th>Role</th>
        <th>Business Location</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Hourly Rate</th>
      </tr>
    </thead>
  );
};

export default TableHead;
