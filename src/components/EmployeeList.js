import React, { useContext, useState } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import EmployeeCard from './EmployeeCard';
import './EmployeeList.css';

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
      <div className='busqueda'>
        <label>Buscar
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        </label>
      </div>
      <table className='crd'>
        <tr className='titulo_T'>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Ciudad</th>
          <th>Opciones</th>
        </tr>
        {currentEmployees.map(employee => (
        <tr className='contenido_T' key={employee.id}>
          <td>{employee.name}</td>
          <td><p>{employee.address}</p></td>
          <td><p>{employee.city}</p></td>
          <td><button onClick={() => setEmployeeToEdit(employee)}>Editar</button>
          <button onClick={() => dispatch({ type: 'DELETE_EMPLOYEE', payload: employee.id })}>
            Eliminar
          </button>
          <button onClick={() => setSelectedEmployee(employee)}>Mostrar</button></td>
        </tr>
      ))}
      </table>
      <Pagination
        employeesPerPage={employeesPerPage}
        totalEmployees={filteredEmployees.length}
        paginate={paginate}
      />
      <div className='sad'>
      {selectedEmployee && (
        <EmployeeCard
          employee={selectedEmployee}
          closeCard={() => setSelectedEmployee(null)}
        />
      )}
      </div>
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

