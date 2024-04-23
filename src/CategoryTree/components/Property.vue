<script setup>
import { inject } from "vue";

const addNode = inject("addNode");

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  objectKey: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  properties: {
    type: Object,
    required: false,
    default: null,
  },
  depth: {
    type: Number,
    required: true,
  },
});

const onAdd = () => {
  addNode(props.objectKey);
};
</script>

<template>
  <div
    :style="{
      paddingLeft: depth * 10 + 'px',
    }"
  >
    <dl class="divide-y divide-gray-100">
      <div
        class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        :style="{ borderBottom: '1px solid' }"
      >
        <dt class="text-sm font-medium leading-6 text-gray-900">{{ title }}</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
          <a
            href="#"
            @click="onAdd"
            class="font-medium text-indigo-600 hover:text-indigo-500"
            >Add</a
          >
        </dd>
      </div>
    </dl>

    <tempalte v-if="properties">
      <Property
        v-for="(value, key) in properties"
        :key="key"
        :objectKey="value.key"
        :title="value.title"
        :type="value.type"
        :properties="value.properties"
        :depth="value.depth"
        :description="value.description"
      />
    </tempalte>
  </div>
</template>
