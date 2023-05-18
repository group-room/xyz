import Swal from "sweetalert2";


const Toast = Swal.mixin({
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


// 경고 모달 (굳이 확인 없어도 되는 경우)
export const timerSwal = (text: string) => {
  return Toast.fire({
    icon: "warning",
    text: text,
    position: "top",
  });
};

// 확인 버튼 모달 (삭제, 탈퇴 등 페이지 바뀌거나 중요한 경우)
export const confirmSwal = (text: string) => {
  return Swal.fire({
    text: text,
    icon: "success",
    confirmButtonColor: "#F39FBF",
    width: "22em",
  });
};

// 확인 버튼 모달 - 경고
export const confirmSwalWarning = (text: string) => {
  return Swal.fire({
    text: text,
    icon: "warning",
  });
};
