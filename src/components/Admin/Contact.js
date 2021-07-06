import { useQuery, gql } from "@apollo/client"


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

const Contact = ({ Loading }) => {

    const { data: contacts, loading: contactsLoading } = useQuery(GET_CONTACTS)
    contacts && console.log('Contacts:', contacts)

    return <>
        {contactsLoading ? <Loading document="Contacts" /> : <>
            <table className="table table-striped table-hover my-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" className="col-1">Full Name</th>
                        <th scope="col" className="col-2">Email</th>
                        <th scope="col" className="col-2">Phone</th>
                        <th scope="col">Message</th>
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
                        </tr>
                    })}
                </tbody>
            </table>
        </>}
    </>
}

export default Contact
