<template>
	<nav>
		<v-toolbar color="white" flat>
			<v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title>PepperKart</v-toolbar-title>

			<v-spacer></v-spacer>
			<v-btn fab small flat to="/profile">
				<v-avatar size="35">
					<img :src="userDetails.photo" alt="avatar">
				</v-avatar>
			</v-btn>
		</v-toolbar>

		<v-navigation-drawer v-model="drawer" app style="flex-direction: column; display: flex">
			<v-layout column style="flex: 1">
				<v-list class="pa-1">
					<v-list-tile avatar>
						<v-list-tile-avatar>
							<img :src="userDetails.photo">
						</v-list-tile-avatar>

						<v-list-tile-content>
							<v-list-tile-title>{{userDetails.name}}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>

				<v-list class="pt-0" dense>
					<v-divider class="mb-3"></v-divider>

					<v-list-tile v-for="link in links_1" :key="link.title" router :to="link.route">
						<v-list-tile-action>
							<v-icon>{{ link.icon }}</v-icon>
						</v-list-tile-action>

						<v-list-tile-content>
							<v-list-tile-title>{{ link.title }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-divider class="my-3"></v-divider>
					<v-list-tile v-for="link in links_2" :key="link.title" router :to="link.route">
						<v-list-tile-action>
							<v-icon>{{ link.icon }}</v-icon>
						</v-list-tile-action>

						<v-list-tile-content>
							<v-list-tile-title>{{ link.title }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-divider class="my-3"></v-divider>
					<v-list-tile v-for="link in links_3" :key="link.title" router :to="link.route">
						<v-list-tile-action>
							<v-icon>{{ link.icon }}</v-icon>
						</v-list-tile-action>

						<v-list-tile-content>
							<v-list-tile-title>{{ link.title }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-layout>

			<v-btn dark color="#43A047" class="elevation-0 ma-0" style="width: 100%" @click="signOut">
				<v-icon class="pr-2"></v-icon>Logout
			</v-btn>
		</v-navigation-drawer>
	</nav>
</template>


<script>
import firebase from "firebase";
export default {
	data() {
		return {
			tab: null,
			drawer: false,
			items: ["PNR Status", "Live Status", "Train Route"],
			vert: [{ title: "Sign Out" }],
			links_1: [
				{ title: "Home", icon: "home", route: "/dash" },
				{
					title: "Your Orders",
					icon: "shopping_basket",
					route: "/orders"
				},
				{
					title: "Wallet",
					icon: "account_balance_wallet",
					route: "/wallet"
				},
				{
					title: "Manage Addresses",
					icon: "assignment",
					route: "/manageAddress"
				}
			],
			links_2: [
				{
					title: "Settings",
					icon: "settings",
					route: "/profile"
				}
			],

			links_3: [
				{
					title: "Feedback",
					icon: "help",
					route: "/feedback"
				},
				{
					title: "About Pepperkart",
					icon: "info",
					route: "/about"
				}
			],

			userDetails: {
				email: localStorage.getItem("email"),
				photo: localStorage.getItem("avatar"),
				name: localStorage.getItem("name")
			}
		};
	},

	methods: {
		signOut() {
			localStorage.clear();
			this.$router.push("/");
		}
	}
};
</script>
