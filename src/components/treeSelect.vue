<template>
  <el-select :value="valueTitle" :clearable="clearable" @clear="clearHandle">
    <p style="line-height: 40px;text-indent: 10px;cursor: pointer;z-index: 9999;font-size: 14px;" :class="{Bg:valueTitle=='一级菜单'}" @click="One_cd">一级菜单</p>
    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree
        id="tree-option"
        ref="selectTree"
        :accordion="accordion"
        :data="options"
        :props="props"
        :default-expand-all='true'
        :expand-on-click-node='false'
        :node-key="props.value"
        :default-expanded-keys="[]"
        @node-click="handleNodeClick">
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "el-tree-select",
  props:{

    // 配置项
    props:{
      type: Object,
      default: {
          value:"id",             // ID字段名
          label: 'title',         // 显示名称
          children: 'children'    // 子级字段名
        }
    },

    // 选项列表数据(树形结构的对象数组)
    options:{ type: Array },

    // 初始值
    value:{ type: String, default: null },

    // 可清空选项
    clearable:{ type:Boolean, default: true },

    // 自动收起
    accordion:{ type:Boolean, default: false }

  },
  data() {
    return {
      valueId: null,
      valueTitle:'',
      defaultExpandedKey:[]
    }
  },
  mounted(){
    // console.log(this.value)
    if(this.value==0){
      this.valueTitle ='一级菜单'
    }
    this.valueId = this.value
    // console.log(this.options.length>0)
    if(this.options.length>0){
      this.initHandle()
      this.defaultExpandedKey = []
    }
  },
  updated() {
    if(this.options.length>0){
      this.initHandle()
      this.defaultExpandedKey = []
    }else{
      this.initHandle()
      this.defaultExpandedKey = []
    }
  },
  methods: {
    // 初始化值
    initHandle(){
      // console.log(this.valueId)
      if(this.valueId!=0){
        this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[this.props.label]     // 初始化显示
              // console.log(this.valueTitle)
        this.$refs.selectTree.setCurrentKey(this.valueId)       // 设置默认选中
        this.defaultExpandedKey = []      // 设置默认展开
      }else{
         this.valueTitle ='一级菜单'
         this.$refs.selectTree.setCurrentKey()
      }
      this.initScroll()
    },
    One_cd(){
      this.valueTitle ='一级菜单'
      this.$emit('getValue','0')
    },
    // 初始化滚动条
    initScroll(){
      this.$nextTick(()=>{
        let scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
        let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
        scrollBar.forEach(ele => ele.style.width = 0)
      })
    },

    // 切换选项
    handleNodeClick(node){
      this.valueTitle = node[this.props.label]
      this.valueId = node[this.props.value]
      this.$emit('getValue',this.valueId)
      this.defaultExpandedKey = []
    },

    // 清除选中
    clearHandle(){
      this.valueTitle = ''
      this.valueId = null
      this.defaultExpandedKey = []
      this.clearSelected()
      this.$emit('getValue',null)
    },

    // 清空选中样式
    clearSelected(){
      let allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element)=>element.classList.remove('is-current'))
    }

  },

  watch: {
    value(){
      this.valueId = this.value
      this.initHandle()
    }
  },
}
</script>

<style scoped>
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }

  ::-webkit-scrollbar {
          width:5px;
          background-color: #f3f3f3;
          }

          /* 滚动槽 */
          ::-webkit-scrollbar-track {
          border-radius:10px;
          }

          /* 滚动条滑块 */
          ::-webkit-scrollbar-thumb {
          border-radius:10px;
          background:rgb(6, 97, 151);;
          }

  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
    padding: 0 20px;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }

  .Bg{
    background: rgb(6, 97, 151);
    color: white;
  }
</style>
