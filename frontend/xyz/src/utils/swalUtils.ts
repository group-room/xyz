import Swal from "sweetalert2";


export const timerSwal = (text: string) => {
  return Swal.fire({
    icon: "warning",
    title: text,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

export const confirmSwal = (text: string) => {
  return Swal.fire({
    icon: "warning",
    text: text,
  });
};