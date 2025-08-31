import React, { useState } from 'react';
import axios from 'axios';
import './PlantAssessment.css';

const PlantAssessment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: { lon: '', lat: '' },
    current_grey_plant_setup: '',
    land_and_infrastructure: '',
    renewable_energy_source: '',
    water_availability: '',
    storage_and_transport: '',
    end_use_market: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'lon' || name === 'lat') {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Replace with your actual API endpoint
      await axios.post('http://localhost:8000/api/v1/user/saveoldplantdata', formData);
      
      // Simulate API call for demonstration
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      location: { lon: '', lat: '' },
      current_grey_plant_setup: '',
      land_and_infrastructure: '',
      renewable_energy_source: '',
      water_availability: '',
      storage_and_transport: '',
      end_use_market: ''
    });
    setSubmitted(false);
  };

  // Render different sections based on current step
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="form-section">
            <h2>Location Information</h2>
            <div className="input-group">
              <label>Longitude</label>
              <input
                type="text"
                name="lon"
                value={formData.location.lon}
                onChange={handleChange}
                placeholder="Enter longitude"
                required
              />
            </div>
            <div className="input-group">
              <label>Latitude</label>
              <input
                type="text"
                name="lat"
                value={formData.location.lat}
                onChange={handleChange}
                placeholder="Enter latitude"
                required
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={nextStep} className="btn-next">
                Next <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-section">
            <h2>Current Plant Setup</h2>
            <div className="input-group">
              <label>Current Grey Plant Setup</label>
              <textarea
                name="current_grey_plant_setup"
                value={formData.current_grey_plant_setup}
                onChange={handleChange}
                placeholder="Describe your current plant setup"
                rows="4"
                required
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={prevStep} className="btn-prev">
                <i className="fas fa-arrow-left"></i> Previous
              </button>
              <button type="button" onClick={nextStep} className="btn-next">
                Next <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-section">
            <h2>Infrastructure & Energy</h2>
            <div className="input-group">
              <label>Land and Infrastructure</label>
              <textarea
                name="land_and_infrastructure"
                value={formData.land_and_infrastructure}
                onChange={handleChange}
                placeholder="Describe available land and infrastructure"
                rows="3"
                required
              />
            </div>
            <div className="input-group">
              <label>Renewable Energy Sources</label>
              <textarea
                name="renewable_energy_source"
                value={formData.renewable_energy_source}
                onChange={handleChange}
                placeholder="Describe available renewable energy sources"
                rows="3"
                required
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={prevStep} className="btn-prev">
                <i className="fas fa-arrow-left"></i> Previous
              </button>
              <button type="button" onClick={nextStep} className="btn-next">
                Next <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-section">
            <h2>Resources & Market</h2>
            <div className="input-group">
              <label>Water Availability</label>
              <textarea
                name="water_availability"
                value={formData.water_availability}
                onChange={handleChange}
                placeholder="Describe water availability"
                rows="3"
                required
              />
            </div>
            <div className="input-group">
              <label>Storage and Transport</label>
              <textarea
                name="storage_and_transport"
                value={formData.storage_and_transport}
                onChange={handleChange}
                placeholder="Describe storage and transport capabilities"
                rows="3"
                required
              />
            </div>
            <div className="input-group">
              <label>End Use Market</label>
              <textarea
                name="end_use_market"
                value={formData.end_use_market}
                onChange={handleChange}
                placeholder="Describe your end use market"
                rows="3"
                required
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={prevStep} className="btn-prev">
                <i className="fas fa-arrow-left"></i> Previous
              </button>
              <button type="submit" className="btn-submit">
                Submit Assessment
              </button>
            </div>
          </div>
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  if (submitting) {
    return (
      <div className="assessment-container">
        <div className="processing-animation">
          <div className="loader"></div>
          <h2>Processing Your Information</h2>
          <p>Our system is analyzing your plant setup data...</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="assessment-container">
        <div className="success-animation">
          <div className="checkmark">✓</div>
          <h2>Assessment Submitted Successfully!</h2>
          <p>We've received your query and our system has started processing it. We'll email you once the analysis is complete.</p>
          <button onClick={resetForm} className="btn-home">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <h1>Green Plant Setup Assessment</h1>
        <p>Help us understand your current setup to provide the best transformation plan</p>
      </div>
      
      <div className="progress-bar">
        <div className="progress" style={{width: `${(step / 4) * 100}%`}}></div>
        <div className="step-indicator">Step {step} of 4</div>
      </div>
      
      <form onSubmit={handleSubmit} className="assessment-form">
        {renderStep()}
      </form>
    </div>
  );
};

export default PlantAssessment;