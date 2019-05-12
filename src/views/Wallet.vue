<template>
	<div id="home">
		<navbar/>
		<v-divider></v-divider>
		<p class="headline mx-4 mt-3 font-weight-medium text-xs-center">Wallet</p>
		<v-divider></v-divider>

		<v-layout column align-center justify-center>
			<v-flex xs12 class="mt-5">
				<img src="/assets/wallet.png" width="128" alt>
			</v-flex>
			<p class="grey--text display-1 text-xs-center mt-3 mx-3">Coming Soon</p>
		</v-layout>
	</div>
</template>

<script>
import navbar from "@/components/navbar";
export default {
	components: { navbar }
};
</script>