import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import './menu-item.styles.scss';

import {MenuItemContainer, BgImageContainer, ContentContainer, TitleContianer, SubtitleContainer} from './menu-item.styles'

const MenuItem  = ({title, size, imageUrl, linkUrl, history, match}) => (
    <MenuItemContainer
        size = {size}
        onClick = {() => history.push(`${match.url}${linkUrl}`)}
    >
        <BgImageContainer style = {{background: `url(${imageUrl})`}} className = 'background-image'/>
        <ContentContainer>
            <TitleContianer>{title.toUpperCase()}</TitleContianer>
            <SubtitleContainer className = 'subtitle'>SHOP NOW</SubtitleContainer>
        </ContentContainer>
    </MenuItemContainer>
)


// class MenuItem extends Component {
//     render() {
//         const {title, size, imageUrl} = this.props

//         return (
//             <div style = {{
//                 background: `url(${imageUrl})`, 
//             }} className = {`${size} menu-item`}>
//                 <div className = 'content'>
//                     <h1 className = 'title'>{title}</h1>
//                     <span className = '.subtitle'>SHOP NOW</span>
//                 </div>
//             </div>
//         )
//     }
// }

export default withRouter(MenuItem);