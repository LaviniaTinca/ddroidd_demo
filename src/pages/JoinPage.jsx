import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';  
import SubmissionPage from '../components/Submission';

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

const JoinPage = () => {
  
    const [formData, setFormData] = useState(defaultFormData); 
    const [countriesAndStates, setCountriesAndStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [errors, setErrors] = useState({});
  
    const [formSubmitted, setFormSubmitted] = useState(false);

    const fetchCountriesAndStates = async () => {
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/states');
            const responseData = await response.json();
        
            const formattedData = responseData.data.map((countryData, index) => ({
                countryId: index, 
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
          city: '', 
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
                setCities(responseData.data);
              } 
            } catch (error) {
              console.error(error);
            }
          } else {
            setCities([]);
          }
      
          setStates(selectedCountryData.states);

        } else {
          setStates([]);
          setCities([]);
        }
    };
        
    const handleStateChange = async (event) => {
        const state = event.target.value;
        setFormData({
          ...formData,
          state,
          city: '', 
        });
      
        const selectedCountry = formData.country; 
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
            setCities(responseData.data);
          }
        } catch (error) {
          console.error(error);
        }
    };
        
    const handleSubmit = (event) => {
      event.preventDefault();
      const newErrors = {};
  
      // Validate required fields
      if (!formData.firstName) {
        newErrors.firstName = 'First Name is required';
      }

      if (!formData.lastName) {
        newErrors.lastName = 'Last Name is required';
      }

      if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Phone Number is required';
      } else if (!/^\+\d{11}$/.test(formData.phoneNumber) ) {
        newErrors.phoneNumber = 'Phone Number must have 11 digits, like: +40 211 111 111 ';
       }
  
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Email is not in a valid format';
      }
  
      if (!formData.address1) {
        newErrors.address1 = 'Address is required';
      }

      if (!formData.country) {
        newErrors.country = 'Country is required';
      }

      if (!formData.city) {
        newErrors.city = 'City is required';
      }
  
      setErrors(newErrors);
  
      // If there are errors, do not proceed with form submission
      if (Object.keys(newErrors).length > 0) {
        return;
      }
  
      // If there are no errors, proceed with form submission
        setFormSubmitted(true);
    };
  
    return (
      <div className='main-container'>
              {formSubmitted ? (
        <div>
          <SubmissionPage selectedData={formData}/>
        </div>
      ) : (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-title">
                <Typography variant="applicationVariant1" >
                    Application Form
                </Typography>
                </div>
           
                <section>
                <Typography variant="applicationVariant2" >
                    Contact Information
                </Typography>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName" className='asterisk'>
                        <Typography variant="labelVariant" >
                            First Name                    
                        </Typography>
                        </label>
                        <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`input-field ${errors.firstName ? 'error-input' : ''}`}
                        placeholder='First name'
                        // required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className='asterisk'>
                        <Typography variant="labelVariant" >
                            Last Name                    
                        </Typography>
                        </label>
                        <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`input-field ${errors.lastName ? 'error-input' : ''}`}
                        placeholder='Last name'
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phoneNumber" className='asterisk'>
                        <Typography variant="labelVariant" >
                            Phone Number                  
                        </Typography>
                        </label>
                        <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={`input-field ${errors.phoneNumber ? 'error-input' : ''}`}
                        placeholder='+40 211 111 111 (without space)'
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email" className='asterisk'>
                        <Typography variant="labelVariant" >
                            Email                    
                        </Typography>
                        </label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input-field ${errors.email ? 'error-input' : ''}`}
                        placeholder='john@doe.com'

                        // required
                        />
                    </div>
                    
                </div>
                </section>
                <section >
                <Typography variant="applicationVariant2" >
                    Address
                </Typography>    
                <div className="address-group">
                    <label htmlFor="address1" className='asterisk'>
                        <Typography variant="labelVariant" >
                            Address Line 1                    
                        </Typography>
                    </label>
                    <input
                    type="text"
                    id="address1"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    className={`input-field ${errors.address1 ? 'error-input' : ''}`}
                    placeholder='Street name & number'
                    //   required
                    />
                </div>
                <div className="address-group">
                <label htmlFor="address2">
                    <Typography variant="labelVariant" >
                        Address Line 2                    
                    </Typography>
                </label>
                    <input
                    type="text"
                    id="address2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    className='input-field'
                    placeholder='Suite, apartment'
                    />
                </div>
                            
                </section>
                <section>
                    <div className="form-row">
                        <div className="form-group triple">
                            <label htmlFor="country" className='asterisk'>
                            <Typography variant="labelVariant" >
                                Country                   
                            </Typography>
                            </label>
                            <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleCountryChange}
                            className={`input-field ${errors.country ? 'error-input' : ''}`}
                            >
                            <option value="">Select a country</option>
                            {countriesAndStates.map((countryData) => (
                                <option key={countryData.countryId} value={countryData.name}>
                                {countryData.name}
                                </option>
                            ))}
                            </select>
                        </div>
                        
                        <div className="form-group triple">
                            <label htmlFor="state">
                            <Typography variant="labelVariant" >
                                State                    
                            </Typography>
                            </label>
                            <select
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleStateChange} 
                            className={`input-field ${errors.state ? 'error-input' : ''}`}
                            >
                            <option value="">Select a state</option>
                            {states.map((state) => (
                                <option key={state} value={state}>
                                {state}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="form-group triple">
                            <label htmlFor="city" className='asterisk'>
                            <Typography variant="labelVariant" >
                                City                   
                            </Typography>
                            </label>
                            <select
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleCityChange} 
                            className={`input-field ${errors.city ? 'error-input' : ''}`}
                            >
                            <option value="">Select a city</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                {city}
                                </option>
                            ))}
                            </select>
                        </div>
                    
                    </div>
                </section>
                <section className='flex'>
                    <div className="error-box">
                    {Object.keys(errors).length > 0 && (
                        <>
                        <Typography variant="errorVariant" >
                            Please fix the following errors to proceed:                   
                        </Typography>
                        <ul>
                        {Object.values(errors).map((error, index) => (
                            <li key={index}>
                                <Typography variant="errorVariant" >
                                {error}
                                </Typography>
                            </li>
                        ))}
                        </ul>
                        </>
                        
                    )}
                    </div>
            
                    <button type="submit"
                    //  disabled={!formData.country || !formData.city}
                    >
                    Join Us
                    </button>
                </section>

            </form>
        </div>
      )}

       </div>
    );
}

export default JoinPage