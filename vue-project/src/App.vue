<script>
import { ref } from "vue";
// 用户的权限只有 dev
const myPermissions = ["dev"];
// mock 请求
const request = () => {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve();
      }, 500);
   });
};
export default {
   directives: {
      "permission-or": {
         mounted(el, binding, vnode, prevVnode) {
            if (!myPermissions.includes(binding.value)) {
               // 用户是没有权限的，所以必然会执行此处
               el.remove();
               // 移除后，其父节点为 null
               console.log("el.parentNode", el.parentNode);
            }
         },
      },
   },
   setup() {
      const hasData = ref(false);
      request().then(() => {
         hasData.value = true;
      });
      return { hasData };
   },
};
</script>

<template>
   <div id="app">
      <div v-if="hasData">hasData</div>
      <div v-else v-permission-or="['admin']">else</div>
   </div>
</template>

<style scoped>
header {
   line-height: 1.5;
}

.logo {
   display: block;
   margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
   header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
   }

   .logo {
      margin: 0 2rem 0 0;
   }

   header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
   }
}
</style>
