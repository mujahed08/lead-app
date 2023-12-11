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
  const [retailer, setRetailer] = useState<string>("");

  const [options, setOptions] = useState<Option[]>(routeNames);
  const [locations, setLoactions] = useState<Location[]>(locationNames);
  const [products, setProducts] = useState<Coldrinks[]>(productNames);
  const [mobile, setMobile] = useState<any>("");
  const [feedback, setFeedback] = useState<string>("");
  const [routeName, setRouteName] = useState<string>("");
  const [locationName, setLocationName] = useState<string>("");
  const [productList, setProductList] = useState<Coldrinks[]>([]);
  const [error, setError] = useState<any>({});

  const handleChangeRetailer = (
    newValue: any,
    actionMeta: { action: string }
  ) => {
    if (actionMeta.action === "create-option" && newValue) {
      const newOption: Option = {
        value: newValue.value,
        label: newValue.label || "",
      };
      setOptions([...options, newOption]);
    } else if (actionMeta.action === "clear") {
      setRetailer("");
      return;
    }
    setRetailer(newValue.value);
  };

  const handleChangeLocation = (
    newValue: any,
    actionMeta: { action: string }
  ) => {
    if (actionMeta.action === "create-option" && newValue) {
      const newLocation: Location = {
        value: newValue.value,
        label: newValue.label || "",
      };
      setLoactions([...locations, newLocation]);
    } else if (actionMeta.action === "clear") {
      setLocationName("");
      return;
    }
    setLocationName(newValue.value);
  };

  const handleChangeIcecream = (
    newValue: any,
    actionMeta: { action: string }
  ) => {
    if (actionMeta.action === "create-option" && newValue) {
      const newColdrink: Coldrinks = {
        value: newValue.value,
        label: newValue.label || "",
      };
      setProducts([...products, newColdrink]);
    } else if (actionMeta.action === "clear") {
      setProductList([]);
      return;
    }
    let list = newValue.map((prod: any) => prod.value);
    setProductList(list);
  };

  const validateFeilds = () => {
    const textErrors: any = {};
    if (!routeName) {
      textErrors.routeName = "*Route is Required !";
    }
    if (!retailer) {
      textErrors.retailer = "*Retailer is Required !";
    }
    if (!locationName) {
      textErrors.locationName = "*Location  is Required !";
    }
    if (!mobile) {
      textErrors.mobile = "*Mobile Number is Required !";
    }
    if (!feedback) {
      textErrors.feedback = "*Remark is Required !";
    }
    if (productList.length === 0) {
      textErrors.productList = "*Products is Required !";
    }
    setError(textErrors);
    return Object.keys(textErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateFeilds()) {
      await leadCreate({
        route_name: routeName,
        retailer: retailer,
        _location: locationName,
        phone_no: mobile,
        remarks: feedback,
        products: productList,
      });
      navigate("/leads");
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
          <div className="">
            {/* className= formfloting */}
            <label htmlFor="floatingSelect">
              <span className="bi bi-shop text-primary"></span>
              <span className="ms-2 text-primary">Route Name</span>{" "}
            </label>
            <select
              onChange={(e) => setRouteName(e.target.value)}
              className="form-select p-3"
              id="floatingSelect"
              aria-label="Floating label select example"
            >
              <option value="">Select ...</option>
              <option value="DARGA RD">DARGA RD</option>
              <option value="VIDYA NGR /MADINA PATTY">
                VIDYA NGR /MADINA PATTY
              </option>
              <option value="WANGI RD/BASMAT RD">WANGI RD/BASMAT RD</option>
            </select>
          </div>
          {error.routeName && <p className="text-danger m-0 fs-6">{error.routeName}</p>}
          <div>
            <label htmlFor="retail" className="form-label mb-0">
              <span className="bi bi-buildings text-primary"></span>
              <span className="ms-2 text-primary">Retailer</span>{" "}
            </label>
            <CreatableSelect
              isClearable
              options={options}
              onChange={handleChangeRetailer}
              placeholder="Select ..."
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
          {error.retailer && <p className="text-danger m-0 fs-6">{error.retailer}</p>}
          <div>
            <label htmlFor="location" className="form-label mb-0">
              <span className="bi bi-geo-alt-fill text-primary "></span>
              <span className="ms-2 text-primary">Location</span>{" "}
            </label>
            <CreatableSelect
              isClearable
              options={locations}
              onChange={handleChangeLocation}
              placeholder="Select ..."
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "#212529",
                  borderColor: "#495057",
                  color: "#fff !important",
                  padding: "10px",
                  marginBottom: "5px",
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
          {error.locationName && <p className="text-danger m-0 fs-6">{error.locationName}</p>}
          <div className=" mb-2">
            {" "}
            {/*classNAme: form-floating */}
            <label htmlFor="phone_noText" className="form-label mb-0">
              <span className="bi bi-telephone-fill text-primary"></span>
              <span className="ms-1 text-primary"> Phone Number</span>
            </label>
            <input
              type="text"
              className="form-control p-3 text-light"
              id="phone_noText"
              placeholder="Phone Number"
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          {error.mobile && <p className="text-danger m-0 fs-6">{error.mobile}</p>}
          <div className="">
            {/*classNAme: form-floating */}
            <label htmlFor="feedbackText" className="form-label mb-0 ">
              <span className="bi bi-card-checklist text-primary"></span>
              <span className="ms-2 text-primary"> Feedback/Reason</span>
            </label>
            <input
              type="text"
              className="form-control p-3 text-light"
              id="feedbackText"
              placeholder="Feedback/Reason"
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          {error.feedback && <p className="text-danger m-0 fs-6">{error.feedback}</p>}
          <div>
            <label htmlFor="ice" className="form-label mb-0">
              <span className="bi bi-cart-check-fill text-primary"></span>
              <span className="ms-2 text-primary">Cold Drinks/Ice cream</span>
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
                  borderColor: "#495057",
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
                    color: "#dc3545",
                  };
                },
                multiValueLabel: (base) => ({
                  ...base,
                  color: "#0f5132",
                }),
                singleValue: (styles) => ({
                  ...styles,
                  color: "#fff",
                }),
              }}
            />
          </div>
          {error.productList && <p className="text-danger m-0 fs-6">{error.productList}</p>}
          <div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="col-xs-12" style={{ height: "13rem" }}></div>
    </div>
  );
};
