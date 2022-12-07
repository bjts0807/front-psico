<template>
 <div class="auth-main">
      <div class="auth-wrapper v3">
        <div class="auth-form">
          <div class="card my-5">
            <div class="card-body">
              <a href="#" class="d-flex justify-content-center">
                <img src="../../public/assets/images/logo-dark.svg" />
              </a>
              <div class="row">
                <div class="d-flex justify-content-center">
                  <div class="auth-header">
                    <h2 class="text-secondary mt-5"><b>Hi, Welcome Back</b></h2>
                    <p class="f-16 mt-2">Enter your credentials to continue</p>
                  </div>
                </div>
              </div>
              <div class="d-grid">
                <button type="button" class="btn mt-2 btn-light-primary bg-light text-muted">
                  <img src="../../public/assets/images/authentication/google-icon.svg" />Sign In With Google
                </button>
              </div>
              <div class="saprator mt-3">
                <span>or</span>
              </div>
              <h5 class="my-4 d-flex justify-content-center">Sign in with Email address</h5>
              <div class="form-group" v-if="has_error">
                  <div class="alert alert-danger alert-dismissible fade show w-100 d-block" role="alert">
                    <i class="fas fa-exclamation-triangle fa-fw"></i>
                    <div v-text="message"></div>
                  </div>
                </div>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" v-model="form.email" id="floatingInput" placeholder="Email address / Username" />
                <label for="floatingInput">Email address / Username</label>
              </div>
               <div v-if="v$.form.email.$error" class="text-danger" style="font-size:14px" >
                  <i class="fa fa-warning fa-fw"></i> Por favor ingrese su e-mail.
                </div>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" v-model="form.password" id="floatingInput" placeholder="Password" />
                <label for="floatingInput">Password</label>
              </div>
              <div v-if="v$.form.password.$error" class="text-danger" style="font-size:14px" >
                  <i class="fa fa-warning fa-fw"></i> Por favor ingrese su contraseña.
                </div>
              <div class="d-flex mt-1 justify-content-between">
                <div class="form-check">
                  <input class="form-check-input input-primary" type="checkbox" id="customCheckc1" checked="" />
                  <label class="form-check-label text-muted" for="customCheckc1">Remember me</label>
                </div>
                <h5 class="text-secondary">Forgot Password?</h5>
              </div>
              <div class="d-grid mt-4">
                <button type="button" class="btn btn-secondary" @click="login();">Sign In</button>
              </div>
              <hr />
              <h5 class="d-flex justify-content-center">Don't have an account?</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import useVuelidate from '@vuelidate/core'
import { required ,email} from '@vuelidate/validators';
export default {
  name: "LoginComponent",
  setup: () => ({ v$: useVuelidate() }),
  data (){
    return {
      form: {
          email: "bjts95@gmail.com",
          password: "12345",
      },
      has_error : false,
      message : "",
    }
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  validations(){
    return {
      form: {
          email: { required, email },
          password: { required },
      }
    }
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    async login() {
      try{

        if (!await this.v$.form.$validate()) return;

        this.LoaderSpinnerShow();

        await this.$store.dispatch("login", this.form);
        this.LoaderSpinnerHide();
      }catch(error){
          this.LoaderSpinnerHide();
          switch(error.response.status){
              case 422:
                  this.has_error = true;
                  this.message = "Usuario o contraseña incorrectos";
                  break;
                case 401:
                      this.has_error = true;
                      this.message = "Usuario o contraseña incorrectos";
              break;
              default :
                  this.has_error = true;
                  this.message = "Ha ocurrido un error, por favor intente nuevamente";
              break;
          }
      }
    }
  },
};
</script>