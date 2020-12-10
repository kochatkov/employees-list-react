import React, { useState } from 'react';
import classes from '../Employees/Employees.module.scss';
import Button from '../../components/UI/Button';
import { createControl } from '../../form/formFramework';
import axios from 'axios';
import Input from '../../components/UI/Input';

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
  option1: createOptionControl(1, 'Full Name'),
  option2: createOptionControl(2, 'Role'),
  option3: createOptionControl(3, 'Business Location'),
  option4: createOptionControl(4, 'Email', 'email'),
  option5: createOptionControl(5, 'Phone', 'phone'),
  option6: createOptionControl(5, 'Hourly Rate'),
});

const AddEmployeeForm = (props) => {
  const [formControls, setFormControls] = useState(creatFormControls());

  console.log(formControls);
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const createEmployee = async (e) => {
    e.preventDefault();

    const {
      option1,
      option2,
      option3,
      option4,
      option5,
      option6,
    } = formControls;

    const employee = {
      id: props.employees.length + 1,
      fullName: option1.value,
      role: option2.value,
      businessLocation: option3.value,
      email: option4.value,
      phone: option5.value,
      hourlyRate: option6.value,
    };

    try {
      const response = await axios.post('http://localhost:3001/data', employee);
    } catch (e) {
      throw e;
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

  return (
    <form onSubmit={submitHandler}>
      <p
        onClick={() => props.setIsOpen(false)}
        className={classes['close-button']}
      >
        X
      </p>
      {renderControls()}
      <Button onClick={createEmployee}>Add employee</Button>
    </form>
  );
};

export default AddEmployeeForm;
