import './App.css';
import ShowTable from './Components/ShowTable';
import SubmissionForm from './Components/SubmissionForm';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"


const router = createBrowserRouter([
  {
    path: "/",
    element:<ShowTable/>,
  },
  {
    path: "/form",
    element:<SubmissionForm/>,
  },
]);


function App() {
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
