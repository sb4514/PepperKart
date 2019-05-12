<template>
	<div id="home">
		<navbar/>
		<v-divider></v-divider>
		<v-layout justify-start column class="mx-4">
			<v-flex xs12>
				<p class="headline mt-3 text-xs-center font-weight-bold">{{item.list_title}}</p>
			</v-flex>
			<v-divider></v-divider>
			<v-flex class="mt-2">
				<div>
					<p class="d-inline">Transaction id:</p>
					<span style="color: grey" class="pl-2">{{item.id}}</span>
				</div>
				<div>
					<p class="d-inline">Date:</p>
					<span style="color: grey" class="pl-2">{{item.date}}</span>
				</div>
				<div>
					<p class="d-inline">Time:</p>
					<span style="color: grey" class="pl-2">{{item.time}}</span>
				</div>
				<div>
					<p class="d-inline">Status:</p>
					<span style="color: grey" class="pl-2">{{item.status}}</span>
				</div>
			</v-flex>
			<v-divider class="mt-2"></v-divider>
			<v-flex xs12 class="mt-3">
				<p>List Items:</p>
				<ul>
					<li v-for="(item, i) in getItems()" :key="i" class="title pb-1">{{item}}</li>
				</ul>
			</v-flex>
			<v-divider class="mt-2"></v-divider>

			<v-dialog v-model="deleteList" persistent max-width="290">
				<template v-slot:activator="{ on }">
					<v-btn flat color="red" class="mt-4" v-on="on" outline>Delete List</v-btn>
				</template>
				<v-card>
					<v-card-title class="headline">Are you sure to delete this list?</v-card-title>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="grey" flat @click="deleteList = false">Cancel</v-btn>
						<v-btn color="red" flat @click="deleteListData()">Delete</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-btn v-if="preloader == false" dark color="blue-grey darken-3" class="mb-3" @click="orderList">Order list</v-btn>
			<v-progress-circular
				v-else
				indeterminate
				color="blue-grey darken-3"
				style="width: 100%"
				class="my-3"
				size="25"
			></v-progress-circular>
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
			resListItems: "",
			item: {},
			email: localStorage.getItem("email"),
			deleteList: false,
			preloader: false
		};
	},

	methods: {
		fetchListData() {
			var url = window.location.pathname;
			axios
				.post(process.env.VUE_APP_URL + "/fetchlistdata", {
					email: this.email,
					id: url.slice(url.lastIndexOf("/") + 1)
				})
				.then(res => {
					var listData = res.data.listData;
					this.item = listData[0];
					// this.lists = res.data.listData;
				});
		},

		deleteListData() {
			var url = window.location.pathname;
			axios
				.post(process.env.VUE_APP_URL + "/deletelist", {
					id: url.slice(url.lastIndexOf("/") + 1)
				})
				.then(() => {
					this.$router.push("/dash");
				});
		},

		orderList() {
			var url = window.location.pathname;
			var id = url.slice(url.lastIndexOf("/") + 1);
			sessionStorage.setItem("id", id);
			this.preloader = true;
			this.$router.push("/addresses/" + id);
			this.preloader = false;
		},

		getItems(){
			return this.item.list_items.split('\n').filter((e) => {
				return Boolean(e)
			})
		}
	},

	mounted() {
		this.fetchListData();
	}
};
</script>
