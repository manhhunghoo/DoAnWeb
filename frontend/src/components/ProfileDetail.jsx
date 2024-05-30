import React from 'react';

const ProfileDetail = ({ selectedUser }) => {
  return (
    <div className="profile-detail">
      <h2>Username: {selectedUser.username}</h2>
      <p>Email: {selectedUser.email}</p>
    </div>
  );
};



export default ProfileDetail;