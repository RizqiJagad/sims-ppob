import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileHeader from '../Home/ProfileHeader';
import BalanceWidget from '../Home/BalanceWidget';
import { getHistory } from '../../store/slices/transactionSlice';
import './History.css';

const HistoryPage = () => {
    const dispatch = useDispatch();
    const { history } = useSelector((state) => state.transaction);
    const { data: profile } = useSelector((state) => state.profile);
    const { balance } = useSelector((state) => state.balance);

    const [offset, setOffset] = useState(0);
    const limit = 5;

    useEffect(() => {
        dispatch(getHistory({ limit, offset: 0 }));
    }, [dispatch]);

    const handleShowMore = () => {
        const nextOffset = offset + limit;
        setOffset(nextOffset);
        dispatch(getHistory({ limit, offset: nextOffset }));
    };

    const formatDate = (dateStr) => {
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        };
        return new Date(dateStr).toLocaleDateString('id-ID', options);
    };

    return (
        <div className="home-container">
            <div className="home-top-section">
                <ProfileHeader profile={profile} />
                <BalanceWidget balance={balance} />
            </div>

            <div className="history-section">
                <h3>Semua Transaksi</h3>

                <div className="history-list">
                    {history.length > 0 ? (
                        history.map((record, index) => (
                            <div key={index} className="history-card">
                                <div className="history-main">
                                    <h4 className={record.transaction_type === 'TOPUP' ? 'amt-success' : 'amt-error'}>
                                        {record.transaction_type === 'TOPUP' ? '+' : '-'} Rp {record.total_amount.toLocaleString('id-ID')}
                                    </h4>
                                    <p className="history-desc">{record.description}</p>
                                </div>
                                <p className="history-date">{formatDate(record.created_on)}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-history">Belum ada riwayat transaksi</p>
                    )}
                </div>

                {history.length >= limit && (
                    <button className="show-more" onClick={handleShowMore}>
                        Show More
                    </button>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;
