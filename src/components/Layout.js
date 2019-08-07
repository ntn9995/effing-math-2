import React from 'react'
import Header from './Header'
import BodyContainer from './BodyContainer'
import MasterContainer from '../css_modules/layout.module.css';

export default function Layout({children}) {
    return (
        <div className = {MasterContainer.container}>
            <Header>
                <h1>Effing Math</h1>
            </Header>
            <BodyContainer>{children}</BodyContainer>
        </div>
    );
}
    