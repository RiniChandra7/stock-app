import Swal from 'sweetalert2';

const swalErrFire = (msg: string) => {
    Swal.fire({
        title: 'Error!',
        text: msg,
        icon: 'error',
        confirmButtonText: 'OK'
      })
}

export default swalErrFire;