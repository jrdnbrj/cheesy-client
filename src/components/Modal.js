

const Modal = ({ body, header }) => {

    const closeModal = () => {
        console.log('Closing...')
        const modal = document.getElementById('modal')
        modal.style.display = 'none'
    }

    return <>
        <div id="modal" class="modal">
            <div class="modal-content">
                <span class="close" onClick={closeModal}></span>
                <p>Some text in the Modal..</p>
            </div>
        </div>
    </>
}

export default Modal