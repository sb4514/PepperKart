<template>
	<div id="home">
		<v-layout align-center justify-center column class="mx-3">
			<div class="mt-3">
				<img src="/assets/success.gif">
			</div>

			<p class="headline mt-4 font-weight-bold">Order Successful</p>
		</v-layout>
	</div>
</template>

<script>
import navbar from "@/components/navbar";
import axios from "axios";
export default {
	components: { navbar },
	data() {
		return {};
	},

	created() {
		history.pushState(null, null, location.href);
   		window.onpopstate = function () {
        history.go(1);
    };
		setTimeout(() => this.$router.push({ path: "/orders" }), 3550);
	}
};
</script>
