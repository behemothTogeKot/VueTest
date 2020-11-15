<template>
	<div class="container">
		<div class="row">
			<div
				class="pt-3 bg-light col-12 col-md-10 mr-auto ml-auto justify-content-center"
			>
				<b-form @submit="onSubmit" @reset="onReset" v-if="edit">
					<b-form-group
						label-cols="12"
						label-cols-md="2"
						label="Name:"
						label-align-sm="center"
						label-align-md="left"
						label-for="name"
					>
						<b-form-input
							@focus="setIsFocused({ type: 'name', value: true })"
							@blur="setIsFocused({ type: 'name', value: false })"
							v-model="form.name"
							placeholder="Name"
							required
							id="name"
							:state="validateName"
						></b-form-input>
						<b-form-invalid-feedback :state="validateName">
							User name can't be empty
						</b-form-invalid-feedback>
					</b-form-group>
					<b-form-group
						label-cols="12"
						label-cols-md="2"
						label="E-mail:"
						label-for="email"
						label-align-sm="center"
						label-align-md="left"
					>
						<b-form-input
							@focus="
								setIsFocused({ type: 'email', value: true })
							"
							@blur="
								setIsFocused({ type: 'email', value: false })
							"
							v-model="form.email"
							placeholder="Email"
							required
							type="email"
							id="email"
							:state="validateEmail"
						>
						</b-form-input>
						<b-form-invalid-feedback :state="validateEmail">
							E-mail can't be empty and has to correspond e-mail
							standarts
						</b-form-invalid-feedback>
					</b-form-group>
					<b-form-group
						label-cols="12"
						label-cols-md="2"
						label="Address:"
						label-for="email"
						label-align-sm="center"
						label-align-md="left"
					>
						<div class="d-flex flex-column">
							<div class="col-12 pl-0 pr-0">
								<b-form-input
									v-model="form.address.city"
									id="city"
									placeholder="City"
								>
								</b-form-input>
							</div>
							<div class="col-12 d-flex pl-0 pr-0 mt-3">
								<div class="col-6 pl-0 pr-1">
									<b-form-input
										id="street"
										placeholder="Street"
										v-model="form.address.street"
									>
									</b-form-input>
								</div>
								<div class="col-6 pl-1 pr-0">
									<b-form-input
										id="block"
										placeholder="Block"
										v-model="form.address.block"
									>
									</b-form-input>
								</div>
							</div>
						</div>
					</b-form-group>
					<div
						class=" d-flex justify-content-between col-12  pl-0 pr-0 flex-column flex-md-row"
					>
						<div
							class="d-flex  flex-column flex-md-row pl-5 pr-5 pl-md-0 pr-md-0"
						>
							<b-button @click="onSubmit" pill variant="info"
								>Submit</b-button
							>
							<b-button
								class="mt-2 mb-2 mt-md-0 mb-md-0 mr-md-3 ml-md-3"
								@click="onReset"
								pill
								>Reset</b-button
							>
							<b-button @click="goBack" pill>Go back</b-button>
						</div>
						<div
							v-if="form.id"
							class="d-flex flex-column pl-5 pr-5 mt-5 pl-md-0 pr-md-0 mt-md-0"
						>
							<b-button pill variant="danger">Delete</b-button>
						</div>
					</div>
				</b-form>
			</div>
		</div>
	</div>
</template>

<script>
import {
	getAllUsers,
	createUser,
	deleteUser,
	updateUser,
} from "../../axiosHandler";
export default {
	props: {
		editToggler: {
			type: Function,
			default: () => console.log("all good"),
		},
	},
	data() {
		return {
			edit: true,
			emailErrorTemplates: [
				"E-mail can't be empty",
				"E-mail aren't corresponding to e-mail needs",
			],
			emailError: "",
			form: this.$store.getters.getEditedUser,
			show: true,
		};
	},
	beforeCreate() {
		this.form = { ...this.$store.getters.getEditedUser };
	},

	computed: {
		validateName() {
			if (this.form.name?.length === undefined || !this.nameFocused)
				return;
			return this.form.name?.length > 0;
		},
		validateEmail() {
			if (this.form.email?.length === undefined || !this.emailFocused)
				return;
			this.emailError = this.emailErrorTemplates[
				+!!this.form.email?.length > 0
			];

			return !!(
				this.form.email?.length > 0 &&
				this.form.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
			);
		},
	},
	methods: {
		setIsFocused({ type, value }) {
			this[`${type}Focused`] = value;
		},
		onSubmit(evt) {
			const method = this.form?.id ? updateUser : createUser;
			evt.preventDefault();

			method(this.form).then((response) => {
				this.$bvToast.toast(`Success`, {
					title: "User was saved",
				});
				this.onReset(evt);
			});
		},
		onReset(evt) {
			evt.preventDefault();
			this.$store.dispatch("resetEditedUser");
			this.form = this.$store.getters.getEditedUser;
		},
		goBack(evt) {
			this.onReset(evt);
			this.editToggler();
		},
	},
};
</script>
<style scoped></style>
