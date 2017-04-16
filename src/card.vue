<template lang="pug">
router-link.pr-card(v-bind:to='leader.link')
  img.pr-card-photo(v-if="leader.photo" v-bind:src="leader.photo")
  div.pr-card-info
    h2.pr-card-name {{leader.name}}
    h3.pr-card-riding {{leader.riding}}
    p.pr-card-booster(v-if="promise") {{promise}}
    p.pr-card-booster(v-if="vote") {{vote}}
</template>

<script>
export default {
  props: [ 'leader' ],
  computed: {
    promise () {
      if (this.leader.promise2015 === 'Yes') {
        return 'Promised PR in 2015'
      }
    },
    vote () {
      if (this.leader.vote2014 === 'Yes') {
        return 'Voted for PR in 2014'
      }
    }
  }
}
</script>

<style lang="stylus">
@require './font-family'
@require './breakpoint'

.pr-card
  border 1px solid
  text-decoration: none
  padding 1.2em 1.2em
  display: flex
  flex-direction: row
  margin 0.6rem 0

  +breakpoint-large-width()
    $margin = 1.0rem
    $width = ($breakpoint-two-column / 2 - $margin)
    margin $margin 0
    width $width

.pr-card-photo
  background grey
  filter grayscale(100%) contrast(90%) brightness(120%)
  border 1px solid black
  align-self center
  margin-right 1.4em
  height 6em
  min-width (6em / 230 * 142)
  +breakpoint-large-width()
    height 8em
    min-width (8em / 230 * 142)

.pr-card-name
  font-size 1.2rem
  margin-top 0.1em
  margin-bottom 0

.pr-card-riding
  font-size 1.1rem
  font-weight 600
  margin-top 0.6em
  margin-bottom 0

.pr-card-booster
  @extend $font-family-alt-400
  margin-top 0.6em
  margin-bottom 0
</style>
