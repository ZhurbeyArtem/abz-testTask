import { Routes, Route, Navigate } from "react-router-dom";
import { Auth } from './pages/auth/auth';
import { UsersApp } from './pages/users/users';


const AppRouter = () => {
  return (
    <Routes>
      <Route key={'auth'} path={'/auth'} element={<Auth />} />
      <Route key={'link'} path={'/link'} element={<UsersApp />} />
      <Route
        path="*"
        element={
          <Navigate to="/link" />
        }
      />
    </Routes>
  );
};

export default AppRouter;