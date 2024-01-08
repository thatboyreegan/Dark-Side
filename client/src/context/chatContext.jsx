import { createContext, useState, useEffect } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";
import { create } from "../../../server/models/messageModel";


export const chatContext = createContext();
export const chatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const res = await getRequest(`${baseUrl}/users`);

            if (res.error) {
                return console.log('error fetching users', res);
            };

            const pChats = res.filter((u) => {
                let isChatCreated = false;
                if (user._id === u._id) return false;

                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                };

                return !isChatCreated;

            })
            setPotentialChats(pChats)
        }
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
    }, [])
    return (
        <chatContext.Provider value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            createChats
        }}>{children}</chatContext.Provider>
    )
}