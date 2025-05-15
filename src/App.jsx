import React, { useState, useEffect } from 'react';
import '@fontsource/inter/index.css';
import heroBg from './assets/hero-bg.jpg';
import mobileServiceBg from './assets/mobile-service-bg.jpg'
import apiServiceBg from './assets/api-service-bg.jpg';
import webServiceBg from './assets/web-service-bg.jpg';
import refactorServiceBg from './assets/refactor-service-bg.jpg';
import uiuxServiceBg from './assets/uiux-service-bg.jpg';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);

  const [isDark, setIsDark] = useState(() => {
    return localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 2, spacing: 24 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 32 },
      },
    },
  });  

  useEffect(() => {
    const html = window.document.documentElement;
  
    if (isDark) {
      html.classList.add('dark');
      html.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  
    console.log("Theme switched to:", isDark ? "dark" : "light");
  }, [isDark]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORM_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <>
      {/* Dark Mode Toggle pinned in top-right */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className="text-sm px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 transition"
        >
          {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
  
      {/* Site container */}
      <div className="font-sans text-gray-500 dark:text-gray-100 transition-colors duration-300">
        {/* Hero section with full-width background */}
        <section className="relative w-full isolate">
          <div
            className="absolute inset-0 w-full h-full -z-10 bg-cover bg-center opacity-1000 dark:opacity-60"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
          <div className="text-center space-y-6 py-24 max-w-4xl mx-auto px-4">
            <h1 className="font-sans text-gray-100 dark:text-gray-100 text-5xl font-extrabold tracking-tight">Thomas Fuentes</h1>
            <p className="text-xl text-gray-100 dark:text-gray-100">
              Freelance Full-Stack Developer | React, Node.js, TypeScript, PostgreSQL
            </p>
            <a href="#contact">
              <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 dark:hover:bg-indigo-500 transition">
                Let’s Start Building
              </button>
            </a>
          </div>
        </section>
  
        {/* About Me Section */}
        <section className="max-w-4xl mx-auto px-4 py-20 space-y-6">
          <h2 className="text-3xl font-bold">About Me</h2>
          <p>
            I'm a Louisiana-based full-stack developer with 3.5 years of professional experience building scalable internal tools, custom UIs, and cloud-connected applications. I currently work as an Applications Developer for the State of Louisiana and contribute as a front-end developer at TAO Social.
          </p>
          <p>
            My focus is on performance, accessibility, and solving real-world problems with clean, maintainable code. Whether it's modernizing legacy systems or launching new products, I bring a thoughtful, user-first mindset to every project.
          </p>
        </section>

        <div className="border-t border-gray-200 dark:border-gray-700 my-20" />
  
        {/* Services Offered */}
        <section className="max-w-6xl mx-auto px-4 py-20 space-y-6">
          <h2 className="text-3xl font-bold mb-6">Services Offered</h2>

          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => slider.current?.prev()}
              className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:scale-105 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => slider.current?.next()}
              className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:scale-105 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            {/* 🎠 Carousel */}
            <div ref={sliderRef} className="keen-slider overflow-hidden touch-pan-x overscroll-contain">
              {[
                {
                  title: "Web Development",
                  desc: "Responsive, fast, and accessible websites built using React, Vite, and TailwindCSS.",
                },
                {
                  title: "Mobile App Development",
                  desc: "Cross-platform mobile apps built with React Native and Expo, deployed to iOS and Android.",
                },
                {
                  title: "Backend/API Development",
                  desc: "REST APIs and backend services using Node.js, Express, PostgreSQL, and secure auth with JWT/Bcrypt.",
                },
                {
                  title: "Code Refactoring & Optimization",
                  desc: "Improve existing codebases with performance tuning, modular architecture, and bug fixing.",
                },
                {
                  title: "UI/UX Implementation",
                  desc: "Pixel-perfect implementations based on Figma or Adobe XD designs with smooth transitions and state management.",
                },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className={`keen-slider__slide h-[450px] w-[85%] sm:w-[60%] lg:w-[33%] p-6 rounded-lg mx-auto relative overflow-hidden ${
                    ['Web Development', 'Mobile App Development', 'Backend/API Development', 'Code Refactoring & Optimization', 'UI/UX Implementation'].includes(service.title)
                      ? 'bg-cover bg-center text-white border border-gray-200'
                      : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-200 text-gray-800 dark:text-gray-100'
                  }`}
                  style={
                    service.title === 'Web Development'
                      ? {
                          backgroundImage: `url(${webServiceBg})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : service.title === 'Mobile App Development'
                      ? {
                          backgroundImage: `url(${mobileServiceBg})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : service.title === 'Backend/API Development'
                      ? {
                          backgroundImage: `url(${apiServiceBg})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : service.title === 'Code Refactoring & Optimization'
                      ? {
                          backgroundImage: `url(${refactorServiceBg})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : service.title === 'UI/UX Implementation'
                      ? {
                          backgroundImage: `url(${uiuxServiceBg})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : {}
                  }                                  
                >
                  <div className="absolute inset-0 bg-black/40 z-0 rounded-lg" />
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-100 dark:text-gray-100">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="border-t border-gray-200 dark:border-gray-700 my-20" />
  
        {/* Portfolio */}
        <section className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
          <h2 className="text-3xl font-bold">Portfolio</h2>
          <p className="text-gray-700 dark:text-gray-300">
            View more of my work on GitHub or browse selected projects below:
          </p>
          <a
            href="https://tfuent1.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline font-medium"
          >
            Portfolio
          </a>
        </section>

        <div className="border-t border-gray-200 dark:border-gray-700 my-20" />
  
        {/* Contact Form */}
        <section id="contact" className="max-w-4xl mx-auto px-4 py-20 space-y-6 scroll-mt-28">
          <h2 className="text-3xl font-bold">Contact Me</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Let's build something great together. Reach out using the form below — I typically respond within 24 hours.
          </p>
  
          {formStatus === 'success' && (
            <p className="text-green-600">Message sent successfully!</p>
          )}
          {formStatus === 'error' && (
            <p className="text-red-600">Something went wrong. Try again later.</p>
          )}
  
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="border border-gray-300 dark:border-gray-600 p-3 rounded w-full h-32 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 dark:hover:bg-indigo-500 transition"
            >
              Send
            </button>
          </form>
        </section>

        <div className="border-t border-gray-200 dark:border-gray-700 my-20" />
  
        {/* Footer */}
        <footer className="text-center py-10 space-x-6 text-sm text-gray-500 dark:text-gray-400">
          <a href="mailto:tfuentes415@gmail.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Email</a>
          <a href="https://github.com/tfuent1" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">GitHub</a>
          <a href="https://linkedin.com/in/thomasfuentes16" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">LinkedIn</a>
        </footer>
      </div>
    </>
  );
}