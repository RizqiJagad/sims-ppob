import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { login, clearMessages } from '../../store/slices/authSlice';
import './Login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/');
            }
        });
    };

    return (
        <div className="login-container fade-in">
            <div className="login-form-section">
                <div className="login-header">
                    <div className="login-logo">
                        <img src="/src/assets/Logo.png" alt="Logo" />
                        <span>SIMS PPOB</span>
                    </div>
                    <h2>Masuk atau buat akun untuk memulai</h2>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            placeholder="masukkan email anda"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Lock className="input-icon" size={20} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="masukkan password anda"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                <p className="auth-footer">
                    belum punya akun? registrasi <Link to="/register">di sini</Link>
                </p>
            </div>

            <div className="login-image-section">
                <img src="/src/assets/Illustrasi-Login.png" alt="Illustration" />
            </div>
        </div>
    );
};

export default LoginPage;
