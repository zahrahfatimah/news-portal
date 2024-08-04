import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

export default function Home({ url }) {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");

  // const navigate = useNavigate();

  async function fetchData() {
    try {
      const { data } = await axios.get(
        `${url}/apis/pub/news-portal/articles?q=${search}&i=&limit=8&page=1&sort=ASC`
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
      await axios.delete(`${url}/apis/news-portal/articles${id}`, {
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
  }, [search]);

  return (
    <>
      <div className="flex justify-center my-8">
        <div className="search-filter flex border-none">
          <input
            type="text"
            id="search"
            placeholder="Search article here..."
            className="search-input p-2 border-none rounded"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn p-2 ml-2 border-none rounded bg-[#BC9F8B] text-white cursor-pointer hover:bg-[#CADABF] hover:text-black">
            Search
          </button>
        </div>
      </div>
      <main className="px-10 my-8 bg-[#CADABF]">
        <table className="min-w-full bg-[#CADABF">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Image</th>
              {/* <th className="py-2 px-4 border-b">Name</th> */}
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Content</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="py-2 px-4 border-b">
                  <img
                    src={article.imgUrl}
                    alt={article.name}
                    className="w-20 h-20 object-cover"
                  />
                </td>
                {/* <td className="py-2 px-4 border-b">{article.name}</td> */}
                <td className="py-2 px-4 border-b">{article.title}</td>
                <td className="py-2 px-4 border-b">{article.content}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex flex-col space-y-2">
                    {/* <button 
                      className="p-2 bg-[#BC9F8B] text-white rounded hover:text-black" 
                      onClick={() => navigate(`/detail/${article.id}`)}
                    >
                      Detail
                    </button> */}
                   <Link to={`/edit/${article.id}`}>
                   <button
                      className="p-2 bg-[#BC9F8B] text-white rounded hover:text-black"
                      // onClick={() => navigate(`/edit/${article.id}`)}
                    >
                      Edit
                    </button>  
                   </Link>
                    <button
                      className="p-2 bg-[#BC9F8B] text-white rounded hover:text-black"
                      onClick={() => handleDelete(article.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

