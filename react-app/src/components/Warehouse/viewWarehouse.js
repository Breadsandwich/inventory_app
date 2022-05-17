import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllWarehouses, createWarehouse } from "../../store/warehouse";

const Warehouse = () => {
    const history = useHistory
    const dispatch = useDispatch();
    const warehousesObj = useSelector(state => state?.warehouseReducer)
    const warehouses = warehousesObj && Object.values(warehousesObj)

    const [location, setLocation] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('location', location)

        const newLocation = await dispatch(createWarehouse(formData))
        if (newLocation?.id) {
            await dispatch(getAllWarehouses())
            return history.push(`/`)
        }
        return 'failed to create new location'
    }



    useEffect(() => {
        dispatch(getAllWarehouses())
    }, [dispatch])

    return (
        <div className="body">
            <h1>Warehouse locations</h1>
                <p>On this page, you can create a warehouse/location, which you can then access.</p>
                <p>In the warehouse location, you will be able to assign items to that warehouse.</p>
                <br />
                <br />
                <form className="warehouse_form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="location">new location: </label>
                        <input
                            type="text"
                            name="location"
                            placeholder="eg. Los Angles"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                    </div>
                </form>



            <div>
                {warehouses.map((warehouse) => (
                    <a href={`/${warehouse.id}`}>
                        <p>{warehouse.location}</p>
                    </a>
                ))}
            </div>
        </div>

    )
}

export default Warehouse
