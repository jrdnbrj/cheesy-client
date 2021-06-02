import Product from '../components/Product'
import mozzarella from '../assets/img/products-mozzarella.png'
import nutrition from '../assets/img/nutrition.png'

const Mozzarella = () => {

    const props = {
        carousel: [mozzarella, nutrition],
        name: 'Mozzarella',
        description: 'Cheesy, crunchy, and fluffy! Our Cheesy Bittes are perfect for any time of the day. The delicate and fresh mozzarella flavor is melt-in-your-mouth delicious and wholly addictive. Pair them with smoothies, chocolate spread, or pasta. You will love them!',
        ingredients: 'Low moisture part skim mozzarella (pasteurized milk, cheese cultures, salt, enzymes, cellulose), tapioca flour, butter (pasteurized cream, lactic acid), water, eggs, baking powder (corn starch, sodium bicarbonate, sodium aluminum sulfate, monocalcium phosphate), sea salt.',
    }

    return <Product {...props} />
}

export default Mozzarella