<template>
	<div id="home">
		<navbar/>
		<v-divider></v-divider>
		<p class="headline mx-4 mt-3 font-weight-medium text-xs-center">Your Orders</p>
		<v-divider></v-divider>
		<v-layout justify-start column class="mx-3 mt-3">
			<div class="ml-3" v-if="orders == ''" style="margin-top: 5rem">
				<v-icon color="grey" size="50">error_outline</v-icon>
				<p class="headline my-1" style="color: grey">No orders :(</p>
				<p style="color: grey">To order, please go to the list and press order button.</p>
			</div>

			<div v-else>
				<v-card
					style="border-radius: 6px"
					class="mb-3 elevation-1"
					v-for="order in orders"
					:key="order.id"
					:to="'/orders/' + order.id"
				>
					<v-card-title primary-title>
						<div>
							<div class="headline">{{order.list_title}}</div>
						</div>
					</v-card-title>
					<v-divider light></v-divider>
					<v-card-text>
						<div class="grey--text darken-2 caption font-weight-medium">ORDERED ON</div>
						<span class="font-weight-medium">{{order.date}} at {{order.time}}</span>
					</v-card-text>
					<v-divider light></v-divider>
					<p
						v-if="order.status == 'Order Confirmed'"
						class="font-weight-medium green--text darken-3 mx-3 py-2"
					>Order Confirmed</p>
					<p v-else class="font-weight-medium red--text darken-3 mx-3 py-2">Order Cancelled</p>
					<v-spacer></v-spacer>
				</v-card>
			</div>
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
			orders: ""
		};
	},

	methods: {
		fetchOrders() {
			axios
				.post(process.env.VUE_APP_URL + "/fetchorders", {
					email: localStorage.getItem("email")
				})
				.then(res => {
					this.orders = res.data.orders;
				});
		}
	},

	created() {
		this.fetchOrders();
	}
};
</script>
