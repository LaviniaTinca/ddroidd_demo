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

const MyForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(defaultFormData);
    const [data, setData] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [errors, setErrors] = useState({});
  
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries');
        const responseData = await response.json();
        setData(responseData.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    const fetchStates = async (country) => {
      try {
        // const response = await fetch(`https://your-state-api.com/countries/${country}`);
        const response = await fetch(`https://countriesnow.space/api/v0.1/countries/states`);
        const responseData = await response.json();
        if (country === responseData.data.name){
            setStates(responseData.data.states);

        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const fetchCities = async (country, state) => {
      try {
        const response = await fetch(`https://your-city-api.com/countries/${country}/states/${state}`);
        const responseData = await response.json();
        setCities(responseData.data.cities);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchCountries();
    }, []);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  
      // When the country changes, reset the states and cities
      if (name === 'country') {
        setStates([]);
        setCities([]);
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const newErrors = {};
  
      // Add validation for other form fields
  
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
      <form onSubmit={handleSubmit}>
        <h2>Application Form 2</h2>
        <section>
          <h3>Location</h3>
          <div className="form-row">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
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
            >
              <option value="">Select a state</option>
              {states.map((stateData) => (
                <option key={stateData.state} value={stateData.state}>
                  {stateData.state}
                </option>
              ))}
            </select>
            <label htmlFor="city">City</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
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
  
        <button type="submit" disabled={!formData.country || !formData.city}>
          Submit
        </button>
      </form>
    );
  };
  
  export default MyForm;
  