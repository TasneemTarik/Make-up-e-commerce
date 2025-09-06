// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

 const firebaseConfig = {
  apiKey: "AIzaSyB01xkmMzjahq7F3OHMvGYU4YAD0yAnc2w",
  authDomain: "e-commerce-bdf4d.firebaseapp.com",
  projectId: "e-commerce-bdf4d",
  storageBucket: "e-commerce-bdf4d.appspot.com",
  messagingSenderId: "86798785021",
  appId: "86798785021",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// عناصر الفورم
const form = document.getElementById("registerForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// دوال المساعدة
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const isValidPassword = (password) => {
  // لازم يكون فيه: حرف صغير + حرف كبير + رقم + رمز خاص + 8 حروف على الأقل
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

// التحقق
const validateInputs = () => {
  let isValid = true;

  const fullNameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (fullNameValue === "") {
    setError(fullName, "Full Name is required");
    isValid = false;
  } else {
    setSuccess(fullName);
  }

  if (emailValue === "") {
    setError(email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
    isValid = false;
  } else if (!isValidPassword(passwordValue)) {
    setError(
      password,
      "Password must be at least 8 characters, include uppercase, lowercase, number and special character"
    );
    isValid = false;
  } else {
    setSuccess(password);
  }

  if (confirmPasswordValue === "") {
    setError(confirmPassword, "Please confirm your password");
    isValid = false;
  } else if (confirmPasswordValue !== passwordValue) {
    setError(confirmPassword, "Passwords don't match");
    isValid = false;
  } else {
    setSuccess(confirmPassword);
  }

  return isValid;
};
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (validateInputs()) {
    try {
      // 1️⃣ تسجيل في Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.value.trim(),
        password.value.trim()
      );
      console.log("User Registered in Firebase:", userCredential.user);

    
      // 3️⃣ حفظ بيانات المستخدم محليًا
      let userData = {
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      alert("Registration successful! ");
      // 4️⃣ توجيه لصفحة تسجيل الدخول
      window.location.href = "../Login.html";
    } catch (error) {
      console.error("Error:", error.message);
      document.getElementById("apiMsg").textContent =
        "Error: Couldn't register user.";
    }
  }
});

["fullName", "email", "password", "confirmPassword"].forEach((id) => {
  const input = document.getElementById(id);

  input.addEventListener("input", () => {
    const value = input.value.trim();

    if (id === "fullName") {
      if (value === "") {
        setError(input, "Full Name is required");
      } else {
        setSuccess(input);
      }
    }

    if (id === "email") {
      if (value === "") {
        setError(input, "Email is required");
      } else if (!isValidEmail(value)) {
        setError(input, "Provide a valid email address");
      } else {
        setSuccess(input);
      }
    }

    if (id === "password") {
      if (value === "") {
        setError(input, "Password is required");
      } else if (!isValidPassword(value)) {
        setError(
          input,
          "Password must be at least 8 characters, include uppercase, lowercase, number and special character"
        );
      } else {
        setSuccess(input);
      }
    }

    if (id === "confirmPassword") {
      if (value === "") {
        setError(input, "Please confirm your password");
      } else if (value !== password.value.trim()) {
        setError(input, "Passwords don't match");
      } else {
        setSuccess(input);
      }
    }
  });
});
