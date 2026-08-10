import React, { useState } from 'react'
import Title from './Title'
import assets from '../assets/assets'
import { motion } from "motion/react"

const ContactUs = () => {
    const [result, setResult] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending...");
        setShowPopup(true);

        const formData = new FormData(event.target);
        formData.append("access_key", "7936f958-6b9e-4560-9d0a-531d95dcbf27");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully!");
            event.target.reset();
        } else {
            setResult(data.message || "Something went wrong!");
        }

        setTimeout(() => {
            setShowPopup(false);
        }, 4000);
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.2 }}
            viewport={{ once: true }}
            id='contact-us' 
            className='flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-800 dark:text-white relative'
        >
            
            {/* Pop-up Notification */}
            {showPopup && (
                <div className='fixed top-5 z-50 bg-black/80 dark:bg-white/90 text-white dark:text-gray-900 px-6 py-3 rounded-full shadow-lg transition-all duration-300 text-sm font-medium'>
                    {result}
                </div>
            )}

            <Title title='Reach out to us' desc='From strategy to execution, we craft digital solutions that move your business forward.' />

            <motion.form
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                // FIXED: 'index' ain karala hari value ekak duna
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                onSubmit={onSubmit} 
                className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl w-full"
            >
                <div>
                    <p className='mb-2 text-sm font-medium'>Your name</p>
                    <div className='flex pl-3 rounded-lg border border-gray-300 dark:border-gray-600 items-center'>
                        <img src={assets.person_icon} alt="" />
                        <input name='name' type="text" placeholder='Enter your name' className='w-full p-3 text-sm outline-none bg-transparent' required/>
                    </div>
                </div>

                <div>
                    <p className='mb-2 text-sm font-medium'>Email id</p>
                    <div className='flex pl-3 rounded-lg border border-gray-300 dark:border-gray-600 items-center'>
                        <img src={assets.email_icon} alt="" />
                        <input name='email' type="email" placeholder='Enter your email' className='w-full p-3 text-sm outline-none bg-transparent' required/>
                    </div>
                </div>

                <div className='sm:col-span-2'>
                    <p className='mb-2 text-sm font-medium'>Message</p>
                    <textarea name='message' rows={8} placeholder='Enter your message' className='w-full p-3 text-sm outline-none rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent' required/>
                </div>

                <button type='submit' className='w-max flex items-center gap-2 bg-primary text-white text-sm px-10 py-3 rounded-full cursor-pointer hover:scale-103 transition-all'>
                    Submit <img src={assets.arrow_icon} alt="" className='w-4'/>
                </button>
            </motion.form>
        </motion.div>
    )
}

export default ContactUs