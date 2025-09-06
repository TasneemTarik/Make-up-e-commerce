// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB01xkmMzjahq7F3OHMvGYU4YAD0yAnc2w",
  authDomain: "e-commerce-bdf4d.firebaseapp.com",
  projectId: "e-commerce-bdf4d",
  storageBucket: "e-commerce-bdf4d.appspot.com",
  messagingSenderId: "86798785021",
  appId: "86798785021",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    localStorage.setItem("loggedInUser", user.displayName || user.email);

    alert("Login successful!");
    window.location.href = "../index.html"; // رجّعيه للصفحة الرئيسية
  } catch (error) {
    console.error("Error logging in:", error.message);
    alert("Login failed: " + error.message);
  }
});
