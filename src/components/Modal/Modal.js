import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthContext/AuthProvider';

const Modal = ({ booking, setBooking }) => {
    const { user } = useContext(AuthContext);
    const { image,product_name, resale_price,_id,seller_email } = booking;

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const where = form.location.value;

        const doc = {name, image, email, phone, product_name, price:resale_price, where, matchby: _id, seller_email}
        fetch(`https://server-tawny-theta.vercel.app/bookings`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(doc)
        }).then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Boooking successfully");
                } else {
                    toast.error(data.message)
                }
            })
        setBooking(null);
    };

    return (
        <div>
            <input type="checkbox" id="booking-car" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box bg-white relative">
                    <label htmlFor="booking-car" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-[#19d3ae] py-4">Congratulations to  appointment</h3>

                    <form onSubmit={handleSubmit} className='space-y-3 text-[#161056]'>

                        <input type="text" placeholder="Your Name" defaultValue={user?.displayName} name='name' disabled required className="input input-bordered input-accent w-full bg-white disabled:bg-gray-300
                            disabled:text-black " />
                        <input type="email" defaultValue={user?.email} disabled name='email' placeholder="Email address" className="input input-bordered input-accent w-full bg-white disabled:bg-gray-300
                        disabled:text-black " />

                        <input type="text" placeholder="Product Name" defaultValue={product_name} name='pname' disabled required className="input input-bordered input-accent w-full bg-white disabled:bg-gray-300
                            disabled:text-black " />

                        <input type="text" placeholder="price" defaultValue={resale_price} name='price' disabled required className="input input-bordered input-accent w-full bg-white disabled:bg-gray-300
                            disabled:text-black " />


                        <input type="number" placeholder="Phone" required name='phone' className="input input-bordered input-accent w-full bg-white" />

                        <input type="text" placeholder="Where to Meet" required name='location' className="input input-bordered input-accent w-full bg-white" />

                        <div className='text-center'>
                            <button type='submit' className="btn btn-primary bg-gradient-to-r from-[#19D3AE] to-[#0FCFEC] hover:bg-gradient-to-l duration-300 block w-[200px] mx-auto">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal