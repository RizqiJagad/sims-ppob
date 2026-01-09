import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Banknote } from 'lucide-react';
import ProfileHeader from '../Home/ProfileHeader';
import BalanceWidget from '../Home/BalanceWidget';
import { topUp, resetTransactionState } from '../../store/slices/transactionSlice';
import { getBalance } from '../../store/slices/balanceSlice';
import './TopUp.css';

const TopUpPage = () => {
    const [amount, setAmount] = useState('');
    const presets = [10000, 20000, 50000, 100000, 250000, 500000];

    const dispatch = useDispatch();
    const { data: profile } = useSelector((state) => state.profile);
    const { balance } = useSelector((state) => state.balance);
    const { status, error, message } = useSelector((state) => state.transaction);

    const isInvalid = amount < 10000 || amount > 1000000;

    const handleTopUp = (e) => {
        e.preventDefault();
        if (isInvalid) return;

        dispatch(topUp(Number(amount))).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                alert('Top Up Berhasil!');
                dispatch(getBalance());
                setAmount('');
            }
        });
    };

    useEffect(() => {
        return () => dispatch(resetTransactionState());
    }, [dispatch]);

    return (
        <div className="home-container">
            <div className="home-top-section">
                <ProfileHeader profile={profile} />
                <BalanceWidget balance={balance} />
            </div>

            <div className="topup-section">
                <p>Silahkan masukkan</p>
                <h3>Nominal Top Up</h3>

                <div className="topup-content">
                    <form className="topup-form" onSubmit={handleTopUp}>
                        <div className="input-with-icon">
                            <Banknote size={20} className="icon" />
                            <input
                                type="number"
                                placeholder="masukkan nominal Top Up"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isInvalid || status === 'loading'}
                        >
                            Top Up
                        </button>
                    </form>

                    <div className="preset-grid">
                        {presets.map((val) => (
                            <button
                                key={val}
                                className="preset-item"
                                onClick={() => setAmount(val)}
                            >
                                Rp {val.toLocaleString('id-ID')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopUpPage;
