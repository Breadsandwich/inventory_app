const CREATE = 'warehouse/CREATE';
const GET_ALL = 'warehouse/GET_ALL';
const GET_ONE = 'warehouse/GET_ONE';


const create = warehouse => ({ type: CREATE, warehouse });
const getAll = warehouses => ({ type: GET_ALL, warehouses });
const getOne = warehouse => ({ type: GET_ONE, warehouse });


//create warehouse thunk
export const createWarehouse = (warehouse) => async (dispatch) => {
    const response = await fetch(`/api/warehouses/new`, {
        method: 'POST',
        body: warehouse
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(create(data));
        return data
    } else {
        const dataError = await response.json()
        if (dataError.errors) {
            return {'errors': dataError.errors};
        } else {
            return {'errors': 'Something went wrong. Please try again'}
        }
    }
};


//get warehouse thunk
export const getAllWarehouses = () => async (dispatch) => {
    const response = await fetch(`/api/warehouses/all`, {
        method: 'GET'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getAll(data));
        return data;
    };
    return response;
};


//get one warehouse thunk
export const getOneWarehouse = (warehouseId) => async (dispatch) => {
    const response = await fetch(`/api/warehouses/${warehouseId}`, {
        method: 'GET'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getOne(data));
        return data;
    };
    return response;
};


const warehouseReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case CREATE:
            newState = state;
            newState[action.warehouse.id] = action.warehouse;
            return newState;

        case GET_ALL:
            newState = {};
            action.warehouses['all_warehouses'].forEach(warehouse => newState[warehouse.id] = warehouse);
            return newState

        case GET_ONE:
            newState = state;
            newState[action.warehouse.id] = action.warehouse;
            return newState;

        default:
            return state
    };
};

export default warehouseReducer
