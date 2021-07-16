import Products from '../components/Admin/Products'
import Contact from '../components/Admin/Contact'
import Sales from '../components/Admin/Sales'
// import loading from '../assets/img/loading.gif'

const Admin = () => {

    const Loading = ({ document }) => {
        return <section className="loading">
            {/* <img src={loading} alt="Loading Gif" /> */}
            <div className="spinner-border" role="status"></div>
            <p>Loading {document}...</p>
        </section>
    }

    return <div className="container pt-4">
        <nav className="nav nav-pills nav-fill" role="tablist">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#nav-products" type="button" role="tab" aria-controls="nav-products" aria-selected="true">
                Products
            </button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                Contact
            </button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-sales" type="button" role="tab" aria-controls="nav-sales" aria-selected="false">
                Sales
            </button>
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#nav-settings" type="button" role="tab" aria-controls="nav-settings" aria-selected="false">
                Settings
            </button>
        </nav>
        <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-products" role="tabpanel" aria-labelledby="nav-products-tab">
                <Products Loading={Loading} />
            </div>
            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                <Contact Loading={Loading} />
            </div>
            <div className="tab-pane fade" id="nav-sales" role="tabpanel" aria-labelledby="nav-sales-tab">
                <Sales Loading={Loading} />
            </div>
            <div className="tab-pane fade" id="nav-settings" role="tabpanel" aria-labelledby="nav-settings-tab">
                <section className="settings">
                    <label className="form-label">Discount percentage each months in club</label>
                    <input className="form-control" placeholder="5%" />
                    <label className="form-label">Discount percentage every two months in club</label>
                    <input className="form-control" placeholder="10%" />
                </section>
            </div>
        </div>
    </div>
}

export default Admin
