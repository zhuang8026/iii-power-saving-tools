import React, { useState, useEffect, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
import { notification } from 'antd';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const MainCard = ({ history, isNext }) => {
    return (
        <div className={cx('app', 'app_beginng')}>
            <div className={cx('app-start')}>
                <img src={require(`assets/images/title.png`)} alt="logo" />
            </div>
            <div className={cx('app-start__controls')}>
                <div className={cx('btn-box')}>
                    <button
                        className={cx('start', 'app__controls__btn', 'app__controls__btn-prime')}
                        onClick={() => isNext()}
                    >
                        取得秘笈
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withRouter(MainCard);
