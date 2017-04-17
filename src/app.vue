<template lang="pug">
div.pr-app
  header.pr-app-header
    h1.pr-app-content
      router-link.pr-app-header-title(to='/')
        | #[span.pr-app-header-title-text The PR Quest]
        | #[span.pr-app-header-subtitle Canada edition]
  pr-summary.pr-app-content
  router-view.pr-app-main-content
  footer.pr-app-footer
    div.pr-app-content
      a.pr-app-footer-link(href='https://www.facebook.com/groups/ProportionalRepresentationCanada/permalink/1328907820489306/?match=cmVwb3J0LHZvdGU%3D') Why the committee report
      router-link.pr-app-footer-link(to='/report-vote/data') View data
      a.pr-app-footer-link(href='https://github.com') View code
      a.pr-app-footer-link(href='https://twitter.com/dancecile') Maintained by Dan Cecile
</template>

<script>
import Summary from './summary.vue'

export default {
  name: 'pr-app',
  components: {
    'pr-summary': Summary
  }
}
</script>

<style lang="stylus">
@require './breakpoint'
@require './font-family'
@require './flex'

.pr-app
  @extend $flex-column
  min-height 100vh

  +breakpoint-large-width()
    align-items center

.pr-app-header
  @extend $flex-column-center
  padding 3.0rem 0 2rem
  border-bottom 3px solid black
  @extend $font-family-title-500
  align-self stretch

  .pr-app-content
    margin-top 0
    margin-bottom 0

  .pr-app-header-title
    @extend $flex-column-center
    text-decoration none
    font-size 2.0rem
    line-height 1.0rem
    font-weight 500
    margin 0
    +breakpoint-large-width()
      display inline
      font-size 2.6rem

  .pr-app-header-title-text
    background-image: url(./assets/logo.svg)
    background-size: 0.8em
    background-repeat: no-repeat
    background-position-x: 0%
    background-position-y: 50%
    padding-left 1.0em

  .pr-app-header-subtitle
    @extend $font-family-alt-400
    font-size 1.3rem
    margin-top 1.8rem

  br
    display none

.pr-app-footer
  padding 1.2em 0
  border-top 3px solid black
  @extend $flex-column-center
  align-self stretch

  .pr-app-content
    @extend $flex-row
    flex-wrap wrap
    line-height 2.4em

    +breakpoint-large-width()
      flex-wrap no-wrap

  .pr-app-footer-link
    margin-right 1.0rem

.pr-app-content
  margin-left 2rem
  margin-right 2rem
  +breakpoint-large-width()
    width $breakpoint-two-column

.pr-app-main-content
  @extend .pr-app-content
  flex-grow 1
</style>
