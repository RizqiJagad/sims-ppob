import React from 'react';
import './BannerSlider.css';

const BannerSlider = ({ banners }) => {
    return (
        <div className="banner-slider">
            <div className="banner-track">
                {banners.map((banner, index) => (
                    <div key={index} className="banner-item">
                        <img src={banner.banner_image} alt={banner.banner_name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerSlider;
