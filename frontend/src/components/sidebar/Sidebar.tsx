import ActivePlayers from "./ActivePlayers";
import Logout from "./Logout";

const Sidebar = () => {
    return (
        <div className="border-r border-cyan-900 pb-4 flex flex-col absolute inset-y-0 left-0 md:min-w-[200px]">
            <h1 className="text-gray-300 font-normal px-4 bg-cyan-900 hover:bg-cyan-950 hover:font-light py-2 uppercase">Dash<span className="text-amber-600">board</span></h1>
            <h2 className="px-4 pt-6 pb-3 text-cyan-400 text-xl">Other Players</h2>
            <ActivePlayers />
            <Logout />
        </div>
    )
}
export default Sidebar