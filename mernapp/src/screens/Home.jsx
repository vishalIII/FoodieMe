import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import Carousel from '../components/Carousel'
import ImageCarousel from '../components/Carousel'
import './screen.scss'

const Home = () => {
  return (
    <div>
       
           <div className='hero'>
               < ImageCarousel />
           </div>
        
        <div>
            <ProductCard/>
        </div>
        <div className="row justify-content-center align-items-center " >
            <Footer/>
        </div>
    </div>
  )
}

export default Home
