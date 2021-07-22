import { useEffect, useState } from 'react'
import { useQuery, useMutation, gql } from "@apollo/client"
import { useDispatch, useSelector } from 'react-redux'

import Modal from '../Modal'


const GET_PRODUCTS = gql`
    query {
        getProducts {
            name
            images
            description
            shortDescription
            ingredients
            price
            path
            smoothies
        }
    }
`

const UPDATE_PRODUCT = gql`
    mutation editProduct(
        $name: String!, $price: Decimal!, $path: String!, $images: [String]!, $description: String!, 
        $shortDescription: String!, $ingredients: [String]!, $smoothies: [[String]]!
    ) {
        editProduct(
            name: $name, price: $price, path: $path, description: $description, images: $images, 
            ingredients: $ingredients, shortDescription: $shortDescription, smoothies: $smoothies
        ) {
            result
        }
    }
`

const Products = ({ Loading }) => {

    const modal = document.getElementById('modal-products-admin')

    const dispatch = useDispatch()

    const { data, loading: productLoading } = useQuery(GET_PRODUCTS)
    const [updateProduct, { loading: updateLoading, error: updateError, data: updateData }] = useMutation(UPDATE_PRODUCT)

    const [modalOptions, setModalOptions] = useState({})
    const [imagesRemoved, setImagesRemoved] = useState([])
    const [newImages, setNewImages] = useState([])
    const [newProducts, setNewProducts] = useState([])

    const products = useSelector(state => state.products)

    useEffect(() => {
        if (updateError) {
            setModalOptions({
                header: 'Admin Products',
                body: 'There was an error saving changes, please try again.',
            })

            modal.style.display = 'block'
        }
        
        if (updateData) {
            if (updateData.editProduct.result === true)
                setModalOptions({
                    header: 'Admin Products',
                    body: 'Changes Saved Successfully.',
                })
            else
                setModalOptions({
                    header: 'Admin Products',
                    body: 'There was an error saving changes, please try again.',
                })

            modal.style.display = 'block'
        }
        // eslint-disable-next-line
    }, [updateError, updateData])

    useEffect(() => {
        products && setNewProducts(products)
    }, [products])

    useEffect(() => {
        data && dispatch({ type: 'SET_PRODUCTS', payload: data.getProducts })
        // eslint-disable-next-line
    }, [data])

    const editImage = image => document.getElementById(image).click()

    const viewImage = image => window.open(image, "_blank");

    const removeImage = (i, j) => setImagesRemoved([...imagesRemoved, `${i}${j}`])

    const uploadImage = (event, i, j) => {
        // const url = URL.createObjectURL(event.target.files[0])

        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onloadend = () => document.getElementById(`image${i}${j}`).src = reader.result
        // reader.onloadend = () => setUploadedImages([...uploadedImages, [i, reader.result, j]])
    }

    const newImage = (event, i) => {
        const url = URL.createObjectURL(event.target.files[0])

        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onloadend = () => setNewImages([...newImages, [i, reader.result, url]])
    }

    const removeNewImage = image => {
        newImages.splice(newImages.indexOf(image), 1)
        setNewImages([...newImages])
    }

    const saveProduct = async (e, product, i) => {
        e.preventDefault()

        const name = document.getElementById(`name-${i}`).value
        const price = document.getElementById(`price-${i}`).value
        const description = document.getElementById(`description-${i}`).value
        const shortDescription = document.getElementById(`shortDescription-${i}`).value

        const ingredients = document.getElementsByClassName(`ingredient-${i}`)
        const newIngredients = []
        for (let ingredient of ingredients) 
            newIngredients.push(ingredient.value)

        const imagesGotten = document.getElementsByClassName(`product-image-${i}`)
        const images = []
        for (let image of imagesGotten)
            images.push(image.src) 

        const smoothiesGotten = document.getElementsByClassName(`smoothie-${i}`)
        const smoothiesImg = []
        for (let smoothie of smoothiesGotten)
            smoothiesImg.push(smoothie.src) 

        const namesGotten = document.getElementsByClassName(`name-${i}s`)
        const namesS = []
        for (let name of namesGotten)
            namesS.push(name.value) 

        const ingredientsGotten = document.getElementsByClassName(`ingredient-${i}s`)
        const ingredientsS = []
        for (let ingredient of ingredientsGotten)
            ingredientsS.push(ingredient.value) 

        const smoothies = namesS.map((item, i) => [item, smoothiesImg[i], ingredientsS[i]])

        // console.log('smoothies:', smoothies)

        updateProduct({ variables: {
            name,
            price,
            path: product.path,
            description,
            images,
            ingredients: newIngredients,
            shortDescription,
            smoothies
        }})
    }

    return <>
        {productLoading ? <Loading document="Products" /> : 
            newProducts.map((product, i) => {
                return <div key={i}>
                    <Modal id="modal-products-admin" {...modalOptions} />
                    <form className="admin-product" onSubmit={e => saveProduct(e, product, i)}>
                        <div className="row">
                            <div className="col-6">
                                <label className="form-label">Name</label>
                                <input className="form-control" id={`name-${i}`} defaultValue={product.name} />
                            </div>
                            <div className="col-3">
                                <label className="form-label">Price (USD)</label>
                                <input type="text" className="form-control" id={`price-${i}`} defaultValue={product.price} />
                                <div className="form-text">Price of one box.</div>
                            </div>
                            <div className="col-3">
                                <label className="form-label">Path</label>
                                <input className="form-control" defaultValue={product.path} disabled />
                            </div>
                        </div>

                        <label className="form-label">Images</label>
                        <section className="admin-images row" id="row-correction">
                            {product.images.map((image, j) => {
                                const exists = imagesRemoved.includes(`${i}${j}`)
                                if (exists) return null
                                return <div className="image-container col" key={j}>
                                    <img src={image} className={`admin-product-image product-image-${i}`} id={`image${i}${j}`} alt={`${image.split('/')[1]}`} />
                                    <button className="edit-image" type="button" onClick={() => editImage(image)}>
                                        <i className="bi-arrow-left-right" />
                                        <input type="file" hidden id={`${image}`} className="admin-image-input" onChange={event => uploadImage(event, i, j)} />
                                    </button>
                                    <button className="view-image" type="button" onClick={() => viewImage(image)}>
                                        <i className="bi-arrows-fullscreen" />
                                    </button>
                                    <button className="remove-image" type="button" onClick={() => removeImage(i, j)}>
                                        <i className="bi-x-lg" />
                                    </button>
                                </div>
                            })}
                            {newImages.map((image, j) => {
                                if (image[0] !== i) return null
                                return <div className="image-container col" key={j}>
                                    <img src={image[1]} className={`admin-product-image product-image-${i}`} id={`image${i}${product.images.length + j}`} alt="Product" />
                                    <button className="edit-image" type="button" onClick={() => editImage(image[1])}>
                                        <i className="bi-arrow-left-right" />
                                        <input type="file" hidden id={`${image[1]}`} className="admin-image-input" onChange={event => uploadImage(event, i, product.images.length + j)} />
                                    </button>
                                    <button className="view-image" type="button" onClick={() => viewImage(image[2])}>
                                        <i className="bi-arrows-fullscreen" />
                                    </button>
                                    <button className="remove-image" type="button" onClick={() => removeNewImage(image[1])}>
                                        <i className="bi-x-lg" />
                                    </button>
                                </div>
                            })}
                            <div className="col-1 d-flex">
                                <i className="bi bi-plus-circle-dotted my-auto" onClick={() => editImage('new-' + i)}></i>
                                <input type="file" hidden id={`new-${i}`} className="admin-image-input" onChange={event => newImage(event, i)} />
                            </div>
                        </section>
                        <div className="form-text">The dimensions of the newly added images must be equal in length and width, (i.e., 150x150).</div>
                        <div className="form-text">The first image will be the one shown on the screen of all products.</div>

                        <label className="form-label">Description</label>
                        <textarea className="form-control" id={`description-${i}`} defaultValue={product.description} rows="3" />
                        <div className="form-text">Description that will appear on the page of all products.</div>

                        <label className="form-label">Short Description</label>
                        <textarea className="form-control" id={`shortDescription-${i}`} defaultValue={product.shortDescription} rows="3" />
                        <div className="form-text">Description that will appear on the individual product page.</div>

                        <label className="form-label">Ingredients</label>
                        {product.ingredients.map((ingredient, j) => {
                            return <textarea className={`form-control mb-1 ingredient-${i}`} defaultValue={ingredient} rows="3" key={ingredient} />
                        })}
                        {product.smoothies && product.smoothies.length > 0 &&
                            <>
                                <label className="form-label">Smoothies</label>
                                <section className="row admin-smoothies" id="row-correction">
                                    {product.smoothies.map((smoothie, j) => {
                                        return <section className="col image-container" key={j}>
                                            <img src={smoothie[1]} className={`smoothie-${i}`} alt="smoothie" id={`image${j}s`} />
                                            <button className="edit-image" type="button" onClick={() => editImage(smoothie[1])}>
                                                <i className="bi-arrow-left-right" />
                                                <input type="file" hidden id={`${smoothie[1]}`} className="admin-image-input" onChange={event => uploadImage(event, j, 's')} />
                                            </button>
                                            <button className="view-image" type="button" onClick={() => viewImage(smoothie[1])}>
                                                <i className="bi-arrows-fullscreen" />
                                            </button>
                                            <label className="form-label">Name</label>
                                            <input className={`form-control name-${i}s`} defaultValue={smoothie[0]} />
                                            <label className="form-label">Ingredients</label>
                                            <textarea className={`form-control ingredient-${i}s`} defaultValue={smoothie[2]} rows="4" />
                                        </section>
                                    })}
                                </section>
                                <div className="form-text">Image dimensions for newly added smoothies should be 1190x110.</div>
                            </>
                        }
                        {updateLoading ? <>
                            <button type="submit" className="btn btn-success mb-5 mt-2" disabled>
                                <span className="spinner-border spinner-border-sm text-light me-2" role="status"></span>
                                <span>Saving...</span>
                            </button>
                        </> : <>
                            <button type="submit" className="btn btn-success mb-5 mt-2">
                                <span>Save Changes</span>
                            </button>
                        </>}
                    </form>
                </div>
            })
        }
    </>
}

export default Products
