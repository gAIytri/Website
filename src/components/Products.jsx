import MediaCarousel from './MediaCarousel';
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';
import product4 from '../assets/product4.jpg';

const Products = () => {
  // Project data for MediaCarousel - 4 product images
  const projectData = [
    {
      id: 1,
      name: 'Skill Map',
      media: [
        { id: 1, image: product1 },
        { id: 2, image: product2 },
        { id: 3, image: product3 },
        { id: 4, image: product4 },
      ]
    }
  ];

  return (
    <MediaCarousel
      projects={projectData}
      header="Products"
      subheader="Discover our innovative products designed to transform your business"
    />
  );
};

export default Products;
