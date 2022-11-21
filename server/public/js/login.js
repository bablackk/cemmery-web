// const login = async (email, password) => {
//   try {
//     const res = await axios({
//       method: "POST",
//       url: "http://localhost:3333/api/auth/login",
//       data: {
//         email,
//         password,
//       },
//     });
//     if (res.data.status === "success") {
//       console.log(res.data.user);
//       // alert(`Login successfully, You will redirect page Home`);
//       window.setTimeout(() => {
//         location.assign("/");
//       }, 1000);
//     }
//     console.log(res);
//   } catch (e) {
//     alert(e.response.data);
//   }
// };
//
// document.querySelector(".form-login").addEventListener("submit", (e) => {
//   e.preventDefault();
//   const email = document.getElementById("input-email").value;
//   const password = document.getElementById("input-password").value;
//   login(email, password);
// });
