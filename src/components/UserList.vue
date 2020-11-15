<template>
	<div class="container">
		<div class="row">
			<div class="col-12 justify-content-center d-flex">
				<div
					class="col-12 col-md-8 d-flex justify-content-between mb-2"
				>
					<h3 class="mr-5">List of users</h3>
					<b-button @click="addUser" pill variant="info"
						>Add new user</b-button
					>
				</div>
			</div>
			<div class="col-12 mt-2 mb-2  justify-content-center d-flex ">
				<div class="col-12  col-md-8 d-flex  pl-0 ">
					<div class="col-10 d-flex">
						<b-form-input
							placeholder="Enter user id to find user"
							@update="onInputChange"
							v-model="query"
							debounce="1000"
						></b-form-input>
					</div>
					<div class="col-2  justify-content-end d-flex pl-0 pr-0">
						<b-button
							v-if="!showClearButton"
							@click="onInputChange"
							variant="outline-primary"
							>Search</b-button
						>
						<b-button
							v-else
							@click="onClearInput"
							variant="outline-danger"
							>Clear</b-button
						>
					</div>
				</div>
			</div>
			<div class="col-12 justify-content-center d-flex" v-if="showList">
				<div class="col-12 col-md-8">
					<b-list-group>
						<b-list-group-item v-for="user in users" :key="user.id">
							<div
								class="d-flex justify-content-between align-items-center"
							>
								<div class="col-6">{{ user.name }}</div>
								<div>
									<b-button
										@click="editUser(user)"
										pill
										variant="success"
										>Edit</b-button
									>
									<b-button
										@click="deleteUser(user)"
										pill
										variant="outline-danger"
										>Delete</b-button
									>
								</div>
							</div>
						</b-list-group-item>
					</b-list-group>
				</div>
			</div>
			<div
				v-else="showList"
				class="col-12 d-flex flex-column align-items-center "
			>
				<div class="col-12 col-md-8">
					<b-spinner
						v-if="isLoading"
						style="width: 3rem; height: 3rem;"
						label="Large Spinner"
						type="grow"
					></b-spinner>
					<b-alert v-else show variant="danger">
						<div v-if="query">There is no user with such name</div>
						<div v-else>
							No any users in your list, would you like
							to<b-button @click="addUser" variant="link"
								>add</b-button
							>some?
						</div>
					</b-alert>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	getAllUsers,
	createUser,
	deleteUser,
	findUsers,
} from "../../axiosHandler";

export default {
	props: {
		editToggler: {
			type: Function,
			default: () => console.log("all good"),
		},
	},
	created() {
		this.getUsers();
	},

	data() {
		return {
			isLoading: true,
			query: null,
			users: [],
			editedUser: null,
			oldUsers: null,
		};
	},
	methods: {
		getUsers() {
			getAllUsers().then((response) => {
				this.users = response.data;
				//because of slow server response i've added oldUsers variable to avoid wasting of time on input clear event
				this.oldUsers = response.data;
				setTimeout(() => {
					this.isLoading = false;
				}, 2000);
				this.query = null;
			});
		},
		onClearInput() {
			this.getUsers();
		},
		onInputChange() {
			this.oldUsers = [...this.users];
			findUsers({ name: this.query }).then(({ data }) => {
				this.users = data;
			});
		},
		addUser() {
			this.editToggler();
		},
		editUser(user) {
			this.$store.dispatch("setEditedUser", user);
			this.editToggler();
		},
		deleteUser({ id }) {
			deleteUser(id).then(({ data }) => {
				this.users = this.oldUsers.filter((i) => i.id != id);
				this.query = null;
			});
		},
	},
	computed: {
		showList() {
			return this.users?.length > 0;
		},
		showClearButton() {
			return this.query?.length;
		},
	},
};
</script>

<styles>

</styles>
