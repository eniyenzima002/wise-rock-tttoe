import { FaRegCircleUser } from "react-icons/fa6"
import { GiTabletopPlayers } from "react-icons/gi"
import { useAppSelector } from "../../redux/app/hooks"
import { TitleOne } from "../gameContainer/container.styles";
import { selectAuth } from "../../redux/features/authSlice";

const Header = () => {
    const { username } = useAppSelector(selectAuth);
    
    return (
        <header className="flex items-center justify-between px-4 text-gray-300 font-normal bg-cyan-800 py-2">
            <div className="flex items-center gap-1">
                <span className="text-cyan-300 text-2xl">
                    <GiTabletopPlayers />
                </span>
            </div>
            <TitleOne>Wise Rock - <span className="text-cyan-300 text-xs">Tic Tac Toe</span></TitleOne>
            <div className="flex items-center gap-1">
                <p className="text-gray-300">{username}</p>
                <span className="text-gray-300 text-xl relative">
                    <FaRegCircleUser className="text-2xl"/>
                    <span className="absolute top-0 right-0">{ username && (<div className="bg-green-400 p-1 rounded"></div>)}</span>
                </span>
            </div>
        </header>
    )
}
export default Header