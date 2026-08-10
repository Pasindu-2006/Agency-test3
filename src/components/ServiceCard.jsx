import React, { useState } from 'react'
import { easeOut, motion } from "motion/react"


const ServiceCard = ({service, index}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    }

  return (
    <motion.div
        initial={{opacity: 0,y: 30}}
        whileInView={{opacity:1,y: 0}}
        transition={{duration:0.5, delay:index * 0.2}}
        viewport={{once:true}}

        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='relative overflow-hidden max-w-lg m-2 sm:m-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl shadow-gray-100 dark:shadow-white/10 cursor-pointer'
    >
        {/* Mouse Glow Effect */}
        <div 
            className={`pointer-events-none blur-2xl rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 w-[300px] h-[300px] absolute z-0 transition-opacity duration-500 mix-blend-lighten ${isHovered ? 'opacity-75' : 'opacity-0'}`} 
            style={{ top: position.y - 150, left: position.x - 150 }}
        />

        {/* Inner Content with m-[1px] to fix border overflow/leak bug */}
        <div className='flex items-center gap-10 p-8 m-[1px] rounded-[11px] bg-white dark:bg-gray-900 z-10 relative transition-all'>
            
            <div className='bg-gray-100 dark:bg-gray-700 rounded-full'>
                <img src={service.icon} alt="" className='max-w-24 bg-white dark:bg-gray-900 rounded-full m-2'/>
            </div>

            <div className='flex-1'>
                <h3 className='font-bold text-gray-900 dark:text-white'>{service.title}</h3>
                <p className='text-sm mt-2 text-gray-600 dark:text-gray-300'>{service.description}</p>
            </div>

        </div>

    </motion.div>
  )
}

export default ServiceCard;