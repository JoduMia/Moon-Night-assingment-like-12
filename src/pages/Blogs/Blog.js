import React from 'react';
import { useState } from 'react';


const Faq = ({ id, que, ans }) => {
    const [open, setOpen] = useState(false);
    return (
        <div onClick={() => setOpen(!open)} className='mb-3'>
            <div  className='bg-[#505459d8] flex items-center gap-3 p-2 cursor-pointer rounded'>
                <span className='bg-black  w-[30px] h-[30px] flex items-center justify-center rounded-full font-extrabold text-xl'>
                    {open ? '-' : '+'}
                </span>
                <h3 className='font-semibold text-lg md:text-xl capitalize'>{que}</h3>
            </div>
            {open && <p className='dark:text-white'>{ans}</p>}
        </div>
    )
}

export default Faq;