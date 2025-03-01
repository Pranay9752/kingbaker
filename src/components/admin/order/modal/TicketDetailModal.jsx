// import { format } from "date-fns";
// import BasicButton2 from "../../../../atom/button/BasicButton2";

// const TicketDetailsModal = ({ ticket, onClose }) => {
//     console.log('ticket: ', ticket);
//   if (!ticket) return null;

//   return (
//     <div className="">
//       <h2 className="text-lg font-semibold mb-4 capitalize">
//       {ticket?.query ?? ""}{" "}
//       {ticket?.subquery && `> ${ticket?.subquery}`}
//       </h2>
//       <p className="text-sm text-gray-600">
//         Reference No: {ticket.reference_number}
//       </p>

//       <div className="border-b my-4"></div>

//       {/* Add additional info section */}
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         Add additional information to your question
//       </label>
//       <textarea
//         className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         rows="4"
//       ></textarea>

//       <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
//         Attach additional documents to your question
//       </label>
//       <BasicButton2 title="Choose Files" />

//       {/* Communication History */}
//       <div className="mt-6">
//         <h3 className="text-md font-semibold mb-2">Communication History</h3>

//         {ticket.chat.map((chat, index) => (
//           <div key={index} className="mb-4">
//             <p className="text-sm text-gray-600">
//               {chat.user_name} wrote:{" "}
//               <span className="text-xs">
//                 {format(new Date(chat.date), "yyyy-MM-dd HH:mm:ss")}
//               </span>
//             </p>
//             <p className="mt-2 bg-gray-100 p-2 rounded-lg">{chat.text}</p>
//           </div>
//         ))}
//       </div>

//       {/* Additional Details */}
//       <div className="mt-6 flex justify-between">
//         <div>
//           <p className="text-sm">
//             <strong>Email:</strong> cakessongoofficial@gmail.com
//           </p>
//           <p className="text-sm">
//             <strong>Reference Number:</strong> {ticket.reference_number}
//           </p>
//           <p className="text-sm">
//             <strong>Status:</strong> {ticket.status}
//           </p>
//         </div>
//         <div>
//           <p className="text-sm">
//             <strong>Created:</strong>{" "}
//             {format(new Date(ticket.createdAt), "yyyy-MM-dd HH:mm:ss")}
//           </p>
//           <p className="text-sm">
//             <strong>Order ID:</strong> {ticket.sub_orderId}
//           </p>
//         </div>
//       </div>

//       <div className="mt-6 text-right">
//         <BasicButton2
//           title="Submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//           onClick={onClose}
//         />
//       </div>
//     </div>
//   );
// };

// export default TicketDetailsModal;
import React, { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isValid } from "date-fns";
import { useUpdateTicketMutation } from "../../../../redux/apiSlices/admin/tickets";
import getCookie from "../../../../atom/utils/getCookies";

