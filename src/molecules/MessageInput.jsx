import { useState } from "react";
import Input from "../atom/inputs/input";


const MessageInput = () => {
    const [message, setMessage] = useState('');
    return (
        <Input
            placeholder="Message On Cake"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full py-3 mt-3 border-2 rounded-lg  "
        />

    );
};

export default MessageInput;