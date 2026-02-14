// import React from "react";
// import { baseUrlHandler } from "../../utils/baseUrlHandler";
// import moment from "moment";

// export const UserAvatar = ({ username, profileImage, createdAt, updatedAt }) => {
//   const baseUrl = baseUrlHandler();
//   return (
//     <div className="text-start d-flex align-items-center gap-2 border mb-3 justify-content-between p-2">
//        <div>
//           <img  width={50} src={`${baseUrl}/${profileImage}`} alt="" />
//         </div>
//         <div></div>

//       <div>
//         <h5>{username}</h5>
//           {/* Moment */}
//       </div>

//       <div className="d-flex gap-2 align-items-center">
//         <p>CreatedAt: {moment(createdAt).fromNow()}</p>
//         <p>UpdatedAt: {moment(updatedAt).fromNow()}</p>
//       </div>
//     </div>
//   );
// };



import React from "react";
import { baseUrlHandler } from "../../utils/baseUrlHandler";
import moment from "moment";
import { Image } from 'react-bootstrap';

export const UserAvatar = ({ username, profileImage, createdAt, updatedAt }) => {
  const baseUrl = baseUrlHandler();
  return (
    <div className="d-flex align-items-center justify-content-between mb-3 p-2 border rounded-3">
      <div className="d-flex align-items-center gap-2">
        <Image src={`${baseUrl}/${profileImage}`} roundedCircle width={50} height={50} />
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
