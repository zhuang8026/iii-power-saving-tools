import React, { createContext, useState, useContext } from 'react';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

export const FullWindowAnimateStorage = createContext();

export const withFullWindowProvider = WrappedComponent => {
    const FullWindowProvider = props => {
        const [animateObj, setAnimateObj] = useState(null);

        const openAnimate = obj => {
            setAnimateObj(obj);
        };

        const closeAnimate = () => {
            setAnimateObj(null);
        };

        const fullWindowData = {
            animateObj,
            openAnimate,
            closeAnimate
        };

        return (
            <FullWindowAnimateStorage.Provider value={fullWindowData}>
                <WrappedComponent {...props} />
            </FullWindowAnimateStorage.Provider>
        );
    };

    return FullWindowProvider;
};

export const FullPopWindow = () => {
    const animateObjData = useContext(FullWindowAnimateStorage);
    const {
        animateObj
        // closeAnimate
    } = animateObjData;

    if (animateObj) {
        return <div className={cx('popAnimateContainer')}>{animateObj?.component}</div>;
    }
    return null;
};

export const withPopWindowConsumer = WrappedComponent => props => {
    return (
        <FullWindowAnimateStorage.Consumer>
            {values => {
                return <WrappedComponent {...props} fullWindowData={values} />;
            }}
        </FullWindowAnimateStorage.Consumer>
    );
};
