<template>
	<UserForm v-if="edit" :editToggler="editToggler" />
	<UserList v-else="edit" :editToggler="editToggler" />
</template>

<script>
import UserList from "../components/UserList.vue";
import UserForm from "../components/UserForm.vue";
export default {
	components: {
		UserList,
		UserForm,
	},
	data() {
		return { edit: false };
	},
	methods: {
		editToggler() {
			this.edit = !this.edit;
		},
	},
};
</script>

<styles></styles>
