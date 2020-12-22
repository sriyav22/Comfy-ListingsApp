import { 
    CREATE_LISTING,
    FETCH_LISTINGS,
    LISTING_LOADING
}
    from '../actions/types';


// const initalState = {
//     loading: false,
//     listings:[]
// }

export default function(listings=[], action){
    switch(action.type){
        case FETCH_LISTINGS:
            return action.payload;
        case CREATE_LISTING :
            return[
                ...listings,
                action.payload
    ];
        case LISTING_LOADING:
            return {
                ...listings,
                loading: true
            };
        default:
            return listings;
    }
}