import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import ValueType from "react-select";

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
  //   const colourOptions = [
  //     { value: "chocolate", label: "Chocolate" },
  //     { value: "strawberry", label: "Strawberry" },
  //     { value: "vanilla", label: "Vanilla" },
  //   ];
  const [options, setOptions] = useState<Option[]>([
    { value: "SHRI LAXMI KIRANA", label: "SHRI LAXMI KIRANA" },
    { value: "TAJ PAN SHOP", label: "TAJ PAN SHOP" },
    { value: "SAJID KIRANA", label: "SAJID KIRANA" },
  ]);
  const [locations, setLoactions] = useState<Location[]>([
    { value: "JUNA PEDGAON", label: "JUNA PEDGAON" },
    { value: "JUNA PEDGAON", label: "JUNA PEDGAON" },
    { value: "JUNA PEDGAON", label: "JUNA PEDGAON" },
  ]);
  const [coldrink, setColdrink] = useState<Coldrinks[]>([
    
      { value: "ice cream", label: "Ice Cream" },
    
  ])

  const handleChangeRoute = (
    newValue: ValueType<Option, false>,
    actionMeta: { action: string }
  ) => {
    if (actionMeta.action === "create-option" && newValue) {
      const newOption: Option = {
        value: newValue.value,
        label: newValue.label || "",
      };
      setOptions([...options, newOption]);
    }
  };
const handleChangeLocation = ( newValue: ValueType<Location, false>,
  actionMeta: { action: string }) => {
    if (actionMeta.action === "create-option" && newValue) {
      const newLocation: Location = {
        value: newValue.value,
        label: newValue.label || "",
      };
      setLoactions([...locations, newLocation])
}
  }
  const handleChangeIcecream = (newValue: ValueType<Coldrinks, false>,
    actionMeta: { action: string }) => {
      if (actionMeta.action === "create-option" && newValue) {
        const newColdrink: Coldrinks = {
          value: newValue.value,
          label: newValue.label || "",
        };
        setColdrink([...coldrink, newColdrink])
  }
  }
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
        <form className="needs-validation g-2 row" noValidate>
          <div className="form-floating">
            {/* <input type="text" className="form-control" id="route_nameText" placeholder="placeholder" /> */}
            {/* <label htmlFor="route_nameText" className="form-label">Route Name</label> */}
            <CreatableSelect
              isClearable
              options={options}
              onChange={handleChangeRoute}
              placeholder="Create Your product"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: "#212529",
                  borderColor: "#495057",
                  color: "#fff !important",
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
              }}
            />
          </div>
          <div className="form-floating">
            {/* <input
              type="text"
              className="form-control"
              id="location_nameText"
              placeholder="placeholder"
            />
            <label htmlFor="location_nameText" className="form-label">
              Location Name
            </label> */}
            <CreatableSelect
              isClearable
              options={locations}
              onChange={handleChangeLocation}
              placeholder="Location"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: "#212529",
                  borderColor: "#495057",
                  color: "#fff !important",
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
              }}
            />
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="phone_noText"
              placeholder="placeholder"
            />
            <label htmlFor="phone_noText" className="form-label">
              Phone Number
            </label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="feedbackText"
              placeholder="placeholder"
            />
            <label htmlFor="feedbackText" className="form-label">
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
              options={coldrink}
              onChange={handleChangeIcecream}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: "#212529",
                  borderColor: "#495057",
                }),
                option: (styles) => ({
                  ...styles,
                  backgroundColor: "#212529",
                  color: "#dee2e6",
                  ":hover": { color: "#dee2e6", backgroundColor: "#343a40" },
                }),
              }}
            />
          </div>
          <div>
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
