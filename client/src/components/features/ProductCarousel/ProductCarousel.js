import { IMGS_URL } from '../../../config';
import Carousel from 'react-bootstrap/Carousel';
import styles from './ProductCarousel.module.scss'

const ProductCarousel = ({ images }) => {
    return (
        <Carousel className={`${styles.carousel}`} controls={false} interval={3000}>
           {images.map((img, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={`${IMGS_URL}${img}`} alt={`Product ${index}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      );
}
 
export default ProductCarousel; 