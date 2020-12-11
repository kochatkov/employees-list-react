import React, { useEffect, useState } from 'react';
import EmployeeList from './EmployeeList';
import TableHead from './TableHead';
import Button from '../../components/UI/Button';
import ModalWindow from '../../components/ModalWindow';
import EmployeeForm from '../EmployeeForm';
import axios from 'axios';

import classes from './Employees.module.scss';
import Shadow from '../../components/UI/Shadow';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkedCounter, setCheckedCounter] = useState(0);
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);

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
        setLoading(false);
      })
      .catch((e) => {
        throw e;
      });
  };

  const modalHandler = () => {
    setIsOpen(true);
    setTodo('add');
  };

  const modalEditHandler = () => {
    setIsOpen(true);
    setTodo('edit');
  };

  const changeHandler = (value, employeeId) => {
    const workers = [...employees];
    workers[employeeId - 1].checked = value;

    const lengthOfChecked = workers.filter((worker) => worker.checked === true)
      .length;

    setCheckedCounter(lengthOfChecked);
    setEmployees(workers);
  };

  const onDelete = async () => {
    const newList = employees.filter((employee) => employee.checked !== true);

    setEmployees(newList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <table className={classes.Employees}>
            <TableHead />
            <EmployeeList employees={employees} onChange={changeHandler} />
          </table>
          <div className={classes['Employees__buttons']}>
            <Button onClick={modalHandler} type={'add'}>
              Add employee
            </Button>
            <Button
              onClick={modalEditHandler}
              type={'edit'}
              disabled={checkedCounter !== 1}
            >
              Edit
            </Button>
            <Button
              onClick={onDelete}
              type={'delete'}
              disabled={checkedCounter === 0}
            >
              Delete
            </Button>
          </div>
          {isOpen && (
            <>
              <ModalWindow>
                <EmployeeForm
                  setIsOpen={setIsOpen}
                  employees={employees}
                  fetchData={fetchData}
                  setTodo={setTodo}
                  todo={todo}
                />
              </ModalWindow>
              <Shadow />
            </>
          )}
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default Employees;
