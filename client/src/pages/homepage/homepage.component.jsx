import React, {Component} from 'react';
import Directory from '../../components/directory/directory.component'

import './homepage.styles.scss';

import {HomePageContainer} from './homepage.styles'

class HomePage extends Component {
    render() {
        return (
            <HomePageContainer>
                <div className = 'directory-menu'>
                    <Directory />
                </div>
            </HomePageContainer>
        )
    }
}

export default HomePage;