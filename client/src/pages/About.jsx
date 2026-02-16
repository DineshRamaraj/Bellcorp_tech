
import React from 'react';

const About = () => {
    return (
        <div className="pt-24 min-h-screen bg-[#FAFAF9] text-slate-800">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-20">
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgb(0,0,0,0.06)] border border-stone-100 p-10 md:p-14">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-8 border-b border-stone-100 pb-6">About Us</h1>

                    <div className="space-y-8 text-lg font-light text-slate-600 leading-relaxed">
                        <p>
                            Welcome to <span className="font-bold text-slate-800">BellcorpEvents</span>, your premier platform for discovering and managing events that matter.
                            We believe in the power of connection and the memorable experiences that events bring to our lives.
                        </p>

                        <p>
                            Founded in 2024, our mission is to simplify the event management process for organizers while providing
                            a seamless and engaging discovery experience for attendees. Whether you're looking for professional workshops,
                            music festivals, or community gatherings, BellcorpEvents connects you to the moments that inspire.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 transition-transform hover:-translate-y-1 duration-300">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
                                <p className="text-sm">To empower creators and communities through seamless event experiences.</p>
                            </div>
                            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 transition-transform hover:-translate-y-1 duration-300">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
                                <p className="text-sm">A world where every event is an opportunity for connection and growth.</p>
                            </div>
                            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 transition-transform hover:-translate-y-1 duration-300">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Our Values</h3>
                                <p className="text-sm">Innovation, Community, and Excellence in everything we do.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
