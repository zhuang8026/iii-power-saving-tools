import React, { useState, useEffect, useContext, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import html2canvas from 'html2canvas'; // 截圖工具

// antd
// import { notification } from 'antd';

import NormalCard from 'components/DesignSystem/NormalCard';
import NextCard from 'components/DesignSystem/NextCard';
import MainCard from 'components/DesignSystem/MainCard';
import ResultCard from 'components/DesignSystem/ResultCard';

// API
import { getSelectItemsAPI001, postSelectItemsAPI001, postEmailAndImageAPI002 } from 'api/api';

// config
import { III_VERSION } from 'config';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Tool = ({ history }) => {
    const [step, setStep] = useState(0);
    const [userData, setUserData] = useState([
        { name: '請輸入 電號', result: null },
        { name: '請輸入 戶名', result: null },
        { name: '請輸入 行政區', result: null },
        { name: '請輸入 社區', result: null }
    ]);
    const [QA, setQA] = useState([]);
    const [result, setResult] = useState([
        '1. 建議把 <strong>冷氣</strong> 風量設 <strong>自動調整</strong>模式，較省電又能讓冷氣更有效率運作。',
        '2. 以 <strong>快煮壺取代</strong> 開飲機，每月可省下約100元電費。'
    ]);
    const [email, setEmail] = useState(''); // 用戶Email
    const [vol, setVol] = useState(''); // 用戶問卷編號
    const screenshotRef = useRef(null);

    const isNext = async () => {
        setStep(prev => {
            return prev + 1;
        });
        console.log('prev:', step);
        if (step === 2) await sendSelectData();
    };

    // --------- API ---------

    // 取得問題
    const GET_getSelectItemsAPI001 = async () => {
        const res = await getSelectItemsAPI001();
        if (res.code === 200) {
            console.log('GET001API success:', res);
            setVol(res.data.survey_vol);
            let question_data = res.data.question.map(ele => {
                return { name: ele, result: null };
            });

            setQA(question_data);
        } else {
            console.log('GET001API error:', res);
        }
    };

    // 送出選擇題
    const sendSelectData = async () => {
        let payload = {
            userData,
            survey: {
                survey_vol: vol,
                question: QA
            }
        };

        const res = await postSelectItemsAPI001(payload);
        if (res.status == '200') {
            console.log('postSelectItemsAPI001 success:', res);
            setResult(prev => {
                prev = [];
                prev.push(res.data);
                return prev;
            });
        } else {
            console.log('postSelectItemsAPI001 error:', res);
        }
    };

    // 截圖
    const saveImageAndSendEmail = async () => {
        if (screenshotRef.current) {
            html2canvas(screenshotRef.current).then(async canvas => {
                const imgData = canvas.toDataURL('image/jpeg');
                // const img = new Image();
                // img.src = imgData; // 截圖圖片 資料
                // document.body.appendChild(img); // You can append it wherever you like or save to server etc.

                // Sample email data (replace with actual data)
                const emailData = {
                    user_id: email, // Email address: jasonwang@iii.org.tw
                    user_image: imgData // Base64 image data: base64
                };
                console.log('emailData:', emailData);

                const res = await postEmailAndImageAPI002(emailData);
                if (res.status == '200') {
                    console.log('postEmailAndImageAPI002 success:', res);
                } else {
                    console.log('postEmailAndImageAPI002 error:', res);
                }
            });
        }
    };

    // call API's
    const asyncAllAPI = async () => {
        await GET_getSelectItemsAPI001();
    };

    useEffect(() => {
        asyncAllAPI();
    }, []);

    return (
        <div className={cx('tool')}>
            <div className={cx('containter')}>
                <div id="start" className={cx('card')} ref={screenshotRef}>
                    <div className={cx('inner')}>
                        <h1 className={cx('s_logo')}>
                            節電<span>秘笈</span>
                        </h1>
                        {step === 0 && <MainCard isNext={isNext} />}
                        {step === 1 && <NormalCard isNext={isNext} userData={userData} setUserData={setUserData} />}
                        {step === 2 && <NextCard isNext={isNext} QA={QA} setQA={setQA} />}
                        {step === 3 && (
                            <ResultCard
                                screenshot={saveImageAndSendEmail}
                                result={result}
                                email={email}
                                setEmail={setEmail}
                            />
                        )}

                        <h3 className={cx('copy')}>版權所有 &copy; 2024 財團法人資訊工業策進會 <br/> beta.{III_VERSION} </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Tool);
