import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';


const ProductsCategories =[
  {
    'id':"Clothes",
    'name':"Clothes",
    'img':'/Asset/974646d3-ecba-41a4-a968-d28d63eae916-removebg-preview.png',
  },
  {
    'id':"Grocery",
    'name':"Grocery",
    'img':'/Asset/full-shopping-cart-groceries.png',
  },
  {
    'id':"Vegetables",
    'name':"Vegetables",
    'img':'/Asset/e4f72981-ae5c-4248-b859-1bce1dd3e773-removebg-preview.png',
  },
  {
    'id':"Home_Supplies",
    'name':"Home Supplies",
    'img':'/Asset/ceramic-tableware-collection-removebg-preview.png',
  },
  {
    'id':"Fruits",
    'name':"Fruits",
    'img':'/Asset/406619159_de087cb3-09bc-4e3d-9f63-7c010f883f2b-removebg-preview.png',
  },
  {
    'id':"Shoes",
    'name':"Shoes",
    'img':'/Asset/fashion-shoes-sneakers-removebg-preview.png',
  },
  {
    'id':"Antiques",
    'name':"Antiques",
    'img':'/Asset/ancient-pottery-vessel-with-retro-design-removebg-preview.png',
  },
  {
    'id':"HeadPhones",
    'name':"HeadPhones",
    'img':'/Asset/409093507_eafd0bda-3380-47b6-a3f1-b84ea9462294-removebg-preview.png',
  },
]

const Home = () => {
  return (
    <div>
      <div>
        {/* header */}
         <Swiper
         loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2900,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>

          <div className='Header'>
            {/* text header */}
              <div className='H-text'>
                <h1 className='H_title'>Speed <span>Order</span> </h1>
                <p className='H_p'>
                  Your Order Ready and on their <br />
                  Way To You ...
                </p>
               <button className='btn_Order'>
                  <Link className='btn_link' to='/login'>
                  Order Now
                  </Link>
                </button>
              </div>
              {/* img header */}
          
              <div className='H_img'>
                <div className='bg_img'>
                  <img  src='/Asset/Header-1.png' alt="" />
                </div>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='Header'>
            {/* text header */}
              <div className='H-text'>
                <h1 className='H_title'>Speed <span>Order</span> </h1>
                <p className='H_p'>
                  Fast Delivery Jast Got Easer <br />
                  With Speed Order...
                </p>
                 <button className='btn_Order'>
                  <Link className='btn_link' to='/login'>
                  Order Now
                  </Link>
                </button>
              </div>
              {/* img header */}
          
              <div className='H_img'>
                <div className='bg_img'>
                  <img  src='/Asset/Header-2.png' alt="" />
                </div>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='Header'>
            {/* text header */}
              <div className='H-text'>
                <h1 className='H_title'>Speed <span>Order</span> </h1>
                <p className='H_p'>
                  From Your Order To Delivery To Your <br />
                  Door Quicly And Professionlly...
                </p>
                <button className='btn_Order'>
                  <Link className='btn_link' to='/login'>
                  Order Now
                  </Link>
                </button>
              </div>
              {/* img header */}
          
              <div className='H_img'>
                <div className='bg_img'>
                  <img  src='/Asset/Header-3.png' alt="" />
                </div>
              </div>
          </div>
        </SwiperSlide>
      </Swiper>

        {/* Products categories */}
        <div className='prodcate'>
          <h1>Products Categories</h1>

          <div className='prod-cate-group'>
            <div className='prod-cate-small'>
          {ProductsCategories.map((category ) =>(

              <div key={category.id}>
                <Link className='prod-cate' to={`/Product#${category.id}`}>
                  <img  src={category.img} alt={category.name} />
                  <h4>{category.name}</h4>
                </Link>
              </div>
          ))}
          </div>
          </div>

        </div>

        {/* how to work */}
        <div className='How-it-Work'>
          <h1>How it works</h1>
          <div>
            <p>
              Speed Order makes shopping fast and easy.
                Just open the app or website, browse a variety
                of products like groceries, clothes, and electronics, then
                add what you need to your cart.After a quick
                and secure checkout, you can track your order live
                on a real-time map. A professional courier will deliver
                It right to your doorstep. Once you receive your order,
                you can rate the service with five stars.
                Its fast, reliable, and convenient — thats Speed Order.
            </p>
            <img src="/Asset/Gemini_Generated_Image_u62r4ou62r4ou62r.jpeg" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home