import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ImagenModal = ({ imageUrl, onClose }) => {
    const [modalVisible, setModalVisible] = useState(true);
  
    const openSweetAlert = () => {
      setModalVisible(true);
      Swal.fire({
        imageUrl: imageUrl,
        imageAlt: 'Imagen en modal',
        showCloseButton: true,
        showConfirmButton: false,
        focusConfirm: false,
        onClose: onClose,
        imageWidth: 400,
      });
    };
  
    return (
      modalVisible && (
        <div className="modal-overlay" onClick={openSweetAlert}>
          <div className="modal-content">
            <img src={imageUrl} alt="Imagen en modal" className="max-w-full max-h-full rounded-md" />
          </div>
        </div>
      )
    );
  };

export default ImagenModal;
