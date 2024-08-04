import { useNavigate } from "react-router-dom";
// importr axios
// import toastify
export default function Card({ articles 
  // tambah url dan fetchData
}) {
  const navigate = useNavigate()

  // membuat handle delete

  function handleClick(id) {
      navigate(`/detail/${id}`)
  }

  return (
    <>
      <div className="card bg-[#BC9F8B] border border-[#BC9F8B] rounded-lg shadow-md w-200 h- p-1 text-pretty grid-3 justify-between">
          <figure>
              <img
                  src={articles.imgUrl}
                  alt="product image"
              />
          </figure>
          <div className="card-body grid-3">
              <b>{articles.title}</b>
              <b>{articles.content}</b>
              <button className="btn btn-accent btn-sm" onClick={() => handleClick(articles.id)}>Detail</button>
              {/* menambahkan delet dan edit page disini */}
          {/* </div>
          <div className="card-body flex-1"> */}
          </div>
      </div>
    </>
  );
}
