import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosApi from "../apis/axios";
import MDSpinner from "react-md-spinner";

export default function Home() {
  const [Data, setData] = useState([]);
  const [Search, setSearch] = useState({
    description: "",
    location: "",
    full_time: "",
    page: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [Page, setPage] = useState(2);

  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get(`/jobs?page=${Page}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        setData(data.data);
        console.log(data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [Page]);

  if (isLoading) {
    return <MDSpinner />;
  }
  return (
    <>
      <Navbar />
      <h1>Job List</h1>
      <h5>You are in Page : {Page}</h5>
      {Data.map((el, idx) => {
        if (el !== null)
          return (
            <div class="card my-3">
              <div class="card-body">
                <h5 class="card-title">
                  <a href="#" className="text-decoration-none">
                    {el?.title}
                  </a>
                </h5>

                <p class="card-text">
                  {el?.company} - {el?.type}
                </p>
                <p class="card-text text-end text-muted">{el?.location}</p>
                <p class="card-text text-end text-muted">{el?.created_at}</p>
              </div>
            </div>
          );
      })}

      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" onClick={() => setPage(1)}>
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" onClick={() => setPage(2)}>
              2
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
