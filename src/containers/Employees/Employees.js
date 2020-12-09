import React, { useEffect, useState } from 'react';
import EmployeeList from './EmployeeList';
import TableHead from './TableHead';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import ModalWindow from '../../components/ModalWindow';
import axios from 'axios';

import classes from './Employees.module.scss';

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  const fetchData = () => {
    axios
      .get('http://localhost:3001/data')
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((e) => {
        throw e;
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <table className={classes.Employees}>
        <TableHead />
        <EmployeeList employees={employees} />
      </table>
      <div className={classes['Employees__buttons']}>
        <Button>Add employee</Button>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
      <ModalWindow>
        <Input label={'Full Name'} />
        <Input label={'Role'} />
        <Input label={'Business Location'} />
        <Input label={'Email'} />
        <Input label={'Phone'} />
        <Input label={'Hourly Rate'} />
        <Button>Add employee</Button>
      </ModalWindow>
    </>
  );
};

export default Employees;
