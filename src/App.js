// import logo from "./logo.svg";
import "./App.css";
import { THEMES } from "./component/Context/theme";
import PatientForm from "./component/Patient/Main Form";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HistoryForm from "./component/History/Main Layout";
import Layout from "./component/Layouts/Form Layout";
import Login from "./component/Pages/Login/Login";
import themeContext from "./component/Context/theme";
import { UserAuthProvider } from "./component/Context/Auth";

const rout = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "Patients",
        element: <PatientForm />,
      },
      {
        path: "Patients/:id/History",
        element: <HistoryForm />,
      },
      {
        path: "History",
        element: <HistoryForm />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
function App() {
  return (
    <themeContext.Provider value={{ theme: THEMES.light }}>
      <UserAuthProvider>
        <RouterProvider router={rout} />
      </UserAuthProvider>
    </themeContext.Provider>
  );
}

export default App;
