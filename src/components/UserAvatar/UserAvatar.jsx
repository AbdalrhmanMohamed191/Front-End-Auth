import React from "react";
import { baseUrlHandler } from "../../utils/baseUrlHandler";
import moment from "moment";

export const UserAvatar = ({ name, profilePic, createdAt, updatedAt }) => {
  const baseUrl = baseUrlHandler();
  return (
    <div className="text-start d-flex align-items-center gap-2 border mb-3 justify-content-between p-2">
      <div>
        <img
          src={`${baseUrl}/${profilePic}`}
          width="100"
          height="100"
          alt="user-profile"
        />
      </div>

      <div>
        <h3>{name}</h3>
        {/* Moment */}
      </div>

      <div className="d-flex gap-2 align-items-center">
        <p>CreatedAt: {moment(createdAt).fromNow()}</p>
        <p>UpdatedAt: {moment(updatedAt).fromNow()}</p>
      </div>
    </div>
  );
};
