<script setup>
import CategoryTree from "./components/CategoryTree.vue";
// import schema from "./data/simple.json";
import schema from "./data/nested.json";

import Tree from "./lib/Tree";

import { LoremIpsum } from "lorem-ipsum";
import { provide, ref } from "vue";

const lorem = new LoremIpsum({
  units: "words",
});

const treeRef = ref({});

provide("addNode", (key) => {
  tree.insert(key, lorem.generateWords(1));

  treeRef.value = tree.objectify();
});

const tree = new Tree({ uiType: "root", properties: schema.properties });

treeRef.value = tree.objectify();
</script>

<template>
  <div>
    <CategoryTree :node="treeRef" />
  </div>
</template>
