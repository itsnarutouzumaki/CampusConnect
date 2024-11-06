import React, { useState } from 'react';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex justify-center align-middle m-4">
      <section className="max-w-sm w-full p-6 bg-slate-400 rounded-lg shadow-lg relative">
        <header className="text-2xl text-white font-semibold text-center mb-4">Contact Us</header>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="h-12 p-2 rounded border-none bg-white text-gray-700 placeholder-gray-400"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="h-12 p-2 rounded border-none bg-white text-gray-700 placeholder-gray-400"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows="4"
            className="p-2 rounded border-none bg-white text-gray-700 placeholder-gray-400 max-h-40 resize-none overflow-auto scrollbar-hidden"
            value={formData.message}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="Send Message"
            className="h-12 bg-blue-500 text-white font-medium rounded cursor-pointer hover:bg-blue-600 transition duration-300"
          />
        </form>
      </section>
    </div>
  );
};

export default ContactUsForm;
