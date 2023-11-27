import CreatableSelect from 'react-select/creatable'


export default () => {


    const colourOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];

    return <div className="container-fluid">
        
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/lead">Create Lead</a>
            </li>
        </ul>
        <div className="border border-top-0 p-4">
            <form className="needs-validation g-2 row" noValidate>
                <div className="form-floating">
                    <input type="text" className="form-control" id="route_nameText" placeholder="placeholder" />
                    <label htmlFor="route_nameText" className="form-label">Route Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="location_nameText" placeholder="placeholder" />
                    <label htmlFor="location_nameText" className="form-label">Location Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="phone_noText" placeholder="placeholder" />
                    <label htmlFor="phone_noText" className="form-label">Phone Number</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="feedbackText" placeholder="placeholder" />
                    <label htmlFor="feedbackText" className="form-label">Feedback/Reason</label>
                </div>
                <div>
                    <label htmlFor="ice" className="form-label">Cold Drinks/Ice cream</label>
                    <CreatableSelect isMulti isClearable options={colourOptions}
                        styles={{
                        control: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: '#212529',
                        borderColor : '#495057'
                        }),
                        option: (styles) => ({ ...styles, 
                            backgroundColor: '#212529',
                            color: '#dee2e6',
                            ":hover" : {color : '#dee2e6', backgroundColor: '#343a40'}
                        }),
                    }}
                    />
                </div>
            </form>
        </div>
    </div>
}