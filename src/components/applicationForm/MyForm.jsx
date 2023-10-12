import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './myForm.css'


 //this one is good it works
const MyForm = ()=>{
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);

    const selectedCountryData = data.find((countryData) => countryData.country === country);
    if (selectedCountryData) {
      setCities(selectedCountryData.cities);
      setSelectedCity('');
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
  
    // Validate required fields
    if (!name) {
      newErrors.name = 'Name is required';
    }
  
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Email is not in a valid format';
    }
  
    if (!address) {
      newErrors.address = 'Address is required';
    }
  
    // Update the errors state with the new errors
    setErrors(newErrors);
  
    // If there are errors, do not proceed with form submission
    if (Object.keys(newErrors).length > 0) {
      return;
    }
  
    // If there are no errors, proceed with form submission
    const selectedData = {
      name,
      email,
      address,
      country: selectedCountry,
      city: selectedCity,
    };
  
    navigate('/success', { state: { selectedData } });
  };
  

//   return (
//     <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input type="text" value={name} onChange={handleNameChange} required />
//           {/* {errors.name && <span className="error">{errors.name}</span>} */}
//         </label>
//         <br />
//         <label>
//           Email:
//           <input type="email" value={email} onChange={handleEmailChange} required />
//           {/* {errors.email && <span className="error">{errors.email}</span>} */}
//         </label>
//         <br />
//         <label>
//           Address:
//           <input type="text" value={address} onChange={handleAddressChange} required />
//           {/* {errors.address && <span className="error">{errors.address}</span>} */}
//         </label>
//         <br />

//       <label>
//         Country:
//         <select value={selectedCountry} onChange={handleCountryChange}>
//           <option value="">Select a country</option>
//           {data.map((countryData) => (
//             <option key={countryData.country} value={countryData.country}>
//               {countryData.country}
//             </option>
//           ))}
//         </select>
//       </label>
//       <br />
//       {selectedCountry && (
//         <label>
//           City:
//           <select value={selectedCity} onChange={handleCityChange}>
//             <option value="">Select a city</option>
//             {cities.map((city) => (
//               <option key={city} value={city}>
//                 {city}
//               </option>
//             ))}
//           </select>
//         </label>
//       )}
//       <br />
//       <div className="error-box">
//   {Object.keys(errors).length > 0 && (
//     <ul>
//       {Object.values(errors).map((error, index) => (
//         <li key={index}>{error}</li>
//       ))}
//     </ul>
//   )}
// </div>
//       <button type="submit" disabled={!selectedCountry || !selectedCity}>
//         Submit
//       </button>
//     </form>
//   );
// }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Application Form</h2>
      <section>
        <h3>Contact Information</h3>
        <div className="form-row">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={name}
            onChange={handleNameChange}
            className={errors.name ? 'error-input' : ''}

            // required
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={name}
            onChange={handleNameChange}
            className={errors.name ? 'error-input' : ''}

            // required
          />
        </div>
        <div className="form-row">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            // onChange={handlePhoneNumberChange}
            className={errors.phoneNumber ? 'error-input' : ''}

            // required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
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
            value={address}
            onChange={handleAddressChange}
            className={errors.address ? 'error-input' : ''}

            // required
          />
        </div>
        <div className="form-row">
          <label htmlFor="address2">Address 2</label>
          <input
            type="text"
            id="address2"
            name="address2"
            value={address}
            onChange={handleAddressChange}
            // required
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
            value={selectedCountry}
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
            value={selectedCountry}
            onChange={handleCountryChange}
            className={errors.state ? 'error-input' : ''}

          >
            <option value="">Select a state</option>
            {data.map((countryData) => (
              <option key={countryData.country} value={countryData.country}>
                {countryData.country}
              </option>
            ))}
          </select>
          <label htmlFor="city">City</label>
          <select
            id="city"
            name="city"
            value={selectedCity}
            onChange={handleCityChange}
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

      <button type="submit" disabled={!selectedCountry || !selectedCity}>
        Submit
      </button>
    </form>
  );
}


export default MyForm;

// const defaultFormData = {
//   firstName: '',
//   lastName: '',
//   phoneNumber: '',
//   email: '',
//   address1: '',
//   address2: '',
//   country: '',
//   state: '',
//   city: '',
// };
// const MyForm = ()=>{
// // function MyForm() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState(defaultFormData);

//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [data, setData] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [errors, setErrors] = useState({})

  

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://countriesnow.space/api/v0.1/countries');
//       const responseData = await response.json()
//       setData(responseData.data)
//     } catch (error) {
//       console.error(error)
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleCountryChange = (event) => {
//     const country = event.target.value
//     // setSelectedCountry(country);
//     setFormData({...formData, country})

//     const selectedCountryData = data.find((countryData) => countryData.country === country);
//     if (selectedCountryData) {
//       setCities(selectedCountryData.cities);
//     //   setSelectedCity('');
//         setFormData({...formData, city: ''})
//     } else {
//       setCities([]);
//       setFormData({ ...formData, city: '' });
//     }
//   };

//   const handleCityChange = (event) => {
//     // setSelectedCity(event.target.value);
//     const city = event.target.value;
//     setFormData({...formData, city})
//   };

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     const selectedData = {
// //       country: selectedCountry,
// //       city: selectedCity,
// //     };
// //     navigate('/success', { state: { selectedData } });
// //   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const newErrors = {};
  
//     // Validate required fields
//     if (!formData.firstName) {
//       newErrors.firstName = 'First name is required';
//     }
//     if (!formData.lastName) {
//         newErrors.lastName = 'Last name is required';
//       }
  
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = 'Email is not in a valid format';
//     }
  
//     if (!formData.address1) {
//       newErrors.address = 'Address is required';
//     }
  
//     // Update the errors state with the new errors
//     setErrors(newErrors);
  
//     // If there are errors, do not proceed with form submission
//     if (Object.keys(newErrors).length > 0) {
//       return;
//     }
  
//     // If there are no errors, proceed with form submission
//     // const selectedData = {
//     //   name,
//     //   email,
//     //   address,
//     //   country: selectedCountry,
//     //   city: selectedCity,
//     // };
  
//     navigate('/success', { state: { selectedData: formData } });
//   };
  

//   return (
//     <form onSubmit={handleSubmit}>

//       <label>
//         Country:
//         <select value={selectedCountry} onChange={handleCountryChange}>
//           <option value="">Select a country</option>
//           {data.map((countryData) => (
//             <option key={countryData.country} value={countryData.country}>
//               {countryData.country}
//             </option>
//           ))}
//         </select>
//       </label>
//       <br />
//       {selectedCountry && (
//         <label>
//           City:
//           <select value={selectedCity} onChange={handleCityChange}>
//             <option value="">Select a city</option>
//             {cities.map((city) => (
//               <option key={city} value={city}>
//                 {city}
//               </option>
//             ))}
//           </select>
//         </label>
//       )}
//       <br />
//       <button type="submit" disabled={!selectedCountry || !selectedCity}>
//         Submit
//       </button>
//     </form>
//   );
// }

// export default MyForm