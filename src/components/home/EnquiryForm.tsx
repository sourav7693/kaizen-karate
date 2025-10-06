import { useState } from "react";
import toast from "react-hot-toast";

const EnquiryForm = () => {
   const [form, setForm] = useState({
     name: "",
     mobile: "",
     from: "",
     to: "",
     message: "",
   });
   const handleSubmit = (e : React.FormEvent) => {
     e.preventDefault();

     if (!form.name || !form.mobile || !form.from || !form.to || !form.message) {
       toast.error("Please fill all the fields");
       return;
     }

     if (form.mobile.length !== 10) {
       toast.error("Please enter a valid mobile number");
       return;
     }

     const dest = "+919800107777";
     let message = `*Name:* ${form.name}
    *Phone:* ${form.mobile}
    *Location from: * ${form.from}
    *Location to: * ${form.to}
    *Message:* ${form.message}
      `;
     message = encodeURIComponent(message);
     // Check if user is on mobile
     const isMobile = /iPhone|Android|iPad|iPod/i.test(navigator.userAgent);
     const baseUrl = isMobile
       ? "https://api.whatsapp.com/send"
       : "https://web.whatsapp.com/send";

     const url = `${baseUrl}?phone=${dest}&text=${message}`;

     try {
       const newWindow = window.open(url, "_blank");
       if (newWindow) {
         newWindow.focus();
       } else {
         toast.error("Failed to open the link. Please check your browser settings.");
       }
     } catch (error) {
       console.error("Error opening new window:", error);
     }
   };

  return (
    <div className="flex flex-col items-center gap-8 justify-between flex-grow">
      <h1 className="text-3xl font-bold text-defined-blue text-center">
        Get Your Free Moving <br />{" "}
        <span className="text-defined-purple">Quote Today!</span>
      </h1>

      <form className="flex flex-col items-center gap-6 w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="w-full px-4 py-2 placeholder:text-defined-blue border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="mobile"
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          placeholder="Number"
          className="w-full px-4 py-2 placeholder:text-defined-blue border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="from"
          onChange={(e) => setForm({ ...form, from: e.target.value })}
          placeholder="From Location"
          className="w-full px-4 py-2 placeholder:text-defined-blue border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="to"
          onChange={(e) => setForm({ ...form, to: e.target.value })}
          placeholder="To Location"
          className="w-full px-4 py-2 placeholder:text-defined-blue border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="message"
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Message"
          className="w-full px-4 py-2 placeholder:text-defined-blue border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-1/2 px-4 py-2 text-white pink-blue rounded-md hover:bg-defined-purple focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
