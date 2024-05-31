import React, { useEffect, useContext, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import * as posts from "../../service/posts"
import useUser from "../../hook/useUser";
import { Tooltip } from "@mui/material";
import { CurrentItemContext } from "../../state/CoursecDetailProvider";

export default function ListPost({ item }) {
  const { curItem } = useContext(CurrentItemContext);
  const { user } = useUser();
  const [listPosts, setListPosts] = useState([]);

  useEffect(() => {
    if (item._id) {
      var postInterval = setInterval(() => {
        posts.getListPostofItem(item._id)
          .then((res) => {
            setListPosts(res);
          })
          .catch((err) => {
            console.log("err get list post", err);
          });
      }, 3000);
    }
    return () => clearInterval(postInterval);
  }, [listPosts, curItem]);
  const handleDeletePost = (id) => {
    posts
      .DeletePost(id)
      .then((res) => {
        alert("delete post", res);
      })
      .catch((err) => {
        alert("err delete post", err);
      });
  };
  return (
    <ul >

      {listPosts.map((post, index) => {
        return (
          <li className='flex md:flex-row flex-col gap-1 w-[80%] shadow-lg bg-gradient-to-r border-2 border-black from-[#9abfea] to-[#B5D5FB]  mx-auto rounded-3xl my-4 overflow-hidden h-auto'
            key={index}

          >
            <div className='ml-2 w-4/5 flex flex-col'>
              <div className='flex justify-between'>
                <div className='flex mt-4 mb-2'>
                  <h4 className="text-sm font-bold bg-white shadow py-[2px] w-20 text-center rounded-md">Nhắc nhở</h4>
                </div>
                {(user.role === "teacher" || user.role === "admin") && (
                  <button
                    className="ml-[30%] bg-red-300 rounded-xl hover:bg-red-400"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    <Tooltip title="Delete Post">
                      <DeleteIcon />
                    </Tooltip>
                  </button>
                )}
              </div>
              <h3 className='font-bold text-xl max-w-[70%] w-auto rounded-md pl-8'>{post.title}</h3>
              <div className='flex-col m-8'>
                <p > Description: {post.description}</p>

              </div>
            </div>

          </li>
        );
      })}
    </ul>
  );
}
