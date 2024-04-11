import React, { Fragment, Suspense, useState, useEffect, useContext, useRef } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { Input, InputNumber, Select, Tag, Popconfirm, Form, Table, Typography, notification, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';

// DesignSystem
import NoMatch from 'components/DesignSystem/NoMatch';
import { withFullWindowProvider, FullPopWindow } from 'components/DesignSystem/FullWindow';

// config
import outsideRoutes from 'config/routes';

// utils
import { getCookie, setCookie, eraseCookie } from 'utils/cookie';

// Context
// import AdminContainer, { AdminContext } from 'contexts/admin';
import GlobalContainer, { GlobalContext } from 'contexts/global';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

function App({ match, location, history }) {
    // const { REACT_APP_VERSION_1, REACT_APP_VERSION_2, REACT_APP_VERSION_3, GETNILM001API } = useContext(GlobalContext);
    // const { admin } = useContext(AdminContext);
    const [layouts, setLayouts] = useState([]);
    const [menuList, setMenuList] = useState([]);

    const isAuth = getCookie('iii_token'); // cookie testing
    // const CookiesRole = getCookie('iii_role');

    // 不需要 auth 的路由
    const OutsideRoutes = () => {
        return outsideRoutes.map((route, key) => (
            <Route
                key={`route_${key}`}
                path={`${route.path}`}
                exact={route.exact}
                sensitive
                render={() => {
                    document.title = `${route.title}`;
                    return <route.component localeMatch={match} routeData={route} />;
                }}
            />
        ));
    };

    useEffect(() => {}, []);

    return (
        <div className={cx('App')}>
            {/* body */}
            <div className={cx('main')}>
                {/* 路由頁面 */}
                <Suspense fallback={<></>}>
                    <Switch location={location}>
                        {OutsideRoutes()} {/* 不需要 auth 的路由 */}
                        <Redirect from="*" to="/" />
                        <Route component={NoMatch} />
                    </Switch>
                </Suspense>

                {/**
                 * 可隨意添加 comment
                 */}
                <FullPopWindow />
            </div>
        </div>
    );
}
export default withFullWindowProvider(withRouter(App));
