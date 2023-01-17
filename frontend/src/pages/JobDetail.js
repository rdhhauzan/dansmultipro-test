import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosApi from "../apis/axios";
import MDSpinner from "react-md-spinner";

export default function JobDetail() {
  const { id } = useParams();
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(id);

  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get(`/job/${id}`, {
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
  }, [id]);

  if (isLoading) {
    return <MDSpinner />;
  }
  return (
    <>
      <Navbar />
      <div className="my-3">
        <div class="row">
          <div class="col-9">
            <p>
              {Data.type} / {Data.location}
            </p>
            <h4>{Data.title}</h4>
            <div dangerouslySetInnerHTML={{ __html: Data.description }}></div>
          </div>
          <div class="col">
            <div class="card" style={{ width: "19rem" }}>
              <div class="card-header">{Data.company}</div>
              <img
                src="https://dansmultipro.com/wp-content/uploads/2020/03/logo_web_header-810x180-1.png"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <a
                  href={Data.company_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {Data.company_url}
                </a>
              </div>
            </div>
            <div class="card mt-3" style={{ width: "19rem" }}>
              <div class="card-header">How to Apply</div>
              <div class="card-body">
                <div
                  dangerouslySetInnerHTML={{ __html: Data.how_to_apply }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
