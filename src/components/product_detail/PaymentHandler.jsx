// components/POSTHandler.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const POSTHandler = () => {
  const { taxId } = useParams();

  useEffect(() => {
    // Auto-submit a hidden form to send POST data to your backend
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `https://kingsbakerbackend-production.up.railway.app/api/verify?txnid=${taxId}`; // Your backend endpoint

    // Add hidden fields from PayU's response (example fields)
    const fields = ["status", "hash", "txnid", "amount"];
    fields.forEach((field) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = field;
      input.value = new URLSearchParams(window.location.search).get(field);
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  }, [taxId]);

  return <div>Processing payment...</div>;
};

export default POSTHandler;