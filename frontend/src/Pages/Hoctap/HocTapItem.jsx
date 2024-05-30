import React from "react";
import HocTapItemSmall from "./HoctapItemSmall"

const HocTapItem = ({ HocTap }) => { // tạo props với object
  console.log('item', HocTap.studies)
  return (
    <div className="m-2 p-2 w-full max-w-[80%]">
      <h2 className='font-bold text-3xl md:p-2 p-2 md:max-w-[500px] md:m-2 md:text-left'>{HocTap._id}</h2>
      <div className="flex flex-wrap w-full bg-custom-gradient rounded-2xl">
        {HocTap.studies.map((hocTap) => (
          <HocTapItemSmall HocTap={hocTap} key={hocTap._id} />
        ))}
      </div>
    </div>
  )
}
// tạo componentHocTapItem với props ten, giaovien, siso và trả về 1 div chứa title, giáo viên và sĩ số
export default HocTapItem;
