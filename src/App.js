import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './components/LoginForm';
import Tasks from './components/Tasks';
import TaskDetail from './components/TaskDetail';
import NewTask from './components/NewTask';
import EditTask from './components/EditTask';
import Users from './components/Users';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const getUser = () => localStorage.getItem('auth');

  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={!isLoggedIn ? <LoginForm /> : <Tasks />} />
          {isLoggedIn && (
            <>
              <Route path='/' element={<Navigate to='/tasks' />} />
              <Route path='tasks' element={<Tasks />} />
              <Route path='taskDetail/:id' element={<TaskDetail />} />
              <Route path='newTask' element={<NewTask />} />
              <Route path='editTask/:id' element={<EditTask />} />
              <Route path='all-users' element={<Users />} />
            </>
          )}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
