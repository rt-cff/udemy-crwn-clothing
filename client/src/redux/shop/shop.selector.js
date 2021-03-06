import {createSelector} from 'reselect'

const COLLECTION_ID_MAP = {
    hats: 1, 
    sneakers: 2, 
    jackets: 3, 
    women: 4, 
    mens: 5, 
}

const selectShop = state => state.shop
const selectUrlParam = (state, props) => props.match.params

export const selectCollections = createSelector(
    [selectShop], 
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections], 
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = createSelector(
    [selectCollections, selectUrlParam], 
    (colelctions, {collectionId}) => colelctions ? colelctions[collectionId] : null
//    (colelctions, collectionUrlParam) => colelctions.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam.collectionId])
)

export const selectIsCollectionFetching = createSelector(
    [selectShop], 
    shop => shop.isFetching
)