/* eslint-disable max-len */
<template>
  <svg
    id="Layer_1"
    enable-background="new 0 0 512 512"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fill="#ff0088"
    class="calender"
  >
    <g>
      <path
        d="m446 40h-46v-24c0-8.836-7.163-16-16-16s-16 7.164-16 16v24h-224v-24c0-8.836-7.163-16-16-16s-16 7.164-16 16v24h-46c-36.393 0-66 29.607-66 66v340c0 36.393 29.607 66 66 66h380c36.393 0 66-29.607 66-66v-340c0-36.393-29.607-66-66-66zm-380 32h46v16c0 8.836 7.163 16 16 16s16-7.164 16-16v-16h224v16c0 8.836 7.163 16 16 16s16-7.164 16-16v-16h46c18.748 0 34 15.252 34 34v38h-448v-38c0-18.748 15.252-34 34-34zm380 408h-380c-18.748 0-34-15.252-34-34v-270h448v270c0 18.748-15.252 34-34 34z"
      />
    </g>
  </svg>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CalendarIcon extends Vue {}
</script>
<style lang="scss" scoped>
svg {
  width: 1.3rem;
}
</style>
