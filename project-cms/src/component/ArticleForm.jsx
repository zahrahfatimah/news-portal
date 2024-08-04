

import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";

export default function ArticleForm({ url, handleSubmit, articles, nameProp }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (articles) {
      setName(articles.name)
      setTitle(articles.title)
      setContent(articles.content)
      setImgUrl(articles.imgUrl)
      setCategoryId(articles.categoryId)
    }
  },[articles]);
  
  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${url}/apis/pub/news-portal/categories`, {
        headers: {
          Authorization: `Bearer${localStorage.access_token}`
        }
      });

      setCategories(data.data);
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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <form
          onSubmit={(e) =>
            handleSubmit(e, name, title, content, imgUrl, categoryId)
          }
          className="bg-[#CADABF] p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              // placeholder="Enter name ..."
              autoComplete="off"
              required
              className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              // placeholder="Enter title ..."
              autoComplete="off"
              required
              className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-gray-700 font-medium mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              // placeholder="Enter content ..."
              autoComplete="off"
              required
              className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="imgUrl"
              className="block text-gray-700 font-medium mb-2"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imgUrl"
              // placeholder="Enter image URL ..."
              autoComplete="off"
              required
              className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setImgUrl(e.target.value)}
              value={imgUrl}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="categoryId"
              className="block text-gray-700 font-medium mb-2"
            >
              Category
            </label>
            <select
              name="category"
              className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setCategoryId(e.target.value)}
              id=""
            >
              {categories.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-[#BC9F8B] text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-[#BC9F8B] focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
          >
            {nameProp}
          </button>
        </form>
      </div>
    </>
  );
}
