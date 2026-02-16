
import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to a backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="pt-24 min-h-screen bg-[#FAFAF9] text-slate-800">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-20">
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgb(0,0,0,0.06)] border border-stone-100 p-10 md:p-14">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-8 border-b border-stone-100 pb-6">Contact Us</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <p className="text-lg font-light text-slate-600 leading-relaxed">
                                We'd love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
                            </p>

                            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 space-y-4">
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">Email</h4>
                                    <p className="text-lg text-blue-600 font-medium">support@bellcorpevents.com</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">Address</h4>
                                    <p className="text-slate-600">123 Event Horizon Blvd, Suite 101<br />San Francisco, CA 94107</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white">
                            {submitted ? (
                                <div className="bg-green-50 text-green-700 p-6 rounded-2xl border border-green-100 text-center">
                                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                                    <p>Thank you for contacting us. We'll get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-bold text-slate-700">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="bg-stone-50 border border-stone-200 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-bold text-slate-700">Your Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="bg-stone-50 border border-stone-200 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-colors"
                                            placeholder="name@company.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block mb-2 text-sm font-bold text-slate-700">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="4"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="bg-stone-50 border border-stone-200 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-colors"
                                            placeholder="How can we help you?"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-bold rounded-xl text-sm px-5 py-4 text-center shadow-lg shadow-slate-900/10 transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
