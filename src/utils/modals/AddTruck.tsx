function AddTruck() {
    return (
        <form action="" method="POST">
            <h2 className="text-xl font-semibold text-center">Add Truck</h2>
            <div className="my-4 flex gap-4">
                <label htmlFor="">Truck number</label>
                <input type="text"/>
            </div>
            <button type="submit" className="px-4 bg-blue-400 text-white block w-full">Add</button>
        </form>
    )
}

export default AddTruck;