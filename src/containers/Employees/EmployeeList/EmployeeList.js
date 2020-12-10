import React from 'react';
import Employee from './Employee';

const EmployeeList = (props) => {
  return (
    <tbody>
      {props.employees.map((employee, index) => (
        <Employee
          key={employee.id + index}
          id={employee.id}
          fullName={employee.fullName}
          role={employee.role}
          businessLocation={employee.businessLocation}
          email={employee.email}
          phone={employee.phone}
          hourlyRate={employee.hourlyRate}
          onChange={props.onChange}
        />
      ))}
    </tbody>
  );
};

export default EmployeeList;
