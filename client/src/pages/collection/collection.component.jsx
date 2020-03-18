import React, {useContext} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCollection} from '../../redux/shop/shop.selector'

import CollectionContext from '../../context/collection/collection.context'

import CollectionItem from '../../components/collection-item/collection-item.component'

import './collection.styles.scss'

const Collection = ({match}) => {
    const collections = useContext(CollectionContext)
    const {title, items} = collections[match.params.collectionId]

    return (
        <div className = 'collection-page'>
            <div className = 'title'>{title}</div> 
            <div className = 'items'>
                {items.map(item => <CollectionItem key = {item.id} item = {item}/>)}
            </div>
        </div>
    )
}

const __Collection = ({match}) => (
    <CollectionContext.Consumer>
        {
            collections => {
                const {title, items = []} = collections[match.params.collectionId] || {}
                return (
                    <div className = 'collection-page'>
                        <div className = 'title'>{title}</div> 
                        <div className = 'items'>
                            {items.map(item => <CollectionItem key = {item.id} item = {item}/>)}
                        </div>
                    </div>
                )
        }}
    </CollectionContext.Consumer>
)

const _Collection = ({collection}) => {
    if(collection === null) return null

    const {title, items} = collection

    return (
        <div className = 'collection-page'>
            <div className = 'title'>{title}</div> 
            <div className = 'items'>
                {items.map(item => <CollectionItem key = {item.id} item = {item}/>)}
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collection: selectCollection
})

//export default connect(mapStateToProps)(Collection) 

export default Collection