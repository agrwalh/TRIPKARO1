import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
  SignOutUserStart,
  SignOutUserSuccess,
  SignOutUserFaliure,
} from "../../redux/userSlice";

function LogoutButton() {
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(SignOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(SignOutUserFaliure(data.message));
        return;
      }
      dispatch(SignOutUserSuccess(data));
      navigate('/');
    } catch (error) {
      
      dispatch(SignOutUserFaliure(error.message));
    }
  };

  const getErrorMessage = (error) => {
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object') {
      return error.message || JSON.stringify(error);
    }
    return 'An unknown error occurred';
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      {/* {error && <p className="text-red-700 mt-5">{getErrorMessage(error)}</p>} */}
    </>
  );
}

export default LogoutButton;  