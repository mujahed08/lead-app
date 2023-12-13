import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NotFound from "../../assets/notfound.png";
import { getLeads, justStatusUpdate } from "../../api/lead";

export default () => {
  const [tab, setTab] = useState<number>(0);
  const [leads, setLeads] = useState<any>([]);

  const fetchData = async (status: string, interval?: string) => {
    try {
      const data = await getLeads(status, interval);
      setLeads(data?.data?.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    if (tab == 0) {
      fetchData("New", "recent");
    } else if (tab == 1) {
      fetchData("Done");
    } else if (tab == 2) {
      fetchData("New", "7");
    }
    setLeads([]);
  }, [tab]);

  let heading;
  if (tab == 0) {
    heading = "New / Recent Tab is Empty !";
  } else if (tab == 1) {
    heading = "Done Tab Data is Empty !";
  } else if (tab == 2) {
    heading = "7 Days Tab Data is Empty !";
  }

  const doneHandler = async (lead: any) => {
    const response = await justStatusUpdate({ id: lead.id, _status: "Done" });
    if (response.status == 200) {
      setTab(1);
    }
  };

  const undoHandler = async (lead: any) => {
    const response = await justStatusUpdate({ id: lead.id, _status: "New" });
    if (response.status == 200) {
      setTab(0);
    }
  };

  const formatDate = (datetime: any) => {
    let date = new Date(datetime);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="container-fluid my-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            onClick={() => setTab(0)}
            className={`nav-link ${tab == 0 ? "active" : ""}`}
          >
            Leads (Recent)
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={() => setTab(1)}
            className={`nav-link ${tab == 1 ? "active" : ""}`}
          >
            Done
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={() => setTab(2)}
            className={`nav-link ${tab == 2 ? "active" : ""}`}
          >
            7 Days Ago
          </button>
        </li>
      </ul>

      <div className="py-2 d-flex flex-wrap" style={{ overflow: "auto" }}>
        {leads.length == 0 ? (
          <div
            className="d-flex justify-content-center align-items-center flex-column"
            style={{ height: "100vh", width: "100%" }}
          >
            <img
              src={NotFound}
              style={{ height: "50%", width: "100%" }}
              alt="Not Found"
            />
            <div className="">{heading}</div>
          </div>
        ) : (
          leads.map((lead: any) => (
            <>
              <div className="card col-11 col-lg-3 m-2 ">
                <div className="card-body">
                  <h5 className="card-title">#{lead.id}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    <span>{formatDate(lead?.updated_on)}</span>
                  </h6>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <label htmlFor="route-name">
                      <span className="bi bi-shop text-primary"></span>
                      <span className="ms-2 text-primary">Route Name</span>
                    </label>
                    <p>
                      <strong className=" ">
                        <span className="ms-1 ">{lead.route_name}</span>
                      </strong>
                    </p>
                  </li>
                  <li className="list-group-item">
                    <label htmlFor="retailer">
                      <span className="bi bi-buildings text-primary"></span>
                      <span className="ms-2 text-primary">Retailer</span>
                    </label>
                    <p>
                      <strong className="">
                        <span className="ms-1 ">{lead.retailer}</span>
                      </strong>
                    </p>
                  </li>
                  <li className="list-group-item">
                    <label htmlFor="location">
                      <span className="bi bi-geo-alt-fill text-primary "></span>
                      <span className="ms-1 text-primary"> Location</span>
                    </label>
                    <p>
                      <strong>{lead._location}</strong>
                    </p>
                  </li>
                  <li className="list-group-item">
                    <label htmlFor="phone_no">
                      <span className="bi bi-telephone-fill text-primary"></span>
                      <span className="ms-2 text-primary">Phone Number</span>{" "}
                    </label>
                    <p>
                      <strong>{lead.phone_no}</strong>
                    </p>
                  </li>
                  <li className="list-group-item">
                    <label htmlFor="products">
                      <span className="bi bi-cart-check-fill text-primary"></span>
                      <span className="ms-2 text-primary">
                        Cold drinks/Ice cream
                      </span>{" "}
                    </label>
                    <p>
                      {JSON.parse(lead?.products)?.map((it: any) => (
                        <span className="badge text-bg-success ms-2">{it}</span>
                      ))}
                    </p>
                  </li>
                </ul>
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Feedback/Reason
                  </h6>
                  <p className="card-text">{lead.remarks}</p>

                  <Link
                    className="btn btn-sm btn-warning"
                    to={`/lead/edit/${lead.id}`}
                  >
                    Edit
                  </Link>
                  {tab == 0 ? (
                    <button
                      onClick={() => doneHandler(lead)}
                      className="btn btn-sm btn-success ms-1"
                    >
                      Done
                    </button>
                  ) : (
                    <button
                      onClick={() => undoHandler(lead)}
                      className="btn btn-sm btn-success ms-1"
                    >
                      Undo
                    </button>
                  )}
                  <Link
                    className="btn btn-sm btn-danger ms-1"
                    to={`/lead/remove/${lead.id}`}
                  >
                    Delete
                  </Link>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
};
