import { useEffect, useState } from 'react'
import { useQuery, useMutation, gql } from "@apollo/client"

import Modal from '../Modal'


const GET_CONTACTS = gql`
    query  {
        getContacts {
            id
            fullName
            email
            phone
            message
        }
    }
`

const DELETE_CONTACT = gql`
    mutation ($id: String!) {
        deleteContact(id: $id) {
            result
        }
    }
`

const Contact = ({ Loading }) => {

    const modal = document.getElementById('modal-contact-admin')

    const [contacts, setContacts] = useState()
    const [modalOptions, setModalOptions] = useState({})

    const [deleteContact, { data }] = useMutation(DELETE_CONTACT)
    const { data: contactsData, loading: contactsLoading, refetch } = useQuery(GET_CONTACTS)

    useEffect(() => {
        setContacts(contactsData)
    }, [contactsData])

    useEffect(() => {
        if (data) {
            if (data.deleteContact) {
                setModalOptions({
                    header: 'Contact Removed',
                    body: 'Has been successfully deleted.',
                })
                refetch()
            }
            else
                setModalOptions({
                    header: 'Remove Contact',
                    body: 'There was an error trying to remove a contact, please try again.',
                })
        }
        // eslint-disable-next-line
    }, [data])

    const showModal = (id, fullName) => {
        setModalOptions({
            header: 'Remove Contact',
            body: `Are you sure you want to delete the contact information of "${fullName}"?`,
            acceptText: 'Remove',
            rejectText: 'Cancel',
            accept: () => deleteContact({ variables: { id } }),
        })

        modal.style.display = 'block'
    }

    return <>
        {contactsLoading ? <Loading document="Contacts" /> : <>
            <Modal id="modal-contact-admin" {...modalOptions} />
            <table className="table table-striped table-hover my-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" className="col-2">Full Name</th>
                        <th scope="col" className="col-2">Email</th>
                        <th scope="col" className="col-2">Phone</th>
                        <th scope="col">Message</th>
                        <th scope="col"><i className="bi bi-box-seam" /></th>
                    </tr>
                </thead>
                <tbody>
                    {contacts && contacts.getContacts.map((contact, index) => {
                        return <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{contact.fullName}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.message}</td>
                            <td>
                                <button className="remove-contact" onClick={() => showModal(contact.id, contact.fullName)}>
                                    <i className="bi-x-lg" />
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>}
    </>
}

export default Contact
