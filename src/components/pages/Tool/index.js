import React, { useState, useEffect, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
import { notification } from 'antd';

import NextCard from 'components/DesignSystem/NextCard';
import MainCard from 'components/DesignSystem/MainCard';
import ResultCard from 'components/DesignSystem/ResultCard';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Tool = ({ history }) => {
    const [step, setStep] = useState(2);

    const isNext = () => {
        setStep(prev => {
            return prev + 1;
        });
    };
    return (
        <div className={cx('tool')}>
            <div className={cx('containter')}>
                <div id="start" className={cx('card')}>
                    <div className={cx('inner')}>
                        <h1 className={cx('s_logo')}>
                            節電<span>秘笈</span>
                        </h1>
                        {step === 0 && <MainCard isNext={isNext} />}
                        {step === 1 && <NextCard isNext={isNext} />}
                        {step === 2 && <ResultCard />}
                        <h3 className={cx('copy')}>版權所有 &copy; 2024 財團法人資訊工業策進會</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Tool);
