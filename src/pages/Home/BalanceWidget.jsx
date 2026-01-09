import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './BalanceWidget.css';

const BalanceWidget = ({ balance }) => {
    const [showBalance, setShowBalance] = useState(false);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount).replace('Rp', 'Rp ');
    };

    return (
        <div className="balance-widget">
            <div className="balance-content">
                <p>Saldo anda</p>
                <h3>
                    {showBalance ? formatCurrency(balance) : 'Rp ••••••••'}
                </h3>
                <button
                    className="toggle-balance"
                    onClick={() => setShowBalance(!showBalance)}
                >
                    {showBalance ? (
                        <>Lihat Saldo <EyeOff size={16} /></>
                    ) : (
                        <>Lihat Saldo <Eye size={16} /></>
                    )}
                </button>
            </div>
        </div>
    );
};

export default BalanceWidget;
