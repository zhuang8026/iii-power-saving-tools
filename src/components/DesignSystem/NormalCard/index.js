import React, { useRef, useState, useEffect, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
import { Input, Select } from 'antd';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const otherList = [
    { value: '臺北市', label: '臺北市' },
    { value: '桃園市', label: '桃園市' },
    { value: '臺中市', label: '臺中市' },
    { value: '臺南市', label: '臺南市' },
    { value: '高雄市', label: '高雄市' },

    { value: '基隆市', label: '基隆市' },
    { value: '新竹市', label: '新竹市' },
    { value: '嘉義市', label: '嘉義市' },

    { value: '宜蘭縣', label: '宜蘭縣' },
    { value: '新竹縣', label: '新竹縣' },
    { value: '苗栗縣', label: '苗栗縣' },
    { value: '彰化縣', label: '彰化縣' },
    { value: '南投縣', label: '南投縣' },
    { value: '雲林縣', label: '雲林縣' },
    { value: '嘉義縣', label: '嘉義縣' },
    { value: '屏東縣', label: '屏東縣' },
    { value: '花蓮縣', label: '花蓮縣' },
    { value: '臺東縣', label: '臺東縣' },
    { value: '澎湖縣', label: '澎湖縣' }
];

const NormalCard = ({ history, userData, setUserData, isNext }) => {
    const [prog, setProg] = useState(1);
    const [disabled, setDisabled] = useState(true);
    const [isOtherRegion, setIsOtherRegion] = useState(false);
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
                // txt 不能為空或 "other", true 為不可下一步
                bool = txt === '' || txt === 'other';
                let otherItem = otherList.map(ele => ele.value);
                txt === 'other' || otherItem.includes(txt) ? setIsOtherRegion(true) : setIsOtherRegion(false);

                console.log(txt === 'other', otherItem.includes(txt), isOtherRegion, txt);
                break;
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
                                            <div className={cx('select')}>
                                                <Select
                                                    style={{ width: '100%' }}
                                                    size="large"
                                                    // showSearch
                                                    placeholder={val.placeholder}
                                                    optionFilterProp="children"
                                                    onChange={value => chooseResult(index, value)}
                                                    // onSearch={onSearch}
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? '')
                                                            .toLowerCase()
                                                            .includes(input.toLowerCase())
                                                    }
                                                    options={val.list}
                                                />
                                                {isOtherRegion && (
                                                    <>
                                                        <h2 className={cx('msg')}>請選擇其他地區</h2>
                                                        <Select
                                                            style={{ width: '100%' }}
                                                            size="large"
                                                            // showSearch
                                                            placeholder="請選擇其他地區"
                                                            optionFilterProp="children"
                                                            onChange={value => chooseResult(index, value)}
                                                            // onSearch={onSearch}
                                                            filterOption={(input, option) =>
                                                                (option?.label ?? '')
                                                                    .toLowerCase()
                                                                    .includes(input.toLowerCase())
                                                            }
                                                            options={otherList}
                                                        />
                                                    </>
                                                )}
                                            </div>
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
