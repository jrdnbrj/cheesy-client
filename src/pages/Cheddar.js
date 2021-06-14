import Product from '../components/Product'
import cheddar from '../assets/img/products-cheddar.png'
import nutrition from '../assets/img/nutrition.png'

const Cheddar = () => {

    const props = {
        carousel: [cheddar, nutrition],
        name: 'Cheddar',
        description: 'Smooth, rich, and buttery! The sharp cheddar flavor is delightful.',
        ingredients: 'Cheddar cheese (cultured pasteurized milk, salt, enzymes, annatto (color), cellulose, dextrose, natamycin (a natural mold inhibitor), tapioca flour, butter (pasteurized cream, lactic acid), water, eggs, baking powder (corn starch, sodium bicarbonate, sodium aluminum sulfate, monocalcium phosphate), sea salt.',
    }

    return <Product {...props} />
}

export default Cheddar
