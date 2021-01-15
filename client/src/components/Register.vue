<template>
  <div class="register-page">
    <div class="content">
    <section class="forms-section">
    <div class="forms">
    <div class="form register-form">
    <div class="register-section">
    <button class="register-button switch-button">Register</button>
    </div>
  <div class="input-section">
    <form @submit.prevent="$router.push('/dashboard')">
      <label for="email"></label>
      <input type="email" id="email" name="email" placeholder="Email" required>
        <ValidationObserver>
          <ValidationProvider rules="required|password:@confirm" v-slot="{ errors }">
            <label for="password"></label>
            <input type="password" id="password" placeholder="Password" required v-model="password" />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider name="confirm" rules="required" v-slot="{ errors }">
            <label for="confirm-password"></label>
            <input type="password" id="confirm-password" placeholder="Confirm Password" required v-model="confirmation" />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </ValidationObserver>
      <label for="agree"></label>
      <input type="checkbox" name="checkbox" value="check" id="agree" required>I have read the terms and conditions
      <button class="submit" type="submit">Register</button>
    </form>
  </div>
</div>
</div>
    </section>
    </div>
  </div>
</template>

<script>
import { extend } from 'vee-validate';
extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});
export default {
  data: () => ({
    password: '',
    confirmation: ''
  }),
name: "Register"
}
</script>

<style scoped>

.register-page{
  margin: 0;
  font-family: Roboto, -apple-system, 'Helvetica Neue', 'Segoe UI', Arial, sans-serif;

  min-height: 100%;

  width: 100%;
  height: auto;

  position: fixed;
  top: 0;
  left: 0;

  background-image: url("assets/background.svg");
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

.content{
  box-sizing: border-box;
  display: block;
  padding-top: 10%;
}

.register-section{
  display: flex;
  background-color: white;
}

.switch-button{
  cursor: pointer;
  outline: 0;
  border: 0;
  background: none;
  color: #0072D5;
  font-weight: bold;
  font-size: 30px;
  padding: 50px 0;
}

.register-button{
  padding-right: 30px;
  font: normal normal bold 31px/40px Arial;
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


#email{
  font: normal normal bold 16px/26px Arial;
  padding-top: 30px;
}
#password{
  font: normal normal bold 16px/26px Arial;
  padding-top: 30px;

}
#confirm-password{
  font: normal normal bold 16px/26px Arial;
  padding-top: 30px;
}
#agree{
  font: normal normal bold 16px/26px Arial;
}

.submit{
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

.input-section input{
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
}



</style>