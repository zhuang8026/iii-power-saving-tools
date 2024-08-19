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
                {/* <img src={require(`assets/images/title.png`)} alt="logo" /> */}
                <p>
                    在本測驗中, 您將<strong>依序看到10項節電行為, 請依您的執行情況回應</strong>, 系統會根據您的回答,
                    評估您的日常用電情形, <strong>提供適合您的節電秘笈</strong>, 讓您作為參考
                </p>
            </div>
            <div className={cx('app-start__controls')}>
                <div className={cx('btn-box')}>
                    <button
                        className={cx('start', 'app__controls__btn', 'app__controls__btn-prime')}
                        onClick={() => isNext()}
                    >
                        開始測驗
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withRouter(MainCard);
