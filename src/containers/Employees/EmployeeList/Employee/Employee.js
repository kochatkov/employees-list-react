import React from 'react';

import classes from './Employee.module.scss';

const Employee = (props) => {
  return (
    <tr className={classes.Employee}>
      <td>
        <input
          type="checkbox"
          onChange={(e) => props.onChange(e.target.checked, props.id)}
        />
      </td>
      <td className={classes['Employee__cell--id']}>{props.id}</td>
      <td className={classes['Employee__cell']}>{props.fullName}</td>
      <td className={classes['Employee__cell']}>{props.role}</td>
      <td className={classes['Employee__cell']}>{props.businessLocation}</td>
      <td className={classes['Employee__cell']}>{props.email}</td>
      <td className={classes['Employee__cell']}>{props.phone}</td>
      <td className={classes['Employee__cell']}>{props.hourlyRate}</td>
    </tr>
  );
};

export default Employee;
