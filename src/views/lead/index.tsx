import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { leadCreate } from "../../api/lead";
import { locationNames, productNames, routeNames } from "../../data";
import { useNavigate } from "react-router-dom";

interface Option {
  value: string;
  label: string;
}
interface Location {
  value: string;
  label: string;
}
interface Coldrinks {
  value: string;
  label: string;
}

export default () => {
    const navigate = useNavigate();

  const [options, setOptions] = useState<Option[]>(routeNames);
  const [locations, setLoactions] = useState<Location[]>(locationNames);
  const [products, setProducts] = useState<Coldrinks[]>(productNames);
  const [mobile, setMobile] = useState<any>("");
  const [feedback, setFeedback] = useState<string>("");
  const [routeName, setRouteName] = useState<string>('')
  const [locationName, setLocationName] = useState<string>('')
  const [productList, setProductList] = useState<Coldrinks[]>([]);

  const handleChangeRoute = ( newValue:any, actionMeta: { action: string } ) => {
    if (actionMeta.action === "create-option" && newValue) {
      const newOption: Option = {
        value: newValue.value,
        label: newValue.label || "",
      };
      setOptions([...options, newOption]);
    }
    setRouteName(newValue.value)
  };

  const handleChangeLocation = ( newValue:any, actionMeta: { action: string } ) => {
    if (actionMeta.action === "create-option" && newValue) {
      const newLocation: Location = {
        value: newValue.value,
        label: newValue.label || "",
      };
      setLoactions([...locations, newLocation]);
    }
    setLocationName(newValue.value)
  };

  const handleChangeIcecream = ( newValue:any, actionMeta: { action: string } ) => {
    if (actionMeta.action === "create-option" && newValue) {
      const newColdrink: Coldrinks = {
        value: newValue.value,
        label: newValue.label || "",
      };
      setProducts([...products, newColdrink]);
    }
    let list = newValue.map((prod:any) => prod.value)
    setProductList(list);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const response = await leadCreate({
        route_name: routeName,
        _location: locationName,
        phone_no: mobile,
        remarks: feedback,
        products: productList,
    });
    if (response.status == 200) {
      navigate("/leads");
      console.log(response);
    }
  };

  return (
    <div className="container-fluid">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/lead">
            Create Lead
          </a>
        </li>
      </ul>
      <div className="border border-top-0 p-4">
        <form
          className="needs-validation g-2 row"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="form-floating">
            <CreatableSelect
              isClearable
              options={options}
              // value={options}
              onChange={handleChangeRoute}
              placeholder="Create Your Route"
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "#212529",
                  borderColor: "#495057",
                  color: "#fff !important",
                  padding: "10px",
                }),
                option: (styles) => ({
                  ...styles,
                  backgroundColor: "#212529",
                  color: "#dee2e6",
                  ":hover": { color: "#dee2e6", backgroundColor: "#343a40" },
                }),
                menu: (styles) => ({
                  ...styles,
                  backgroundColor: "#212529",
                  zIndex: 9999,
                }),
                placeholder: (styles) => ({
                  ...styles,
                  color: "#fff",
                }),
                singleValue: (styles) => ({
                  ...styles,
                  color: "#fff",
                }),
                input: (provided) => ({
                  ...provided,
                  color: "#fff",
                }),
              }}
            />
          </div>
          <div className="form-floating">
            <CreatableSelect
              isClearable
              options={locations}
              onChange={handleChangeLocation}
              placeholder="Location"
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "#212529",
                  borderColor: "#495057",
                  color: "#fff !important",
                  padding: "10px",
                }),
                option: (styles) => ({
                  ...styles,
                  backgroundColor: "#212529",
                  color: "#dee2e6",
                  ":hover": { color: "#dee2e6", backgroundColor: "#343a40" },
                }),
                menu: (styles) => ({
                  ...styles,
                  backgroundColor: "#212529",
                  zIndex: 9999,
                }),
                placeholder: (styles) => ({
                  ...styles,
                  color: "#fff",
                }),
                singleValue: (styles) => ({
                  ...styles,
                  color: "#fff",
                }),
                input: (provided) => ({
                  ...provided,
                  color: "#fff",
                }),
              }}
            />
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="phone_noText"
              placeholder="placeholder"
              onChange={(e) => setMobile(e.target.value)}
            />
            <label htmlFor="phone_noText" className="form-label ms-2">
              Phone Number
            </label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="feedbackText"
              placeholder="placeholder"
              onChange={(e) => setFeedback(e.target.value)}
            />
            <label htmlFor="feedbackText" className="form-label ms-2">
              Feedback/Reason
            </label>
          </div>
          <div>
            <label htmlFor="ice" className="form-label">
              Cold Drinks/Ice cream
            </label>
            <CreatableSelect
              isMulti
              isClearable
              options={products}
              onChange={handleChangeIcecream}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  color: "#fff !important",
                  backgroundColor: "#212529",
                  padding: "10px",
                }),
                option: (styles) => ({
                  ...styles,
                  backgroundColor: "#212529",
                  color: "#dee2e6",
                  ":hover": { color: "#dee2e6", backgroundColor: "#343a40" },
                }),
                placeholder: (styles) => ({
                  ...styles,
                  color: "#fff",
                }),
                input: (provided) => ({
                  ...provided,
                  color: "#fff",
                }),
                multiValue: (base) => {
                  return {
                    ...base,
                    color: "#fff",
                  };
                },
                multiValueLabel: (base) => ({
                  ...base,
                  color: "#fff",
                }),
                singleValue: (styles) => ({
                  ...styles,
                  color: "#fff",
                }),
              }}
            />
          </div>
          <div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
