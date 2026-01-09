import React from 'react';
import profilePlaceholder from '../../assets/Profile-Photo.png';
import './ProfileHeader.css';

const ProfileHeader = ({ profile }) => {
    const [imgSrc, setImgSrc] = React.useState(profilePlaceholder);

    React.useEffect(() => {
        if (profile?.profile_image && !profile.profile_image.includes('default')) {
            setImgSrc(profile.profile_image);
        } else {
            setImgSrc(profilePlaceholder);
        }
    }, [profile]);

    const handleImageError = () => {
        setImgSrc(profilePlaceholder);
    };

    return (
        <div className="profile-header">
            <img
                src={imgSrc}
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
