const Modal = ({ id, header, body, acceptText, rejectText, accept }) => {

    const closeModal = () => {
        console.log('Closing...')
        const modal = document.getElementById(id ? id : 'modal')
        modal.style.display = 'none'
    }

    return <>
        <div id={id ? id : 'modal'} className="modal-container">
            <div className="modal-content">
                <div className="modal-header row" id="row-correction">
                    <div className="col-10">
                        <strong>{header}</strong>
                    </div>
                    <div className="col-2">
                        <span className="modal-close" onClick={closeModal}>
                            <i className="bi-x-lg" />
                        </span>
                    </div>
                </div>
                <div className="modal-body">
                    <p>{body}</p>
                </div>
                <div className="modal-footer">
                    {   rejectText &&
                        <button className="btn-danger btn" onClick={closeModal}>
                            {rejectText}
                        </button>
                    }
                    <button className="btn-success btn" onClick={accept ? accept : closeModal}>
                        {acceptText ? acceptText : 'OK'}
                    </button>
                </div>
            </div>
        </div>
    </>
}

export default Modal
