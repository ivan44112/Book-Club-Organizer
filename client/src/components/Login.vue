<template>
  <div class="login-page">
    <div class="section-top">
      <div class="logo-container">
        <div class="logo-title">Booknizer</div>
        <div class="logo-line"></div>
        <div class="logo-logotext">Your online book Club organizer</div>
      </div>
      <div class="link-container">
        <div class="link">About</div>
        <div class="link">Contact</div>
      </div>
    </div>
    <div class="content">
      <section class="forms-section">
        <div class="forms">
          <div class="form login-form">
            <div class="switch-section">
              <button class="signin-button switch-button">Sign in</button>
            </div>
            <div class="input-section">
              <form v-on:submit.prevent="login()">
                <label for="email"></label>
                <input type="email" v-model="email" id="email" name="email" placeholder="Email" required>
                <label for="password"></label>
                <input type="password" v-model="password" id="password" name="password" placeholder="Password" required>
                <div class="forgot-pass">Forgot Password?</div>
                <button class="submit" type="submit">Log In</button>
              </form>
              <form @submit.prevent="$router.push('/register')">
                <p class="register">Don't have an account?
                  <button class="signup-button switch-button">Sign up here</button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section class="image-section">
      </section>
    </div>
  </div>
</template>

<script>
import {Auth} from "@/services/userServices";

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      let result = await Auth.login(this.email, this.password);
      console.log('Login result', result);

      if (result === true) {
        this.$router.push('/dashboard/dashboardcontent');
      }
    }
  }
}
</script>

<style scoped>

.login-page {

  margin: 0;
  font-family: Roboto, -apple-system, 'Helvetica Neue', 'Segoe UI', Arial, sans-serif;

  min-height: 100%;

  width: 100%;
  height: auto;

  position: fixed;
  top: 0;
  left: 0;

  background-image: url("../assets/background.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}


.forms-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
}

.section-top {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
}

.content {
  display: flex;

}

.image-section {
  width: 66%;
  height: calc(100vh - 90px);
  background-image: url("../assets/image right.png");
}


.switch-section {
  display: flex;
  background-color: white;
}

.switch-button {
  cursor: pointer;
  outline: 0;
  border: 0;
  background: none;
  color: #0072D5;
  font-weight: bold;
  font-size: 30px;
  padding: 50px 0;
}

.signin-button {
  padding-right: 30px;
  font: normal normal bold 31px/40px Arial;

}

.signup-button {
  font: normal normal bold 16px/11px Arial;
  color: #0072D5;
  padding-left: 5px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 50px;
}

.link-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 50px;
}

.link {
  padding: 0 20px;
  color: white;
  margin-top: 18px;
  font-weight: bold;
}

.logo-title {
  font: normal normal bold 46px/60px Arial;
  color: #FFF700;
}

.logo-line {
  height: 33px;
  border: 1px solid #FFFFFF;
  margin: 0 15px;

}

.logo-logotext {
  font: normal normal bold 16px/21px Calibri;
  padding-top: 18px;
  color: #ffffff;
}

.forms {
  display: flex;
  flex-direction: column;
  box-shadow: 6px 6px 7px #00000026;
  border-radius: 10px;
  background-color: white;
  padding: 20px 50px;
  height: 60%;
}

.form {
  width: 338px;
}

#email {
  font: normal normal bold 16px/26px Arial;
  padding-top: 30px;
  outline: none;
  background-color: white;
}

#password {
  font: normal normal bold 16px/26px Arial;
  padding-top: 30px;
  outline: none;

}

.forgot-pass {
  font: normal normal normal 12px/16px Roboto;
  letter-spacing: 0;
  color: #535353;
  opacity: 0.68;
  margin-left: 240px;
  cursor: pointer;
}

.submit {
  display: block;
  width: 330px;
  height: 50px;
  border: none;
  background: #0072D5 0 0 no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  color: white;
  cursor: pointer;
  margin: 35px auto 0;
  font: normal normal bold 19px/25px Arial;
}

.register {
  display: flex;
  align-items: center;
  font: normal normal normal 16px/21px Arial;
  color: #535353;
}

.input-section input {
  display: block;
  width: 100%;
  margin-top: 8px;
  padding-right: 35px;
  padding-left: 3px;
  font-size: 16px;
  line-height: 40px;
  border-bottom: 1px solid #ABABAB;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  background-color: white;
}

</style>