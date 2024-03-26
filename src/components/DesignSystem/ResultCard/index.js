import React, { useRef, useState, useEffect, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
import { notification } from 'antd';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const ResultCard = ({ history }) => {
    return (
        <div className={cx('resultCard')}>
            <div className={cx('app-v')}>
                <p className={cx('radio')}>
                    <p className={cx('result')}>
                        1. 建議把 <strong>冷氣</strong> 風量設 <strong>自動調整</strong>
                        模式，較省電又能讓冷氣更有效率運作。
                    </p>
                </p>
                <p className={cx('radio')}>
                    <p className={cx('result')}>
                        2. 以 <strong>快煮壺取代</strong> 開飲機，每月可省下約100元電費。
                    </p>
                </p>
            </div>
        </div>
    );
};

export default withRouter(ResultCard);
