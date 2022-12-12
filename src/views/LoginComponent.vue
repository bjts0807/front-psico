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
                    <h2 class="text-secondary mt-5"><b>Hi, Bienvenido</b></h2>
                    <p class="f-16 mt-2">Ingresa tus credenciales</p>
                  </div>
                </div>
              </div>
              <!-- <div class="d-grid">
                <button type="button" class="btn mt-2 btn-light-primary bg-light text-muted">
                  <img src="../../public/assets/images/authentication/google-icon.svg" />Sign In With Google
                </button>
              </div> -->
             
              <form @submit.prevent="login()">
                 
              
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
                <input type="password" class="form-control" v-model="form.password" id="floatingInput" placeholder="Password" />
                <label for="floatingInput">Password</label>
              </div>
              <div v-if="v$.form.password.$error" class="text-danger" style="font-size:14px" >
                  <i class="fa fa-warning fa-fw"></i> Por favor ingrese su contraseña.
                </div>
              <!-- <div class="d-flex mt-1 justify-content-between">
                <div class="form-check">
                  <input class="form-check-input input-primary" type="checkbox" id="customCheckc1" checked="" />
                  <label class="form-check-label text-muted" for="customCheckc1">Remember me</label>
                </div>
                <h5 class="text-secondary">Forgot Password?</h5>
              </div> -->
              <div class="d-grid mt-4">
                <button type="submit" class="btn btn-secondary" >Acceder</button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required ,email} from '@vuelidate/validators';
import {useRouter} from "vue-router";

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

  validations(){
    return {
      form: {
          email: { required, email },
          password: { required },
      }
    }
  },
  methods: {
     
    async login() {
      const router = useRouter();
      try{

        if (!await this.v$.form.$validate()) return;

        this.LoaderSpinnerShow();

        await this.$store.dispatch("login", this.form);
        await router.push({ name : 'Dashboard' });
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