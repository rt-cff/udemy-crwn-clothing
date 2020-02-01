import React, {Component} from 'react'
import PreviewCollection from '../../components/preview-collection/preview-collection.component' 

import SHOP_DATA from './shop.data'

class Shop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        const {collections} = this.state

        return (
            <div>
                SHOP PAGE
                {collections.map(({id, ...collectionProps}) => (<PreviewCollection key = {id} {...collectionProps}/>))}
            </div>
        )
    }
}

export default Shop