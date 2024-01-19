import { createContext, useState, useEffect, useCallback } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";



export const chatContext = createContext();

export const chatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null)

    useEffect(() => {
        const getUsers = async () => {
            const res = await getRequest(`${baseUrl}/users`);

            if (res.error) {
                return console.log('error fetching users', res);
            };

            const pChats = res.filter((u) => {
                let isChatCreated = false;
                if (user?._id === u._id) return false;

                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                };

                return !isChatCreated;

            })
            setPotentialChats(pChats)
        }
        getUsers()
    }, [userChats])

    useEffect(() => {
        const getUserChats = async () => {
            if(user?._id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);
                const res = await getRequest(`${baseUrl}/chats/${user?._id}`);

                setIsUserChatsLoading(false);

                if(res.error){
                    return setUserChatsError(res)
                }

                setUserChats(res);
            }
        }
        getUserChats()
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
        
            setIsMessagesLoading(true);
            setMessagesError(null);
            const res = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

            setIsMessagesLoading(false);

            if(res.error){
                return setMessagesError(res)
            }

            setMessages(res);
    
        }
        getMessages()
    }, [user]);

    const sendTextMessage = useCallback( async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!text) return console.log("You have to type something");
        const res = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            sender: sender._id,
            text: textMessage,
        }))

        if(res.error){
            return setSendTextMessageError(res)
        }
        setNewMessage(res);
        setMessages((prev) => [...prev, res])
        setTextMessage("");
    }, [])
    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    }, [])

    const createChat = useCallback( async (firstId, secondId)=> {
        const res = await postRequest(`${baseUrl}/chats/`, JSON.stringify({firstId, secondId}))

        if(res.error) {
            return console.log('Error creating chat', res)
        }

        setUserChats((prev) => [...prev, res])
    },[])
    return (
        <ChatContext.Provider value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            createChat,
            updateCurrentChat,
            messages,
            isMessagesLoading,
            messagesError,
            currentChat,
            sendTextMessage
        }}>{children}</ChatContext.Provider>
    )
}