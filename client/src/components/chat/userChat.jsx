import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
//import {undraw_Dog_c7i6} from "../../assets/undraw_Dog_c7i6.svg"

//change the image format from .png to .svg
//add the image <img src={undraw_Dog_c7i6} height="35px"/>

const UserChat = ({chat, user}) => {

    const {recipientUser} = useFetchRecipientUser(chat, user);
    console.log(recipientUser)
    return (  <Stack direction="horizontal"
    gap={3}
    className="user-card align-items-center p-2 justify-content-between"
    role="button" >
        <div className="d-flex">
            <div className="me-2">
            </div>
            <div className="text-content">
                
            <div className="name">{recipientUser?.name}</div>
            <div className="text">Text message</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">12/12/2024</div>
            <div className="this-user-notifications">2</div>
            <span className="user-online"></span>
        </div>
    </Stack>);
}
 
export default UserChat;