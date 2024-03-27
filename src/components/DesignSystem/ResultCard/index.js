import React, { useRef, useState, useEffect, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
import { Input } from 'antd';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const ResultCard = ({ history, isSend }) => {
    const [email, setEmail] = useState('');
    const [send, setSend] = useState(false);

    const writeEmail = e => {
        setEmail(e.target.value);
        console.log(email);
    };

    const SendToDB = () => {
        console.log(email);
        setSend(true);
        // isSend();
    };

    return (
        <div className={cx('resultCard')}>
            <div className={cx('app-v')}>
                <div className={cx('radio')}>
                    <p className={cx('result')}>
                        1. 建議把 <strong>冷氣</strong> 風量設 <strong>自動調整</strong>
                        模式，較省電又能讓冷氣更有效率運作。
                    </p>
                </div>
                <div className={cx('radio')}>
                    <p className={cx('result')}>
                        2. 以 <strong>快煮壺取代</strong> 開飲機，每月可省下約100元電費。
                    </p>
                </div>
                <div className={cx('btn-box')}>
                    {send ? (
                        <>
                            <p className={cx('done')}>秘笈已寄出</p>
                        </>
                    ) : (
                        <>
                            <Input size="large" placeholder="請輸入您的電子郵箱" onChange={e => writeEmail(e)} />
                            <button className={cx('send')} onClick={() => SendToDB()}>
                                送出
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default withRouter(ResultCard);
