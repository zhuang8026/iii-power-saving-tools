import React, { useRef, useState, useEffect, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
import { Input } from 'antd';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const NormalCard = ({ history, userData, setUserData, isNext }) => {
    const [prog, setProg] = useState(1);
    const [disabled, setDisabled] = useState(true);
    const progBar = useRef();

    const updateProgress = (cur, total) => {
        progBar.current.style.backgroundImage = `linear-gradient(to right, #386ac7 ${(cur / total) * 100}%, #e6e6e6 ${
            (cur / total) * 100
        }%)`;
    };

    const controler = () => {
        setProg(prog + 1);
        updateProgress(prog, 4);
        setDisabled(true);
    };

    const clickNext = () => {
        setUserData(userData);
        userData[prog - 1].result !== null && controler();
        prog === 4 && userData[prog - 1].result !== null && isNext();
    };

    const chooseResult = (index, txt) => {
        userData[index].result = txt;

        let bool = txt === '';
        setDisabled(bool);
    };
    return (
        <div className={cx('nextCard')}>
            <div className={cx('app-v')}>
                {userData.map((val, index) => {
                    return (
                        <div key={index}>
                            {prog === index + 1 ? (
                                <>
                                    <h2 className={cx('msg')} id={val}>
                                        {val.name}
                                    </h2>
                                    <p className={cx('radio')}>
                                        <Input
                                            size="large"
                                            placeholder={val.name}
                                            onChange={e => chooseResult(index, e.target.value)}
                                        />
                                    </p>
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                    );
                })}
            </div>
            <div className={cx('app__controls')}>
                <div className={cx('btn-box', { disabled: disabled })}>
                    <div className={cx('step_num')}>{prog}/4</div>
                    <button
                        className={cx('app__controls__btn', 'app__controls__btn-prime', 'next')}
                        onClick={() => clickNext()}
                    >
                        {prog === userData.length ? '完成' : '下一步'}
                    </button>
                </div>
                <div className={cx('app__controls__progress')} ref={progBar}></div>
            </div>
        </div>
    );
};

export default withRouter(NormalCard);
