import { useQuery, gql } from '@apollo/client'
import Today from './Sales/Today'
import Orders from './Sales/Orders'
import Subscriptions from './Sales/Subscriptions'
// import Square from './Sales/Square'


const GET_DATETIME = gql`
    query datetime {
        getDatetime
    }
`

const Sales = ({ Loading }) => {

    const { data } = useQuery(GET_DATETIME, { fetchPolicy: "no-cache" })


    return <section className="mt-5">
        <span className="float-end">
            <strong>Server Datetime: </strong>{(new Date(data?.getDatetime.split('.')[0])).toString()}
        </span>
        <nav className="nav nav-tabs" role="tablist">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-today" type="button" role="tab" aria-controls="nav-today" aria-selected="true">
                Today
            </button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-square" type="button" role="tab" aria-controls="nav-square" aria-selected="false">
                Square
            </button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-orders" type="button" role="tab" aria-controls="nav-orders" aria-selected="false">
                Orders
            </button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-subscriptions" type="button" role="tab" aria-controls="nav-subscriptions" aria-selected="false">
                Subscriptions
            </button>
        </nav>
        <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-today" role="tabpanel" aria-labelledby="nav-today-tab">
                <Today Loading={Loading} datetime={data?.getDatetime.split('.')[0]} />
            </div>
            <div className="tab-pane fade" id="nav-square" role="tabpanel" aria-labelledby="nav-square-tab">
                {/* <Square Loading={Loading} /> */}
            </div>
            <div className="tab-pane fade" id="nav-orders" role="tabpanel" aria-labelledby="nav-orders-tab">
                <Orders Loading={Loading} />
            </div>
            <div className="tab-pane fade" id="nav-subscriptions" role="tabpanel" aria-labelledby="nav-subscriptions-tab">
                <Subscriptions Loading={Loading} />
            </div>
        </div>
    </section>
}

export default Sales
