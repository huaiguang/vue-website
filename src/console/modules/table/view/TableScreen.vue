<template>
  <div class="wrap-content">
    <!-- 表格展示 -->
    <el-table :data="gameList">
      <el-table-column prop="name" label="作品名"></el-table-column>
      <el-table-column prop="tagName" label="标签"></el-table-column>
      <el-table-column prop="size" label="大小" width="80" align="right"></el-table-column>
      <el-table-column prop="ownedText" label="是否持有" width="100" align="center"></el-table-column>
      <el-table-column prop="clearedText" label="是否通关" width="100" align="center"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="showDetail(scope.row)">详情</el-button>
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
        // 查询
        // 分页
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }
      const length = gameList.length
      const { currentPage, pageSize } = params
      const totalPage = Math.ceil(length / pageSize)
      const currentList = gameList.slice(pageSize * (currentPage - 1), pageSize * currentPage)
      currentList.forEach(item => {
        item.tagName = item.tagList.join(',')
        item.ownedText = item.owned ? '是' : '否'
        item.clearedText = item.cleared ? '是' : '否'
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
    }
  },
}
</script>
