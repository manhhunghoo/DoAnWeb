import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HocTapItemSmall = ({ HocTap }) => { // tạo props với object
  return (
    <Link to={`/Hoctappage/${HocTap._id}`}>
      <div className=" ml-3 mb-3 frame rounded-md bg-white wrap">
        <img src={HocTap.linkimage}
          className="mt-3 ml-2 rounded-md frame"
          style={{ height: "166.27px", width: "175.53px" }}
          alt="anh hoc tap"
        />
        <div className="ml-2.5 mt-2">
          <h1 className="font-bold text-xs mb-2">{HocTap.title}</h1>{/* content của môn học*/}
          <p className="font-thin text-xs mb-1">GVLT: {HocTap.khoa}</p>
          <p className="font-thin text-xs mb-1">info: {HocTap.description}</p>
          <p className="font-bold text-red-600"><span className="text-black">
            <FontAwesomeIcon icon={faUser} />
          </span> {HocTap.memberof}</p>
        </div>
      </div>
    </Link>
  )
}
export default HocTapItemSmall;
