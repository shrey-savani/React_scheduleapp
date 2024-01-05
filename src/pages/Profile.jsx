import React, { useContext } from "react";
import Loader from "../components/Loader";
import { Context } from "../main";

const Profile = () => {
  const { user, loading } = useContext(Context);

  return loading ? (
    <div className="Profile">
      <h2>{user.name}</h2>
      <h3>{user.email}</h3>
    </div>
  ) : (
    <Loader />
  );
};

export default Profile;
