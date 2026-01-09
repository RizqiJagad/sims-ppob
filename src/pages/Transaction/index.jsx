import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Banknote } from 'lucide-react';
import ProfileHeader from '../Home/ProfileHeader';
import BalanceWidget from '../Home/BalanceWidget';
import { postTransaction, resetTransactionState } from '../../store/slices/transactionSlice';
import { getBalance } from '../../store/slices/balanceSlice';
import './Transaction.css';

const TransactionPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const service = location.state?.service;

    const { data: profile } = useSelector((state) => state.profile);
    const { balance } = useSelector((state) => state.balance);
    const { status, error, message } = useSelector((state) => state.transaction);

    useEffect(() => {
        if (!service) {
            navigate('/');
        }
        return () => dispatch(resetTransactionState());
    }, [service, navigate, dispatch]);

    const handlePayment = () => {
        if (!service) return;

        if (window.confirm(`Beli ${service.service_name} senilai Rp ${service.service_tariff.toLocaleString('id-ID')}?`)) {
            dispatch(postTransaction(service.service_code)).then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    alert('Pembayaran Berhasil!');
                    dispatch(getBalance());
                    navigate('/');
                }
            });
        }
    };

    if (!service) return null;

    return (
        <div className="home-container">
            <div className="home-top-section">
                <ProfileHeader profile={profile} />
                <BalanceWidget balance={balance} />
            </div>

            <div className="transaction-section">
                <p>Pembayaran</p>
                <div className="service-info">
                    <img src={service.service_icon} alt={service.service_name} />
                    <h3>{service.service_name}</h3>
                </div>

                <div className="payment-form">
                    <div className="input-with-icon">
                        <Banknote size={20} className="icon" />
                        <input
                            type="text"
                            value={service.service_tariff.toLocaleString('id-ID')}
                            readOnly
                        />
                    </div>
                    <button
                        className="btn-primary"
                        onClick={handlePayment}
                        disabled={status === 'loading'}
                    >
                        {status === 'loading' ? 'Memproses...' : 'Bayar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionPage;
