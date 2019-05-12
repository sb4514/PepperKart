<template>
	<div id="home">
		<navbar/>
		<v-divider></v-divider>
		<p class="headline mx-4 mt-3 font-weight-medium text-xs-center">About Us</p>
		<v-divider></v-divider>
		<v-layout column justify-center>
			<p class="subheading mx-3 mt-3">
				PepperKart is a list based grocery ordering platform. Create a list and order it, it's that simple!
				On PepperKart you can buy groceries and personal care products. PepperKart is based in Akola, Maharashtra (IN).
			</p>

			<p class="subheading font-weight-medium mx-3">Single app for all your daily needs</p>
			<p
				class="subheading mx-3"
			>Order thousands of products at just a tap; milk, eggs, bread, cooking oil, ghee, atta, rice, fresh fruits & vegetables, spices, chocolates, chips, biscuits, Maggi, cold drinks, shampoos, soaps, body wash, pet food, diapers, other organic and gourmet products from PepperKart.</p>
		</v-layout>
		<v-divider light></v-divider>

		<p class="mx-3 mt-3 mb-1">App Version: 1.1.0 (Beta)</p>
		<p class="mx-3">Managed By: PepperKart Groceries Pvt. Ltd.</p>
		<v-divider light></v-divider>
		<div class="footer">
			<v-footer color="white" class="pa-3 my-3">
				<v-layout align-center justify-center>
					<p class="text-xs-center mb-0">Made with ❤️ in India</p>
				</v-layout>
			</v-footer>
		</div>
	</div>
</template>


<style lang="scss">
.footer {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
}
</style>

<script>
import navbar from "@/components/navbar";
export default {
	components: { navbar }
};
</script>