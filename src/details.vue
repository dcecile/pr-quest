<template lang="pug">
main.pr-details
  h2.pr-details-header {{leader.name}} ({{leader.riding}})
  div.pr-details-split
    img.pr-details-photo(v-if="leader.photo" v-bind:src="leader.photo")
    div.pr-details-info
      a(v-bind:href='leader.email') Email
      a(v-if='leader.twitter' v-bind:href='leader.twitter') Twitter
      a(v-if='leader.homepage' v-bind:href='leader.homepage') Homepage
      a(v-bind:href='leader.externalLink') Full info
    table.pr-details-support
      tr
        td Support for PR (2017)
        td.pr-details-support-data {{ leader.support2017 }}
      tr
        td Promise of PR (#[a(href="https://www.hilltimes.com/2017/02/13/liberals-say-electoral-reform-wont-main-issue-next-election-cause-problems/95863") 2015])
        td.pr-details-support-data {{ leader.promise2015 }}
      tr
        td Vote for PR (#[a(href="https://openparliament.ca/votes/41-2/291/") 2014])
        td.pr-details-support-data {{ leader.vote2014 }}
</template>

<script>
import data from './data.js'

export default {
  props: [ 'id' ],
  computed: {
    leader () {
      return data.findLiberal(this.id)
    }
  }
}
</script>

<style lang="stylus">
@require './flex'
@require './breakpoint'
@require './font-family'

.pr-details
  @extend $flex-column
  border 2px solid black
  margin-bottom 2.5rem
  padding 1.8rem 2.3rem

.pr-details-header
  @extend $font-family-default-700
  margin-top 0.2rem
  margin-bottom 0
  font-size 2.0rem
  line-height 1.5em
  text-align center

.pr-details-split
  @extend $flex-column-center
  +breakpoint-large-width()
    flex-direction row
    align-items flex-start
    justify-content space-around
    margin-top 1.6rem

.pr-details-photo, .pr-details-info, .pr-details-support
  margin-top 1.0rem
  +breakpoint-large-width()
    margin-top 0

.pr-details-photo
  background grey
  filter grayscale(20%) contrast(90%) brightness(120%)
  border 1px solid hsl(0, 0%, 30%)
  height 6em
  min-width (6em / 230 * 142)
  +breakpoint-large-width()
    height 10em
    min-width (10em / 230 * 142)

.pr-details-info
  @extend $flex-column
  font-size 1.1rem
  line-height 2.0rem
  text-align center
  +breakpoint-large-width()
    line-height 2.2rem
    text-align left

.pr-details-support
  @extend $font-family-alt-400
  font-size 1.0rem
  border-spacing 0.2em
  line-height 1.5rem
  text-align center
  +breakpoint-large-width()
    border-spacing 0
    line-height 2.2rem
    text-align left

.pr-details-support-data
  @extend $font-family-alt-700
  padding-left 0.4em
  +breakpoint-large-width()
    padding-left 1em
</style>
