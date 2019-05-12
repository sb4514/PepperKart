<template>
	<div>
		<v-layout align-center justify-start column class="mx-3">
			<img src="/assets/ic_launcher.png" width="128" class="mt-3 animated zoomIn delay-2s" alt>
			<p
				class="blue-grey--text text--darken-4 headline text-xs-center mt-3 mb-1 font-weight-medium"
			>Sign Up</p>
			<p
				class="blue-grey--text text--darken-1 subheading text-xs-center mb-1"
			>Signup with your name and email</p>

			<v-form @submit.prevent="signup" class="mt-3 mx-3" ref="signupForm" style="width: 100%">
				<v-text-field
					name="input-10-2"
					label="Full Name"
					color="blue-grey darken-4"
					box
					v-model="name"
					:rules="[rules.nameRequired]"
					class="input-group--focused"
				></v-text-field>
				<v-text-field
					name="input-10-2"
					label="Email"
					color="blue-grey darken-4"
					box
                    :rules="emailRules"
					v-model="email"
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
				<v-text-field
					:append-icon="show ? 'visibility' : 'visibility_off'"
					:rules="ConfirmPasswordRules"
					:type="show ? 'text' : 'password'"
					name="input-10-2"
					label="Confirm Password"
					color="blue-grey darken-4"
					box
					v-model="confirmPassword"
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
				>Sign Up</v-btn>
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
				<p class="d-inline mt-3 mb-0 grey--text">Already have an account?</p>
				<router-link
					class="pl-1 d-inline font-weight-medium blue-grey--text text--darken-4"
					to="/"
					style="text-decoration: none;"
				>Login</router-link>
			</div>
		</v-layout>
		<div>
			<v-dialog v-model="emailAlreadyExist" persistent max-width="290">
				<v-card>
					<v-card-title class="headline">:( Oops!</v-card-title>
					<v-card-text>Email already exists.</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue-grey darken-3" flat @click="emailAlreadyExist = false">Okay</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
		<div>
			<v-dialog v-model="signupSuccess" persistent max-width="290">
				<v-card>
					<v-card-title class="headline">:) Wohoo!</v-card-title>
					<v-card-text>You've signed up successfully.</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue-grey darken-3" flat to="/">Login</v-btn>
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
				nameRequired: value => !!value || "Name Required."
			},
			emailRules: [
				v => !!v || "E-mail is required",
				v =>
					/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						v
					) || "E-mail must be valid"
			],
			passwordRules: [
				v => !!v || "Password is required",
				v =>
					/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,32}$/.test(
						v
					) ||
					"Password must contain 1 uppercase, 1 lowercase, 1 number and a symbol",
				v =>
					v.length >= 8 ||
					"Password must contain minimum of 8 characters"
			],
			ConfirmPasswordRules: [
				v => !!v || "Confirm Password is required",
				v =>
					v == this.password ||
					"Confirm Password should match with the password"
			],
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			preloader: false,
			emailAlreadyExist: false,
			signupSuccess: false
		};
	},

	methods: {
		signup() {
			if (this.$refs.signupForm.validate()) {
				this.preloader = true;
				axios
					.post(process.env.VUE_APP_URL + "/signup", {
						name: this.name,
						email: this.email,
						password: this.password
					})
					.then(res => {
						this.preloader = false;
						if (res.data == "emailExi") {
							this.emailAlreadyExist = true;
						} else {
							this.signupSuccess = true;
						}
					});
			}
		}
	}
};
</script>
