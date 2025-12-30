<script setup lang="ts">
// import { markRaw, watch } from "vue";
import sidebarItems from "./sidebarItems";

const sidebarMenu = markRaw(sidebarItems);
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!---Navigation -->
  <!-- ---------------------------------------------- -->
  <perfect-scrollbar class="scrollnavbar">
    <v-list class="py-5 px-4 bg-muted" density="compact">
      <!---Menu Loop -->
      <template v-for="(item, i) in sidebarMenu">
        <!---Item Sub Header -->
        <LayoutSidebarNavGroup :item="item" v-if="item.header" :key="i" />
        <!---If Has Child -->
        <LayoutSidebarNavCollapse
          class="leftPadding"
          :item="item"
          :level="0"
          :key="item.title"
          v-else-if="item.children"
        />
        <!---Single Item-->
        <LayoutSidebarNavItem
          :item="item"
          :key="item.to"
          v-else
          class="leftPadding"
        />
        <!---End Single Item-->
      </template>
    </v-list>
  </perfect-scrollbar>
</template>
