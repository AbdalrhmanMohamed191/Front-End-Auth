import React from "react";
import { baseUrlHandler } from "../../utils/baseUrlHandler";
import moment from "moment";
import { Image } from 'react-bootstrap';

export const UserAvatar = ({ username, profileImage, createdAt, updatedAt }) => {
  const baseUrl = baseUrlHandler();
  return (
    <div className="d-flex align-items-center justify-content-between mb-3 p-2 border rounded-3">
      <div className="d-flex align-items-center gap-2">
        <Image src={`${baseUrl}/${profileImage}`} roundedCircle width={"50px"} height={"50px"} style={{ objectFit: "cover" }} />
        <div>
          <h6 className="mb-0">{username}</h6>
          <small className="text-muted">
            Created {moment(createdAt).fromNow()} | Updated {moment(updatedAt).fromNow()}
          </small>
        </div>
      </div>
    </div>
  );
};
