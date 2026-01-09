import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { registration } from '../../store/slices/authSlice';
import '../Login/Login.css';
import logoImage from '../../assets/Logo.png';
import illustrasiLogin from '../../assets/Illustrasi-Login.png';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            alert('Password tidak sama!');
            return;
        }

        const regData = { ...formData };
        delete regData.confirm_password;
        dispatch(registration(regData)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                alert(result.payload.message || 'Registrasi berhasil!');
                navigate('/login');
            }
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="login-container fade-in">
            <div className="login-form-section">
                <div className="login-header">
                    <div className="login-logo">
                        <img src={logoImage} alt="Logo" />
                        <span>SIMS PPOB</span>
                    </div>
                    <h2>Lengkapi data untuk membuat akun</h2>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                            name="email"
                            type="email"
                            placeholder="masukkan email anda"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <User className="input-icon" size={20} />
                        <input
                            name="first_name"
                            type="text"
                            placeholder="nama depan"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <User className="input-icon" size={20} />
                        <input
                            name="last_name"
                            type="text"
                            placeholder="nama belakang"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Lock className="input-icon" size={20} />
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="buat password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                        />
                        <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </div>
                    </div>

                    <div className="input-group">
                        <Lock className="input-icon" size={20} />
                        <input
                            name="confirm_password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="konfirmasi password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            required
                        />
                        <div className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Memproses...' : 'Registrasi'}
                    </button>
                </form>

                <p className="auth-footer">
                    sudah punya akun? login <Link to="/login">di sini</Link>
                </p>
            </div>

            <div className="login-image-section">
                <img src={illustrasiLogin} alt="Illustration" />
            </div>
        </div>
    );
};

export default RegisterPage;
