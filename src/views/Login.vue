<template>
	<div>
		<v-layout align-center justify-start column class="mx-3">
			<img src="/assets/ic_launcher.png" width="128" class="mt-3 animated zoomIn delay-2s" alt>
			<p
				class="blue-grey--text text--darken-4 headline text-xs-center mt-3 mb-1 font-weight-medium"
			>Log In</p>
			<p
				class="blue-grey--text text--darken-1 subheading text-xs-center mb-1"
			>Login with your email and password that you used for signup.</p>

			<v-form @submit.prevent="login" class="mt-3 mx-3" ref="loginForm" style="width: 100%">
				<v-text-field
					name="input-10-2"
					label="Email"
					color="blue-grey darken-4"
					box
					v-model="email"
					:rules="emailRules"
					class="input-group--focused"
				></v-text-field>
				<v-text-field
					:append-icon="show ? 'visibility' : 'visibility_off'"
					:rules="passwordRules"
					:type="show ? 'text' : 'password'"
					name="input-10-2"
					label="Password"
					color="blue-grey darken-4"
					box
					v-model="password"
					class="input-group--focused"
					@click:append="show = !show"
				></v-text-field>
				<v-btn
					v-if="!preloader"
					dark
					class="text-capitalize px-0 mx-0"
					color="blue-grey darken-4"
					style="width: 100%; border-radius: 5px"
					type="submit"
				>Log In</v-btn>
				<v-btn
					v-else
					dark
					class="text-capitalize px-0 mx-0"
					color="blue-grey darken-4"
					style="width: 100%; border-radius: 5px"
				>
					<v-progress-circular indeterminate color="white" size="20" width="3"></v-progress-circular>
				</v-btn>
			</v-form>
			<div class="my-3">
				<p class="d-inline mt-3 mb-0 grey--text">Don't have an account?</p>
				<router-link
					class="pl-1 d-inline font-weight-medium blue-grey--text text--darken-4"
					to="/signup"
					style="text-decoration: none;"
				>Sign Up</router-link>
			</div>
		</v-layout>
		<div>
			<v-dialog v-model="emailNotFound" persistent max-width="290">
				<v-card>
					<v-card-title class="headline">:( Oops!</v-card-title>
					<v-card-text>We haven't found your email.</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue-grey darken-3" flat @click="emailNotFound = false">Okay</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
		<div>
			<v-dialog v-model="passwordUnmatched" persistent max-width="290">
				<v-card>
					<v-card-title class="headline">:( Oops!</v-card-title>
					<v-card-text>Please check your password.</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue-grey darken-3" flat @click="passwordUnmatched = false">Okay</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<style lang="scss">
@import url("https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css");
</style>


<script>
import axios from "axios";
export default {
	data() {
		return {
			show: false,
			rules: {
				Passwordrequired: value => !!value || "Password Required."
			},
			email: "",
			password: "",
			preloader: false,
			emailNotFound: false,
			passwordUnmatched: false,
			emailRules: [
				v => !!v || "E-mail is required",
				v =>
					/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						v
					) || "E-mail must be valid"
			],
			passwordRules: [v => !!v || "Password is required"]
		};
	},

	methods: {
		login() {
			if (this.$refs.loginForm.validate()) {
				this.preloader = true;
				axios
					.post(process.env.VUE_APP_URL + "/login", {
						email: this.email,
						password: this.password
					})
					.then(res => {
						this.preloader = false;
						if(res.data == 'email not found'){
							this.emailNotFound = true
						}
						else if(res.data == 'password not match'){
							this.passwordUnmatched = true
						}
						else {
							var user = res.data.user
							localStorage.setItem('email', user.email)
							localStorage.setItem('avatar', user.avatar)
							localStorage.setItem('name', user.name)
							localStorage.setItem("isAuthenticated", true);
							this.$router.push('/dash')
						}
					});
			}
		}
	}
};
</script>
