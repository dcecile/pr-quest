<template lang="pug">
div.pr-summary
  p.pr-summary-description
    | Liberal MPs &amp; the committee report on Electoral Reform:
  div.pr-summary-data
    router-link(to='/report-vote/progress') {{potential}}
    = ' '
    | potential supporters, and
    = ' '
    router-link(to='/report-vote/progress') {{committed}} / 20
    = ' '
    | committed supporters

</template>

<script>
import Data from './data'

export default {
  data () {
    const mps = Data.liberals
    const count = (...statuses) => mps
      .filter(mp => statuses.some(status => mp.support2017 === status))
      .length

    return {
      potential: count('Positive indicator'),
      committed: 0
    }
  }
}
</script>

<style lang="stylus">
@require './flex'
@require './font-family'
@require './breakpoint'

.pr-summary
  @extend $flex-column
  margin-top 2rem
  margin-bottom 1.5rem

.pr-summary-description
  @extend $font-family-alt-400
  font-size 1.1rem
  line-height 1.8em
  margin-top 0
  margin-bottom 0

.pr-summary-data
  margin-top 0.5em
  @extend $font-family-alt-400
  font-size 1.1rem
  +breakpoint-large-width()
    margin-left 2em
</style>
