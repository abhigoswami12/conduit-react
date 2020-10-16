import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik, ErrorMessage } from "formik";
import { ROOT_URL } from "../Utils/Constants";
import UserContext from "./Context/UserContext";

function validator(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "title is required";
  }
  if (!values.description) {
    errors.description = "description is required";
  }
  if (!values.body) {
    errors.body = "body is required";
  }
  if (!values.tagList.length) {
    errors.tagList = "tagList is required";
  }
  return errors;
}

function CreateArticle() {
  let context = useContext(UserContext);
  let history = useHistory();
  console.log(history);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      body: "",
      tagList: []
    },
    validate: validator,
    onSubmit: values => {
      if (context.user.token) {
        fetch(ROOT_URL + "articles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + context.user.token
          },
          body: JSON.stringify({
            article: {
              ...values,
              tagList: values.tagList.split(",").map(tag => tag.trim())
            }
          })
        })
          .then(res => res.json())
          .then(({ article }) => {
            history.push("/");
          });
      } else {
        return;
      }
    }
  });
  return (
    <div className="bg-gray-300 text-center p-24">
      <form action="" onSubmit={formik.handleSubmit}>
        <input
          className="border border-gray-600 mt-4"
          type="text"
          name="title"
          placeholder="Enter Title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        <small className="block text-red-700">
          {formik.errors &&
            formik.errors.title &&
            formik.touched.title &&
            formik.errors.title}
        </small>
        <textarea
          className="border border-gray-600 block my-4 mx-auto"
          name="description"
          id=""
          cols="30"
          rows="5"
          onChange={formik.handleChange}
          value={formik.values.description}
          placeholder="description"
        ></textarea>
        <small className="block text-red-700">
          {formik.errors &&
            formik.errors.description &&
            formik.touched.description &&
            formik.errors.description}
        </small>
        <textarea
          className="border border-gray-600 block my-4 mx-auto resize-none"
          name="body"
          id=""
          cols="30"
          rows="10"
          onChange={formik.handleChange}
          value={formik.values.body}
          placeholder="body"
        ></textarea>
        <small className="block text-red-700">
          {formik.errors &&
            formik.errors.body &&
            formik.touched.body &&
            formik.errors.body}
        </small>
        <input
          className="border border-gray-600 .resize-none"
          type="text"
          name="tagList"
          placeholder="Tags"
          onChange={formik.handleChange}
          value={formik.values.tagList}
        />
        <small className="block text-red-700">
          {formik.errors &&
            formik.errors.tagList &&
            formik.touched.tagList &&
            formik.errors.tagList}
        </small>
        <input className="btn m-4" type="submit" value="Create Question" />
      </form>
    </div>
  );
}

export default CreateArticle;
