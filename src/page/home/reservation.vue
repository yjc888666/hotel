<template>
  <div class="cont">
    <Title :title="titles"></Title>
    <div class="cont_top_btn">
      <el-button
        type="success"
        size="small"
        style="background: #066197;border-color: #066197;"
        icon="el-icon-plus"
        @click="addEvent()"
      >{{$t('public.add')}}</el-button>
      <div class="lists">
        <el-input
          v-model.trim="ruleForm.username"
          class="time-left"
          :placeholder="$t('reception.username2')"
          clearable
        ></el-input>
        <el-input
          v-model.trim="ruleForm.phone"
          class="time-left"
          :placeholder="$t('reception.phone2')"
          clearable
        ></el-input>
        <el-button
          type="primary tijiao"
          @click="submitForm('ruleForm')"
          class="tijiao"
        >{{$t('public.inquire')}}</el-button>
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%" header-align="center">
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column
        prop="username"
        :label="$t('reception.username2')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="phone"
        :label="$t('reception.phone2')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="reserve_time"
        :label="$t('reception.reserve_time')"
        width="auto"
        show-overflow-tooltip
        align="center"
        :formatter="dateFormat"
      ></el-table-column>
      <el-table-column
        prop="type"
        :label="$t('reception.status2')"
        width="auto"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type==1" type="danger">{{$t('reception.no_leave')}}</el-tag>
          <el-tag v-if="scope.row.type==2">{{$t('reception.is_in_hotel')}}</el-tag>
          <el-tag v-if="scope.row.type==3">{{$t('public.cancel')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="deposit"
        :label="$t('reception.book_money')"
        width="auto"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.deposit==0"
            size="mini"
            type="danger"
            @click="handledeposit(scope.$index, scope.row)"
          >{{$t('reception.book_money')}}</el-button>
          <el-tag v-else>{{scope.row.deposit}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="total_price"
        :label="$t('reception.total_price')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="staff_number"
        :label="$t('reception.staff_name')"
        width="auto"
        show-overflow-tooltip
        align="center"
        :formatter="workerFormat"
      ></el-table-column>
      <el-table-column
        prop="checkin_time"
        :label="$t('reception.expect_check_time')"
        width="auto"
        show-overflow-tooltip
        align="center"
        :formatter="dateFormat"
      ></el-table-column>
      <el-table-column
        prop="checkout_time"
        :label="$t('reception.expect_out_time')"
        width="auto"
        show-overflow-tooltip
        align="center"
        :formatter="dateFormat"
      ></el-table-column>
      <el-table-column :label="$t('public.operate')" align="center" fixed="right" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
          <!-- <el-button size="mini" @click="handleinfo(scope.$index, scope.row)">详情</el-button> -->
          <el-button
            size="mini"
            :disabled="scope.row.type==2"
            @click="handlebatch(scope.$index, scope.row)"
          >{{$t('reception.in_hotel')}}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            v-if="scope.row.type==3"
          >{{$t('reception.revoke')}}</el-button>
          <el-button
            size="mini"
            type="danger"
            v-else-if="scope.row.type==2"
            :disabled="scope.row.type==2"
            @click="handleDelete(scope.$index, scope.row)"
          >{{$t('public.cancel')}}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            v-else-if="scope.row.type==1"
          >{{$t('public.cancel')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChangeCont"
      @current-change="handleCurrentChangeCont"
      :current-page="currentPage"
      :page-sizes="[5,10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="mytotal"
      v-if="mytotal!=0"
    ></el-pagination>
    <!-- 新增 -->
    <el-dialog :title="$t('public.add')" :visible.sync="dialogFormVisible" class="dia" width="40%">
      <el-form
        :model="forms"
        status-icon
        :rules="rule"
        ref="forms"
        label-width="80px"
        class="demo-ruleForm mars"
      >
        <el-form-item :label="$t('reception.username2')" prop="username" class="floatleft">
          <el-input v-model.trim="forms.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.phone2')" prop="phone" class="floatleft">
          <el-input v-model.trim="forms.phone"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.reserve_time')" prop="reserve_time" class="floatleft">
          <el-date-picker
            v-model="forms.reserve_time"
            type="datetime"
            value-format="timestamp"
            :placeholder="$t('reception.reserve_time')"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          :label="$t('reception.expect_check_time')"
          prop="checkin_time"
          class="floatleft"
        >
          <el-date-picker
            v-model="forms.checkin_time"
            type="date"
            value-format="timestamp"
            :placeholder="$t('reception.expect_check_time')"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          :label="$t('reception.expect_out_time')"
          prop="checkout_time"
          class="floatleft"
        >
          <el-date-picker
            v-model="forms.checkout_time"
            type="date"
            value-format="timestamp"
            :placeholder="$t('reception.expect_out_time')"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('reception.days')" prop="day" class="floatleft">
          <el-input v-model.trim="forms.day"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.source_type')" prop="source_type" class="floatleft">
          <el-select v-model.trim="forms.source_type" :placeholder="$t('reception.source_type')">
            <el-option
              v-for="item in source_type"
              :key="item.index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.is_team')" prop="isteam" class="floatleft">
          <el-radio v-model="forms.isteam" label="1">{{$t('public.yes')}}</el-radio>
          <el-radio v-model="forms.isteam" label="0">{{$t('public.no')}}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('reception.team_name')" prop="team_name" class="floatleft">
          <el-input v-model.trim="forms.team_name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.public_pays')" prop="public_pays" class="floatleft">
          <el-select v-model="forms.public_pays" :placeholder="$t('reception.public_pays')">
            <el-option
              v-for="(item,index) in public_pays"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.remark')" prop="remark" class="floatleft">
          <el-input class="widthinp" type="textarea" :rows="2" v-model.trim="forms.remark"></el-input>
        </el-form-item>
        <div style="clear: both;"></div>
      </el-form>
      <el-form :inline="true" v-for="(item, index) in dynamicValidateForm.rooms" :key="index">
        <el-form-item :label="$t('reception.house_type')" prop="houseType" class="floatleft">
          <el-select
            v-model.trim="item.houseType"
            :placeholder="$t('reception.house_type')"
            clearable
            @change="queryRoomList"
          >
            <el-option
              v-for="items in houseTypes"
              :key="items.id"
              :label="items.name"
              :value="items.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item   :label="$t('reception.room_number')" prop="room ">
                    <el-input v-model.trim="item.room"></el-input>
        </el-form-item>-->

        <el-form-item :label="$t('reception.room_number')" prop="room">
          <el-select v-model.trim="item.room" :placeholder="$t('reception.room_number')" clearable>
            <el-option v-for="(item,index) in roomList2" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="removeDomain(item)">{{$t('reception.remove_room')}}</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="addDomain">{{$t('reception.add_room')}}</el-button>
        <el-button type="primary" @click="submitForms('forms')" v-show="show">{{$t('public.ok')}}</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog :title="$t('public.edit')" :visible.sync="dialog_2" class="dia" width="40%">
      <el-tabs v-model="activeName" :stretch="true" type="card">
        <el-tab-pane :label="$t('public.edit')" name="0">
          <el-form
            :model="form_1"
            status-icon
            :rules="rule"
            ref="forms"
            label-width="80px"
            class="demo-ruleForm mars"
          >
            <el-form-item :label="$t('reception.username2')" prop="username">
              <el-input v-model.trim="form_1.username"></el-input>
            </el-form-item>
            <el-form-item :label="$t('reception.phone2')" prop="phone">
              <el-input v-model.trim="form_1.phone"></el-input>
            </el-form-item>
            <el-form-item :label="$t('reception.reserve_time')" prop="reserve_time">
              <el-date-picker
                v-model="form_1.reserve_time"
                type="datetime"
                value-format="timestamp"
                :placeholder="$t('reception.reserve_time')"
              ></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('reception.team_name')" prop="team_name" v-show="isteam">
              <el-input v-model.trim="form_1.team_name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('reception.public_pays')" prop="public_pays" v-show="isteam">
              <el-input v-model.trim="form_1.public_pays"></el-input>
            </el-form-item>
            <el-form-item :label="$t('reception.remark')" prop="remark">
              <el-input class="widthinp" type="textarea" :rows="2" v-model.trim="form_1.remark"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="dialog_2= false">{{$t('public.cancel')}}</el-button>
              <el-button type="primary" @click="modifyEvent('forms')">{{$t('public.edit')}}</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('reception.reserve_info')" name="1">
          <el-form
            :model="form_2"
            status-icon
            :rules="rule"
            ref="forms"
            label-width="80px"
            class="demo-ruleForm mars"
          >
            <el-form-item :label="$t('reception.expect_check_time')" prop="checkin_time">
              <el-date-picker
                v-model="form_2.checkin_time"
                type="datetime"
                value-format="timestamp"
                :placeholder="$t('reception.expect_check_time')"
              ></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('reception.expect_out_time')" prop="checkout_time">
              <el-date-picker
                v-model="form_2.checkout_time"
                type="datetime"
                value-format="timestamp"
                :placeholder="$t('reception.expect_out_time')"
              ></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('reception.days')" prop="day">
              <el-input v-model.trim="form_2.day"></el-input>
            </el-form-item>
          </el-form>
          <el-form :inline="true" v-for="(item, index) in dynamicValidateForm.rooms" :key="index">
            <el-form-item :label="$t('reception.house_type')" prop="houseType">
              <el-select 
              v-model.trim="item.houseType"
               :placeholder="$t('reception.house_type')"
               clearable
              @change="queryRoomList"
              >

                <el-option
                  v-for="items in houseTypes"
                  :key="items.id"
                  :label="items.name"
                  :value="items.id"
                ></el-option>
              </el-select>
                </el-form-item>
        <el-form-item :label="$t('reception.room_number')" prop="room ">     
          <el-select v-model.trim="item.room" :placeholder="$t('reception.room_number')" clearable>
            <el-option v-for="(item,index) in roomList2" :value="item" :key="index"></el-option>
          </el-select>
            </el-form-item>
        <el-form-item >
              <el-button type="primary" @click="removeDomain(item)">{{$t('reception.revoke')}}</el-button>
            </el-form-item>
            <el-form-item v-if="item.status==1">
              <el-button type="primary" @click="removeDomain(item)">{{$t('public.cancel')}}</el-button>
            </el-form-item>
          </el-form>
          <div class="dialog-footer" style="margin-bottom: 30px;">
            <el-button @click="dialog_2 = false">{{$t('public.cancel')}}</el-button>
            <el-button type="primary" @click="addDomain">{{$t('reception.add_room')}}</el-button>
            <el-button type="primary" @click="modifyEvent('forms')">{{$t('public.edit')}}</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!-- 入住 -->
    <el-dialog :title="$t('reception.in_hotel')" :visible.sync="dialog_3" class="dia" width="60%">
      <el-tabs type="border-card">
        <el-table
          :data="itemInfo"
          stripe
          style="width: 100%"
          ref="multipleTable"
          header-align="center"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="house_type"
            :label="$t('reception.house_type')"
            width="150"
            show-overflow-tooltip
            align="center"
            :formatter="houseTypeFormat"
          ></el-table-column>
          <el-table-column :label="$t('reception.room_number')" prop="room_number"></el-table-column>

          <el-table-column prop="type" :label="$t('reception.status2')" width="auto" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type==1" type="danger">{{$t('reception.no_leave')}}</el-tag>
              <el-tag v-if="scope.row.type==2">{{$t('reception.leave_in')}}</el-tag>
              <el-tag v-if="scope.row.type==3" type="danger">{{$t('public.cancel')}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('reception.add_member')" width="150" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="addman(scope.$index,scope.row)"
              >{{$t('reception.add_player')}}</el-button>
            </template>
          </el-table-column>

          <el-table-column :label="$t('public.operate')" width="150px" align="center"></el-table-column>
        </el-table>
      </el-tabs>
      <div style="padding-top:10px;padding-bottom:10px;text-align:center">
        <el-button
          @click="checkinByitem()"
          type="primary"
          plain
          style="margin:0 10px"
        >{{$t('reception.in_hotel')}}</el-button>
        <el-button @click="cancleClick()" type="primary" plain style="margin:0 10px">{{$t('public.cancel')}}</el-button>
      </div>
      <div style="clear: both;"></div>
    </el-dialog>
    <el-dialog :title="$t('reception.book_money')" :visible.sync="dialog_4" class="dia" width="25%">
      <el-form
        :model="depmoreny"
        status-icon
        :rules="rule3"
        ref="depmoreny"
        class="demo-ruleForm mars"
        label-width="85px"
      >
        <el-form-item :label="$t('reception.amount_due')" prop="deposit">
          <el-input v-model.trim="depmoreny.deposit"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.payf')" prop="method">
          <el-select v-model="depmoreny.method" :placeholder="$t('reception.payf')">
            <el-option
              v-for="(item,index) in methodlist"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.pay_project')" prop="project_type">
          <el-select v-model="depmoreny.project_type" :placeholder="$t('reception.pay_project')">
            <el-option
              v-for="(item,index) in project"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.vip_card')" prop="member_card">
          <el-input v-model="depmoreny.member_card"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.money_detail')" prop="entry">
          <el-select v-model="depmoreny.entry" :placeholder="$t('reception.money_detail')">
            <el-option
              v-for="(item,index) in itemtype"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <div style="clear: both;"></div>
      </el-form>
      <div style="padding-top:10px;padding-bottom:10px;text-align:center">
        <el-button @click="dialog_4= false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="moreny('depmoreny')">{{$t('public.ok')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('reception.add_member')" :visible.sync="dialog_6" class="dia" width="20%">
      <el-form status-icon class="demo-ruleForm mars" :model="person" :rules="rule2" ref="person">
        <el-form-item :label="$t('reception.username2')" prop="username">
          <el-input v-model.trim="person.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.phone2')" prop="phone">
          <el-input v-model.trim="person.phone"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.gender')" prop="gender">
          <el-radio v-model="person.gender" label="1">{{$t('public.man')}}</el-radio>
          <el-radio v-model="person.gender" label="2">{{$t('public.woman')}}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('reception.card_type')" prop="card_type">
          <el-select v-model="person.card_type" :placeholder="$t('reception.card_type')">
            <el-option v-for="item in scardtype" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.id')" prop="card_num">
          <el-input v-model.trim="person.card_num"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="padding-top:10px;padding-bottom:10px;text-align:center">
            <el-button type="primary" @click="add('person')">{{$t('public.ok')}}</el-button>
            <el-button type="primary" @click="dialog_6=false">{{$t('public.cancel')}}</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Title from "../../components/cont_title.vue";
import yz from "../../config/validation.js";
export default {
  data() {
    return {
      multipleSelection: [],
      title: {
        title: "入驻列表",
        title_show: false
      },
      ruleForm: {
        username: "",
        phone: ""
      },

      show: true,
      // forms
      forms: {
        username: "",
        phone: "",
        reserve_time: "",
        checkin_time: "",
        checkout_time: "",
        day: "",
        source_type: "",
        isteam: "1",
        team_name: "",
        public_pays: "",
        remark: ""
      },
      // 房间数组
      dynamicValidateForm: {
        rooms: [
          {
            houseType: "",
            room: ""
          }
        ]
      },
      // 房型列表
      houseTypes: [],
      // 客源类型
      source_type: [
        {
          value: "1",
          label: this.$t('Validation.reservation.source_type.item_1')
        },
        {
          value: "2",
          label: this.$t('Validation.reservation.source_type.item_2')
        },
        {
          value: "3",
          label: this.$t('Validation.reservation.source_type.item_3')
        }
      ],
      // 公费项目
      public_pays: [
        {
          value: "0",
          label: this.$t('Validation.reservation.public_pays.item_1')
        },
        {
          value: "1",
          label: this.$t('Validation.reservation.public_pays.item_2')
        },
        {
          value: "2",
          label: this.$t('Validation.reservation.public_pays.item_3')
        }
      ],
      // 表单验证
      // rule: {
       
      // },
      // rule2: {
      
      // },
      // rule3:{
          
      // },
      activeName: "0",
      // 房间列表
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      pages: 0,
      pageNums: 0,
      mytotal: 0,
      // 弹出框
      dialogFormVisible: false,
      // 修改弹出窗
      dialog_2: false,
      dialog_3: false,
      dialog_4: false,
      dialog_5: false,
      dialog_6: false,
      // 团队判断
      isteam: true,
      // 修改订单
      form_1: {
        id: "",
        username: "",
        phone: "",
        reserve_time: "",
        team_name: "",
        public_pays: "",
        remark: ""
      },
      // 修改信息
      form_2: {
        re_id: "",
        id: "",
        checkin_time: "",
        checkout_time: "",
        day: ""
      },
      // 交定金
      depmoreny: {
        id: "",
        deposit: "",
        method: "",
        project_type: "",
        member_card: "",
        entry: ""
      },
      // 押金
      Pledge: {
        bill_id: "",
        cash_pledge: "",
        member_card: "",
        password: "",
        project_type: ""
      },
      // 选择支付方式
      methodlist: [
        {
          value: "1",
          label: this.$t('Validation.reservation.method_list.item_1')
        },
        {
          value: "2",
          label: this.$t('Validation.reservation.method_list.item_2')
        },
        {
          value: "3",
          label: this.$t('Validation.reservation.method_list.item_3')
        }
      ],
      // 财务明细
      itemtype: [
        {
          value: "1",
          label: this.$t('Validation.check_in.entry_type.item_1')
        },
        {
          value: "2",
          label: this.$t('Validation.check_in.entry_type.item_2')
        },
        {
          value: "3",
          label: this.$t('Validation.check_in.entry_type.item_3')
        },
        {
          value: "4",
          label: this.$t('Validation.check_in.entry_type.item_4')
        },
        {
          value: "5",
          label: this.$t('Validation.check_in.entry_type.item_5')
        },
        {
          value: "6",
          label: this.$t('Validation.check_in.entry_type.item_6')
        },
        {
          value: "7",
          label: this.$t('Validation.check_in.entry_type.item_7')
        },
        {
          value: "8",
          label: this.$t('Validation.check_in.entry_type.item_8')
        }
      ],
      // 财务项目
      project: [
        {
          value: "1",
          label: this.$t('Validation.check_in.project_type2.item_1')
        },
        {
          value: "2",
          label: this.$t('Validation.check_in.project_type2.item_2')
        },
        {
          value: "3",
          label: this.$t('Validation.check_in.project_type2.item_3')
        },
        {
          value: "4",
          label: this.$t('Validation.check_in.project_type2.item_4')
        },
        {
          value: "5",
          label: this.$t('Validation.check_in.project_type2.item_5')
        }
      ],
      // 入住
      customers: [],
      reservationAdd: [],
      dycustomers: {
        key: [
          {
            re_id: "",
            id: "",
            customers: [
              {
                username: "",
                phone: "",
                gender: "1",
                card_type: "",
                card_num: ""
              }
            ]
          }
        ]
      },
      scardtype: [],
      // 入住预定单id
      re_id: "",
      // 入住是否团队
      isteam: "",
      index: "",
      //  房间的列表
      roomList2: [],

      //预定订单性情
      itemInfo: [],
      reservationAdd: [],
      //操作员列表
      workerList: [],
      //dialog_6的客人
      person: {
        username: "",
        phone: "",
        gender: "",
        card_type: "",
        card_num: ""
      },
      post_customers: []
    };
  },
   watch:{
      'forms.checkout_time'(val){
       let a= val;
      if(val!=""){
        if(this.forms.checkin_time!=null){
           this.forms.day= (a-this.forms.checkin_time)/3600/24/1000;
        }
        else{
           this.forms.day=0;
        }
      }
      else{
       this.forms.day=0;
       }
    },
    'forms.checkin_time'(val){
       let a= val;
      if(val!=""){
        if(this.forms.checkout_time!=null){
           this.forms.day= (this.forms.checkout_time-a)/3600/24/1000;
        }
        else{
           this.forms.day=0;
        }
      }
      else{
       this.forms.day=0;
       }
    },
    'forms.day'(val){
       let a= val;
      if(val!=""){
        if(this.forms.checkin_time!=''){
           this.forms.checkout_time=a*1000*24*3600+this.forms.checkin_time
        }
        else{
           this.checkout_time='';
        }
      }
      else{
       this.checkout_time='';
       }
    },
   },

  created() {
    this.houseEvent();
    this.queryWorker();
    // this.roomList(this.currentPage,this.pagesize)
    this.submitForm();
  },
  computed: {
    titles() {
      return { title: this.$t("left.Booking") };
    },
    rule(){
      const rule={
         username: [{ required: true, message: this.$t('Validation.reservation.rule.username'), trigger: "blur" }],
        phone: [
          { required: true, message: this.$t('Validation.reservation.rule.phone'), trigger: "blur" },
          { validator: yz.validatePhTelNumber, trigger: "blur" }
        ],
        day: [{ required: true, message: this.$t('Validation.reservation.rule.days'), trigger: "blur" }],
        reserve_time: [
          { required: true, message: this.$t('Validation.reservation.rule.res_time'), trigger: "blur" }
        ],
        checkin_time: [
          { required: true, message: this.$t('Validation.reservation.rule.in_time'), trigger: "blur" }
        ],
        checkout_time: [
          { required: true, message: this.$t('Validation.reservation.rule.out_time'), trigger: "blur" }
        ],
        source_type: [
          { required: true, message: this.$t('Validation.reservation.rule.type'), trigger: "blur" }
        ],
        isteam: [{ required: true, message: this.$t('Validation.reservation.rule.is_team'), trigger: "blur" }]
      }
      return rule
    },
    rule2(){
      const rule2={
         username: [{ required: true, message: this.$t('Validation.reservation.rule.username'), trigger: "blur" }],
        phone: [
          { required: true, message: this.$t('Validation.reservation.rule.phone'), trigger: "blur" },
          { validator: yz.validateMobilePhone, trigger: "blur" }
        ],
        gender: [{ required: true, message: this.$t('Validation.reservation.rule.gender'), trigger: "blur" }],
        card_type: [
          { required: true, message: this.$t('Validation.reservation.rule.card_type'), trigger: "blur" }
        ],
        card_num: [
          { required: true, message: this.$t('Validation.reservation.rule.card_num'), trigger: "blur" },
          { validator: yz.validatenum, trigger: "blur" }
        ]
      }
      return rule2
    },
    rule3(){
      const rule3={
          deposit:[{required:true,message:this.$t('Validation.reservation.rule.deposit'),trigger:'blur'}],
          method:[{required:true,message:this.$t('Validation.reservation.rule.pay_ty'),trigger:'blur'}],
          project_type:[{required:true,message:this.$t('Validation.reservation.rule.pro_ty'),trigger:'blur'}],
          entry:[{required:true,message:this.$t('Validation.reservation.rule.entry'),trigger:'blur'}],
          cash_pledge:[{required:true,message:this.$t('Validation.reservation.rule.cash_pledge'),trigger:'blur'}],
      }
      return rule3
    }
  },
  methods: {
    //取消入住的提交弹出框
    cancleClick() {
      this.dialog_3 = false;
    },
    //query 方法
    submitForm() {
      var that = this;
      console.log(this.currentPage)
      that.roomList(1, that.pagesize);
    },

    //查询操作员列表
    queryWorker() {
      this.$axios
        .post(this.$baseUrl + `/staff/getpage`)
        .then(res => {
          this.workerList = res.data.pojo.list;
        })
        .catch(res => {
          console.log(err);
        });
    },

    //操作员类型的转换
    workerFormat(row, column) {
      for (var i = 0, l = this.workerList.length; i < l; i++) {
        if (row.staff_number == this.workerList[i].id) {
          return this.workerList[i].username;
        }
      }
    },

    //房型的转换
    houseTypeFormat(row, column) {
      for (var i = 0, l = this.houseTypes.length; i < l; i++) {
        if (row.house_type == this.houseTypes[i].id) {
          return this.houseTypes[i].name;
        }
      }
    },

    //房间号列表查询
    queryRoomList(value) {
      this.$axios
        .post(this.$baseUrl + `/room/getlist`, {
          house_type: value,
          status: 1
        })
        .then(res => {
          var that = this;
          var arr = [];
          var rooms = [];
          arr = res.data.pojo;
          if (!arr) {
            return;
          }
          arr.forEach(item => {
            rooms.push(item.room_number);
          });
          this.roomList2 = rooms;
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleSelectionChange(val) {
      let kes = [];
      val.forEach((item, index, arr) => {
        kes.push({
          customers: [item],
          id: this.id,
          re_id: this.re_id
        });
      });
      this.multipleSelection = kes;
    },
    // 证件类型
    idTypeEvent() {
      this.$axios
        .post(this.$baseUrl + "/idType/list")
        .then(res => {
          this.scardtype = res.data.pojo;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 添加单房间
    addDomain() {
      this.dynamicValidateForm.rooms.push({
        houseType: "",
        room: ""
      });
    },
    // 添加人数
    addman(index, row) {
      console.log(index);
      this.dialog_6 = true;
      this.index = index;
    },
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var that = this;
          console.log(this.index);
          this.post_customers.push(this.person);
          this.itemInfo[this.index].customers = this.post_customers;
          this.post_customers = [];
          this.person = {};
          // console.log(this.itemInfo);
          this.dialog_6 = false;
        }
      });
    },
    // 删除房间
    removeDomain(item) {
      console.log(item);
      let index = this.dynamicValidateForm.rooms.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.rooms.splice(index, 1);
      }
    },
    addEvent() {
      this.dialogFormVisible = true;
      this.show = true;
    },
    // 房型
    houseEvent() {
      this.$axios
        .post(this.$baseUrl + "/houseType/getlist")
        .then(res => {
          this.houseTypes = res.data.pojo;
          // console.log(this.houseType)
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 设置每页条数--改变触发
    handleSizeChangeCont: function(size) {
      this.pagesize = size;
      this.roomList(this.currentPage, size);
    },
    // 设置当前页--改变触发
    handleCurrentChangeCont: function(currentPage) {
      this.currentPage = currentPage;
      this.roomList(currentPage, this.pagesize);
    },
    // 房间查询列表
    roomList(a, b) {
      var that = this;
      var para = {
        page: a,
        size: b,
        username: that.ruleForm.username,
        phone: that.ruleForm.phone
      };
      that.$axios
        .post(this.$baseUrl + "/reservation/getPage", para)
        .then(res => {
          if (res.data.result == true) {
            that.tableData = res.data.pojo.list;
            that.mytotal = res.data.pojo.total;
            that.pageNums = res.data.pojo.pageNum;
            that.pages = res.data.pojo.pages;
            if (that.pageNums > that.pages && that.currentPage != 0) {
              that.currentPage = that.pages;
              that.roomList(that.currentPage, that.pagesize);
            }
          } else {
            that.tableData = [];
            that.$message.error(that.$t("common." + res.data.msg));
          }
        })
        .catch(res => {
          console.log("逻辑错误");
        });
    },
    // 时间戳转换
    dateFormat(row, column) {
      let moment = require("moment");
      let date = row[column.property] * 1000;
      return moment(date).format("YYYY-MM-DD hh:mm:ss");
    },
    // 新增房间
    submitForms(formName) {
      // this.$refs[formName].resetFields();
      this.forms.reserve_time = this.forms.reserve_time / 1000;
      this.forms.checkin_time = this.forms.checkin_time / 1000;
      this.forms.checkout_time = this.forms.checkout_time / 1000;
      let para = {
        ...this.forms,
        ...this.dynamicValidateForm
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          var that = this;
          that.$axios
            .post(this.$baseUrl + `/reservation/insert`, para)
            .then(res => {
              if (res.data.result == true) {
                that.$message.success(that.$t("common." + res.data.msg));
                  this.dialogFormVisible = false;
                  this.roomList(this.currentPage, this.pagesize);
              } else {
                that.$message.error(that.$t("common." + res.data.msg));
              }
            })
            .catch(err => {
              console.log("逻辑错误");
            });
        }
      });
    },
    // 订单详情
    handleinfo(index, row) {
      // console.log(row)
      this.dialogFormVisible = true;
      this.show = false;
      this.forms.username = row.username;
      this.forms.phone = row.phone;
      this.forms.reserve_time = row.reserve_time * 1000;
      this.forms.checkin_time = row.checkin_time * 1000;
      this.forms.checkout_time = row.checkout_time * 1000;
      this.forms.day = row.day;
      this.forms.remark = row.remark;
      this.info(index, row);
    },
    // 详情接口
    info(index, row) {
      let fordata = new FormData();
      fordata.append("id", row.id);
      this.$axios
        .post(this.$baseUrl + "/reservation/info", fordata)
        .then(res => {
          if (res.data.result == true) {
            let rese = res.data.pojo[0];
            let room = [];
            this.itemInfo = res.data.pojo[0].reservationAdds;
            rese.reservationAdds.forEach(item => {
              room.push({
                id: item.id,
                houseType: item.house_type,
                room: item.room_number,
                status: item.type
              });
            });
            this.dynamicValidateForm.rooms = room;
          } else {
            this.$message.error(this.$t("common." + res.data.msg));
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 订单修改弹出窗
    handleEdit(index, row) {
      // console.log(row)
      this.dialog_2 = true;
      this.form_1.id = row.id;
      this.form_1.username = row.username;
      this.form_1.phone = row.phone;
      this.form_1.reserve_time = row.reserve_time * 1000;
      this.form_1.remark = row.remark;
      this.form_2.re_id = row.id;
      this.form_2.checkin_time = row.checkin_time * 1000;
      this.form_2.checkout_time = row.checkout_time * 1000;
      this.form_2.day = row.day;
      this.info(index, row);
      if (row.isteam == 1) {
        this.form_1.team_name = row.team_name;
        this.form_1.public_pays = row.public_pays;
      } else {
        this.isteam = false;
      }

      console.log(this.form_1.username);
    },
    // 修改提交
    modifyEvent(index, row) {
      console.log(this.activeName);
      this.form_1.reserve_time = this.form_1.reserve_time / 1000;
      if (this.activeName == 0) {
        this.$axios
          .post(this.$baseUrl + "/reservation/updateOne", this.form_1)
          .then(res => {
            console.log(res);
            if (res.data.result == true) {
              // console.log(3333)
              this.$message({
                message: this.$t("common." + res.data.msg),
                showClose: true,
                type: "success"
              });
              this.dialog_2 = false;
              this.roomList(this.currentPage, this.pagesize);
            } else {
              this.$message.error(this.$t("common." + res.data.msg));
            }
          })
          .catch(res => {
            console.log(res);
          });
      } else if (this.activeName == 1) {
        this.form_2.checkin_time = this.form_2.checkin_time / 1000;
        this.form_2.checkout_time = this.form_2.checkout_time / 1000;
        let para = {
          ...this.form_2,
          ...this.dynamicValidateForm
        };
        this.$axios
          .post(this.$baseUrl + "/reservation/updateList",para)
          .then(res => {
            console.log(res);
            if (res.data.result == true) {
              // console.log(6666)
              this.$message({
                message: this.$t("common." + res.data.msg),
                showClose: true,
                type: "success"
              });
              this.dialog_2 = false;
              this.roomList(this.currentPage, this.pagesize);
            } else {
              this.$message.error(this.$t("common." + res.data.msg));
            }
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    // 入住
    handlebatch(index, row) {
      if (row.deposit == 0) {
        this.$message.error(this.$t('public.dis_warn'));
      } else {
        this.info(index, row);
        this.dialog_3 = true;
        this.idTypeEvent();
        this.re_id = row.id;
        this.isteam = row.isteam;
        return false;
      }
    },
    // 预订单取消
    handleDelete(index, row) {
      console.log(row.type);
      if (row.type == 3) {
        this.$confirm(this.$t('public.editstatus'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: "warning"
        })
          .then(() => {
            var that = this;
            let fordata = new FormData();
            fordata.append("id", row.id);
            fordata.append("status", 1);
            this.$axios
              .post(this.$baseUrl + "/reservation/batchCancel", fordata)
              .then(res => {
                if (res.data.result) {
                  this.$message({
                    message: this.$t("common." + res.data.msg),
                    showClose: true,
                    type: "success"
                  });
                  // this.tableData.splice(index,1)
                  that.roomList(that.currentPage, that.pagesize);
                } else {
                  this.$message({
                    message: this.$t("common." + res.data.msg),
                    showClose: true,
                    type: "error"
                  });
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: this.$t("public.cancel")
            });
          });
      } else {
        this.$confirm(this.$t('public.info'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: "warning"
        })
          .then(() => {
            var that = this;
            let fordata = new FormData();
            fordata.append("id", row.id);
            fordata.append("status", 3);
            this.$axios
              .post(this.$baseUrl + "/reservation/batchCancel", fordata)
              .then(res => {
                if (res.data.result) {
                  this.$message({
                    message: this.$t("common." + res.data.msg),
                    showClose: true,
                    type: "success"
                  });
                  // this.tableData.splice(index,1)
                  that.roomList(that.currentPage, that.pagesize);
                } else {
                  this.$message({
                    message: this.$t("common." + res.data.msg),
                    showClose: true,
                    type: "error"
                  });
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: this.$t("public.cancel")
            });
          });
      }
    },
    // 交定金
    handledeposit(index, row) {
      this.dialog_4 = true;
      this.depmoreny.id = row.id;
    },
    cashmoreny() {
      this.$axios
        .post(this.$baseUrl + "/registerinfo/cashPledge", this.Pledge)
        .then(res => {
          console.log(res);
          if (res.data.result == true) {
            // console.log('成功')
            this.$message({
              message: this.$t("common." + res.data.msg),
              showClose: true,
              type: "success"
            });
            this.dialog_5 = false;
            this.roomList(this.currentPage, this.pagesize);
          } else {
            this.$message.error(this.$t("common." + res.data.msg));
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    moreny(formName) {
         this.$refs[formName].validate(valid => {
        if (valid) {
      var that = this;
      this.$axios
        .post(this.$baseUrl + "/reservation/deposit", this.depmoreny)
        .then(res => {
          if (res.data.result == true) {
            this.dialog_4 = false;
            that.$message({
              message: this.$t("common." + res.data.msg),
              showClose: true,
              type: "success"
            });
            that.roomList(this.currentPage, this.pagesize);
          } else {
            that.$message.error(this.$t("common." + res.data.msg));
          }
        })
        .catch(err => {
          console.log(err);
        });
        }})
    },
    // 预订单入住
    checkinByitem() { 
        var arr = [];
        for (var i = 0, l = this.itemInfo.length; i < l; i++) {
        if(this.itemInfo[i].customers==null){
            this.$message.error("请先添加入住人之后再入住！");
            return;
        }
        else {
        var obj = {};
        obj.id = this.itemInfo[i].id;
        obj.re_id = this.itemInfo[i].re_id;
        obj.customers = this.itemInfo[i].customers;
        arr.push(obj);
      } 
      }
      //判断是不是团队入住
      if (this.isteam == 1) {
        this.$axios
          .post(this.$baseUrl + "/reservation/teamCheckIn", {
            reservationAdds: arr
          })
          .then(res => {
            if (res.data.result) {
              arr = [];
              this.$message.success(this.$t("common." + res.data.msg));
               
              this.roomList(this.currentPage, this.pagesize);
              this.dialog_3=false
            } else {
              this.$message.error(this.$t("common." + res.data.msg));
              arr = [];
            }
          })
          .catch(err => {
            console.log(err);
            arr = [];
            console.log('逻辑错误')
          });
      } else {
        this.$axios
          .post(this.$baseUrl + "/reservation/batchCheckIn", {
            reservationAdds: arr
          })
          .then(res => {
            if (res.data.result) {
              arr = [];
              this.$message.success(this.$t("common." + res.data.msg));
              this.roomList(this.currentPage, this.pagesize);
              this.dialog_3=false
            } else {
              this.$message.error(this.$t("common." + res.data.msg));
              arr = [];
            }
          })
          .catch(err => {
            console.log(err);
            arr = [];
           console.log('逻辑错误')
          });
      }
   
      }
       
  },

  components: {
    Title
  }
};
</script>
<style lang='less' scoped>
.floatleft {
  width: 47.5%;
  float: left;
}
.floatleft:nth-child(odd) {
  margin-right: 5%;
}
.dia .el-select {
  width: 100%;
}
.dias {
  padding-bottom: 30px;
  padding-left: 30px;
}
</style>