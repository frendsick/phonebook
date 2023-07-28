const Filter = ({ filterState, setFilterState }) => {
    const handleFilterChange = (event) => setFilterState(event.target.value);

    return (
        <form>
            <div>
                filter shown with <input value={filterState} onChange={handleFilterChange} />
            </div>
        </form>
    );
};

export default Filter;
