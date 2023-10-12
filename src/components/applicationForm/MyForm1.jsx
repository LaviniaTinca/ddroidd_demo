import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './myForm.css'

const defaultFormData = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  address1: '',
  address2: '',
  country: '',
  state: '',
  city: '',
};

  //now with all the fields & validation

  const MyForm = () => {
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState(defaultFormData); // Initialize state with defaultFormData
    const [data, setData] = useState([]);
    const [cities, setCities] = useState([]);
    const [errors, setErrors] = useState({});
  
    const fetchData = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries');
        const responseData = await response.json();
        setData(responseData.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleCountryChange = (event) => {
      const country = event.target.value;
      setFormData({
        ...formData,
        country,
        city: '', // Reset city when country changes
      });
  
      const selectedCountryData = data.find((countryData) => countryData.country === country);
      if (selectedCountryData) {
        setCities(selectedCountryData.cities);
      } else {
        setCities([]);
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const newErrors = {};
  
      // Validate required fields
      if (!formData.firstName) {
        newErrors.firstName = 'First Name is required';
      }
  
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Email is not in a valid format';
      }
  
      if (!formData.address1) {
        newErrors.address1 = 'Address is required';
      }
  
      // Update the errors state with the new errors
      setErrors(newErrors);
  
      // If there are errors, do not proceed with form submission
      if (Object.keys(newErrors).length > 0) {
        return;
      }
  
      // If there are no errors, proceed with form submission
      navigate('/success', { state: { selectedData: formData } });
    };
  
    return (
      <div className='rectangle3'>

      <form onSubmit={handleSubmit}>
        <h2>Application Form1</h2>
        <section>
          <h3>Contact Information</h3>
          <div className="form-row">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error-input' : ''}
              // required
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error-input' : ''}
            />
          </div>
          <div className="form-row">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error-input' : ''}
              // required
            />
          </div>
        </section>
        <section>
          <h3>Address</h3>
          <div className="form-row">
            <label htmlFor="address1">Address 1</label>
            <input
              type="text"
              id="address1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              className={errors.address1 ? 'error-input' : ''}
              // required
            />
          </div>
          <div className="form-row">
            <label htmlFor="address2">Address 2</label>
            <input
              type="text"
              id="address2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
            />
          </div>
        </section>
        <section>
          <h3>Location</h3>
          <div className="form-row">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
              className={errors.country ? 'error-input' : ''}
            >
              <option value="">Select a country</option>
              {data.map((countryData) => (
                <option key={countryData.country} value={countryData.country}>
                  {countryData.country}
                </option>
              ))}
            </select>
            <label htmlFor="state">State</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={errors.state ? 'error-input' : ''}
            >
              <option value="">Select a state</option>
            </select>
            <label htmlFor="city">City</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? 'error-input' : ''}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </section>
        <div className="error-box">
          {Object.keys(errors).length > 0 && (
            <ul>
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
  
        <button type="submit"
        //  disabled={!formData.country || !formData.city}
         >
          Submit
        </button>
      </form>
      </div>
    );
  };
  
  export default MyForm;
  