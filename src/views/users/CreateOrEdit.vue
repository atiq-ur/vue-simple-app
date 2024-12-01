<script setup>

import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.js";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const userId = route.params.id || null;

// need to reactive form which value will be updated when taking inputs
// then you will need to use v-model to bind the form value with the input field ex: v-model="form.name"
const form = ref({
  name: "",
  username: "",
  email: "",
  phone: "",
});

onMounted(() => {
  if (userId) {
    userStore.fetchUser(userId);

    if (userStore.user) {
      form.value.name = userStore.user.name;
      form.value.username = userStore.user.username;
      form.value.email = userStore.user.email;
      form.value.phone = userStore.user.phone;
    }
  }
});

const submit = () => {
  if (userId) {
    try {
      userStore.updateUser(userId, form.value);
      alert("User updated successfully");
      router.push({name: "users.index"});
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      userStore.createUser(form.value);
      alert("User created successfully");
      router.push({name: "users.index"});

      form.value = {
        name: "",
        username: "",
        email: "",
        phone: "",
      };
    } catch (error) {
      console.log(error);
    }
  }
};

</script>

<template>
  <main class="p-4 h-auto pt-20">
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {{ userId ? "Edit User "+userId : "Add User" }}
        </h2>
        <form @submit.prevent="submit">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     v-model="form.name"
                     placeholder="Enter your name"
                     required="">
            </div>
            <div class="w-full">
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     v-model="form.username"
                     placeholder="username" required="">
            </div>
            <div class="w-full">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     v-model="form.email"
                     placeholder="Enter your email" required="">
            </div>

            <div class="w-full">
              <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
              <input type="tel" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     v-model="form.phone"
                     placeholder="phone number" required="">
            </div>
          </div>
          <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            {{ userId ? "Update User" : "Create User" }}
          </button>
        </form>
      </div>
    </section>
  </main>
</template>