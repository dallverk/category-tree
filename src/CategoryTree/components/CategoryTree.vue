<script setup>
const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>{{ node.title }}</div>
  <Property
    v-for="(value, key) in node.properties"
    :key="key"
    :title="value.title"
    :type="value.type"
    :properties="value.properties"
    :depth="value.depth"
    :description="value.description"
    :objectKey="value.key"
  />
</template>
