<template>
	<div id="home" style="height: 100vh; display: flex; flex-direction: column">
		<navbar/>
		<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
			<template v-slot:activator="{ on }">
				<v-btn color="#43A047" v-on="on" dark icon fab absolute bottom right>
					<v-icon>add</v-icon>
				</v-btn>
			</template>
			<v-card>
				<v-toolbar dark color="#43A047">
					<v-btn icon dark @click="dialog = false">
						<v-icon>close</v-icon>
					</v-btn>
					<v-toolbar-title>Create Grocery List</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn v-if="!preloader" dark flat @click="sendList" class="subheading text-capitalize">Save</v-btn>
						<v-progress-circular v-else indeterminate color="white" class="mt-3" size="25"></v-progress-circular>
					</v-toolbar-items>
				</v-toolbar>
				<v-layout align-center justify-start column fill-height class="mx-3">
					<div style="width: 100%">
						<p class="s ubheading mt-3 text-xs-center">Enter the grocery items in below.</p>
						<v-form ref="listForm">
							<v-text-field
								v-model="listTitle"
								:rules="listTitleRules"
								color="#43A047"
								box
								label="List Title"
							></v-text-field>
							<p>* Please provide detailed list including quantity.</p>
							<v-textarea
								v-model="listItems"
								:rules="listItemsRules"
								auto-grow
								box
								placeholder="Maggie (Rs.12) x2"
								color="#43A047"
								label="List Items"
								rows="8"
							></v-textarea>
						</v-form>

						<p
							class="subheading"
						>Note: A delivery charge of Rs.20 will be applicable if your order is below Rs.500</p>
					</div>
				</v-layout>
			</v-card>
		</v-dialog>
		<div style="overflow-x: hidden; flex: 1">
			<v-layout align-center justify-start column fill-height class="mx-3">
				<!-- <div class="search-box">
					<input type="text" v-model="pnr" autofocus placeholder="Enter PNR number">
				</div>-->
				<img src="/assets/banner1.jpg" to="/offer" class="banner v-card" alt>

				<p class="headline mt-3">Recent Lists</p>

				<div v-if="lists == ''" style="margin-top: 5rem">
					<v-icon color="grey" size="50">error_outline</v-icon>
					<p class="headline my-1" style="color: grey">Please create list to order</p>
					<p style="color: grey">To create a list, please click on the "+" button</p>
				</div>

				<div v-else class="lists mt-2" style="width: 100%">
					<v-card
						color="white"
						class="list-card mb-3"
						v-for="iitem in lists"
						:key="iitem.id"
						:to="/list/ + iitem.id"
					>
						<v-layout>
							<v-flex xs8>
								<v-card-title primary-title>
									<div class="headline text-truncate pb-1">{{iitem.list_title}}</div>
									<span style="color: grey">{{iitem.date}} | {{iitem.time}}</span>
								</v-card-title>
							</v-flex>
							<v-flex xs4 style="padding-top: 20px">
								<img src="/assets/list.png" class="ml-4 pl-1" width="28" alt>
								<p class="mb-0" style="color: grey">{{iitem.status}}</p>
							</v-flex>
						</v-layout>
					</v-card>
				</div>
			</v-layout>
		</div>
	</div>
</template>


<style lang="scss">
input {
	width: 100%;
	font-weight: 400;
	font-size: 16px;
	line-height: 22px;
	display: block;
	outline: 0;
	color: grey;
}
.list-card {
	border-radius: 6px;
}

.v-btn--bottom.v-btn--absolute {
	bottom: 28px;
	right: 2rem;
}

.search-box {
	width: 100%;
	font-weight: 400;
	border: 0;
	outline: 0;
	display: block;
	transition: box-shadow 0.3s;
	font-size: 16px;
	line-height: 22px;
	border-radius: 6px;
	padding: 20px;
	padding-left: 30px;
	padding-right: 30px;
	background-color: #fff;
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.08);
}
.recentCard {
	border-radius: 6px;
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.08);
}

.banner {
	width: 100%;
	border-radius: 6px;
	height: auto;
}
.v-card__title--primary {
	padding-top: 16px !important;
}
</style>


<script>
import navbar from "@/components/navbar";
import axios from "axios";
export default {
	components: { navbar },
	data() {
		return {
			pnr: "",
			dialog: false,
			listItems: "",
			listTitle: "",
			preloader: false,
			lists: [],
			email: localStorage.getItem("email"),
			listTitleRules: [
				v => !!v || "List Title is required.",
				v =>
					(v && v.length >= 3) ||
					"Title must be atleast 3 characters long."
			],
			listItemsRules: [v => !!v || "List Items are required."]
		};
	},

	methods: {
		fetchList() {
			axios
				.post(process.env.VUE_APP_URL + "/fetchlist", {
					email: this.email
				})
				.then(res => {
					this.lists = res.data.list;
					sessionStorage.setItem("list_id", res.data.list.id);
					sessionStorage.setItem(
						"list_title",
						res.data.list.list_title
					);
					sessionStorage.setItem(
						"list_items",
						res.data.list.list_items
					);
				});
		},

		sendList() {
			if (this.$refs.listForm.validate()) {
				this.preloader = true;
				axios
					.post(process.env.VUE_APP_URL + "/list", {
						email: this.email,
						listItems: this.listItems,
						listTitle: this.listTitle
					})
					.then(() => {
						this.fetchList();
						this.preloader = false;
						this.dialog = false;
						this.$refs.listForm.reset();
					});
			}
		}
	},
	created() {
		history.pushState(null, null, location.href);
		window.onpopstate = function() {
			history.go(1);
		};
	},

	mounted() {
		this.fetchList();
	}
};
</script>
