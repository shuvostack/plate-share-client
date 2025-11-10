import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext)
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user) {
        return children
    }

    return <Navigate state={location?.pathname} to="/login"></Navigate>
};

export default PrivateRoute;