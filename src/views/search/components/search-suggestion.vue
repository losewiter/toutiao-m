<template>
  <div class="search-suggestion">
    <van-cell
      @click="$emit('search', text)"
      v-for="(text, index) in suggestions"
      :key="index"
      icon="search"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // handler (value) {
      //   this.loadSearchSuggestions(value)
      // },
      handler: debounce(function (val) {
        this.loadSearchSuggestions(val)
      }, 200),
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        console.log(data)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    },
    highlight (text) {
      try {
        const highlightStr = `<span class="active">${this.searchText}</span>`
        const reg = new RegExp(this.searchText, 'gi')
        return text.replace(reg, highlightStr)
      } catch (error) {}
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
