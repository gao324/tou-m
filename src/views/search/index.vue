<template>
  <div class="search">
    <form action="/" class="search_input">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isRerult = false"
      />
    </form>

    <!-- 搜索结果result -->
    <SearchResult 
    v-if="isRerult"
    v-model="searchText"
    />

    <!-- 联想建议suggestion -->
    <SearchSuggestion 
    v-else-if="searchText"
    v-model="searchText"
    @search="onSearch"
    />
    <!-- 搜索历史keyword -->
    <SearchHistory 
    v-model="historyList"
    v-else
    @clears="historyList = []"
    @clear="del"
    @search="onSearch"
    />
    
  </div>
</template>

<script>
import SearchKeyword from "./components/search-history.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import SearchResult from "./components/search-result.vue";
import SearchHistory from "./components/search-history.vue";
import { getItem,setItem } from "@/util/storage";
export default {
    data() {
        return {
            searchText: "",
            isRerult:false,
            historyList:getItem('SEARCH_HISTORY') || []
        };
    },
    methods: {
        onSearch(val) {
            // console.log(val);
            // 更新本地记录
            this.searchText = val
            // 不要有重复记录
            const index = this.historyList.indexOf(val)
            if (index !== -1) {
              this.historyList.splice(index,1)
            }
            // 最新的排在最前面
            this.historyList.unshift(val)
            this.isRerult =true
        },
        onCancel() {
            this.$router.back();
        },
        del(index){
          // console.log(index);
          // const index = this.historyList.indexOf(val)
          this.historyList.splice(index,1)
        }
    },
    mounted() {
    },
    components: { 
      SearchKeyword, 
      SearchSuggestion, 
      SearchResult, 
      SearchHistory 
    },
    watch:{
      historyList(val){
        setItem('SEARCH_HISTORY',val)
      }
    }
};
</script>

<style lang="less">
.search{
  padding-top: 110px;
  .van-search{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .search_input{
    .van-search__action{
      letter-spacing: 1px;
      color: #ffffff;
      font-family: MicrosoftYaHei;
      font-size: 28px;
    }
    .van-search__content{
      width: 589px;
      height: 56px;
      background-color: #f4f5f6;
      border-radius: 6px;
      border: solid 1px #e8e8e8;
      .van-icon-search{
        font-size: 25px;
        color: #9a9a9a;
      }
    }
  }
}
</style>