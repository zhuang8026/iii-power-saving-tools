import React, { lazy } from 'react';

import Tool from 'components/pages/Tool';

const routes = [
    {
        path: '/',
        title: '節電秘笈',
        component: Tool,
        exact: false,
        authRequired: false,
        layouts: ['']
    }
];

export default routes;
