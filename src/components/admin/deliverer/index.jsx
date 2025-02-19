import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ModalWrapper from "../../../molecules/wrappers/ModalWrapper";
import HeaderLayout from "../../../molecules/header/HeaderLayout";
import {
  useCreateSalesmanMutation,
  useDeliveryOtpVerifyMutation,
  useGetSalesmanQuery,
  useSendDeliveryOtpMutation,
  useUpdateSalesmanMutation,
} from "../../../redux/apiSlices/admin/delivery-boy";
import BasicButton2 from "../../../atom/button/BasicButton2";
import DeliveryBoyModal from "./modal/DeliveryBoyModal";
import ResetPasswordModal from "./modal/ResetPasswordModal";
import OtpInput from "../../../atom/inputs/OtpInput";
import getCookie from "../../../atom/utils/getCookies";

const DeliveryBoysManagement = () => {
  const [users, setUsers] = useState([]);

  const { data, isLoading } = useGetSalesmanQuery();
  const [updateSalesman, { isLoading: updateSalesmanLoading }] =
    useUpdateSalesmanMutation();
  const [createSalesman, { isLoading: createSalesmanLoading }] =
    useCreateSalesmanMutation();
  const [sendDeliveryOtp, { isLoading: sendDeliveryOtpLoading }] =
    useSendDeliveryOtpMutation();
  const [deliveryOtpVerify, { isLoading: deliveryOtpVerifyLoading }] =
    useDeliveryOtpVerifyMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [showActive, setShowActive] = useState(true);
  const [showInactive, setShowInactive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      ((showActive && user.isActive) || (showInactive && !user.isActive))
  );

  const handleAddUser = () => {
    setCurrentUser(null);
    setShowForm(true);
  };

  const toggleIsActive = (e, _id) => {
    const response = updateSalesman({
      id: _id,
      data: {
        isActive: e.target.checked,
      },
    });
    setUsers((prev) => {
      const newArr = [...prev];

      const index = users.findIndex((item) => item?._id === _id);
      if (index == -1) return prev;
      newArr[index] = {
        ...newArr[index],
        isActive: e.target.checked,
      };
      return newArr;
    });
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowForm(true);
  };
  const handleResetUser = (user) => {
    setCurrentUser(user);
    setShowResetPassword(1);
  };

  const handleSaveUser = (userData) => {
    if (currentUser) {
      // Edit User
      const response = updateSalesman({
        id: userData?._id,
        data: {
          name: userData?.name || "",
          username: userData?.username || "",
          phoneNo: userData?.phoneNo || "",
          email: userData?.email || "",
        },
      });
      setUsers((prev) =>
        prev.map((user) =>
          user._id === currentUser._id ? { ...user, ...userData } : user
        )
      );
    } else {
      // Create User
      const newUser = {
        name: userData?.name,
        username: userData?.username,
        phoneNo: userData?.phoneNo,
        password: userData?.password,
        email: userData?.email,
        isActive: true,
        vendor_id: getCookie("_id"),
      };

      const response = createSalesman({
        data: newUser,
      }).unwrap();
      setUsers([
        ...users,
        { ...userData, _id: response?.data?.salesmanId, isActive: true },
      ]);
    }
    setShowForm(false);
  };

  const handleResetPassword = (data) => {
    if (!data) return handleResetCancel();
    sendDeliveryOtp({ phoneNo: data?.phoneNo });
    setShowResetPassword(2);
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentUser(null);
  };

  const handleResetCancel = () => {
    setShowResetPassword(0);
    setCurrentUser(null);
  };

  useEffect(() => {
    if (data) setUsers(data?.salesman ?? []);
  }, [data]);

  return (
    <HeaderLayout
      _id={-1}
      logoSrc="https://i.ibb.co/LdtMrSfq/jojo-cart-logo-02.png"
      logoAlt="King Baker Logo"
      title="KING BAKER"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={` text-gray-800`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Delivery Boys</h1>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search delivery boy by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 absolute left-3 top-2.5 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <button
            onClick={handleAddUser}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 mr-2"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            Add New Users
          </button>
        </div>

        <div className="mb-6">
          <span className="mr-4">Filter by:</span>
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              checked={showActive}
              onChange={() => setShowActive(!showActive)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Active</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user._id}
              data-_id={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className={`rounded-lg shadow-md overflow-hidden bg-white`}
            >
              <div
                className={`p-4 ${
                  user.isActive ? "bg-green-100 " : "bg-red-100 "
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-6 text-gray-600"
                      >
                        <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h2 className="text-lg font-semibold">{user.name}</h2>
                      <p
                        className={`text-sm ${
                          user.isActive ? "text-green-700 " : "text-red-700 "
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        onChange={(e) => toggleIsActive(e, user._id)}
                        checked={user.isActive}
                        type="checkbox"
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-green-300  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      <span className="ml-3 text-sm  text-green-900 font-medium">
                        Active
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 mr-2 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>

                  <p>{user.phoneNo}</p>
                </div>
                <div className="mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 mr-2 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>

                  <p>{user.email}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <BasicButton2
                    className={`bg-blue-400 text-white`}
                    title={"Edit"}
                    onClick={() => handleEditUser(user)}
                    icon={
                      <>
                        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                      </>
                    }
                  />
                  <BasicButton2
                    className={`bg-gray-500 text-white`}
                    title={"Reset Password"}
                    onClick={() => handleResetUser(user)}
                    icon={
                      <path
                        fillRule="evenodd"
                        d="M8 7a5 5 0 1 1 3.61 4.804l-1.903 1.903A1 1 0 0 1 9 14H8v1a1 1 0 0 1-1 1H6v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 .293-.707L8.196 8.39A5.002 5.002 0 0 1 8 7Zm5-3a.75.75 0 0 0 0 1.5A1.5 1.5 0 0 1 14.5 7 .75.75 0 0 0 16 7a3 3 0 0 0-3-3Z"
                        clipRule="evenodd"
                      />
                    }
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <ModalWrapper
          isOpen={showForm}
          onClose={handleCancel}
          maxHeight={"88vh"}
        >
          <DeliveryBoyModal
            currentUser={currentUser}
            handleSaveUser={handleSaveUser}
            handleCancel={handleCancel}
          />
        </ModalWrapper>
        <ModalWrapper
          isOpen={showResetPassword == 1}
          onClose={handleResetCancel}
          maxHeight={"88vh"}
        >
          <ResetPasswordModal
            currentUser={currentUser}
            handleSaveUser={handleResetPassword}
            handleCancel={handleResetCancel}
          />
        </ModalWrapper>
        <ModalWrapper
          isOpen={showResetPassword == 2}
          onClose={handleResetCancel}
          maxHeight={"88vh"}
        >
          <OtpInput
            onSubmitOtp={(otp) =>
              deliveryOtpVerify({ phoneNo: currentUser?.phoneNo, otp: otp })
            }
            resendOtp={() => handleResetPassword(currentUser)}
            phoneNumber={"+91 ******"+currentUser?.phoneNo.substr(-3)}
            otpLength={6}
          />
        </ModalWrapper>
      </motion.div>
    </HeaderLayout>
  );
};

export default DeliveryBoysManagement;
