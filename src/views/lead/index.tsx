import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import ValueType from "react-select";
import { leadCreate } from "../../api/lead";

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
  const [options, setOptions] = useState<Option[]>([]);
  const [locations, setLoactions] = useState<Location[]>([]);
  const [products, setProducts] = useState<Coldrinks[]>([]);
  const [mobile, setMobile] = useState<any>("");
  const [feedback, setFeedback] = useState<string>("");

  const opt = options.map((itm) => itm.value);
  const loc = locations.map((lc) => lc.value);
  const prod = products.map((prod) => prod.value);

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

  const handleChangeLocation = (
    newValue: ValueType<Location, false>,
    actionMeta: { action: string }
  ) => {
    if (actionMeta.action === "create-option" && newValue) {
      const newLocation: Location = {
        value: newValue.value,
        label: newValue.label || "",
      };
      setLoactions([...locations, newLocation]);
    }
  };

  const handleChangeIcecream = (
    newValue: ValueType<Coldrinks, false>,
    actionMeta: { action: string }
  ) => {
    if (actionMeta.action === "create-option" && newValue) {
      const newColdrink: Coldrinks = {
        value: newValue.value,
        label: newValue.label || "",
      };
      setProducts([...products, newColdrink]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    return await leadCreate({
      route_name: opt.toString(),
      _location: loc.toString(),
      phone_no: mobile,
      remarks: feedback,
      products: prod,
    });
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
                control: (baseStyles, state) => ({
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
                input: (provided, state) => ({
                  ...provided,
                  color: "#fff",
                }),
              }}
            />
          </div>
          <div className="form-floating">
            <CreatableSelect
              isClearable
              // options={locations}
              onChange={handleChangeLocation}
              placeholder="Location"
              styles={{
                control: (baseStyles, state) => ({
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
                input: (provided, state) => ({
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
              // isMulti
              isClearable
              options={products}
              onChange={handleChangeIcecream}
              styles={{
                control: (baseStyles, state) => ({
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
                input: (provided, state) => ({
                  ...provided,
                  color: "#fff",
                }),
                multiValue: (base, state) => {
                  return {
                    ...base,
                    color: "#fff",
                  };
                },
                multiValueLabel: (base, state) => ({
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
