import React, { useEffect } from "react";

import * as forum from "../../service/forum";
import validator from "../../hook/validate";
import useUser from "../../hook/useUser";

export default function CreatePost({ setShowCreatePost }) {
  const { user } = useUser();
  useEffect(() => {
    validator({
      form: "#create-post",
      formGroup: ".form-group",
      errorMessage: ".form-message",
      styleInvalid: "border-red-500",
      rules: [
        validator.isRequired("#description", "Vui lòng nhập description"),
        validator.isRequired("#title", "Vui lòng nhập title"),
        validator.isRequired("#linkPDF", "Vui lòng nhập linkPDF"),
      ],
      onSubmit: function (data) { {
          const { title, description, linkPDF } = data;
          forum
            .addForum({ title, description, linkPDF, user: user._id })
            .then((res) => {
              setShowCreatePost(false);
            })
            .catch((err) => {
              alert("loi r cu");
              console.log("loi", err);
            });
        }
      },
    });
  }, []);
  return (
    <form
      id="create-post"
      className="bg-[#cfe3d7] p-4 md:w-4/5 w-full rounded-3xl"
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create Post
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3 form-group">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <div className="flex justify-center">
                <div className="form-message text-red-600"></div>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600"></p>
            </div>
            <div className="col-span-full form-group">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                description
              </label>
              <div className="mt-2">
                <input
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <div className="flex justify-center">
                <div className="form-message text-red-600"></div>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about your Post.
              </p>
            </div>
            <div className="col-span-full form-group">
              <label
                htmlFor="linkPDF"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                LinkPDF or Image:{" "}
              </label>
              <input
                name="linkPDF"
                id="linkPDF"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="flex justify-center">
                <div className="form-message text-red-600"></div>
              </div>
            </div>
            {/* <div className="col-span-full form-group">
              <label htmlFor="linkimage" className="block text-sm font-medium leading-6 text-gray-900">linkimage: </label>
              <input name="linkimage" id="linkimage" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              <div className='flex justify-center'><div className='form-message text-red-600'></div></div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create
        </button>
      </div>
    </form>
  );
}
