import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const NoMatch = () => {
    return (
        <div className={cx('noMatch')}>
            <h1>404</h1>
            <h2>Sorry, Page Not Found</h2>
        </div>
    );
};

export default NoMatch;
