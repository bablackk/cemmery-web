const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3333/api/auth/login",
      data: {
        email,
        password,
      },
    });
    console.log(res);
  } catch (e) {
    console.log(e.response.data);
  }
};

document.querySelector(".form-login").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("input-email").value;
  const password = document.getElementById("input-password").value;
  login(email, password);
});
