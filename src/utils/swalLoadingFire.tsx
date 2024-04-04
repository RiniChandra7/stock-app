import Swal from 'sweetalert2';

// Utility function to display loading messages using SweetAlert2
const swalLoadingFire = () => {
    // Use SweetAlert2 to show a modal dialog with the loading message
    Swal.fire({
        title: 'Loading...',
        text: 'Please wait while we fetch the data.',
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
        icon: 'info',
        onOpen: () => {
          Swal.showLoading();
        }
      });
};

// Export the utility function for external use
export default swalLoadingFire;
