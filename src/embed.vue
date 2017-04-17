<template lang="pug">
main.pr-embed
  p.pr-embed-intro All of The PR Quest&rsquo;s data is on #[a(href='https://airtable.com/shrEDWweTjiELNcuz') Airtable] and embedded below:
  iframe.airtable-embed(src='https://airtable.com/embed/shrEDWweTjiELNcuz?backgroundColor=red&viewControls=on' frameborder='0' onmousewheel='')
  p.pr-embed-outro
    | To edit this data,
    = ' '
    a(href='mailto:dancecile@gmail.com?subject=The PR Quest contributor request&body=Hi, I&rsquo;d like to help out with the data you&rsquo;re using for The PR Quest. Can you add me to the Airtable project?' target='_blank') send me an email
    | .
</template>

<script>
export default {
}
</script>

<style lang="stylus">
@require './flex'

.pr-embed
  @extend $flex-column
  margin-bottom 2.5rem
  align-self stretch
  width auto

.pr-embed-intro
  margin-top 0.5rem
  margin-bottom 0

.airtable-embed
  flex-basis 40rem
  flex-grow 1
  background transparent
  border 1px solid #ccc
  margin-top 1.5rem
  margin-bottom 0

.pr-embed-outro
  margin-top 1.5rem
  margin-bottom 0
</style>
