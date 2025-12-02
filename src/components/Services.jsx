import ImageCarousel from './ImageCarousel';
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';
import product4 from '../assets/product4.jpg';

const Services = () => {
  // Service data with actual images
  const services = [
    {
      id: 1,
      category: 'AI AUTOMATION',
      title: 'Smart Workflow Automation',
      description: 'Automate workflows, reduce manual effort with intelligent agents.',
      image: product1
    },
    {
      id: 2,
      category: 'BUSINESS OPTIMIZATION',
      title: 'Data-Driven Business Intelligence',
      description: 'Advanced analytics, dashboards, and process enhancement.',
      image: product2
    },
    {
      id: 3,
      category: 'AI INTEGRATION',
      title: 'Seamless AI Integration Solutions',
      description: 'Chatbots, APIs, and CRM/ERP automation for your business.',
      image: product3
    },
    {
      id: 4,
      category: 'CUSTOM AI SYSTEMS',
      title: 'Tailor-Made AI Solutions',
      description: 'Custom AI systems designed for individuals & organizations.',
      image: product4
    },
  ];

  return (
    <div style={{paddingBottom:'2rem'}}>
    <ImageCarousel
      items={services}
      header="Services"
      subheader="Explore our comprehensive services tailored to accelerate your growth"
    />
    </div>
  );
};

export default Services;
