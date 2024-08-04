// import React, { useState,useEffect } from "react";
import ArticleForm from "../component/ArticleForm";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

export default function AddForm({ url }) {
  const navigate = useNavigate();
  async function handleSubmit(e, name, title, content, imgUrl, categoryId) {
    e.preventDefault();

    try {
      const newData = {
        name,
        title,
        content,
        imgUrl,
        categoryId,
      };
      // console.log(url,'<<<');
      
      const { data } = await axios.post(
        // /apis/news-portal/articles
        `${url}/apis/news-portal/articles`,
        newData,
        {
          headers: {
             Authorization: `Bearer ${localStorage.access_token}`
          },
        }
      );

      // console.log(headers, "headers");
      

      // console.log(data, 'iniiiiii');
      
      Toastify({
        text: `New data ${data.data.name} has bee n added`,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      navigate("/home");
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  }

  return (
    <>
      <ArticleForm  url={url} handleSubmit={handleSubmit} nameProp="Add Article"/>
    </>
  );
}

// export default NewsForm;
