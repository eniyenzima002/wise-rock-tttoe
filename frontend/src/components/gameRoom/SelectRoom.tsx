import Select from "react-select";
import useJoinRoom from "../../hooks/useJoinRoom";

const SelectRoom = () => {
    const { handleChange, isLoading, isError, rooms, options } = useJoinRoom();
    
    return (
        <div className="w-auto m-auto">
            {isLoading && <p className="text-white">Loading rooms</p>}
            {isError && <p className="text-white">Some went wrong.</p>}
            {!isLoading && rooms && (
                <Select
                    options={options}
                    onChange={handleChange}
                    placeholder="Select a room"
                    noOptionsMessage={() => "No room available."}
                    className="w-full max-w-xs mb-3 m-auto bg-cyan-900 opacity-90"
                    isSearchable
                />
            )}
        </div>
    )
}
export default SelectRoom