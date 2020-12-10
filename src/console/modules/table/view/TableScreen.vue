<template>
  <div class="wrap-content">
    <el-form class="search-form" :model="searchForm" inline label-width="80px" label-suffix=":">
      <el-form-item label="作品名称">
        <el-input v-model="searchForm.name" clearable placeholder="请输入作品名称"></el-input>
      </el-form-item>
      <el-form-item label="是否持有">
        <el-select v-model="searchForm.owned" clearable>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否通关">
        <el-select v-model="searchForm.cleared" clearable>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getGameList">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格展示 -->
    <el-table stripe :data="gameList">
      <el-table-column prop="name" label="作品名"></el-table-column>
      <el-table-column prop="tagName" label="标签"></el-table-column>
      <el-table-column prop="size" label="大小" width="80" align="right"></el-table-column>
      <el-table-column prop="ownedText" label="是否持有" width="100" align="center"></el-table-column>
      <el-table-column prop="clearedText" label="是否通关" width="100" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="showDetail(scope, scope.row)">详情</el-button>
          <el-button type="text" @click="beforeUpdateDetail(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-size.sync="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      :current-page="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <!-- 对话框 -->

  </div>
</template>

<script>
import gameList from '@/common/assets/js/app/GalGameList'

export default {
  data() {
    return {
      // 查询参数
      searchForm: {
        name: '',
        owned: '',
        cleared: '',
      },
      // 源数据
      gameList: [],
      // pagination
      pageSize: 10,
      pageSizes: [10, 20, 30],
      total: 0,
      currentPage: 1
    }
  },
  created() {
    this.getGameList()
  },
  methods: {
    getGameList() {
      const params = {
        ...this.searchForm,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }
      // 通过参数过滤
      Object.keys(params).forEach(key => {
        if (!params[key]) {
          delete params[key]
        }
      })
      const searchKeys = ['name', 'owned', 'cleared']
      const filteredGameList = gameList.filter(item =>
        searchKeys.every(key => {
          const searchParam = params[key]
          let isPassed = false
          if (searchParam) {
            if (key === 'name' && item.name.indexOf(searchParam) > -1) {
              isPassed = true
            } else if (key === 'owned' || key === 'cleared') {
              if ((item[key] && item[key] === searchParam) || (!item[key] && searchParam === '0')) {
                isPassed = true
              } else {
                isPassed = false
              }
            }
          } else {
            isPassed = true
          }
          return isPassed
        })
      )

      // 分页
      const length = filteredGameList.length
      const { currentPage, pageSize } = params
      const totalPage = Math.ceil(length / pageSize)
      const currentList = filteredGameList.slice(pageSize * (currentPage - 1), pageSize * currentPage)

      currentList.forEach(item => {
        item.tagName = item.tagList.join(',')
        item.ownedText = item.owned === '1' ? '是' : '否'
        item.clearedText = item.cleared === '1' ? '是' : '否'
      })
      // 输出
      this.total = length
      this.gameList = currentList
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getGameList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getGameList()
    },
    showDetail(row) {
      console.log(row)
    },
    beforeUpdateDetail(row) {
      console.log(row)
    }
  },
}
</script>
