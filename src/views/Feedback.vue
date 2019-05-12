<template>
	<div id="home">
		<navbar/>
		<v-divider></v-divider>
		<p class="headline mx-4 mt-3 font-weight-medium text-xs-center">Feedback</p>
		<v-divider></v-divider>
		<v-layout align-center justify-start column class="mx-3">
			<p class="headline mt-3">Give Us Some Ratings</p>
			<v-rating v-model="rating" large color="amber darken-1" background-color="amber lighten-3"></v-rating>
		</v-layout>
		<v-form ref="feedbackForm" class="mt-3 mx-3">
			<v-textarea
				v-model="feedback"
				:rules="feedbackRules"
				auto-grow
				box
				color="primary"
				label="Your FeedBack"
				rows="8"
			></v-textarea>
			<v-btn round dark class="text-capitalize" color="primary" @click="sendFeedback">
				<v-icon class="mr-2">send</v-icon>Send FeedBack
			</v-btn>
		</v-form>
		<div>
			<v-dialog v-model="feedbackDialog" persistent max-width="290">
				<v-card>
					<v-card-title class="headline">👍</v-card-title>
					<v-card-text>Thanks for your feedback.</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue-grey darken-3" flat @click="feedbackDialog = false">Okay</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import navbar from "@/components/navbar";
import axios from "axios";
export default {
	components: { navbar },
	data() {
		return {
			rating: 0,
			feedback: "",
			feedbackDialog: false,
			feedbackRules: [v => !!v || "Feedback is required."]
		};
	},
	methods: {
		sendFeedback() {
			if (this.$refs.feedbackForm.validate()) {
				axios
					.post(process.env.VUE_APP_URL + "/feedback", {
						email: localStorage.getItem("email"),
						name: localStorage.getItem("name"),
						rating: this.rating,
						feedback: this.feedback
					})
					.then(res => {
						this.feedbackDialog = true;
						this.$refs.feedbackForm.reset();
						this.rating = 0;
					});
			}
		}
	}
};
</script>