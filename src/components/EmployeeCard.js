import React from 'react';

const EmployeeCard = ({ employee, closeCard }) => {
  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>
      <p>Dirección: {employee.address}</p>
      <p>Ciudad: {employee.city}</p>
      <button onClick={closeCard}>Cerrar</button>
    </div>
  );
};

export default EmployeeCard;
