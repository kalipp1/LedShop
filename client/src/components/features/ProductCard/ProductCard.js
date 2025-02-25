import styles from './ProductCard.module.scss';
import { NavLink } from 'react-router-dom';
import { IMGS_URL } from '../../../config';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ name, price, minPrice, image, id }) => {
  return (
    <Card className="col-lg-4 col-sm-12 col-md-8 mx-3 py-2 my-2" style={{ maxWidth: '18rem' }}>
      <Card.Img variant="top"  className={styles.cardImage} src={`${IMGS_URL}${image}`} />
      <Card.Body>
        <Card.Title>{ name }</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{ price }</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{ minPrice }</Card.Subtitle>
        <NavLink to={`/ad/${id}`} >
          <Button variant="secondary" >Read more</Button>
        </NavLink>
      </Card.Body>
    </Card>
   );
}
 
export default ProductCard; 