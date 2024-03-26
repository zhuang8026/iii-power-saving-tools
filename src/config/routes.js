import React, { lazy } from 'react';

import Tool from 'components/pages/Tool';

const routes = [
    {
        path: '/',
        title: '節電輕推工具',
        component: Tool,
        exact: false,
        authRequired: false,
        layouts: ['']
    }
];

export default routes;
