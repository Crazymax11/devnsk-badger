<template>
  <div class="simple-badge">
    <span > {{ member }} </span>
    <i
      class="simepl-badge__delete el-icon-delete"
      @click="$emit('delete')"
    />
  </div>
</template>
<script>
export default {
  props: {
    member: {
      required: true,
      type: String
    }
  }
}
</script>
<style>
.simple-badge {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  text-align: center;
  box-sizing: border-box;
  padding: 10mm;

  min-width: calc(100vw / 3); /* 3 столбца */
  max-width: calc(100vw / 3);
  width: calc(100vw / 3);
  height: calc(298 / 210 * 100vw / 7); /* 7 строк на странице */ /* 8mm */

  position: relative;
}

.simepl-badge__delete {
  cursor: pointer;
  position: absolute;
  top: 10px; /* прибиваем гвоздями */
  right: 10px;
}
@media print {
  .simepl-badge__delete {
    display: none;
  }
}
</style>
