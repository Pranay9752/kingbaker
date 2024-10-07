import React, { useState, useRef } from "react";

const OtpInput = ({
  otpLength = 6,
  onSubmitOtp,
  resendOtp,
  phoneNumber = "+91 ******876",
  isResendEnabled = true,
  resendTimer = 60,
}) => {
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(resendTimer);

  const inputRefs = useRef([]);

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input field
      if (index < otpLength - 1) {
        inputRefs.current[index + 1].focus();
      }

      // Automatically submit if all fields are filled
      if (newOtp.every((digit) => digit !== "")) {
        handleSubmitOtp(newOtp);
      }
    }
  };

  // Handle backspace
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index]) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Handle OTP submission
  const handleSubmitOtp = (otpArray) => {
    const otpValue = otpArray.join("");
    setIsSubmitting(true);

    // Call the provided onSubmitOtp function
    onSubmitOtp(otpValue)
      .then(() => {
        setIsSubmitting(false);
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    if (isResendEnabled && timer === 0) {
      resendOtp();
      setTimer(resendTimer);
    }
  };

  // Timer logic
  React.useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  return (

          <div className="w-full">
            <div className="bg-white h-64 py-3 rounded text-center">
              <h1 className="text-2xl font-bold">OTP Verification</h1>
              <div className="flex flex-col mt-4">
                <span>Enter the OTP you received at</span>
                <span className="font-bold">{phoneNumber}</span>
              </div>

              <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    className="m-2 border h-10 w-10 text-center form-control rounded focus:border-blue-700"
                    type="text"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>

              <div className="flex justify-center text-center mt-5">
                {isResendEnabled && (
                  <button
                    className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"
                    onClick={handleResendOtp}
                    disabled={timer > 0}
                  >
                    <span className="font-bold">Resend OTP</span>
                    {timer > 0 && <span className="ml-1">({timer}s)</span>}
                  </button>
                )}
              </div>

              {isSubmitting && <p className="mt-2 text-green-500">Submitting...</p>}
            </div>
          </div>
       
  );
};

export default OtpInput;
