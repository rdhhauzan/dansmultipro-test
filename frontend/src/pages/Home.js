import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosApi from "../apis/axios";
import MDSpinner from "react-md-spinner";

export default function Home() {
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const [Search, setSearch] = useState({
    description: "",
    location: "",
    full_time: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [Page, setPage] = useState(1);
  const [SearchOption, setSearchOption] = useState(false);

  function toDetailJob(id) {
    navigate(`/job/${id}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSearchOption(true);
    console.log(Search);
    setIsLoading(true);
    axiosApi
      .get(
        `/jobs?description=${Search.description}&location=${Search.location}&full_time=${Search.full_time}`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      )
      .then((data) => {
        setData(data.data);
        console.log(data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setSearch({
      description: "",
      location: "",
      full_time: false,
    });
  }

  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    if (name == "full_time") {
      value = event.target.checked;
    }
    setSearch({
      ...Search,
      [name]: value,
    });
  }

  function resetSearch() {
    setSearchOption(false);
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
  }

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
      <div className="mt-4 mb-3">
        <form method="post" onSubmit={handleSubmit} className="pb-3">
          <div class="row">
            <div class="col-md-6">
              <label>
                <b>Job Description</b>
              </label>
              <div class="input-group">
                <input
                  type="search"
                  class="form-control rounded"
                  placeholder="Filter by benefits, companies, expertise (ex. python)"
                  name="description"
                  onChange={handleChange}
                  value={Search.description}
                />
              </div>
            </div>
            <div class="col">
              <label>
                <b>Location</b>
              </label>
              <div class="input-group">
                <input
                  type="search"
                  class="form-control rounded"
                  placeholder="Filter by city, state, zip code or country (ex. berlin)"
                  name="location"
                  onChange={handleChange}
                  value={Search.location}
                />
              </div>
            </div>
            <div className="col">
              <div class="form-check d-inline-block my-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="true"
                  name="full_time"
                  id="flexCheckDefault"
                  onChange={handleChange}
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Full Time Only
                </label>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-outline-primary mt-3">
            Search
          </button>
          <button
            class="btn btn-outline-primary mt-3 mx-3"
            onClick={() => {
              resetSearch();
            }}
          >
            Reset Search
          </button>
        </form>
      </div>

      <h5>You are in Page : {Page}</h5>
      {Data.map((el, idx) => {
        if (el !== null)
          return (
            <div class="card my-3">
              <div class="card-body">
                <h5 class="card-title">
                  <a
                    href="#"
                    className="text-decoration-none"
                    onClick={() => toDetailJob(el?.id)}
                  >
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

      {!SearchOption ? (
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
      ) : null}
    </>
  );
}
