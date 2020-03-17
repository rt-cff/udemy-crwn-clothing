import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import './menu-item.styles.scss';

const MenuItem  = ({title, size, imageUrl, linkUrl, history, match}) => (
    <div 
        className = {`${size} menu-item`}
        onClick = {() => history.push(`${match.url}${linkUrl}`)}
    >
        <div style = {{background: `url(${imageUrl})`}} className = 'background-image'/>
        <div className = 'content'>
            <h1 className = 'title'>{title.toUpperCase()}</h1>
            <span className = 'subtitle'>SHOP NOW</span>
        </div>
    </div>
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