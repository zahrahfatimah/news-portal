import Card from '../components/Card';
import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
// import gearLoad from '../assets/Gear-0.2s-264px.svg'

export default function Home({ url }) {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  // const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      // setLoading(true);
      const { data } = await axios.get(
        `${url}/apis/pub/news-portal/articles?q=${search}&i=&limit=8&page=1&sort=ASC`
        //t=fetchData here?
      );

      setArticles(data.data.query);
    } catch (error) {
      console.log(error);
      Toastify({
        text: "test",
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
          <button className="search-btn p-2 ml-2 border-none rounded bg-[#BC9F8B] text-white cursor-pointer hover:bg-[#CADABF] hover:text-[#BC9F8B]">
            Search
          </button>
        </div>
      </div>
    
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-10">
        {articles.map((article) => (
          <Card key={article.id} articles={article} />
        ))}
      </main>
    </>
  );
}
