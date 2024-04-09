import React, { useRef, useState, useEffect, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
import { Input, Select } from 'antd';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const NormalCard = ({ history, userData, setUserData, isNext }) => {
    const [prog, setProg] = useState(1);
    const [disabled, setDisabled] = useState(true);
    const progBar = useRef();
    // const inputRefs = useRef([]);

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
        let bool = false;
        const updatedUserData = [...userData]; // Create a copy of the state array
        updatedUserData[index].result = txt; // Update the result value in the copied array

        switch (index) {
            case 0:
                let regex_0 = /^\d{11,}$/;
                bool = !regex_0.test(txt);
                break;
            case 1:
                let regex_1 = /^[\u4e00-\u9fa5]+$/;
                bool = !regex_1.test(txt);
                break;
            case 2:
            case 3:
                bool = txt === '';
                break;
            default:
                break;
        }

        setUserData(updatedUserData); // Update the state with the modified array

        setDisabled(bool);
    };

    // useEffect(() => {
    //     if (prog > 0 && prog <= userData.length) {
    //         inputRefs.current[prog - 1].focus();
    //     }
    // }, [prog, userData]);

    useEffect(() => {
        return () => {
            // 在組件卸載時，取消所有訂閱和清理所有異步任務
            // 這裡取消訂閱或清理任務的代碼
        };
    }, []);

    return (
        <div className={cx('nextCard')}>
            <div className={cx('app-v')}>
                {userData.map((val, index) => {
                    return (
                        <div key={index}>
                            {prog === index + 1 ? (
                                <>
                                    <h2 className={cx('msg')} id={val.name}>
                                        {val.name}
                                    </h2>
                                    <div className={cx('radio')}>
                                        {val.type !== 'select' ? (
                                            <Input
                                                size="large"
                                                type={val.type}
                                                inputMode={val.inputMode}
                                                placeholder={val.placeholder}
                                                // ref={el => (inputRefs.current[index] = el)}
                                                onChange={e => chooseResult(index, e.target.value)}
                                            />
                                        ) : (
                                            <Select
                                                style={{ width: '100%' }}
                                                size="large"
                                                // showSearch
                                                placeholder={val.placeholder}
                                                optionFilterProp="children"
                                                onChange={value => chooseResult(index, value)}
                                                // onSearch={onSearch}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={val.list}
                                            />
                                        )}
                                    </div>

                                    {val.img && <img src={val.img} alt="" />}
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
