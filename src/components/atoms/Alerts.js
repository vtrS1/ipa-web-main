import Swal from 'sweetalert2'

export const SuccessAlert = (title) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title,
    showConfirmButton: true,
    timer: 2000
  })
}

export const ErrorAlert = (title) => {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title,
    showConfirmButton: true,
    timer: 2000
  })
}
