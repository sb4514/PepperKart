<template>
	<div id="home">
		<navbar/>
		<v-divider></v-divider>
		<p class="headline mx-4 mt-3 text-xs-center">Profile</p>
		<v-divider></v-divider>
		<v-layout justify-start class="mx-3">
			<v-flex xs4 class="mt-3">
				<v-avatar :size="96" color="grey lighten-4">
					<img :src="photo" alt="avatar">
				</v-avatar>
			</v-flex>
			<v-flex xs8 class="mt-3">
				<p class="headline text-xs-right font-weight-medium mb-1">{{name}}</p>
				<p class="caption grey--text darken-5 text-xs-right font-weight-medium">{{email}}</p>
				<v-btn
					outline
					color="pink"
					class="text-xs-right text-capitalize mr-0"
					style="border-radius: 4px; float: right"
					to="/orders"
				>
					<v-icon class="mr-2">shopping_basket</v-icon>Your Orders
				</v-btn>
			</v-flex>
		</v-layout>
		<v-divider light class="mt-3"></v-divider>
		<v-layout>
			<v-flex>
				<v-card color="blue-grey darken-3" dark flat to="/manageAddress">
					<v-card-title class="subheading font-weight-medium">
						Manage Addresses
						<v-spacer></v-spacer>
						<v-icon>arrow_forward</v-icon>
					</v-card-title>
				</v-card>
			</v-flex>
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
			photo: localStorage.getItem("avatar"),
			name: localStorage.getItem("name"),
			email: localStorage.getItem("email")
		};
	},

	methods: {}
};
</script>
