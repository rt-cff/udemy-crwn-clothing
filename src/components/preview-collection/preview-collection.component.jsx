import React, {Component} from 'react'
import CollectionItem from '../collection-item/collection-item.component'

import './collection-preview.styles.scss'

const PreviewCollection = ({title, items}) => (
    <div className = 'collection-preview'>
        <h1 className = 'title'>{title.toUpperCase()}</h1>
        <div className = 'preview'>
            {items.slice(0, 4).map(({id, ...props}) => (<CollectionItem key = {id} {...props}/>))}
        </div>
    </div>
)

export default PreviewCollection