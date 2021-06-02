import Product from '../components/Product'
import products from '../assets/img/products-mix.png'
import nutritionFacts from '../assets/img/nutrition-facts.png'

const Cheddar = () => {

    const props = {
        carousel: [products, nutritionFacts],
        name: 'Mix them up!',
        description: 'Why choose when you can enjoy them all! Give your taste buds a fascinating experience with a combination of mozzarella, cheddar, and pepper jack.',
        ingredients: [
            'Low moisture part skim mozzarella (pasteurized milk, cheese cultures, salt, enzymes, cellulose), tapioca flour, butter (pasteurized cream, lactic acid), water, eggs, baking powder (corn starch, sodium bicarbonate, sodium aluminum sulfate, monocalcium phosphate), sea salt.', 
            'Cheddar cheese (cultured pasteurized milk, salt, enzymes, annatto (color), cellulose, dextrose, natamycin (a natural mold inhibitor), tapioca flour, butter (pasteurized cream, lactic acid), water, eggs, baking powder (corn starch, sodium bicarbonate, sodium aluminum sulfate, monocalcium phosphate), sea salt.', 
            'Pepper jack cheese (pasteurized milk, cultures, jalapeno peppers, salt, enzymes), tapioca flour, butter (pasteurized cream, lactic acid), water, eggs, baking powder (corn starch, sodium bicarbonate, sodium aluminum sulfate, monocalcium phosphate), sea salt.'
        ],
    }

    return <Product {...props} />
}

export default Cheddar