export const Button = forwardRef(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref
  ) => {
    const baseStyles =
      "font-medium rounded-md transition-colors focus:outline-none  ";
    const variantStyles = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      ghost: "text-gray-700 hover:bg-gray-100",
    };
    const sizeStyles = {
      default: "px-4 py-2 text-sm",
      sm: "px-3 py-1 text-xs",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none  ${className}`}
      {...props}
    />
  );
});

export const ScrollArea = forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`overflow-auto ${className}`}
        style={{ scrollbarWidth: "thin", scrollbarColor: "#CBD5E0 #EDF2F7" }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// const TicketDetailsModal = ({ ticket, onClose }) => {
//     console.log('ticket: ', ticket);
//   const [newMessage, setNewMessage] = useState("");

//   if (!ticket) return null;

//   const containerVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.3, type: "spring", stiffness: 120 },
//     },
//     exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
//   };

//   const chatItemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//   };

//   return (
//         <motion.div
//           className=" w-full max-w-2xl overflow-hidden"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           <>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 {ticket?.query ?? ""}{" "}
//                 {ticket?.subquery && (
//                   <span className="text-gray-500">&gt; {ticket?.subquery}</span>
//                 )}
//               </h2>
//               <Button variant="ghost" size="icon" onClick={onClose}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   className="h-6 w-6"
//                 >
//                   <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
//                 </svg>
//               </Button>
//             </div>

//             <p className="text-sm text-gray-600 mb-4">
//               Reference No: {ticket.reference_number}
//             </p>

//             <ScrollArea className="h-[400px] pr-4">
//               {ticket.chat.map((chat, index) => (
//                 <motion.div
//                   key={index}
//                   className={`mb-4 ${
//                     chat.user_name === "You" ? "text-right" : ""
//                   }`}
//                   variants={chatItemVariants}
//                   initial="hidden"
//                   animate="visible"
//                 >
//                   <div
//                     className={`inline-block max-w-[80%] ${
//                       chat.user_name === "You"
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-100 text-gray-800"
//                     } p-3 rounded-lg`}
//                   >
//                     <p className="text-sm font-semibold mb-1">
//                       {chat.user_name}
//                     </p>
//                     <p>{chat.text}</p>
//                     <p className="text-xs mt-1 opacity-70">
//                       {format(new Date(chat.date), "MMM d, yyyy HH:mm")}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </ScrollArea>

//             <div className="mt-4">
//               <Textarea
//                 placeholder="Type your message here..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="w-full p-3 border rounded-lg "
//                 rows={3}
//               />
//               <div className="flex justify-between items-center mt-2">
//                 <Button variant="outline" size="sm" className="flex items-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     className="h-4 w-4 mr-2"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   Attach Files
//                 </Button>
//                 <Button className="bg-blue-500 hover:bg-blue-600 flex items-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     className="h-4 w-4 mr-2"
//                   >
//                     <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
//                   </svg>
//                   Send Message
//                 </Button>
//               </div>
//             </div>

//             <motion.div
//               className="mt-6 text-sm text-gray-600"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//             >
//               <p>
//                 <strong>Email:</strong> {ticket.email}
//               </p>
//               <p>
//                 <strong>Status:</strong> {ticket.status}
//               </p>
//               <p>
//                 <strong>Created:</strong>{" "}
//                 {format(new Date(ticket.createdAt), "MMMM d, yyyy")}
//               </p>
//               <p>
//                 <strong>Order ID:</strong> {ticket.sub_orderId}
//               </p>
//             </motion.div>
//           </>
//         </motion.div>

//   );
// };

const TicketDetailsModal = ({ ticket, onClose, darkMode= false, isOwner = false }) => {
  const [chatMessages, setChatMessages] = useState(ticket.chat);
  const [newMessage, setNewMessage] = useState("");

  if (!ticket) return null;

  const [updateTicket, { isLoading }] = useUpdateTicketMutation();

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, type: "spring", stiffness: 120 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const chatItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const dataBody = {
        Updated_By: isOwner ? "Jojo Cart" : "By You",
        user_name: getCookie("user"),
        text: newMessage,
        reference_number: ticket.reference_number,
      };
      updateTicket({ body: dataBody })
        .then((data) => {
          console.log("data: ", data);

          const newChatMessage = {
            Updated_By: "By You",
            user_name: getCookie("user"),
            text: newMessage,
            document: "",
            _id: Date.now().toString(),
            date: new Date().toISOString(),
          };

          setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
          setNewMessage("");
        })
        .catch((error) => {
            toast.error("Something Went wrong@")
          return;
        });
    }
  };

  return (
    // <AnimatePresence>
    //   <motion.div
    //     className="w-full max-w-4xl overflow-hidden "
    //     variants={containerVariants}
    //     initial="hidden"
    //     animate="visible"
    //     exit="exit"
    //   >
    //     <div className="hide-scrollbar">
    //       <div className="flex justify-between items-center mb-4">
    //         <h2 className="text-lg font-bold text-gray-800 flex items-center capitalize">
    //           {ticket?.query ?? ""}{" "}
    //           {ticket?.subquery && (
    //             <span className="text-gray-500 flex items-center">
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 viewBox="0 0 20 20"
    //                 fill="currentColor"
    //                 className="size-7"
    //               >
    //                 <path
    //                   fillRule="evenodd"
    //                   d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
    //                   clipRule="evenodd"
    //                 />
    //               </svg>
    //               {ticket?.subquery}
    //             </span>
    //           )}
    //         </h2>
    //         <Button variant="ghost" size="icon" onClick={onClose}>
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             viewBox="0 0 20 20"
    //             fill="currentColor"
    //             className="h-6 w-6"
    //           >
    //             <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    //           </svg>
    //         </Button>
    //       </div>

    //       <p className="text-sm text-gray-600 mb-4">
    //         Reference No: {ticket.reference_number}
    //       </p>

    //       <ScrollArea className="h-[63vh] pr-4">
    //         <AnimatePresence>
    //           {Array.isArray(chatMessages) && chatMessages.map((chat, index) => (
    //             <motion.div
    //               key={chat._id}
    //               className={`mb-4 ${
    //                 chat.Updated_By === "By You" ? "text-right" : ""
    //               }`}
    //               variants={chatItemVariants}
    //               initial="hidden"
    //               animate="visible"
    //               layout
    //             >
    //               <div
    //                 className={`inline-block max-w-[80%] ${
    //                   chat.Updated_By === "By You"
    //                     ? "bg-blue-500 text-white"
    //                     : "bg-gray-100 text-gray-800"
    //                 } p-3 rounded-lg`}
    //               >
    //                 <p className="text-sm font-semibold mb-1">
    //                   {chat.user_name}
    //                 </p>
    //                 <p className="break-words">{chat.text}</p>
    //                 <p className="text-xs mt-1 opacity-70">
    //                   {format(new Date(chat.date), "MMM d, yyyy HH:mm")}
    //                 </p>
    //               </div>
    //             </motion.div>
    //           ))}
    //         </AnimatePresence>
    //       </ScrollArea>
    //       {isLoading && (
    //         <div class="flex flex-row gap-1 justify-center">
    //           <div class="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
    //           <div class="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
    //           <div class="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
    //         </div>
    //       )}
    //       <div className="mt-4">
    //         <Textarea
    //           placeholder="Type your message here..."
    //           value={newMessage}
    //           onChange={(e) => setNewMessage(e.target.value)}
    //           className="w-full p-3 border rounded-lg "
    //           rows={3}
    //         />
    //         <div className="flex justify-between items-center mt-2">
    //           <Button variant="outline" size="sm" className="flex items-center">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 20 20"
    //               fill="currentColor"
    //               className="h-4 w-4 mr-2"
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"
    //                 clipRule="evenodd"
    //               />
    //             </svg>
    //             Attach Files
    //           </Button>
    //           <Button
    //             className="bg-blue-500 hover:bg-blue-600 flex items-center"
    //             onClick={handleSendMessage}
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 20 20"
    //               fill="currentColor"
    //               className="h-4 w-4 mr-2"
    //             >
    //               <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
    //             </svg>
    //             Send Message
    //           </Button>
    //         </div>
    //       </div>

    //       <motion.div
    //         className="mt-6 text-sm text-gray-600"
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ delay: 0.3, duration: 0.5 }}
    //       >
    //         <p>
    //           <strong>Email:</strong> {ticket.email}
    //         </p>
    //         <p>
    //           <strong>Status:</strong> {ticket.status}
    //         </p>
    //         <p>
    //           <strong>Created:</strong>{" "}
    //           {isValid(ticket?.createdAt) ? format(new Date(ticket?.createdAt), "MMMM d, yyyy") : ""}
    //         </p>
    //         <p>
    //           <strong>Order ID:</strong> {ticket.sub_orderId}
    //         </p>
    //       </motion.div>
    //     </div>
    //   </motion.div>
    // </AnimatePresence>
    <AnimatePresence>
    <motion.div
      className={`w-full max-w-4xl overflow-hidden ${
        darkMode ? 'bg-[#1a1f25] text-white' : 'bg-white text-gray-800'
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="hide-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-bold flex items-center capitalize ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {ticket?.query ?? ""}{" "}
            {ticket?.subquery && (
              <span className={`flex items-center ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                {ticket?.subquery}
              </span>
            )}
          </h2>
          <Button
            variant={darkMode ? "ghost" : "ghost"}
            size="icon"
            onClick={onClose}
            className={darkMode ? 'hover:bg-gray-800' : ''}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </Button>
        </div>

        <p className={`text-sm mb-4 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Reference No: {ticket.reference_number}
        </p>

        <ScrollArea className="h-[63vh] pr-4">
          <AnimatePresence>
            {Array.isArray(chatMessages) && chatMessages.map((chat) => (
              <motion.div
                key={chat._id}
                className={`mb-4 ${
                  chat.Updated_By === "By You" ? "text-right" : "text-left"
                }`}
                variants={chatItemVariants}
                initial="hidden"
                animate="visible"
                layout
              >
                <div
                  className={`inline-block max-w-[80%] ${
                    chat.Updated_By === "By You"
                      ? "bg-blue-500 text-white"
                      : darkMode 
                        ? "bg-[#22272e] text-gray-200"
                        : "bg-gray-100 text-gray-800"
                  } p-3 rounded-lg`}
                >
                  <p className="text-sm font-semibold mb-1">
                    {chat.user_name}
                  </p>
                  <p className="break-words">{chat.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {format(new Date(chat.date), "MMM d, yyyy HH:mm")}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
        
        {isLoading && (
          <div className="flex flex-row gap-1 justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
          </div>
        )}
        
        <div className="mt-4">
          <Textarea
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`w-full p-3 border rounded-lg ${
              darkMode 
                ? 'bg-[#22272e] border-gray-700 text-white placeholder-gray-400'
                : 'bg-white border-gray-200'
            }`}
            rows={3}
          />
          <div className="flex justify-between items-center mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={`flex items-center ${
                darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : ''
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z"
                  clipRule="evenodd"
                />
              </svg>
              Attach Files
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 flex items-center"
              onClick={handleSendMessage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 mr-2"
              >
                <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
              </svg>
              Send Message
            </Button>
          </div>
        </div>

        <motion.div
          className={`mt-6 text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p>
            <strong className={darkMode ? 'text-gray-300' : ''}>Email:</strong> {ticket.email}
          </p>
          <p>
            <strong className={darkMode ? 'text-gray-300' : ''}>Status:</strong> {ticket.status}
          </p>
          <p>
            <strong className={darkMode ? 'text-gray-300' : ''}>Created:</strong>{" "}
            {isValid(ticket?.createdAt) ? format(new Date(ticket?.createdAt), "MMMM d, yyyy") : ""}
          </p>
          <p>
            <strong className={darkMode ? 'text-gray-300' : ''}>Order ID:</strong> {ticket.sub_orderId}
          </p>
        </motion.div>
      </div>
    </motion.div>
  </AnimatePresence>
  );
};

export default TicketDetailsModal;
