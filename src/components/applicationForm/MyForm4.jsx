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
  
    const [formData, setFormData] = useState(defaultFormData); 
    const [countriesAndStates, setCountriesAndStates] = useState([]);
    //const [countriesAndStates, setCountriesAndStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [errors, setErrors] = useState({});
  
    const [shouldFetchCountries, setShouldFetchCountries] = useState(false)

    const fetchCountriesAndStates = async () => {
        try {
          const response = await fetch('https://countriesnow.space/api/v0.1/countries/states');
          const responseData = await response.json();
      
          // Extract country names and their states from the response data
          const formattedData = responseData.data.map((countryData) => ({
            name: countryData.name,
            states: countryData.states.map((stateData) => stateData.name),
          }));
      
          setCountriesAndStates(formattedData);
        } catch (error) {
          console.error(error);
        }
      };

 
    useEffect(() => {
      fetchCountriesAndStates();
    }, []);
 
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleCityChange = (event) => {
        const city = event.target.value;
        setFormData({
          ...formData,
          city,
        });
      };

      const handleCountryChange = async (event) => {
        const country = event.target.value;
        setFormData({
          ...formData,
          country,
          state: '', 
          city: '', // Reset city when country changes
        });
      
        // Find the selected country's data
        const selectedCountryData = countriesAndStates.find((countryData) => countryData.name === country);
      
        if (selectedCountryData) {
          if (selectedCountryData.states.length === 0) {
            // If there are no states, fetch cities from the alternative API
            try {
              const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  country: country,
                }),
              });
      
              const responseData = await response.json();
              if (!responseData.error) {
                // Extract and set the cities from the response data
                setCities(responseData.data);
              } else {
                // Handle any errors if needed
              }
            } catch (error) {
              console.error(error);
            }
          } else {
            // If there are states, clear cities
            setCities([]);
          }
      
          setStates(selectedCountryData.states);

        } else {
          // Handle the case where the selected country is not found
          setStates([]);
          setCities([]);
        }
      };
        
    const handleCountryChange00 = (event) => {
        const country = event.target.value;
        setFormData({
          ...formData,
          country,
          state: '', 
          city: '', // Reset state and city when country changes
        });

        const selectedCountryData = countriesAndStates.find((countryData) => countryData.name === country);
        console.log(country)
       console.log(selectedCountryData.states.length)
       console.log(selectedCountryData.states)
        if (selectedCountryData) {
            if (selectedCountryData.states.length === 0 ){

                //fetch citiesByCountry
                //await
                //setCities(...)
            }
        
            setStates(selectedCountryData.states);
        } else {
          setStates([]);
        }
      };

    
      const handleCountryChange0 = (event) => {
        const country = event.target.value;
        setFormData({
          ...formData,
          country,
          state: '', 
          city: '', // Reset city when country changes
        });
      
        // Find the selected country data
        const selectedCountryData = countriesAndStates.find((countryData) => countryData.name === country);
      
        if (selectedCountryData) {
          const stateNames = selectedCountryData.states.map((stateData) => stateData.name);
          setStates(stateNames); // Update the states array
        } else {
          // No states for the selected country
          setStates([]); // Clear the states array
        }
      };
      

      const handleStateChange = async (event) => {
        const state = event.target.value;
        setFormData({
          ...formData,
          state,
          city: '', // Reset city when state changes
        });
      
        // Retrieve cities based on the selected country and state
        const selectedCountry = formData.country; // Get the selected country from the form data
        try {
          const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              country: selectedCountry,
              state: state,
            }),
          });
      
          const responseData = await response.json();
          if (!responseData.error) {
            // Extract and set the cities from the response data
            setCities(responseData.data);
          } else {
            // Handle any errors if needed
          }
        } catch (error) {
          console.error(error);
        }
      };
        
    const handleSubmit = (event) => {
      event.preventDefault();
      const newErrors = {};
  
      // Validate required fields
    //   if (!formData.firstName) {
    //     newErrors.firstName = 'First Name is required';
    //   }
  
    //   if (!formData.email) {
    //     newErrors.email = 'Email is required';
    //   } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    //     newErrors.email = 'Email is not in a valid format';
    //   }
  
    //   if (!formData.address1) {
    //     newErrors.address1 = 'Address is required';
    //   }

      if (!formData.country) {
        newErrors.country = 'Country is required';
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
        <h2>Application Form 4</h2>
        {/* <section>
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
        </section> */}
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
              {countriesAndStates.map((countryData) => (
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
              onChange={handleStateChange} 
              className={errors.state ? 'error-input' : ''}
            >
              <option value="">Select a state</option>
              {/* {countriesAndStates.map((countryData) => (
                <option key={countryData.states} value={countryData.states}>
                  {countryData.states}
                </option>
              ))} */}
              {states.map((state) => ( /* Use the states array */
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
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
  