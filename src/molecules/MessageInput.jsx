import { useState } from "react";
import Input from "../atom/inputs/input";
import { useFormContext } from "react-hook-form";

const MessageInput = () => {
  return (
    <Input
      placeholder="Message"
      id={"msgOnCake"}
      // value={message}
      // onChange={(e) => setMessage(e.target.value)}
      validations={{
        maxLength: 2,
      }}
      className="w-full py-3 mt-3 border-2 rounded-lg  "
    />
  );
};

export default MessageInput;
