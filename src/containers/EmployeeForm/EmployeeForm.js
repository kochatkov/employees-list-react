import React, { useEffect, useState } from 'react';
import Button from '../../components/UI/Button';
import { createControl } from '../../form/formFramework';
import Input from '../../components/UI/Input';
import axios from 'axios';

import classes from '../Employees/Employees.module.scss';

const createOptionControl = (number, label, type = null) => {
  return createControl(
    {
      label: label,
      inputType: type,
      errorMessage: 'Fill the form',
      id: number,
    },
    {
      required: true,
    }
  );
};

const creatFormControls = () => ({
  fullName: createOptionControl(1, 'Full Name'),
  role: createOptionControl(2, 'Role'),
  businessLocation: createOptionControl(3, 'Business Location'),
  email: createOptionControl(4, 'Email', 'email'),
  phone: createOptionControl(5, 'Phone', 'phone'),
  hourlyRate: createOptionControl(6, 'Hourly Rate'),
});

const EmployeeForm = (props) => {
  const [employeeInfo, setEmployeeInfo] = useState(
    props.employees.filter((employee) => employee.checked === true)[0]
  );
  const [formControls, setFormControls] = useState(creatFormControls());

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const editEmployee = (e) => {
    e.preventDefault();
  };

  const createEmployee = async (e) => {
    e.preventDefault();

    const {
      fullName,
      role,
      businessLocation,
      email,
      phone,
      hourlyRate,
    } = formControls;

    const employee = {
      id: props.employees.length + 1,
      fullName: fullName.value,
      role: role.value,
      businessLocation: businessLocation.value,
      email: email.value,
      phone: phone.value,
      hourlyRate: hourlyRate.value,
    };

    if (props.todo === 'add') {
      try {
        const response = await axios.post(
          'http://localhost:3001/data',
          employee
        );
      } catch (e) {
        throw e;
      }
    } else {
      try {
        const response = await axios.put(
          `http://localhost:3001/data/${employeeInfo.id}`,
          employee
        );
      } catch (e) {
        throw e;
      }
    }

    props.fetchData();
    props.setIsOpen(false);
  };

  const changeHandler = (value, controlName) => {
    const controls = { ...formControls };
    const control = { ...controls[controlName] };

    control.value = value;
    controls[controlName] = control;
    setFormControls(controls);
  };

  const renderControls = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];

      return (
        <Input
          key={controlName + index}
          type={control.inputType}
          label={control.label}
          value={control.value}
          onChange={(e) => changeHandler(e.target.value, controlName)}
        />
      );
    });
  };

  const closeMenuHandler = () => {
    props.setTodo('');
    props.setIsOpen(false);
  };

  const showInputValues = (id) => {
    const controls = { ...formControls };

    Object.keys(formControls).map((controlName, index) => {
      const control = { ...controls[controlName] };
      control.value = employeeInfo[controlName];

      controls[controlName] = control;
    });

    setFormControls(controls);
  };

  useEffect(() => {
    if (props.todo === 'edit') {
      showInputValues(employeeInfo.id);
    }
  }, []);

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <h1 className={classes.heading}>Add employee</h1>
      <p onClick={closeMenuHandler} className={classes['close-button']}>
        X
      </p>
      <div>{renderControls()}</div>
      <div className={classes['Employees__buttons']}>
        {props.todo === 'add' && (
          <Button onClick={createEmployee} type={'add'}>
            Add employee
          </Button>
        )}
        {props.todo === 'edit' && (
          <Button onClick={createEmployee} type={'edit'}>
            Edit
          </Button>
        )}
      </div>
    </form>
  );
};

export default EmployeeForm;
