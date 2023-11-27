
export default () => {

    return <div className="container-fluid my-4">
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/lead">Leads</a>
            </li>
        </ul>

        <div className="py-2 d-flex">
            <div className="card col-lg-3" >
                <div className="card-body">
                    <h5 className="card-title"># 27</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">23-11-2023 03:30 PM</h6>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <label htmlFor="route-name">Route Name</label>
                        <p><strong>JAVEED SUPER SHOPEE</strong></p>
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="route-name">Location</label>
                        <p><strong>SARFARAZ NAGAR</strong></p>
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="route-name">Phone no</label>
                        <p><strong>9850510000</strong></p>
                    </li>
                    <li className="list-group-item">
                        <label htmlFor="route-name">Cold drinks/Ice cream</label>
                        <p>
                            <span className="badge text-bg-secondary">Chocolate</span>&nbsp;&nbsp;
                            <span className="badge text-bg-secondary">Strawberry</span>&nbsp;&nbsp;
                            <span className="badge text-bg-secondary">Vanilla</span>&nbsp;&nbsp;
                        </p>
                    </li>
                </ul>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-body-secondary">Feedback/Reason</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    
                    
                    <a href="#" className="card-link">Edit</a>
                    <a href="#" className="card-link">Archive</a>
                    <a href="#" className="card-link">Delete</a>
                </div>
                
            </div>
        </div>

    </div>
}