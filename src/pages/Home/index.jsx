import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileHeader from './ProfileHeader';
import BalanceWidget from './BalanceWidget';
import ServiceGrid from './ServiceGrid';
import BannerSlider from './BannerSlider';
import { getProfile } from '../../store/slices/profileSlice';
import { getBalance } from '../../store/slices/balanceSlice';
import { getServices } from '../../store/slices/serviceSlice';
import { getBanners } from '../../store/slices/bannerSlice';
import './Home.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const { data: profile } = useSelector((state) => state.profile);
    const { balance } = useSelector((state) => state.balance);
    const { list: services } = useSelector((state) => state.services);
    const { list: banners } = useSelector((state) => state.banners);

    useEffect(() => {
        dispatch(getProfile());
        dispatch(getBalance());
        dispatch(getServices());
        dispatch(getBanners());
    }, [dispatch]);

    return (
        <div className="home-container fade-in">
            <div className="home-top-section">
                <ProfileHeader profile={profile} />
                <BalanceWidget balance={balance} />
            </div>

            <ServiceGrid services={services} />

            <div className="banner-section">
                <h3>Temukan promo menarik</h3>
                <BannerSlider banners={banners} />
            </div>
        </div>
    );
};

export default HomePage;
