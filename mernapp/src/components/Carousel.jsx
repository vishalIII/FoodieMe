import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import '../../src/App.css'; // Your custom styles

const ImageCarousel = () => {
    const img1 = "https://th.bing.com/th/id/OIP.bpOpps28C1k7Y_ljqssibwHaFF?w=275&h=189&c=7&r=0&o=5&pid=1.7";
    const img2 = "https://th.bing.com/th/id/OIP.MiaUS-kJZrNvjuz5TbqIOAHaEK?w=308&h=180&c=7&r=0&o=5&pid=1.7";
    const img3 = "https://th.bing.com/th/id/OIP.f4ISEU0W13PbvWjrjxUmsQHaEJ?w=284&h=180&c=7&r=0&o=5&pid=1.7";

    return (
        <div className='slider' style={{ display: 'block', position: 'relative' }}>
           
            <Carousel>
                <Carousel.Item interval={1500}>
                    <img
                        className="d-block w-100 carousel-img"
                        src={img3}
                        alt="Image One"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                    <img
                        className="d-block w-100 carousel-img"
                        src={img2}
                        alt="Image Two"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                    <img
                        className="d-block w-100 carousel-img"
                        src={img1}
                        alt="Image Three"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default ImageCarousel;
