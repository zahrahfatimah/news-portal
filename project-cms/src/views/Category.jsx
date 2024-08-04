import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';

export default function Categories({ url }){
  const [categories, setCategories] = useState([]);

  
  async function fetchData() {
    try {
      const { data } = await axios.get(
        `${url}apis/news-portal/categories`
      );

      setArticles(data.data.query);
    } catch (error) {
      console.log(error);
      Toastify({
        text: "Error fetching data",
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

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/apis/news-portal/categories${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Toastify({
        text: "Success delete",
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

      fetchData();
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

  return(
    <>
      <div className="overflow-x-auto mt-10 bg-[#CADABF] px-10 py-8">
  <table className="min-w-full bg-[#CADABF]">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b">No</th>
        <th className="py-2 px-4 border-b">Category Name</th>
        <th className="py-2 px-4 border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {categories.map((category) => (
        <tr key={category.id}>
          <td className="py-2 px-4 border-b">{category.id}</td>
          <td className="py-2 px-4 border-b">
            <div className="flex items-center gap-3">
              <div>
                <div className="font-bold">{category.name}</div>
              </div>
            </div>
          </td>
          <td className="py-2 px-4 border-b">
            <div className="flex flex-col space-y-2">
              <button
                className="p-2 bg-[#BC9F8B] text-white rounded hover:text-black"
                onClick={() => handleDelete(category.id)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </>
  )
}