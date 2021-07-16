import Square from './Sales/Square'
import PayPal from './Sales/PayPal'


const Sales = ({ Loading }) => {
    return <section className="mt-5">
        <nav className="nav nav-tabs" role="tablist">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-orders" type="button" role="tab" aria-controls="nav-orders" aria-selected="true">
                Orders
            </button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-paypal" type="button" role="tab" aria-controls="nav-paypal" aria-selected="false">
                PayPal
            </button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-square" type="button" role="tab" aria-controls="nav-square" aria-selected="false">
                Square
            </button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-errors" type="button" role="tab" aria-controls="nav-errors" aria-selected="false">
                Errors
            </button>
        </nav>
        <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-orders" role="tabpanel" aria-labelledby="nav-orders-tab">
                Orders
            </div>
            <div className="tab-pane fade" id="nav-paypal" role="tabpanel" aria-labelledby="nav-paypal-tab">
                <PayPal Loading={Loading} />
            </div>
            <div className="tab-pane fade" id="nav-square" role="tabpanel" aria-labelledby="nav-square-tab">
                <Square Loading={Loading} />
            </div>
            <div className="tab-pane fade" id="nav-errors" role="tabpanel" aria-labelledby="nav-errors-tab">
                Errors
            </div>
        </div>
    </section>
}


export default Sales