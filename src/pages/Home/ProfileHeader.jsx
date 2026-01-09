import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ profile }) => {
    const profileImage = profile?.profile_image && !profile.profile_image.includes('default')
        ? profile.profile_image
        : '/src/assets/Profile-Photo.png';

    return (
        <div className="profile-header">
            <img src={profileImage || '/src/assets/Profile-Photo.png'} alt="Profile" className="profile-img" />
            <div className="profile-info">
                <p>Selamat datang,</p>
                <h2>{profile ? `${profile.first_name} ${profile.last_name}` : '...'}</h2>
            </div>
        </div>
    );
};

export default ProfileHeader;
