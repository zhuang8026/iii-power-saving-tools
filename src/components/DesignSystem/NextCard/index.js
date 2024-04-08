import React, { useRef, useState, useEffect, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
import { notification } from 'antd';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const NextCard = ({ history, QA, setQA, isNext }) => {
    const [prog, setProg] = useState(1);
    const [disabled, setDisabled] = useState(true);
    const progBar = useRef();

    const updateProgress = (cur, total) => {
        progBar.current.style.backgroundImage = `linear-gradient(to right, #21a1a0 ${(cur / total) * 100}%, #e6e6e6 ${
            (cur / total) * 100
        }%)`;
    };

    const controler = () => {
        setProg(prog + 1);
        updateProgress(prog, 10);
        setDisabled(true);
    };

    const clickNext = () => {
        QA[prog - 1].result !== null && controler();
        prog === 10 && QA[prog - 1].result !== null && isNext();
    };

    const chooseResult = (num, index) => {
        console.log(num, index);
        QA[index].result = num;
        setQA(QA);
        setDisabled(false);
    };
    return (
        <div className={cx('nextCard')}>
            <div className={cx('app-v')}>
                {QA.map((val, index) => {
                    return (
                        <div key={index}>
                            {prog === index + 1 ? (
                                <>
                                    <h2
                                        className={cx('msg')}
                                        id={index}
                                        dangerouslySetInnerHTML={{ __html: val.name }}
                                    />
                                    <p className={cx('radio')}>
                                        <input
                                            type="radio"
                                            value="已執行"
                                            name="ic"
                                            id="11"
                                            onClick={() => chooseResult(1, index)}
                                        />
                                        <span className={cx('checkmark')} />
                                        <label htmlFor="11">已執行</label>
                                    </p>
                                    <p className={cx('radio')}>
                                        <input
                                            type="radio"
                                            value="未執行"
                                            name="ic"
                                            id="22"
                                            onClick={() => chooseResult(0, index)}
                                        />
                                        <span className={cx('checkmark')} />
                                        <label htmlFor="22">未執行</label>
                                    </p>
                                    <p className={cx('radio')}>
                                        <input
                                            type="radio"
                                            value="未持有該電器"
                                            name="ic"
                                            id="33"
                                            onClick={() => chooseResult(-1, index)}
                                        />
                                        <span className={cx('checkmark')} />
                                        <label htmlFor="33">未持有該電器</label>
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
                    <div className={cx('step_num')}>{prog}/10</div>
                    <button
                        className={cx('app__controls__btn', 'app__controls__btn-prime', 'next')}
                        onClick={() => clickNext()}
                    >
                        {prog === QA.length ? '送出' : '下一步'}
                    </button>
                </div>
                <div className={cx('app__controls__progress')} ref={progBar}></div>
            </div>
        </div>
    );
};

export default withRouter(NextCard);
