import './App.css';
import RoutesComponent from "./components/RoutesComponent";
import {createContext, useEffect, useState} from "react";

export const AppContext = createContext({});

function App() {
  const registrationUsersFromLocalStorage = JSON.parse(localStorage.getItem('registrationUsers'));

  const [registrationUsers, setRegistrationUsers] = useState(registrationUsersFromLocalStorage ? registrationUsersFromLocalStorage : []);

  useEffect(() => {
    const registrationUsersForLocalStorage = JSON.stringify(registrationUsers);

    localStorage.setItem('registrationUsers', registrationUsersForLocalStorage);
  }, [registrationUsers]);

  const [cvInfoData, setCvInfoData] = useState([]);

  return (
    <div className="App">
      <AppContext.Provider value={{
        registrationUsers,
        setRegistrationUsers,
        cvInfoData,
        setCvInfoData
      }}>
        <RoutesComponent/>
      </AppContext.Provider>
    </div>
  );
}

export default App;
