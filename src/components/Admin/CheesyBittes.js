import { useState } from 'react'
import { useMutation, useQuery, gql } from "@apollo/client"

import Modal from '../Modal'


const GET_HOME = gql`
    query {
        getHome {
            name
            description
        }
    }
`

const GET_FAMILY = gql`
    query {
        getFamily {
            title
            description
        }
    }
`

const UPDATE_HOME = gql`
    mutation ($homeData: [HomeInputType]!) {
        updateHome(data: $homeData) {
            response {
                name
                description
            }
        }
    }
`

const UPDATE_FAMILY = gql`
    mutation ($familyData: [OurFamilyInputType]!) {
        updateFamily(data: $familyData) {
            response {
                title
                description
            }
        }
    }
`

const UPDATE_TERMS = gql`
    mutation ($data: String) {
        updateTerms(data: $data) {
            response
        }
    }
`

const CheesyBittes = ({ Loading }) => {

    const { loading: loadingHome, data: home } = useQuery(GET_HOME)
    const { loading: loadingFamily, data: family } = useQuery(GET_FAMILY)

    const [updateHome, { loading: homeLoading, error: saveHomeError }] = useMutation(UPDATE_HOME, {
        onCompleted: () => {
            const modal = document.getElementById('modal-cheesy-home')
            setModalOptions({
                header: 'Cheesy Bittes Home Info',
                body: 'Changes Saved Successfully.',
            })
            modal.style.display = 'block'
        },
        onError: () => {
            const modal = document.getElementById('modal-cheesy-home')
            setModalOptions({
                header: 'Cheesy Bittes Home Info',
                body: 'There was an error trying to save changes, please try again.',
            })
            modal.style.display = 'block'
        }
    })

    const [updateFamily, { loading: familyLoading, error: saveFamilyError }] = useMutation(UPDATE_FAMILY, {
        onCompleted: () => {
            const modal = document.getElementById('modal-cheesy-home')
            setModalOptions({
                header: 'Cheesy Bittes Our Family',
                body: 'Changes Saved Successfully.',
            })
            modal.style.display = 'block'
        },
        onError: () => {
            const modal = document.getElementById('modal-cheesy-home')
            setModalOptions({
                header: 'Cheesy Bittes Our Family',
                body: 'There was an error trying to save changes, please try again.',
            })
            modal.style.display = 'block'
        }
    })

    const [updateTerms, { loading: termsLoading, error: saveTermsError }] = useMutation(UPDATE_TERMS, {
        onCompleted: () => {
            const modal = document.getElementById('modal-cheesy-home')
            setModalOptions({
                header: 'Cheesy Bittes Terms',
                body: 'File Saved Successfully.',
            })
            modal.style.display = 'block'
        },
        onError: () => {
            const modal = document.getElementById('modal-cheesy-home')
            setModalOptions({
                header: 'Cheesy Bittes Terms',
                body: 'There was an error trying to save the file, please reload the page and try again.',
            })
            modal.style.display = 'block'
        }
    })

    saveHomeError && console.log('saveHomeError:', saveHomeError)
    saveFamilyError && console.log('saveFamilyError:', saveFamilyError)
    saveTermsError && console.log('saveTermsError:', saveTermsError)

    const [modalOptions, setModalOptions] = useState({})

    const saveHome = e => {
        e.preventDefault()

        const names = document.querySelectorAll('.home-names')
        const descriptions = document.querySelectorAll('.home-descriptions')

        const homeData = []

        for(let i = 0; i < names.length; i++) {
            homeData.push({
                name: names[i].value,
                description: descriptions[i].value
            })
        }

        updateHome({ variables: { homeData } })
    }

    const saveFamily = e => {
        e.preventDefault()

        const titles = document.querySelectorAll('.family-titles')
        const descriptions = document.querySelectorAll('.family-descriptions')

        const familyData = []

        for(let i = 0; i < titles.length; i++) {
            familyData.push({
                title: titles[i].value,
                description: descriptions[i].value
            })
        }

        updateFamily({ variables: { familyData } })
    }

    const saveTerms = e => {
        e.preventDefault()

        console.log('e.target.files[0]:', e.target.files[0])

        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () =>  {
            updateTerms({ variables: {  data: reader.result } })
            console.log('reader.result:', reader.result)
        }
    }


    if (loadingHome) {
        return <Loading document="Home Information" />
    }

    if (loadingFamily) {
        return <Loading document="Our Family Information" />
    }

    return <>
        <Modal id="modal-cheesy-home" {...modalOptions} />
        <section className="admin-home mt-5">
            <h1 className="display-6">Home</h1>
            <form onSubmit={saveHome}>
                {home.getHome.map(item => {
                    return <section className="my-4" key={item.name}>
                        <label className="form-label">Name</label>
                        <input className="form-control home-names" defaultValue={item.name} />
                        <label className="form-label">Description</label>
                        <textarea className="form-control home-descriptions" defaultValue={item.description} rows="2" />
                    </section>
                })}
                {homeLoading ? <>
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
        </section>
        <section className="admin-family">
            <h1 className="display-6">Our Family</h1>
            <form onSubmit={saveFamily}>
                {family.getFamily.map(item => {
                    return <section className="my-4" key={item.title}>
                        <label className="form-label">Title</label>
                        <input className="form-control family-titles" defaultValue={item.title} />
                        <label className="form-label">Description</label>
                        <textarea className="form-control family-descriptions" defaultValue={item.description} rows="3" />
                    </section>
                })}
                {familyLoading ? <>
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
        </section>
        <section className="admin-terms">
            <h1 className="display-6">Terms & Conditions</h1>
            <section className="my-4">
                <div className="form-text">Upload only files in PDF format.</div>
                <div className="input-group mb-3">
                    <input type="file" className="form-control" id="inputGroupFile02" onChange={saveTerms} />
                </div>
            </section>
            {/* {termsLoading ? <>
                <button type="submit" className="btn btn-success mb-5 mt-2" disabled>
                    <span className="spinner-border spinner-border-sm text-light me-2" role="status"></span>
                    <span>Saving...</span>
                </button>
            </> : <>
                <button type="submit" className="btn btn-success mb-5 mt-2">
                    <span>Save Changes</span>
                </button>
            </>} */}
        </section>
    </>
}

export default CheesyBittes
