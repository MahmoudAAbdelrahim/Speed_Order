import React, { useState } from 'react'
import { MdLocationPin } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";



function ContactUS ()  {
     
    const [formData , setFormData] = useState ({
        name: "",
        email: "",
        phone: "",
        message: ""
    })
    
    const handleChange = (e) => {
        const {name , value} = e.target;
       setFormData((prev) => ({
        ...prev,
        [name]: value
        }));
    };

      

    const handleSubmit = (e)=>{
        //save data that refresh
        e.preventDefault();
        localStorage.setItem("formData", JSON.stringify(formData));
        setFormData({name:'',email:'', phone:'', message : ""})
         alert("will to contact with you  ✅");
      
    }

  

  return (
    <div className='ContactUS'>
        <h1>Contact US</h1>
        <p className='description'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam natus reprehenderit, vero excepturi inventore consectetur! 
            <br />Similique quod ipsam facere iure ea, impedit rerum accusantium debitis.
        </p>
        <div className='contact'>   
            {/* info ContactUS */}
            <div className='infoContactUS'>
                {/* item-1  */}
                <div>
                    <div className='infoContactUS_item'>

                    <MdLocationPin className='i' />
                        <p>Location</p>
                    </div>
                    <div>
                        <p>128 Express Service Road,<br /> 
                        Delivery City, 45678
                        </p>
                    </div>
                </div>
                {/* item-2  */}
                <div >
                 <div className='infoContactUS_item'>
                     <FaPhone  className='i'/>
                        <p>Phone</p>
                   </div>
                    <div>
                        <p>+20120508032 </p>
                    </div>
                </div>
                {/* item-3  */}
                <div >
                    <div className='infoContactUS_item'>

                    <MdLocationPin className='i' />
                        <p>Email</p>
                    </div>
                    <div>
                        <p>SpeedOrder125@gamil.com </p>
                    </div>
                </div>
            </div>
            {/* form ContactUS */}
            <div className=' formContactUS'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='name' placeholder='Enter your name' value={formData.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder='Enter your Email' onChange={handleChange} value={formData.email} required />
                    <input type="number" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required/>
                    <textarea name="message" placeholder='message' onChange={handleChange} value={formData.message} required></textarea>
                    <button type="submit" >Send</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ContactUS