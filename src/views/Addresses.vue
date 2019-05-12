<template>
	<div id="home">
		<navbar/>
		<v-divider></v-divider>
		<p class="headline mx-4 mt-3 text-xs-center">Select Address</p>
		<v-divider></v-divider>
		<v-layout justify-start column class="mx-3">
			<div v-if="addresses == ''" style="margin-top: 5rem">
				<v-icon color="grey" size="50">error_outline</v-icon>
				<p class="headline my-1" style="color: grey">Please add address and phone Number to continue.</p>

				<v-layout column align-center class="ma-3">
					<v-dialog v-model="addAddress" fullscreen hide-overlay transition="dialog-bottom-transition">
						<template v-slot:activator="{ on }">
							<v-btn color="blue-grey darken-3" style="width: 100%" class="mx-3" v-on="on" dark>Add Address</v-btn>
						</template>
						<v-card>
							<v-toolbar dark color="blue-grey darken-3">
								<v-btn icon dark @click="addAddress = false">
									<v-icon>close</v-icon>
								</v-btn>
								<v-toolbar-title>Add Address</v-toolbar-title>
								<v-spacer></v-spacer>
								<v-toolbar-items>
									<v-btn
										v-if="!preloader"
										dark
										flat
										@click="addAddresses"
										class="subheading text-capitalize"
									>Save</v-btn>
									<v-progress-circular v-else indeterminate color="white" class="mt-3" size="25"></v-progress-circular>
								</v-toolbar-items>
							</v-toolbar>
							<v-layout align-center justify-start column fill-height class="mx-3">
								<div style="width: 100%">
									<p class="s ubheading mt-3 text-xs-center">Enter the grocery items in below.</p>
									<v-form ref="addressForm">
										<v-textarea
											v-model="adrr"
											:rules="addrRules"
											auto-grow
											box
											color="blue-grey darken-3"
											label="Address"
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
								</div>
							</v-layout>
						</v-card>
					</v-dialog>
				</v-layout>
			</div>
			<div>
				<v-radio-group v-model="address" column v-for="mAddr in addresses" :key="mAddr.id">
					<v-radio
						:label="mAddr.address + ' | ' + mAddr.phone"
						:value="mAddr.id"
						color="#43A047"
						hide-actions
						v-on:change="activateOrderNow"
					></v-radio>
				</v-radio-group>
				<v-spacer></v-spacer>
				<v-btn
					v-if="orderBtn"
					v-model="orderBtn"
					@click="orderNow"
					color="blue-grey darken-3"
					dark
					style="width:100%"
				>Order Now</v-btn>
			</div>
		</v-layout>
	</div>
</template>

<script>
import navbar from "@/components/navbar";
import axios from "axios";
export default {
	props: {
		list_id: { type: String }
	},
	components: { navbar },
	data() {
		return {
			addressRadio: null,
			orderBtn: false,
			address: "",
			addresses: [],
			addAddress: false,
			addr: "",
			phone: ""
		};
	},

	methods: {
		activateOrderNow() {
			this.orderBtn = true;
		},

		orderNow() {
			axios
				.post(process.env.VUE_APP_URL + "/sendOrder", {
					email: localStorage.getItem("email"),
					list_id: this.list_id,
					address_id: this.address
				})
				.then(() => {
					this.$router.push("/success");
				});
		},
		fetchAddress() {
			axios
				.post(process.env.VUE_APP_URL + "/fetchaddress", {
					email: localStorage.getItem("email")
				})
				.then(res => {
					this.addresses = res.data.address;
				});
		},
		addAddresses() {
			if (this.$refs.addressForm.validate()) {
				this.preloader = true;
				axios
					.post(process.env.VUE_APP_URL + "/addAddress", {
						email: localStorage.getItem("email"),
						address: this.adrr,
						phone: this.phone
					})
					.then(res => {
						this.fetchAddress();
						this.preloader = false;
						this.addAddress = false;
						this.$refs.addressForm.reset();
					});
			}
		}
	},

	mounted() {
		this.fetchAddress();
	}
};
</script>
