<template>
  <div class="devnsk-badge">
    <div class="devnsk-badge__logo">
      <span style="color: blue;">dev</span><span style="color: green;">(</span><span style="color: red;">nsk</span><span style="color: green;">)</span>
    </div>
      
    <div class="devnsk-badge__meetup-name">
      {{ eventName }}
    </div>
    
    <div class="devnsk-badge__member-name preview__member"> {{ member }} </div>
    <i
      class="devnsk-badge__delete el-icon-delete"
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
    },
    eventName: {
      required: true,
      type: String
    }
  }
}
</script>
<style>
.devnsk-badge {
  --badge-height: 60mm;
  --badge-width: 100mm;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  border: 1px solid;
  text-align: center;
  box-sizing: border-box;
  padding: 5mm;
  min-width: var(--badge-width);
  max-width: var(--badge-width);
  width: var(--badge-width);
  height: var(--badge-height);
  position: relative;
}
/* 
Такие баджи помещаются 8 на страницу.
Делаем отступ последнему, т.к. там пустое место должно быть
Если не сделать пустое место - баджи будут разрезаны 1 и 2 листом
297mm - высота А4
+1mm делаем потому что если сделать ровно 297, то они съезжают.
с +1mm они тоже съезжают, но в другую сторону (все ниже к странице) и не обрезаются
*/
.devnsk-badge:nth-child(8n) {
  margin-bottom: calc(297mm + 1mm - var(--badge-height) * 4);
}

.devnsk-badge__delete {
  cursor: pointer;
  position: absolute;
  top: 10px; /* прибиваем гвоздями */
  right: 10px;
}

.devnsk-badge__logo {
  font-size: 8mm;
  align-self: flex-start;
}

.devnsk-badge__meetup-name {
  font-size: 5mm;
  align-self: flex-end;
}

.devnsk-badge__member-name {
  flex-grow: 10;
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
@media print {
  .devnsk-badge__delete {
    display: none;
  }
}
</style>
