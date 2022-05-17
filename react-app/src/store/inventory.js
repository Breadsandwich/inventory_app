
const CREATE = 'inventory/CREATE'
const GET_ONE = 'inventory/GET_ONE';
const GET_ALL = 'inventory/GET_ALL';
const UPDATE = 'inventory/UPDATE'
const DELETE = 'inventory/DELETE'


const create = item => ({ type: CREATE, item });
const getOne = item => ({ type: GET_ONE, item });
const getAll = items => ({ type: GET_ALL, items });
const update = item => ({ type: UPDATE, item });
const destroy = itemId => ({ type: DELETE, itemId });


export const createItem = (item) => async (dispatch) => {
    const response = await fetch(`/api/inventory/new`, {
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    });

    console.log('from createItem thunk:',response)

    if (response.ok) {
        const data = await response.json();
        dispatch(create(data));
        return data;
    } else {
        const dataError = await response.json()
        if (dataError.errors) {
            return {'errors': dataError.errors};
        } else {
            return {'errors': 'Something went wrong. Please try again'}
        }
    }
};

export const getItem = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/inventory/${itemId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getOne(data));
        return data;
    }
    return response
};


export const getAllItems = () => async (dispatch) => {
    const response = await fetch(`/api/inventory/all`, {
        method: 'GET'
    });
    // console.log('get all item thunk: ', response)

    if (response.ok) {
        const data = await response.json();
        dispatch(getAll(data));
        return data;
    };
    return response;
};



export const updateItem = (payload) => async (dispatch) => {
    const response = await fetch(`/api/inventory/${payload.itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    console.log('updateItem thunk: ', response)


    if (response.ok) {
        const data = await response.json();
        dispatch(update(data));
        return data;
    } else {
        const dataError = await response.json()
        if (dataError.errors) {
            return {'errors': dataError.errors};
        } else {
            return {'errors': 'Something went wrong. Please try again'}
        }
    }
};


export const deleteItem = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/inventory/${itemId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(destroy(data));
        return data;
    };
    return response;
};


const inventoryReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case CREATE:
            newState = state;
            newState[action.item.id] = action.item;
            return newState;

        case GET_ONE:
            newState = state;
            newState[action.item.id] = action.item;
            return newState;

        case GET_ALL:
            newState = {};
            action.items['all_items'].forEach(item => newState[item.id] = item);
            return newState

        case UPDATE:
            newState = state;
            newState[action.item.id] = action.item;
            return newState;

        case DELETE:
            newState = state;
            delete newState[action.itemId.id];
            return newState

        default:
            return state
    };
};



export default inventoryReducer
