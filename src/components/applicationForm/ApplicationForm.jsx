// ApplicationForm.js
import React, { useState } from 'react';

const defaultFormData  = {
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

function ApplicationForm() {

  // const [formData, setFormData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   phoneNumber: '',
  //   email: '',
  //   address1: '',
  //   address2: '',
  //   country: '',
  //   state: '',
  //   city: '',
  // });

  const [formData, setFormData] = useState(defaultFormData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to an API
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
    <h2>Application Form</h2>
    <section>
      <h3>Contact Information</h3>
      <div className="form-row">
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </section>
    <section>
      <h3>Address</h3>
      <div className="form-row">
        <div>
          <label htmlFor="address1">Address 1</label>
          <input
            type="text"
            id="address1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="address2">Address 2</label>
          <input
            type="text"
            id="address2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            // required
          >
            <option value="">Select Country</option>
            {/* Add options dynamically from the API */}
          </select>
        </div>
        <div>
          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            // required
          >
            <option value="">Select State</option>
            {/* Add options dynamically from the API */}
          </select>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            // required
          >
            <option value="">Select City</option>
            {/* Add options dynamically from the API */}
          </select>
        </div>
      </div>
    </section>
    <button type="submit">Submit</button>
  </form>
  
  
  );
}

export default ApplicationForm;
