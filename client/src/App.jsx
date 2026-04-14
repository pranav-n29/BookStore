import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import UpdateBook from "./pages/UpdateBook";
import ShowBook from "./pages/ShowBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./auth/ProtectedRoute";



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <ShowBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <UpdateBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delete/:id"
          element={
            <ProtectedRoute>
              <DeleteBook />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App