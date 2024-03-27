import { apiRequest } from 'api/apiRequest.js';
// 模拟开发环境
const isMockEnvironment = process.env.REACT_APP_ENV === 'development';

// const ad_dashboard = 'ad_dashboard';
// const autotest = 'autotest';

export const getSelectItemsAPI001 = async () => {
    // 如果是开发环境，直接返回模拟数据
    const url = isMockEnvironment ? `/mock/survey.json` : ``;
    const res = await apiRequest('GET', url, true);
    return res;
};

export const postSelectItemsAPI001 = async playload => {
    // 如果是开发环境，直接返回模拟数据
    const url = isMockEnvironment ? `/mock/survey.json` : ``;
    const res = await apiRequest('POST', url, true, playload);
    return res;
};

export const postEmailAndImageAPI002 = async playload => {
    // 如果是开发环境，直接返回模拟数据
    const url = isMockEnvironment ? `/mock/survey.json` : ``;
    const res = await apiRequest('POST', url, true, playload);
    return res;
};
