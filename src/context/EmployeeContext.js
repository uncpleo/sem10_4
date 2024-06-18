import React, { createContext, useReducer, useEffect } from 'react';

// Definición del contexto
const EmployeeContext = createContext();

// Función reductora
const employeeReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return [...state, action.payload];
    case 'UPDATE_EMPLOYEE':
      return state.map(employee =>
        employee.id === action.payload.id ? action.payload : employee
      );
    case 'DELETE_EMPLOYEE':
      return state.filter(employee => employee.id !== action.payload);
    default:
      return state;
  }
};

// Estado inicial
const initialState = JSON.parse(localStorage.getItem('employees')) || [];

// Proveedor del contexto
const EmployeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  // Guardar el estado en LocalStorage
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(state));
  }, [state]);

  return (
    <EmployeeContext.Provider value={{ state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeProvider };
