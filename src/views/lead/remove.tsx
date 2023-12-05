import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLead, removeLead } from "../../api/lead";



export default () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [lead, setLead] = useState<any>(null);

    useEffect(()=> {
        if(id) {
            getOne(parseInt(id))
        }
        
    }, [])

    const getOne = async (id:number) => {
        try {
            const response = await getLead(id);
            setLead(response?.data);
        } catch (error) {
            console.error("Error fetching lead:", error);
        }
    }

    const removeOne = async (id:number) => {
        try {
            const response = await removeLead(id);
            setLead(response.data);
            navigate('/leads')
        } catch (error) {
            console.error("Error fetching lead:", error);
        }
    }

    const formatDate = (datetime:any) => {
        let date = new Date(datetime);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }

    return <div className="container-fluid">
        
        {lead ? <div className="card col-11 col-lg-3 m-2 ">
                
            <div className="card-body">
                <div className="alert alert-danger" role="alert">
                <p>Are you sure want to delete this!</p>
                <button onClick={() => removeOne(lead.id)} className="btn btn-sm btn-danger">Yes</button> &nbsp;&nbsp;
                <button onClick={() => navigate(-1)} className="btn btn-sm btn-success">No</button>
                </div>
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
            </div>
        </div> : ''}
    </div>
}