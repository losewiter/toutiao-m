<template>
  <div class="article-list">
    <van-pull-refresh
      :success-text="refreshSuccessText"
      :success-duration="1500"
      v-model="isreFreshLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <AritcleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></AritcleItem>
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import AritcleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  components: {
    AritcleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isreFreshLoading: false,
      refreshSuccessText: ''
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getArticles({
          timestamp: this.timestamp || Date.now(),
          channel_id: this.channel.id
        })
        // 模拟随机失败
        // if (Math.random() > 0.5) {
        //   JSON.parse('dattrrwrwe')
        // }

        // console.log(data.data.results)
        const { results } = data.data
        // console.log(results)
        this.list.push(...results)

        this.loading = false
        // console.log(this.list)
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        this.isreFreshLoading = false
        const { data } = await getArticles({
          timestamp: Date.now(),
          channel_id: this.channel.id
        })

        // if (Math.random() > 0.2) {
        //   JSON.parse('fdsfdf')
        // }

        const { results } = data.data
        this.list.unshift(...results)
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
        this.isreFreshLoading = false
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }
    }
  }
}
</script>

<style>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
