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
  const [checkedCounter, setCheckedCounter] = useState(0);

  const fetchData = () => {
    axios
      .get('http://localhost:3001/data')
      .then((res) => {
        setEmployees(
          res.data.map((data) => {
            return {
              ...data,
              checked: false,
            };
          })
        );
      })
      .catch((e) => {
        throw e;
      });
  };

  const modalHandler = () => {
    setIsOpen(true);
  };

  const modalEditHandler = () => {
    setIsOpen(true);
  };

  const changeHandler = (value, employeeId) => {
    const workers = [...employees];
    workers[employeeId - 1].checked = value;

    const lengthOfChecked = workers.filter((worker) => worker.checked === true)
      .length;

    setCheckedCounter(lengthOfChecked);
    setEmployees(workers);
  };

  const onDelete = () => {
    const newList = employees.filter((employee) => employee.checked !== true);

    setEmployees(newList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <table className={classes.Employees}>
        <TableHead />
        <EmployeeList employees={employees} onChange={changeHandler} />
      </table>
      <div className={classes['Employees__buttons']}>
        <Button onClick={modalHandler}>Add employee</Button>
        <Button onClick={modalEditHandler} disabled={checkedCounter > 1}>
          Edit
        </Button>
        <Button onClick={onDelete}>Delete</Button>
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
