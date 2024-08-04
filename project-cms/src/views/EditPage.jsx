// import React, { useState,useEffect } from "react";
import ArticleForm from "../component/ArticleForm";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditForm({ url }) {
  const navigate = useNavigate();
  const [article, setArticle] = useState();
  const { id } = useParams();

  async function fetchData() {
    try {
      // console.log('masukk');
      
      const { data } = await axios.get(
        `${url}/apis/news-portal/articles${id}`
      );

      // console.log(data);
      
      setArticle(data.data);
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
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

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e, name, title, content, imgUrl, categoryId) {
    e.preventDefault();
    try {
      const newData = { name, title, content, imgUrl, categoryId };

     await axios.put(`${url}/apis/news-portal/articles${id}`, newData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      // console.log(databaru, 'hai');
      
      Toastify({
        text: "Success edit product",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();

      navigate("home");
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
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

  return(
    <>
    <ArticleForm url={url} handleSubmit={handleSubmit} articles={article} nameProp={"Edit Article"}/>
    </>
  )
}
