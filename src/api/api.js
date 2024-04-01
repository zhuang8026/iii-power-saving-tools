import { apiRequest } from 'api/apiRequest.js';
// 模拟开发环境
const isMockEnvironment = process.env.REACT_APP_ENV === 'development';

const API = '/api';
// const autotest = 'autotest';

export const getSelectItemsAPI001 = async () => {
    // 如果是开发环境，直接返回模拟数据
    const url = isMockEnvironment ? `/mock/get_survey.json` : `${API}/survey_supply`;
    const res = await apiRequest('GET', url, true);
    return res;
};

export const postSelectItemsAPI001 = async playload => {
    // 如果是开发环境，直接返回模拟数据
    const url = isMockEnvironment ? `/mock/post_survey.json` : `${API}/recommend_advice`;
    const res = await apiRequest('POST', url, true, playload);
    return res;
};

export const postEmailAndImageAPI002 = async playload => {
    // 如果是开发环境，直接返回模拟数据
    const url = isMockEnvironment ? `/mock/get_survey.json` : `${API}/email_image`;
    const res = await apiRequest('POST', url, true, playload);
    return res;
};
