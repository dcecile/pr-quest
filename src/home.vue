<template lang="pug">
main.pr-home
  input.pr-home-search(v-model.trim="search" placeholder="Search by MP name, riding name, or postal code")
  div.pr-home-list
    pr-card.pr-home-card(v-for='card in visibleLeaders' v-bind:leader='card' v-bind:key='card.openID')
  a.pr-home-button(v-if="hiddenLeadersCount > 0" v-on:click="showHiddenLeaders") Show remaining {{ hiddenLeadersCount }} MPs...
</template>

<script>
import Data from './data'
import Card from './card.vue'
import Search from './search'

export default {
  components: {
    'pr-card': Card
  },
  data () {
    return {
      allLeaders: Data.liberals,
      matchingLeaders: [],
      showAllLeaders: false,
      search: ''
    }
  },
  created () {
    const historySearch = window.localStorage.getItem('pr-search')
    if (historySearch) {
      this.search = historySearch
    } else {
      this.matchingLeaders = this.allLeaders
    }
  },
  computed: {
    visibleLeaders () {
      return this.showAllLeaders
        ? this.matchingLeaders
        : this.matchingLeaders.slice(0, 8)
    },
    hiddenLeadersCount () {
      return this.matchingLeaders.length - this.visibleLeaders.length
    }
  },
  watch: {
    async search () {
      window.localStorage.setItem('pr-search', this.search)
      if (!this.search) {
        this.matchingLeaders = this.allLeaders
      } else {
        this.matchingLeaders = await Search.findMatches(this.search, this.allLeaders)
      }
    }
  },
  methods: {
    showHiddenLeaders () {
      this.showAllLeaders = true
    }
  }
}
</script>

<style lang="stylus">
@require './breakpoint'
@require './flex'

.pr-home
  @extend $flex-column
  margin-bottom 2rem

.pr-home-search
  font-weight 300
  font-size 1.1rem
  border 1px solid hsl(0, 0%, 80%)
  box-shadow none
  outline none
  padding 0.8em 1.2em

  &:focus
    border-color black

.pr-home-list
  @extend $flex-column
  margin-top 1rem

  +breakpoint-large-width()
    flex-direction row
    flex-wrap wrap
    justify-content space-between

.pr-home-button
  cursor pointer
  text-decoration underline
  margin-top 0.7rem
</style>
