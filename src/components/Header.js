import React from 'react';
import HeaderContainer from '../css_modules/header.module.css';

export default function Header({children}){
    return (
        <div className={HeaderContainer.header}>{children}</div>
    );
}