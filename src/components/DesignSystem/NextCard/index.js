import React, { useRef, useState, useEffect, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
import { notification } from 'antd';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
import { set } from 'date-fns';
const cx = classNames.bind(classes);

const NextCard = ({ history, isNext }) => {
    const [prog, setProg] = useState(1);
    const [disabled, setDisabled] = useState(true);
    const [QA, setQA] = useState([
        { name: '食物自然放涼後，再放入冰箱冷藏，可減輕壓縮機運轉負擔。', result: null },
        { name: '冰箱定期除霜，以維持運轉效率。', result: null },
        { name: '嘗試將冷氣設定溫度提高1度，可節省6~9%耗電。', result: null },
        { name: '半夜冷氣開啟舒眠與定時，可減少多餘耗電。', result: null },
        { name: '衣物少時用手洗，洗衣籃八分滿再用洗衣機，可減少洗衣機40%的使用率。', result: null },
        { name: '定期清潔洗衣機，以維持運轉效率。', result: null },
        { name: '外出時完全關閉開飲機電源，回家後再開啟，省下不必要的浪費。', result: null },
        { name: '善用除濕機的自動除溼功能，讓機器於濕度高於設定濕度時才會運轉，減少不必要的浪費。', result: null },
        { name: '以筆記型電腦取代桌上型電腦，能省下約60%的電力。', result: null },
        { name: '離開房間或出門前，記得隨手關燈。', result: null }
    ]);
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
                                    <h2 className={cx('msg')} id={val}>
                                        {index + 1}.{val.name}
                                    </h2>
                                    <p className={cx('radio')}>
                                        <input
                                            type="radio"
                                            value="已執行"
                                            name="ic"
                                            id="1"
                                            onClick={() => chooseResult(1, index)}
                                        />
                                        <span className={cx('checkmark')} />
                                        <label htmlFor="1">已執行</label>
                                    </p>
                                    <p className={cx('radio')}>
                                        <input
                                            type="radio"
                                            value="未執行"
                                            name="ic"
                                            id="2"
                                            onClick={() => chooseResult(2, index)}
                                        />
                                        <span className={cx('checkmark')} />
                                        <label htmlFor="2">未執行</label>
                                    </p>
                                    <p className={cx('radio')}>
                                        <input
                                            type="radio"
                                            value="未持有該電器"
                                            name="ic"
                                            id="3"
                                            onClick={() => chooseResult(3, index)}
                                        />
                                        <span className={cx('checkmark')} />
                                        <label htmlFor="3">未持有該電器</label>
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
                    <button
                        className={cx('app__controls__btn', 'app__controls__btn-prime', 'next')}
                        onClick={() => clickNext()}
                    >
                        {prog === 10 ? '送出' : '下一步'}
                    </button>
                </div>
                <div className={cx('app__controls__progress')} ref={progBar}></div>
            </div>
        </div>
    );
};

export default withRouter(NextCard);
