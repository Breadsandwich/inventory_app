import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneWarehouse, getAllWarehouses } from "../../store/warehouse";
import { getItem, updateItem, deleteItem } from "../../store/inventory";

const EditItem = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { itemId } = useParams();
    const selectedItem = useSelector((state) => state?.inventoryReducer[itemId])

    const [item_name, setItem_name] = useState(selectedItem.item_name)
    const [description, setDescription] = useState(selectedItem.description)
    const [price, setPrice] = useState(selectedItem.price)
    const [quantity, setQuantity] = useState(selectedItem.quantity)
    const [warehouse_id, setWarehouse_id] = useState(selectedItem.warehouse_id)

    const handleEdit = async (e) => {
        e.preventDefault()

        const payload = {
            itemId,
            item_name,
            description,
            price,
            quantity,
            warehouse_id: selectedItem.warehouse_id
        }

        const updatedItem = await dispatch(updateItem(payload))

        if (updatedItem){
            await dispatch(getAllWarehouses())
            return history.push(`/${warehouse_id}`)
        }
    }

    return (
        <>
            <form onSubmit={handleEdit}>
                <div>
                    <h1>Edit item</h1>
                    <label htmlFor="item_name">item: </label>
                    <input
                        type="text"
                        name="item_name"
                        placeholder="eg. football"
                        value={item_name}
                        onChange={e => setItem_name(e.target.value)}
                    />

                    <label htmlFor="description">description: </label>
                    <input
                        type="text"
                        name="description"
                        placeholder="eg. something about item"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <label htmlFor="price">price: </label>
                    <input
                        type="number"
                        name="price"
                        placeholder="eg. 8"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />

                    <label htmlFor="quantity">quantity: </label>
                    <input
                        type="number"
                        name="quantity"
                        placeholder="eg. 55"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                    />

                    <label htmlFor="warehouse_id">warehouse_id: </label>
                    <input
                        type="number"
                        name="warehouse_id"
                        value={warehouse_id}
                        onChange={e => setWarehouse_id(e.target.value)}
                    />
                    <button>submit</button>
                </div>
            </form>
        </>
    )
}


export default EditItem
