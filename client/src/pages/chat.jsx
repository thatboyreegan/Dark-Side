import { useContext } from "react";
import { chatContext } from "../context/chatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/userChat";

const Chat = () => {
    const { user } = useContext(AuthContext)

    const {userChats,
        isUserChatsLoading,
        userChatsError} = useContext(chatContext)
    return (
    <Container>{userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}
            {userChats?.map((chat, index) => {
                return (
                    <div key={index}>
                        <UserChat chat={chat} user={user}/>
                    </div>
                )
            })}</Stack>
            <p>Chatbox</p>
        </Stack>
    )}
    </Container>)
}

export default Chat;