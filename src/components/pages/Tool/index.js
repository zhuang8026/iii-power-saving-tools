import React, { useState, useEffect, useContext, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import html2canvas from 'html2canvas'; // 截圖工具

// antd
// import { notification } from 'antd';

import NormalCard from 'components/DesignSystem/NormalCard';
import NextCard from 'components/DesignSystem/NextCard';
import MainCard from 'components/DesignSystem/MainCard';
import ResultCard from 'components/DesignSystem/ResultCard';
import Loading from 'components/DesignSystem/Loading';

// API
import { getSelectItemsAPI001, postSelectItemsAPI001, postEmailAndImageAPI002 } from 'api/api';

// config
import { III_VERSION } from 'config';

import ELECPIC from 'assets/images/elec_pic.png';
import ELECNAME from 'assets/images/elec_name.png';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Tool = ({ history }) => {
    const [step, setStep] = useState(0);
    const [userData, setUserData] = useState([
        {
            type: 'number',
            name: '請輸入電費單據上電號，共11位數字',
            placeholder: '例：00123456789',
            inputMode: 'numeric',
            img: ELECPIC,
            result: null
        },
        {
            type: 'text',
            name: '請輸入電費單據上用電戶名之前"六個字"',
            placeholder: '例：王小明',
            inputMode: 'search',
            img: ELECNAME,
            result: null
        },
        {
            type: 'select',
            name: '請選擇行政區',
            placeholder: '請選擇行政區',
            inputMode: '',
            list: [
                { value: '板橋區', label: '板橋區' },
                { value: '中和區', label: '中和區' },
                { value: '新莊區', label: '新莊區' },
                { value: '土城區', label: '土城區' },
                { value: '汐止區', label: '汐止區' },
                { value: '鶯歌區', label: '鶯歌區' },
                { value: '淡水區', label: '淡水區' },
                { value: '五股區', label: '五股區' },
                { value: '林口區', label: '林口區' },
                { value: '深坑區', label: '深坑區' },
                { value: '坪林區', label: '坪林區' },
                { value: '石門區', label: '石門區' },
                { value: '萬里區', label: '萬里區' },
                { value: '雙溪區', label: '雙溪區' },
                { value: '烏來區', label: '烏來區' },
                { value: '三重區', label: '三重區' },
                { value: '永和區', label: '永和區' },
                { value: '新店區', label: '新店區' },
                { value: '蘆洲區', label: '蘆洲區' },
                { value: '樹林區', label: '樹林區' },
                { value: '三峽區', label: '三峽區' },
                { value: '瑞芳區', label: '瑞芳區' },
                { value: '泰山區', label: '泰山區' },
                { value: '八里區', label: '八里區' },
                { value: '石碇區', label: '石碇區' },
                { value: '三芝區', label: '三芝區' },
                { value: '金山區', label: '金山區' },
                { value: '平溪區', label: '平溪區' },
                { value: '貢寮區', label: '貢寮區' }
            ],
            result: null
        },
        { type: 'text', name: '請輸入社區', placeholder: '例：XXX社區', inputMode: 'search', result: null }
    ]);
    const [QA, setQA] = useState([]);
    const [result, setResult] = useState([
        // '1. 建議把 <strong>冷氣</strong> 風量設 <strong>自動調整</strong>模式，較省電又能讓冷氣更有效率運作。',
        // '2. 以 <strong>快煮壺取代</strong> 開飲機，每月可省下約100元電費。'
    ]);
    const [email, setEmail] = useState(''); // 用戶Email
    const [vol, setVol] = useState(''); // 用戶問卷編號
    const screenshotRef = useRef(null);

    const isNext = async () => {
        setStep(prev => {
            return prev + 1;
        });
        // console.log('prev:', step);
        if (step === 2) await sendSelectData();
    };

    // --------- API ---------

    // 取得問題
    const GET_getSelectItemsAPI001 = async () => {
        const res = await getSelectItemsAPI001();
        if (res.code === 200) {
            // console.log('GET001API success:', res);
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
            // console.log('postSelectItemsAPI001 success:', res);
            setResult(prev => {
                prev = [];
                // prev.push(res.data);
                prev = res.data;
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
                // console.log('emailData:', emailData);

                const res = await postEmailAndImageAPI002(emailData);
                if (res.status == '200') {
                    // console.log('postEmailAndImageAPI002 success:', res);
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
            {step === 3 && result.length <= 0 && <Loading />}
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

                        <h3 className={cx('copy')}>
                            版權所有 &copy; 2024 財團法人資訊工業策進會 <br /> beta.{III_VERSION}{' '}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Tool);
