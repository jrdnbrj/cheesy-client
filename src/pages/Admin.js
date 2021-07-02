import { useEffect, useState } from 'react'
import { useQuery, useMutation, gql } from "@apollo/client"
import { useDispatch, useSelector } from 'react-redux'

import imageToBase64 from 'image-to-base64'


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
        }
    }
`

const GET_CONTACTS = gql`
    query  {
        getContacts {
            fullName
            email
            phone
            message
        }
    }
`

const UPDATE_PRODUCT = gql`
    mutation editProduct(
        $name: String!, $price: Decimal!, $path: String!, $images: [String]!, $description: String!, 
        $shortDescription: String!, $ingredients: [String]!
    ) {
        editProduct(
            name: $name, price: $price, path: $path, description: $description, 
            images: $images, ingredients: $ingredients, shortDescription: $shortDescription
        ) {
            result
        }
    }
`

const Admin = () => {

    const dispatch = useDispatch()
    const { data, loading: productLoading } = useQuery(GET_PRODUCTS)
    const { data: contacts, loading: contactsLoading } = useQuery(GET_CONTACTS)
    const [updateProduct, { loading: updateLoading, error: updateError, data: updateData }] = useMutation(UPDATE_PRODUCT)
    contacts && console.log('Contacts:', contacts)
    const [imagesRemoved, setImagesRemoved] = useState([])
    const [newImages, setNewImages] = useState([])
    const [newProducts, setNewProducts] = useState([])
    const products = useSelector(state => state.products)

    useEffect(() => {
        if (updateError)
            return alert('Error en Mutation')
        
        if (updateData)
            if (updateData.editProduct.result === true)
                return alert('Todo belen mijo rey')
            else
                return alert('False desde el back')
    }, [updateError, updateData])

    useEffect(() => {
        products && setNewProducts(products)
    }, [products])

    const Loading = ({ document }) => {
        return <section className="loading">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading {document}...</p>
        </section>
    }

    useEffect(() => {
        data && setProducts(data.getProducts)
        // eslint-disable-next-line
    }, [data])

    const setProducts = payload => dispatch({ type: 'SET_PRODUCTS', payload })

    const editImage = image => document.getElementById(image).click()

    const viewImage = image => window.open(image, "_blank");

    const removeImage = (i, j) => setImagesRemoved([...imagesRemoved, `${i}${j}`])

    const uploadImage = (event, i, j) => {
        const url = URL.createObjectURL(event.target.files[0])
        document.getElementById(`image${i}${j}`).src = url
    }

    const newImage = (event, i) => {
        const url = URL.createObjectURL(event.target.files[0])
        console.log('asdasd:', event.target.files[0])

        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onloadend = () => {
            var base64data = reader.result
            console.log('base64data:', base64data)
            // imgs.push(base64data)
            // console.log(imgs)
            // return base64data
            setNewImages([...newImages, [i, url, base64data]])
        }
    }

    const removeNewImage = image => {
        newImages.splice(newImages.indexOf(image), 1)
        setNewImages([...newImages])
    }

    const saveProduct = async (e, product, i) => {
        e.preventDefault()

        var reader = new FileReader()

        const images = product.images.filter((image, j) => !imagesRemoved.includes(`${i}${j}`))
        const imagesNew = newImages.filter(image => image[0] === i).map(image => image[2])
        const newImagesArray = images.concat(imagesNew)

        // console.log('imagesNew:', imagesNew)
        // const imgs = []

        // const imagesPromise = new Promise(async () => {
        //     await imagesNew.forEach(async image => {
        //         console.log('Image:', image)
        //         reader.onload = () => {
        //             var base64data = reader.result
        //             console.log('base64data:', base64data)
        //             imgs.push(base64data)
        //             console.log(imgs)
        //             // return base64data
        //         }
        //         await reader.readAsDataURL(image)
        //     })
        // })

        // imagesNew.forEach(image => {
        //     console.log('Image:', image)
        //     reader.readAsDataURL(image)
        //     reader.onloadend = () => {
        //         var base64data = reader.result
        //         console.log('base64data:', base64data)
        //         imgs.push(base64data)
        //         console.log(imgs)
        //         // return base64data
        //     }
        // })

        // Promise.all([imagesPromise]).then(imgg => console.log('imgs:', imgs))

        // console.log('imgs:', imgs)

        const name = document.getElementById(`name-${i}`).value
        const price = document.getElementById(`price-${i}`).value
        const description = document.getElementById(`description-${i}`).value
        const shortDescription = document.getElementById(`shortDescription-${i}`).value
        const ingredients = document.getElementsByClassName(`ingredient-${i}`)
        const newIngredients = []

        for (let ingredient of ingredients) 
            newIngredients.push(ingredient.value)

        // console.log('name:', name)
        // console.log('price:', price)
        console.log('newImagesArray:', newImagesArray)
        // console.log('description:', description)
        // console.log('shortDescription:', shortDescription)
        // console.log('ingredients:', newIngredients)

        updateProduct({ variables: {
            name,
            price,
            path: product.path,
            description,
            images: newImagesArray,
            ingredients: newIngredients,
            shortDescription,
        }})
    }

    return <div className="container pt-4">
        <nav className="nav nav-pills nav-fill" role="tablist">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-products" type="button" role="tab" aria-controls="nav-products" aria-selected="true">Products</button>
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-sales" type="button" role="tab" aria-controls="nav-sales" aria-selected="false">Sales</button>
        </nav>
        <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-products" role="tabpanel" aria-labelledby="nav-home-tab">
                {productLoading ? <Loading document="Products" /> : 
                    newProducts.map((product, i) => {
                        return <form className="admin-product" key={i} onSubmit={e => saveProduct(e, product, i)}>
                            <div className="row">
                                <div className="col-6">
                                    <label className="form-label">Name</label>
                                    <input className="form-control" id={`name-${i}`} defaultValue={product.name} />
                                </div>
                                <div className="col-3">
                                    <label className="form-label">Price (USD)</label>
                                    <input type="text" className="form-control" id={`price-${i}`} defaultValue={product.price} />
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
                                        <img src={image} className="admin-product-image" id={`image${i}${j}`} alt="Product" />
                                        <button className="edit-image" onClick={() => editImage(image)}>
                                            <i className="bi-arrow-left-right"></i>
                                            <input type="file" hidden id={`${image}`} className="admin-image-input" onChange={event => uploadImage(event, i, j)} />
                                        </button>
                                        <button className="view-image" onClick={() => viewImage(image)}>
                                            <i className="bi-arrows-fullscreen"></i>
                                        </button>
                                        <button className="remove-image" onClick={() => removeImage(i, j)}>
                                            <i className="bi-x-lg"></i>
                                        </button>
                                    </div>
                                })}
                                {newImages.map((image, j) => {
                                    const exists = newImages.includes(image[1])
                                    if (image[0] !== i && !exists) return null
                                    return <div className="image-container col" key={j}>
                                        <img src={image[1]} className="admin-product-image" id={`image${i}${product.images.length + j}`} alt="Product" />
                                        <button className="edit-image" onClick={() => editImage(image[1])}>
                                            <i className="bi-arrow-left-right"></i>
                                            <input type="file" hidden id={`${image[1]}`} className="admin-image-input" onChange={event => uploadImage(event, i, product.images.length + j)} />
                                        </button>
                                        <button className="view-image" onClick={() => viewImage(image[1])}>
                                            <i className="bi-arrows-fullscreen"></i>
                                        </button>
                                        <button className="remove-image" onClick={() => removeNewImage(image[1])}>
                                            <i className="bi-x-lg"></i>
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
                            {updateLoading ? <>
                                <button type="submit" className="btn btn-success mb-5 mt-2" disabled>
                                    <span class="spinner-border spinner-border-sm text-light me-2" role="status"></span>
                                    <span>Saving...</span>
                                </button>
                            </> : <>
                                <button type="submit" className="btn btn-success mb-5 mt-2">
                                    <span>Save Changes</span>
                                </button>
                            </>}
                        </form>
                    })
                }
            </div>
            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-profile-tab">
                {contactsLoading ? <Loading document="Contacts" /> : <>
                    {contacts && contacts.getContacts.map(contact => {
                        return <>
                            {contact.fullName}
                            {contact.email}
                            {contact.phone}
                            {contact.message}
                        </>
                    })}
                </>}
            </div>
            <div className="tab-pane fade" id="nav-sales" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
        </div>
    </div>
}

export default Admin