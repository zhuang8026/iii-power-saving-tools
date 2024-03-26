import React, { lazy } from 'react';

import Tool from 'components/pages/Tool';

const routes = [
    {
        path: '/',
        title: '節電輕推工具',
        component: Tool,
        exact: true,
        authRequired: false,
        layouts: ['']
    }
];

export default routes;
