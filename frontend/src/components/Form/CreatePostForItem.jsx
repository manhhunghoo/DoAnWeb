import React, { useEffect } from "react";
import validator from "../../hook/validate";
import * as posts from '../../service/posts'
import Item from "../Footer/Item";
export default function CreatePostForm({ item }) {
  useEffect(() => {
    validator({
      form: "#create-post-item",
      formGroup: ".form-group",
      errorMessage: ".form-message",
      styleInvalid: "border-red-500",
      rules: [
        validator.isRequired("#title", "Vui lòng nhập title"),
        validator.isRequired("#description", "Vui lòng nhập mo ta"),
        validator.isRequired("#linkPDF", "Vui lòng nhập linkpdf"),
      ],
      onSubmit: function (data) {
        console.log("data", data);
        const { title, description, linkPDF } = data;

        posts
          .CreateNewPost({ title, description, linkPDF, item: item._id })
          .then((res) => {
            alert("Create course successfully" + res).catch((err) =>
              alert("Create post for item failed: " + err)
            );
          });
      },
    });
  }, []);
  return (
    <form id="create-post-item">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" className="form-control" />
        <div className="form-message"></div>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
        ></textarea>
        <div className="form-message"></div>
      </div>
      <div className="form-group">
        <label htmlFor="linkPDF">linkPDF : </label>
        <input
          type="text"
          id="linkPDF"
          name="linkPDF"
          className="form-control"
        />
        <div className="form-message"></div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
