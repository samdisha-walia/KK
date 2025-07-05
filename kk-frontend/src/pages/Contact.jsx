function Contact() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow">
        <input
            type="text"
            placeholder="Your Name"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
            type="email"
            placeholder="Your Email"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
            placeholder="Your Message"
            className="border p-3 rounded md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
        ></textarea>
        <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded md:col-span-2 hover:bg-blue-700 transition"
        >
            Send Message
        </button>
        </form>

    </main>
  );
}

export default Contact;
