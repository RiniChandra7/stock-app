import Swal from 'sweetalert2';

// Utility function to display error messages using SweetAlert2
const swalErrFire = (msg: string) => {
    // Use SweetAlert2 to show a modal dialog with the error message
    Swal.fire({
        title: 'Error!',
        text: msg,
        icon: 'error',
        confirmButtonText: 'OK'
    });
};

// Export the utility function for external use
export default swalErrFire;
