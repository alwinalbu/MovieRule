import React from "react";

const UserProfile: React.FC = () => {
  return (
    <div className="flex items-center p-4 bg-gray-900 text-white rounded-md">
      <img
        src="/path/to/profile-pic.jpg"
        alt="User Profile"
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <h2 className="text-xl">Alwin Denny</h2>
        <p>alwin@example.com</p>
      </div>
    </div>
  );
};

export default UserProfile;
