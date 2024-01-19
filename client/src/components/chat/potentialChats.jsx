import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { chatContext } from "../../context/chatContext";

const potentialChats = () => {
    const {user} = useContext(AuthContext  )
    const { potentialChats, createChat } = useContext(chatContext);

    return (
        <>
            <div className="all-users">{
            potentialChats && potentialChats.map((u, index) => {
                return (
                    <div className="single-user" key={index} onClick={() => createChat(user._id, u._id)}>
                        {u.name}
                        <span className="user-online"></span>
                    </div>
                )
            })}</div>
        </>
    )
}

export default potentialChats;