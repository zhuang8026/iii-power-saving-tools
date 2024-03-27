import React, { useRef, useState, useEffect, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
import { Input } from 'antd';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const ResultCard = ({ history, screenshot, result, setEmail }) => {
    const [send, setSend] = useState(false); // 是否顯示送出

    // 輸入 Email
    const writeEmail = e => {
        setEmail(e.target.value);
    };

    // call API
    const postAPI001 = () => {
        screenshot();
        setSend(true);
    };

    return (
        <div className={cx('resultCard')}>
            <div className={cx('app-v')}>
                {result.length > 0 &&
                    result.map((ele, index) => {
                        return (
                            <div className={cx('radio')} key={index}>
                                <p className={cx('result')} dangerouslySetInnerHTML={{ __html: ele }} />
                            </div>
                        );
                    })}
                <div className={cx('btn-box')}>
                    {send ? (
                        <>
                            <p className={cx('done')}>秘笈已寄出</p>
                        </>
                    ) : (
                        <>
                            <Input size="large" placeholder="請輸入您的電子郵箱" onChange={e => writeEmail(e)} />
                            <button className={cx('send')} onClick={() => postAPI001()}>
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
