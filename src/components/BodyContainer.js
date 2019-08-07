import React from 'react';
import Container from '../css_modules/body.module.css';

export default function BodyContainer({children}){
    return (
        <div className={Container.container}>{children}</div>
    );
}