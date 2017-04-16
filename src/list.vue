<template lang="pug">
main.pr-list
  h2.pr-list-header Level of support
  ul.pr-list-list
    li(v-for='level in levels')
      a(v-bind:href='level.anchor') {{ level.name }} ({{ level.leaders.length }})
  template(v-for='level in levels')
    h3.pr-list-sub-header(v-bind:id='level.id') {{ level.name }}
    ul.pr-list-list
      li(v-for='leader in level.leaders')
        router-link(v-bind:to='leader.link') {{ leader.name }} ({{ leader.riding }})
</template>

<script>
import Data from './data'

export default {
  data () {
    const levels = [
      { name: 'Unknown', leaders: [] },
      { name: 'Positive indicator', leaders: [] },
      { name: 'Fundamentally opposed', leaders: [] },
      { name: 'Talking points', leaders: [] }
    ]
    for (const leader of Data.liberals) {
      const level = levels.find(level => level.name === leader.support2017)
      if (!level) {
        console.error(`No level for ${leader.name}: ${leader.support2017}`)
      } else {
        level.leaders.push(leader)
      }
    }
    for (const level of levels) {
      level.id = level.name.replace(' ', '-').toLowerCase()
      level.anchor = `#${level.id}`
    }
    return {
      levels
    }
  }
}
</script>

<style lang="stylus">
@import './font-family'

.pr-list
  margin-bottom 2.5rem

.pr-list-header
  @extend $font-family-default-700
  font-size 1.6rem
  margin-top 0.5rem
  margin-bottom 1.2rem

.pr-list-sub-header
  @extend $font-family-default-700
  font-size 1.4rem
  margin-top 2.5rem
  margin-bottom 1.0rem

.pr-list-list
  margin 0
</style>
