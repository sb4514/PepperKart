<template>
	<div id="home">
		<navbar/>
		<v-divider></v-divider>
		<p class="headline mx-4 mt-3 font-weight-medium text-xs-center">Order Summary</p>
		<v-divider></v-divider>
		<v-layout justify-start column class="mx-3 mt-3">
			<p class="subheading font-weight-medium mb-2">Your Order</p>
			<v-divider light></v-divider>
			<ul class="mt-3">
				<li v-for="(item, i) in getItems()" :key="i" class="body-2">{{item}}</li>
			</ul>
			<p class="subheading font-weight-medium mt-4 mb-1">OTP</p>
			<v-divider light></v-divider>
			<p
				class="my-1"
			>Tell this otp to delivery boy only at your doorstep. Do not share this OTP over phone or SMS.</p>
			<div class="mt-3 mb-1 otp">
				<p class="cta mb-0">{{item.otp}}</p>
			</div>
			<p class="subheading font-weight-medium mt-3 mb-1">Order Details</p>
			<v-divider light></v-divider>
			<div class="caption grey--text font-weight-medium mt-2">ORDER NUMBER</div>
			<span class="font-weight-medium caption">{{item.id}}</span>

			<div class="caption grey--text font-weight-medium mt-2">DATE</div>
			<span class="font-weight-medium caption">{{item.date}} at {{item.time}}</span>

			<div class="caption grey--text font-weight-medium mt-2">MOBILE NUMBER</div>
			<span class="font-weight-medium caption">{{item.phone}}</span>

			<div class="caption grey--text font-weight-medium mt-2">DELIVER AT</div>
			<span class="font-weight-medium caption mb-2">{{item.address}}</span>

			<v-divider light></v-divider>

			<v-dialog v-model="cancelOrder" persistent max-width="290">
				<template v-slot:activator="{ on }">
					<v-btn
						color="#FFCDD2"
						v-if="status == true"
						v-on="on"
						class="text-capitalize elevation-0"
						style="color: #D32F2F"
					>Cancel Order</v-btn>
				</template>
				<v-card>
					<v-card-title class="headline">Are you sure to cancel this order?</v-card-title>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="grey" flat @click="cancelOrder = false">Close</v-btn>
						<v-btn color="red" flat @click="cancelOrderStatus()">Cancel Order</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<p
				v-if="status == false"
				class="subheading font-weight-medium pt-2 mb-0 red--text text-xs-center"
			>
				<v-icon color="red accent-3">cancel</v-icon>Order Cancelled
			</p>

			<a
				class="text-xs-center mb-3"
				href="tel:+91 9975348410"
				style="text-decoration: none; color: #43A047; font-size: 14pt; margin-top: 1rem"
			>
				<v-icon color="#43A047" class="pr-2">call</v-icon>Call PepperKart
			</a>
		</v-layout>
	</div>
</template>


<style lang="scss">
.otp {
	margin: 0.3rem;
	width: 30%;
	position: relative;
	border: 2px dashed green;
	background: lightgreen;
	color: darkgreen;
	font-weight: 600;

	.cta {
		font-size: 14pt;
		text-align: center;
		padding: 6px;
	}
}
</style>

<script>
import navbar from "@/components/navbar";
import axios from "axios";
export default {
	components: { navbar },
	data() {
		return {
			orders: "",
			item: {},
			cancelOrder: false,
			status: true
		};
	},

	methods: {
		getOrderDetails() {
			var url = window.location.pathname;
			axios
				.post(process.env.VUE_APP_URL + "/fetchordersdetails", {
					id: url.slice(url.lastIndexOf("/") + 1)
				})
				.then(res => {
					var orderData = res.data.orders;
					this.item = orderData[0];
					if (orderData[0].status == "Order Cancelled") {
						this.status = false;
					}
				});
		},

		getItems() {
			return this.item.list_items.split("\n").filter(e => {
				return Boolean(e);
			});
		},

		cancelOrderStatus() {
			var url = window.location.pathname;
			axios
				.post(process.env.VUE_APP_URL + "/cancelorder", {
					id: url.slice(url.lastIndexOf("/") + 1)
				})
				.then(() => {
					this.getOrderDetails();
					this.cancelOrder = false;
				});
		}
	},

	mounted() {
		this.getOrderDetails();
	}
};
</script>
