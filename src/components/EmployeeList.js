import React, { useContext, useState } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import EmployeeCard from './EmployeeCard';

const EmployeeList = ({ setEmployeeToEdit }) => {
  const { state, dispatch } = useContext(EmployeeContext);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 8;

  const filteredEmployees = state.filter(employee =>
    employee.name.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div>
        {currentEmployees.map(employee => (
          <div key={employee.id}>
            <h3 className='otro'>{employee.name}</h3>
            <p className='otro'>{employee.address}</p>
            <p className='otro'>{employee.city}</p>
            <button onClick={() => setEmployeeToEdit(employee)}>Editar</button>
            <button onClick={() => dispatch({ type: 'DELETE_EMPLOYEE', payload: employee.id })}>
              Eliminar
            </button>
            <button onClick={() => setSelectedEmployee(employee)}>Mostrar</button>
          </div>
        ))}
      </div>
      <Pagination
        employeesPerPage={employeesPerPage}
        totalEmployees={filteredEmployees.length}
        paginate={paginate}
      />
      {selectedEmployee && (
        <EmployeeCard
          employee={selectedEmployee}
          closeCard={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
};

const Pagination = ({ employeesPerPage, totalEmployees, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#!" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default EmployeeList;

