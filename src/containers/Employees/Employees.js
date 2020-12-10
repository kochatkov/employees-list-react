import React, { useEffect, useState } from 'react';
import EmployeeList from './EmployeeList';
import TableHead from './TableHead';
import Button from '../../components/UI/Button';
import ModalWindow from '../../components/ModalWindow';
import AddEmployeeForm from '../AddEmployee';
import axios from 'axios';

import classes from './Employees.module.scss';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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

  const modalHandler = () => {
    setIsOpen(true);
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
        <Button onClick={modalHandler}>Add employee</Button>
        <Button disabled={isButtonDisabled}>Edit</Button>
        <Button>Delete</Button>
      </div>
      {isOpen && (
        <ModalWindow>
          <AddEmployeeForm
            setIsOpen={setIsOpen}
            employees={employees}
            fetchData={fetchData}
          />
        </ModalWindow>
      )}
    </>
  );
};

export default Employees;
