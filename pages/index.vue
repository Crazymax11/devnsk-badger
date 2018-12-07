<template>
  <section class="container">
    <div class="search-inputs">
      <div class="search-input">
        <span class="search-input__label"> Сообщество </span>
        <el-select
          v-model="groupName" 
          placeholder="Select"
          @change="loadEvents">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"/>
        </el-select>
      </div>
      <div class="search-input">
        <span class="search-input__label"> Событие </span>
        <el-select 
          v-model="eventId" 
          :disabled="!events.length"
          placeholder="Нет событий :("
          @change="event => loadRsvps(groupName, event)">
          <el-option
            v-for="item in events"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </div>
      <div class="search-input">
        <span class="search-input__label"> Сжатие текста </span> 
        <el-input-number 
          v-model="fitTextMagicNunber"
          :disabled="!rsvps.length"
          :step="0.1" 
          :min="0.8" 
          :max="1.8"
          @change="fitText()"/>
      </div>
      <div class="search-input _print">
        <div/>
        <el-button
          :disabled="!rsvps.length" 
          type="primary"
          @click="print">
          Print
        </el-button>
      </div>
      <div class="search-input _print">
        <div/>
        <el-button
          type="primary"
          @click="newMember">
          Добавить
        </el-button>
      </div>
    </div>
    <div
      v-if="rsvps.length"
      class="members-container"
    >
      <h2> участников: {{ rsvps.length }}</h2>
    </div>
    <div
      v-if="rsvps.length"
      id="fittext-container"
      class="preview">
      <div
        v-for="member in rsvps"
        :key="member"
        class="preview__member">

        <span > {{ member }} </span>
        <i
          class="member__delete el-icon-delete"
          @click="deleteMember(member)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'
import Vue from 'vue'
import fitty from 'fitty'
export default {
  components: {
    Logo
  },
  data() {
    return {
      groupName: '',
      eventId: undefined,
      events: [],
      rsvps: [],
      fitTextMagicNunber: 1.3,
      options: ['AgileNSK', 'DEVNSK', 'Docker-Novosibirsk', 'GDGNsk']
    }
  },
  watch: {
    rsvps(val) {
      if (val.length) {
        Vue.nextTick(() => {
          this.fitText()
        })
      }
    }
  },
  methods: {
    async loadEvents(groupName) {
      this.events = await fetch(`/api/${groupName}/events`).then(r => r.json())
    },

    async loadRsvps(groupName, eventId) {
      this.rsvps = await fetch(
        `/api/${groupName}/events/${eventId}/rsvps`
      ).then(r => r.json())
    },
    print() {
      window.print()
    },
    fitText() {
      fitText(
        document.getElementsByClassName('preview__member'),
        this.fitTextMagicNunber
      )
    },
    deleteMember(member) {
      this.rsvps = this.rsvps.filter(m => m !== member)
    },
    newMember(member) {
      this.$prompt('Введи имя и фамилию', 'Новый участник', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      }).then(({ value }) => {
        this.rsvps.push(value)
      })
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.search-inputs {
  display: flex;
  flex-direction: row;
}

.search-input {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 10px;
}

.search-input._print {
  justify-content: flex-end;
}

.search-input__label {
  margin-bottom: 10px;
}

.members-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.preview__member {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  text-align: center;
  box-sizing: border-box;
  padding: 10mm;

  min-width: calc(100% / 3); /* 3 столбца */
  max-width: calc(100% / 3);
  width: calc(100% / 3);
  height: calc(297mm / 7); /* 7 строк на странице */

  position: relative;
}

.preview {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.member__delete {
  cursor: pointer;
  position: absolute;
  top: 10px; /* прибиваем гвоздями */
  right: 10px;
}

@page {
  size: 210mm 297mm;
  /* this affects the margin in the printer settings */
  margin: 0mm;
}
@media print {
  body {
    /* this affects the margin on the content before sending to printer */
    margin: 0px;
    width: 21cm;
  }
  .search-inputs,
  .members-container,
  .member__delete {
    display: none;
  }
}
</style>
