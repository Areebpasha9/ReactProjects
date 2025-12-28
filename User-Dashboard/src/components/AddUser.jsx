import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddUser({addUser}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        website: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        }

        if (!formData.website.trim()) {
            newErrors.website = 'Website is required';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        console.log("Form Submitted :",formData);

        const userId=addUser(formData);

        alert(`User Added with id: "${userId}`)
        navigate("/users")
    }

    return (
        <div className='p-6 max-w-2xl mx-auto'>
            <h1 className='text-3xl  font-bold text-gray-800 mb-6'>Add New User</h1>

            <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow p-8'>
                <div className='space-y-6'>
                    <div>
                        <label className='' htmlFor='name'>Full Name*</label>
                        <input type="text" id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder='Enter Full Name '
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label className='block text-gray-700 mb-2' htmlFor="email">Enter Email*</label>
                        <input type="email" name="email" id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter email address"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="phone">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter phone number"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="website">
                            Website *
                        </label>
                        <input
                            type="text"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.website ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter website"
                        />
                        {errors.website && (
                            <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                        )}
                    </div>
                    <div className='flex gap-4 pt-4'>
                        <button type='submit'
                            className=' bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium w-30 ml-45 '>Add User</button>
                        <button type='button'
                            onClick={() => navigate("/users")}>Cancel</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default AddUser
