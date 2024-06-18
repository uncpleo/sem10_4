import React, { useState, useContext, useEffect } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import './EmployeeForm.css';

const EmployeeForm = ({ employeeToEdit }) => {
  const { dispatch } = useContext(EmployeeContext);
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    address: '',
    city: '',
  });

  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit);
    }
  }, [employeeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee.id) {
      dispatch({ type: 'UPDATE_EMPLOYEE', payload: employee });
    } else {
      dispatch({
        type: 'ADD_EMPLOYEE',
        payload: { ...employee, id: Date.now().toString() },
      });
    }
    setEmployee({ id: '', name: '', address: '', city: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={employee.name}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        type="text"
        name="address"
        value={employee.address}
        onChange={handleChange}
        placeholder="Dirección"
        required
      />
      <input
        type="text"
        name="city"
        value={employee.city}
        onChange={handleChange}
        placeholder="Ciudad"
        required
      />
      <button type="submit">{employee.id ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
};

export default EmployeeForm;
