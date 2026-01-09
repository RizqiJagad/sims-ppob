import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, User, ShieldCheck, Pencil, LogOut } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { updateProfile, updateProfileImage, getProfile } from '../../store/slices/profileSlice';
import profilePlaceholder from '../../assets/Profile-Photo.png';
import './Profile.css';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { data: userProfile, status } = useSelector((state) => state.profile);

    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
    });

    const fileInputRef = useRef(null);

    /* eslint-disable */
    useEffect(() => {
        if (!userProfile) {
            dispatch(getProfile());
        } else {
            setFormData({
                email: userProfile.email,
                first_name: userProfile.first_name,
                last_name: userProfile.last_name || '',
            });
        }
    }, [userProfile, dispatch]);
    /* eslint-enable */

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditToggle = () => {
        if (isEditMode) {
            // Cancel edit
            if (userProfile) {
                setFormData({
                    email: userProfile.email,
                    first_name: userProfile.first_name,
                    last_name: userProfile.last_name || '',
                });
            }
        }
        setIsEditMode(!isEditMode);
    };

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(updateProfile({
            first_name: formData.first_name,
            last_name: formData.last_name
        })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                alert('Profil berhasil diperbaharui');
                setIsEditMode(false);
            }
        });
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 100 * 1024) {
                alert('Ukuran file maksimal 100kb');
                return;
            }

            const form = new FormData();
            form.append('file', file);
            dispatch(updateProfileImage(form)).then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    alert('Foto profil berhasil diubah');
                }
            });
        }
    };

    const handleImageError = (e) => {
        e.target.src = profilePlaceholder;
    };

    const displayImage = userProfile?.profile_image && !userProfile.profile_image.includes('default')
        ? userProfile.profile_image
        : profilePlaceholder;

    const handleLogout = () => {
        if (window.confirm('Apakah anda yakin ingin logout?')) {
            dispatch(logout());
        }
    };

    return (
        <div className="profile-container fade-in">
            <div className="profile-content">
                <div className="profile-image-section">
                    <div className="image-wrapper" onClick={handleImageClick}>
                        <img
                            src={displayImage}
                            alt="Profile"
                            onError={handleImageError}
                        />
                        <div className="edit-icon">
                            <Pencil size={14} />
                        </div>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/png, image/jpeg"
                        onChange={handleImageChange}
                    />
                    <h2>{userProfile?.first_name} {userProfile?.last_name}</h2>
                </div>

                <form className="profile-form" onSubmit={handleSave}>
                    <div className="form-group">
                        <label>Email</label>
                        <div className="input-with-icon">
                            <Mail size={18} className="icon" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Nama Depan</label>
                        <div className="input-with-icon">
                            <User size={18} className="icon" />
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                disabled={!isEditMode}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Nama Belakang</label>
                        <div className="input-with-icon">
                            <User size={18} className="icon" />
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                disabled={!isEditMode}
                                required
                            />
                        </div>
                    </div>

                    <div className="profile-actions">
                        {!isEditMode ? (
                            <>
                                <button type="button" className="btn-outline" onClick={handleEditToggle}>
                                    Edit Profile
                                </button>
                                <button type="button" className="btn-logout" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? 'Menyimpan...' : 'Simpan'}
                                </button>
                                <button type="button" className="btn-outline-cancel" onClick={handleEditToggle}>
                                    Batalkan
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
