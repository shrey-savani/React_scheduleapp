import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async (e) => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        //for cookies to work
        withCredentials: true,
      });

      toast.success("Logout successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.success(e.response.data.message);
      setIsAuthenticated(true);
    }
  };
  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {isAuthenticated ? (
          <button className="btn" disabled={loading} onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
