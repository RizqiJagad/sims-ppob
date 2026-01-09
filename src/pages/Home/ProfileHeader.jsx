import React from 'react';
import profilePlaceholder from '../../assets/Profile-Photo.png';
import './ProfileHeader.css';

const ProfileHeader = ({ profile }) => {
    const handleImageError = (e) => {
        e.target.src = profilePlaceholder;
    };

    const displayImage = profile?.profile_image && !profile.profile_image.includes('default')
        ? profile.profile_image
        : profilePlaceholder;

    return (
        <div className="profile-header">
            <img
                src={displayImage}
                alt="Profile"
                className="profile-img"
                onError={handleImageError}
            />
            <div className="profile-info">
                <p>Selamat datang,</p>
                <h2>{profile ? `${profile.first_name} ${profile.last_name}` : '...'}</h2>
            </div>
        </div>
    );
};

export default ProfileHeader;
