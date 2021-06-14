import Product from '../components/Product'
import pepperJack from '../assets/img/products-pepperjack.png'
import nutrition from '../assets/img/nutrition.png'

const PepperJack = () => {

    const props = {
        carousel: [pepperJack, nutrition],
        name: 'Pepper Jack',
        description: 'Tasty, soft, and chewy! Packed with creamy notes and heat.',
        ingredients: 'Pepper jack cheese (pasteurized milk, cultures, jalapeno peppers, salt, enzymes), tapioca flour, butter (pasteurized cream, lactic acid), water, eggs, baking powder (corn starch, sodium bicarbonate, sodium aluminum sulfate, monocalcium phosphate), sea salt.',
    }

    return <Product {...props} />
}

export default PepperJack
