<template>
	<div id="home">
		<navbar/>
		<v-divider></v-divider>
		<p class="headline mx-4 mt-3 font-weight-medium text-xs-center">Edit Addresses</p>
		<v-divider></v-divider>
		<v-layout justify-start column class="mx-3 mt-3">
			<v-form ref="editAddressForm">
				<v-textarea
					v-model="addr"
					:rules="addrRules"
					auto-grow
					box
					color="blue-grey darken-3"
					label="Address"
					:value="addresses.address"
					rows="8"
				></v-textarea>
				<v-text-field
					v-model="phone"
					:rules="phoneRules"
					color="blue-grey darken-3"
					box
					mask="##########"
					label="Phone Number"
				></v-text-field>
			</v-form>
			<v-btn color="blue-grey darken-3" @click="updateAddress" dark>Update Address</v-btn>
		</v-layout>
		<div>
			<v-dialog v-model="updateAddrSuccess" persistent max-width="290">
				<v-card>
					<v-card-title class="headline">👍</v-card-title>
					<v-card-text>Address and Phone number updated successfully.</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue-grey darken-3" flat to="/manageAddress">Okay</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import navbar from "@/components/navbar";
import axios from "axios";
export default {
	components: { navbar },
	data() {
		return {
			addresses: "",
			addAddress: false,
			addr: "",
			phone: "",
			preloader: false,
			updateAddrSuccess: false,
			addrRules: [
				v => !!v || "Address is required.",
				v =>
					(v && v.length >= 7) ||
					"Address must be atleast 7 characters long."
			],
			phoneRules: [
				v => !!v || "Phone number is required.",
				v =>
					(v && v.length >= 10) ||
					"Phone number must be 10 characters long."
			]
		};
	},

	methods: {
		fetchaddressid() {
			var url = window.location.pathname;
			axios
				.post(process.env.VUE_APP_URL + "/fetchaddressid", {
					id: url.slice(url.lastIndexOf("/") + 1)
				})
				.then(res => {
					this.addresses = res.data[0];
					this.addr = res.data[0].address;
					this.phone = res.data[0].phone;
				});
		},

		updateAddress() {
			var url = window.location.pathname;
			axios
				.post(process.env.VUE_APP_URL + "/updateaddress", {
					id: url.slice(url.lastIndexOf("/") + 1),
					address: this.addr,
					phone: this.phone
				})
				.then(res => {
					this.updateAddrSuccess = true
				});
		}
	},

	mounted() {
		this.fetchaddressid();
	}
};
</script>