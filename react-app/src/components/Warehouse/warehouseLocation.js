import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllWarehouses } from "../../store/warehouse";
import { createItem, deleteItem } from "../../store/inventory";


const WarehouseLocation = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { warehouseId } = useParams()

    const thisWarehouse = useSelector((state) => state?.warehouseReducer[warehouseId])
    const inventory = thisWarehouse.warehouse_inventory

    const [item_name, setItem_name] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [warehouse_id, setWarehouse_id] = useState(warehouseId)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            item_name,
            description,
            price,
            quantity,
            warehouse_id: warehouseId
        }

        const newItem = await dispatch(createItem(payload))
        if (newItem?.id){
            setItem_name('')
            setDescription('')
            setPrice('')
            setQuantity('')
            setWarehouse_id(warehouseId)

            await dispatch(getAllWarehouses())
            // return history.push(`/${warehouseId}`)
        }
        return 'failed to create new item'
    }

    const handleDelete = async (id) => {


        await dispatch(deleteItem(id))
        await dispatch(getAllWarehouses())
        return history.push(`${warehouseId}`)
    }


    return (
        <>
            <h1>{thisWarehouse.location} Location Warehouse</h1>
            <p>On this page, you can create new items which will be assigned to this warehouse (current warehouse location: {thisWarehouse.location}).</p>
            <p>Notes: Delete button is bugged, so you will have to refresh page to see the delete update.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="item_name">new item: </label>
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
                        value={warehouseId}
                        onChange={e => setWarehouse_id(e.target.value)}
                    />
                    <button>submit</button>
                </div>
            </form>




            <div>
                {inventory.map((items) => (
                    <ul>
                        <li>Item: {items.item_name}</li>
                        <li>Description: {items.description}</li>
                        <li>Price: ${items.price}</li>
                        <li>In Stock: {items.quantity}</li>
                        <a key={items?.id} href={`/items/${items?.id}`}>edit</a>
                        <button onClick={() => handleDelete(items?.id)}>delete</button>
                    </ul>
                ))}
            </div>
        </>
    )
}

export default WarehouseLocation
