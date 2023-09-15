import Swal from "sweetalert2";

export async function toast(icon, title, timer = 2000) {
  return Swal.fire({
    position: "top-end",
    title,
    icon,
    timer,
    showConfirmButton: false,
    toast: true,
  });
}
