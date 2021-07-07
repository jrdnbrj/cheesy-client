import { useQuery, useMutation, gql } from "@apollo/client"


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
        deleteContact(id: $id)
    }
`

const Contact = ({ Loading }) => {

    const [deleteContact, { data, error }] = useMutation(DELETE_CONTACT)
    const { data: contacts, loading: contactsLoading } = useQuery(GET_CONTACTS)
    contacts && console.log('Contacts:', contacts)
    error && console.log('error:', error)
    data && console.log('data:', data.deleteContact)

    const removeContact = id => {
        console.log('Hola', id)
        deleteContact({ variables: { id } })
    }

    return <>
        {contactsLoading ? <Loading document="Contacts" /> : <>
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
                                <button className="remove-contact" onClick={() => removeContact(contact.id)}>
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
