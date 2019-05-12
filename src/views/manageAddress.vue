<template>
	<div id="home">
		<navbar/>
		<v-divider></v-divider>
		<p class="headline mx-4 mt-3 font-weight-medium text-xs-center">Manage Addresses</p>
		<v-divider></v-divider>
		<v-layout justify-start column class="mx-3 mt-3">
			<v-card
				style="border-radius: 6px"
				class="mb-3 elevation-1"
				v-for="mAddr in addresses"
				:key="mAddr.id"
			>
				<v-card-title primary-title>
					<div>
						<div class="subheading">{{mAddr.address}}</div>
					</div>
				</v-card-title>
				<v-divider light></v-divider>
				<v-layout align-center justify-center row>
					<v-flex xs10>
						<v-card-text>
							<div class="blue-grey--text darken-3 subheading font-weight-medium">
								<v-icon color="blue-grey darken-3" class="pr-2">phone</v-icon>
								{{mAddr.phone}}
							</div>
						</v-card-text>
					</v-flex>
					<v-flex xs2>
						<v-menu bottom left>
							<template v-slot:activator="{ on }">
								<v-btn icon small v-on="on">
									<v-icon>more_vert</v-icon>
								</v-btn>
							</template>
							<v-list>
								<v-list-tile :to="'/editAddress/' + mAddr.id">
									<v-list-tile-title>Edit</v-list-tile-title>
								</v-list-tile>
								<v-list-tile @click="deleteAddress(mAddr.id)">
									<v-list-tile-title>Delete</v-list-tile-title>
								</v-list-tile>
							</v-list>
						</v-menu>
					</v-flex>
				</v-layout>
			</v-card>
		</v-layout>

		<v-layout column align-center class="mx-3">
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
		},

		deleteAddress(id) {
			axios
				.post(process.env.VUE_APP_URL + "/deleteaddress", {
					id: id
				})
				.then(res => {
					this.fetchAddress();
				});
		}
	},

	mounted() {
		this.fetchAddress();
	}
};
</script>