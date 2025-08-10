
// Razorpay configuration and payment handling

const RAZORPAY_KEY_ID = "rzp_live_Hbb0xWmV2mFsEH"; // Your live Razorpay key

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const makePayment = async (planDetails) => {
  const res = await initializeRazorpay();

  if (!res) {
    alert("Razorpay SDK Failed to load");
    return;
  }

  // Create order data
  const orderData = {
    amount: planDetails.price * 100, // Convert to paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: orderData.amount,
    currency: orderData.currency,
    name: "DPIcon",
    description: `${planDetails.name} Plan`,
    image: "/favicon.ico",
    order_id: orderData.receipt,
    handler: function (response) {
      console.log("Payment successful! Payment ID:", response.razorpay_payment_id);
      alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      
      // You can add logic here to update user credits in your preferred storage
      // For now, we'll just log the plan details
      console.log("Plan purchased:", planDetails);
      
      return {
        success: true,
        paymentId: response.razorpay_payment_id,
        credits: planDetails.credits
      };
    },
    prefill: {
      name: "User",
      email: "user@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "DPIcon Corporate Office",
    },
    theme: {
      color: "#9333ea",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
