import { useState } from "react"
import { CreateButton, JoinButton, RoomContainer, RoomIdInput } from "./room.styles";
import { Title } from "../gameContainer/container.styles";
import SelectRoom from "./SelectRoom";
import { Link } from "react-router-dom";
import useCreateRoom from "../../hooks/useCreateRoom";
import useJoinRoom from "../../hooks/useJoinRoom";

export const JoinRoom = () => {

    const [joinRoom, setJoin] = useState(false);

    const {
        handleRoomNameValue,
        handleCreateRoom,
        username,
        isJoining,
        roomName,
        playerId
    } = useCreateRoom();

    const { handleJoinRoom } = useJoinRoom();
    
    return (
        <form>
            <RoomContainer>
            <div className='w-1/2 text-xl py-4 text-gray-300 font-thin text-center'>
              Hi - <span className="text-green-300">{username}</span>!
            </div>
                
                <div>
                    <Title>Create or Join a Room</Title>
                    {!joinRoom ? (
                        <RoomIdInput
                            placeholder="Write a room name..."
                            name="roomName"
                            value={roomName}
                            onChange={handleRoomNameValue}
                        />
                    
                    ) : (
                        <>
                            <SelectRoom />
                        </>
                    )}
                    
                    {!joinRoom ? (
                        <div>
                            <CreateButton 
                                    type="button"
                                    disabled={isJoining}
                                    onClick={handleCreateRoom}
                                >
                                { isJoining ? <span className="loading loading-spinner loading-md text-gray-300"></span> : "Create a Room" }
                            </CreateButton>
                        </div>      
                    ) : (
                        <div>
                            <JoinButton
                                type="button"
                                    disabled={isJoining}
                                    onClick={handleJoinRoom}
                                >
                                {isJoining ? <span className="loading loading-spinner loading-md text-gray-300"></span> : "Join the room"}
                            </JoinButton>
                        </div>
                    )}

                    {!joinRoom ? (
                        <span
                        className="text-gray-400 text-sm hover:underline hover:text-gray-300 font-normal mt-4 inline-block cursor-pointer border border-cyan-700 p-2 rounded-md"
                        onClick={() => setJoin(true)}
                        >
                           <Link to={"/dashboard"}>Want to join an existing room? - Click here to join one!</Link> 
                        </span>
                    ) : (
                        <span
                        className="text-gray-400 text-sm hover:underline hover:text-gray-300 font-normal mt-4 inline-block cursor-pointer border border-cyan-700 p-2 rounded-md"
                        onClick={() => setJoin(false)}
                        >
                            <Link to={`/${playerId}`}>Want to create your own room? - Click here to create one</Link>!
                        </span>
                    )}
                </div>       

            </RoomContainer>
        </form>
    )
}