import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceGrid.css';

const ServiceGrid = ({ services }) => {
    const navigate = useNavigate();

    const handleServiceClick = (service) => {
        navigate('/payment', { state: { service } });
    };

    return (
        <div className="service-grid">
            {services.map((service) => (
                <div
                    key={service.service_code}
                    className="service-item"
                    onClick={() => handleServiceClick(service)}
                >
                    <div className="service-icon-wrapper">
                        <img src={service.service_icon} alt={service.service_name} />
                    </div>
                    <p>{service.service_name}</p>
                </div>
            ))}
        </div>
    );
};

export default ServiceGrid;
