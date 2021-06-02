import Product from '../components/Product'
import pepperJack from '../assets/img/products-pepperjack.png'
import nutrition from '../assets/img/nutrition.png'

const PepperJack = () => {

    const props = {
        carousel: [pepperJack, nutrition],
        name: 'Pepper Jack',
        description: 'Tasty, soft, and chewy! Our Cheesy Bittes are bundles of goodness. Packed with creamy notes and heat, pepper jack offers the ideal kick. Pair it with your favorite bowl of chili, a salad, or hot chocolate. Yum.',
        ingredients: 'Tasty, soft, and chewy! Our Cheesy Bittes are bundles of goodness. Packed with creamy notes and heat, pepper jack offers the ideal kick. Pair it with your favorite bowl of chili, a salad, or hot chocolate. Yum.',
    }

    return <Product {...props} />
}

export default PepperJack