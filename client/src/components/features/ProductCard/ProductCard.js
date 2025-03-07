import styles from './ProductCard.module.scss';
import { NavLink } from 'react-router-dom';
import { IMGS_URL } from '../../../config';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ name, price, minPrice, image, id }) => {
  return (
    <Card className="mx-3 py-2 my-2 d-flex" style={{ maxWidth: '20rem', width: '100%', backgroundColor: "#c6c6c6e4" }}>
      <Card.Img variant="top"  className={styles.cardImage} src={`${IMGS_URL}${image}`} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className='mb-3'>{ name }</Card.Title>
        <div className="d-flex flex-column justify-content-between mb-3">
            <Card.Subtitle className="mb-2 text-muted">Price: ${ price }</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">The lowest price: ${ minPrice }</Card.Subtitle>
        </div>
        <div className='mt-auto'>
          <NavLink to={`/products/${id}`} >
            <Button variant="secondary" >Show</Button>
          </NavLink>
        </div>
      </Card.Body>
    </Card>
   );
}
 
export default ProductCard; 