import { useState, useEffect } from "react";
import { getLeads } from "../../api/getleads";
import { Link } from "react-router-dom";

export default () => {
  const [leads, setLeads] = useState<any>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLeads();
        setLeads(data?.data?.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchData();
  }, []);
  console.log(leads);

  const formatDate = (datetime:any) => {
    let date = new Date(datetime);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  return (
    <div className="container-fluid my-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/lead">
            Leads
          </a>
        </li>
      </ul>

      <div className="py-2 d-flex flex-wrap" style={{ overflow: "auto" }}>
        {leads.map((lead: any) => (
          <>
            <div className="card col-11 col-lg-3 m-2 ">
              <div className="card-body">
                <h5 className="card-title">#{lead.id}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  <span>{formatDate(lead?.created_on)}</span>
                </h6>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <label htmlFor="route-name">
                    <span className="bi bi-shop text-primary"></span><span className="ms-2 text-primary">Route Name</span> 
                    </label>
                  <p>
                    <strong className=" "><span className="ms-1 ">{lead.route_name}</span></strong>
                  </p>
                </li>
                <li className="list-group-item">
                  <label htmlFor="retailer">
                    <span className="bi bi-shop text-primary"></span><span className="ms-2 text-primary">Retailer</span> 
                    </label>
                  <p>
                    <strong className=" "><span className="ms-1 ">{lead.retailer}</span></strong>
                  </p>
                </li>
                <li className="list-group-item">
                  <label htmlFor="location">
                    <span className="bi bi-geo-alt-fill text-primary "></span><span className="ms-1 text-primary"> Location</span></label>
                  <p>
                    <strong>{lead._location}</strong>
                  </p>
                </li>
                <li className="list-group-item">
                  <label htmlFor="phone_no">
                    <span className="bi bi-telephone-fill text-primary"></span>
                   <span className="ms-2 text-primary">Phone Number</span> </label>
                  <p>
                    <strong>{lead.phone_no}</strong>
                  </p>
                </li>
                <li className="list-group-item">
                  <label htmlFor="products">
                    <span className="bi bi-cart-check-fill text-primary"></span>
                   <span className="ms-2 text-primary">Cold drinks/Ice cream</span> </label>
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

                <button className="btn btn-sm btn-warning">Edit</button>
                <button className="btn btn-sm btn-success ms-1">Done</button>
                <Link className="btn btn-sm btn-danger ms-1" to={`/lead/remove/${lead.id}`}>Delete</Link>

              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
