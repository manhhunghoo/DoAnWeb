import React, { useEffect, useContext, useState } from "react";
import useUser from "../../hook/useUser";

export default function ListComment({ item }) {
  const { user } = useUser();
  const [listComment, setListComment] = useState([]);
  useEffect(() => {
    const commentsInterval = setInterval(() => { 
      commentss.getListPostofItem(item._id)
        .then((res) => {
          setListComment(res);
        })
        .catch((err) => {
          console.log("err get list comments", err);
        });
    }, 1000);
    return () => clearInterval(commentsInterval);
  }, [listComment,item]);
  return (
    <ul className="bg-red-500 w-full rounded-xl ">
      {listComment.map((comment, index) => {
        return (
          <li
            key={index}
            className="mt-0 round-xl border-[1px] border-b-black "
          >
            <div
              onClick={() => {
                setCurPosturl(comment.link);
              }}
            >
              <h5> Title: {comment.title}</h5>
              <p className="text-sm font-thin">
                {" "}
                Description: {comment.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
