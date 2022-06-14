import React from 'react';
import PropTypes from 'prop-types';
import ListPage from './pages/ListPage';
import { Route, Routes } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import FollowPage from './pages/FollowPage';

MovieFeature.propTypes = {
    
};

function MovieFeature(props) {
    return (
        <Routes>
            <Route path="/" element={<ListPage />}/>
            <Route path="/category/*" element={<ListPage />}/>
            <Route path="/movie/:id" element={<DetailPage />}/>
            <Route path="/search/:value" element={<ListPage />}/>
            <Route path="/your-follow" element={<FollowPage />}/>
        </Routes>
    );
}

export default MovieFeature;