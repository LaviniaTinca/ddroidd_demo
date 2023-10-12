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
    const [countriesAndStates, setCountriesAndStates] = useState([]);
    const [countriesAndCities, setCountriesAndCities] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [errors, setErrors] = useState({});
  
    const [shouldFetchCountries, setShouldFetchCountries] = useState(true); // Initially, fetch countries
  
    const fetchCountriesAndStates = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/states');
        const responseData = await response.json();
        setCountriesAndStates(responseData.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    const fetchCountriesAndCities = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries');
        const responseData = await response.json();
        setCountriesAndCities(responseData.data);
      } catch (error) {
        console.error(error);
      }
    };
  
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
        states: [],
        city: '', // Reset city when country changes
      });
  
      // Check if the country has states
      const selectedCountryData = countriesAndStates.find((countryData) => countryData.name === country);
      if (selectedCountryData && selectedCountryData.states.length > 0) {
        setStates(selectedCountryData.states);
        setShouldFetchCountries(false); // No need to fetch cities in this case
      } else {
        setStates([]); // Reset states
        setShouldFetchCountries(true); // We need to fetch cities directly
      }
    };
  
    useEffect(() => {
        fetchCountriesAndStates();
      if (shouldFetchCountries) {
        fetchCountriesAndCities();
      }
    }, [shouldFetchCountries]);
  
    // You can also implement handlers for state and city changes here
  
    // Your form submit and error handling can remain the same as before
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
    <div className='rectangle3'>
        <form onSubmit={handleSubmit}>
            <h2>Application Form 3</h2>
            <section>
            <h3>Location</h3>
            <div className="form-row">
                <label htmlFor="country">Country</label>
                <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleCountryChange}
                >
                <option value="">Select a country</option>
                {countriesAndCities.map((countryData) => (
                    <option key={countryData.name} value={countryData.name}>
                    {countryData.name}
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
                    <option key={stateData.name} value={stateData.name}>
                    {stateData.name}
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
    
            <button type="submit" 
            // disabled={!formData.country || !formData.city}
            >
            Submit
            </button>
        </form>
    </div>
    );
  };
  
  export default MyForm;
  