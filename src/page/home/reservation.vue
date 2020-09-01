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
            type="datetime"
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
            type="datetime"
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
          <el-radio v-model="forms.isteam" label="1">是</el-radio>
          <el-radio v-model="forms.isteam" label="0">否</el-radio>
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
      <!-- <el-form :inline="true" status-icon class="demo-ruleForm mars">
                <div v-for="(items,index) in dycustomers.key" :key="index">
                    <div v-for="(item, indexs) in dynamicValidateForm.rooms" :key="indexs">
                        <el-form-item :label="$t('reception.house_type')" prop="houseType">
                            <el-select v-model.trim="item.houseType" placeholder="房型">
                                <el-option v-for="items in houseTypes" :key="items.id" :label="items.name" :value="items.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item   :label="$t('reception.room_number')" prop="room ">
                            <el-input v-model.trim="item.room"></el-input>
                        </el-form-item>
                        <div v-for="(itemd, index) in items.customers[index]" :key="'k'+index">
                            <el-form-item :label="$t('reception.username2')" prop="username">
                                <el-input v-model.trim="itemd.username"></el-input>
                            </el-form-item>
                            <el-form-item :label="$t('reception.phone2')" prop="phone">
                                <el-input v-model.trim="itemd.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" prop="gender">
                                <el-radio v-model="itemd.gender" label="1">男</el-radio>
                                <el-radio v-model="itemd.gender" label="2">女</el-radio>
                            </el-form-item>
                            <el-form-item label="证件类型" prop="card_type">
                                <el-select v-model="itemd.card_type" placeholder="选择证件类型">
                                    <el-option v-for="item in scardtype" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="证件号" prop="card_num">
                                <el-input v-model.trim="itemd.card_num"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary"  @click="remove(item)">删除人数</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="addman(item,index,indexs)">添加人数</el-button>
                            </el-form-item>
                        </div>
                    </div>
                </div>
      </el-form>-->
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
          <!-- <div v-for="(itemd, index) in reservationAdd" :key="index">
                        <el-table-column label="用户名" width="150" align="center">
                            <template slot-scope="scope">
                                <el-input v-model.trim="scope.row.username"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('reception.phone2')" width="150" align="center">
                            <template slot-scope="scope">
                                <el-input v-model.trim="scope.row.phone"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="性别" width="150" align="center">
                            <template slot-scope="scope">
                                <el-radio v-model="scope.row.gender" label="1">男</el-radio>
                                <el-radio v-model="scope.row.gender" label="2">女</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column label="证件类型" width="150" align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.card_type" placeholder="选择证件类型">
                                    <el-option v-for="item in scardtype" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="证件号" width="150" align="center">
                            <template slot-scope="scope">
                                <el-input v-model.trim="scope.row.card_num"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="添加" width="150" align="center">
                            <el-button type="primary" @click="remove()">删除人数</el-button>
                        </el-table-column>
          </div>-->
          <el-table-column :label="$t('reception.room_number')" prop="room_number"></el-table-column>

          <el-table-column prop="type" :label="$t('reception.status2')" width="auto" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type==1" type="danger">未入住</el-tag>
              <el-tag v-if="scope.row.type==2">已入住</el-tag>
              <el-tag v-if="scope.row.type==3" type="danger">取消</el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('reception.add_member')" width="150" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="addman(scope.$index,scope.row)"
              >{{$t('reception.add_player')}} {{scope.$index}}</el-button>
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
        <el-button @click="cancleClick()" type="primary" plain style="margin:0 10px">取消</el-button>
      </div>

      <!-- <div class="dialog-footer dias">
                <el-button @click="dialog_3= false">取消</el-button>
                <el-button type="primary" @click="batchCheckIn()">确定</el-button>
      </div>-->
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
          <el-select v-model="depmoreny.method" placeholder="选择支付方式">
            <el-option
              v-for="(item,index) in methodlist"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.pay_project')" prop="project_type">
          <el-select v-model="depmoreny.project_type" placeholder="账务项目">
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
          <el-select v-model="depmoreny.entry" placeholder="财务明细">
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
    <!-- <el-dialog title="交押金" :visible.sync="dialog_5" class="dia" width="25%">
      <el-form
        :model="Pledge"
        status-icon
        :rules="rule3"
        ref="Pledge"
        label-width="85px"
        class="demo-ruleForm mars"
      >
        <el-form-item :label="$t('reception.cash_pledge')" prop="cash_pledge" >
          <el-input v-model.trim="Pledge.cash_pledge"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.pay_project')" prop="project_type">
          <el-select v-model="Pledge.project_type" placeholder="账务项目">
            <el-option
              v-for="(item,index) in project"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.vip_card')" prop="member_card" >
          <el-input v-model="Pledge.member_card"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.password2')" prop="password" >
          <el-input v-model="Pledge.password"></el-input>
        </el-form-item>
        <div style="clear: both;"></div>
      </el-form>
      <div style="padding-top:10px;padding-bottom:10px;text-align:center">
          <el-button @click="dialog_5= false">{{$t('public.cancel')}}</el-button>
          <el-button type="primary" @click="Pledge('Pledge')">{{$t('public.ok')}}</el-button>
      </div>
    </el-dialog> -->

    <el-dialog :title="$t('reception.add_member')" :visible.sync="dialog_6" class="dia" width="20%">
      <el-form status-icon class="demo-ruleForm mars" :model="person" :rules="rule2" ref="person">
        <el-form-item :label="$t('reception.username2')" prop="username">
          <el-input v-model.trim="person.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.phone2')" prop="phone">
          <el-input v-model.trim="person.phone"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.gender')" prop="gender">
          <el-radio v-model="person.gender" label="1">男</el-radio>
          <el-radio v-model="person.gender" label="2">女</el-radio>
        </el-form-item>
        <el-form-item :label="$t('reception.card_type')" prop="card_type">
          <el-select v-model="person.card_type" placeholder="选择证件类型">
            <el-option v-for="item in scardtype" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.id')" prop="card_num">
          <el-input v-model.trim="person.card_num"></el-input>
        </el-form-item>
        <!-- <el-form-item>
                        <el-button type="primary"  @click="remove(itemd)">{{$t('reception.remove_player')}}</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addmanss(itemd)">{{$t('reception.add_player')}}</el-button>
        </el-form-item>-->
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
          label: "散客"
        },
        {
          value: "2",
          label: "会员"
        },
        {
          value: "3",
          label: "单位"
        }
      ],
      // 公费项目
      public_pays: [
        {
          value: "0",
          label: "无"
        },
        {
          value: "1",
          label: "房费"
        },
        {
          value: "2",
          label: "房费+消费"
        }
      ],
      // 表单验证
      rule: {
        username: [{ required: true, message: "姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: yz.validatePhTelNumber, trigger: "blur" }
        ],
        day: [{ required: true, message: "天数", trigger: "blur" }],
        reserve_time: [
          { required: true, message: "请输入保留时间", trigger: "blur" }
        ],
        checkin_time: [
          { required: true, message: "请输入入驻时间", trigger: "blur" }
        ],
        checkout_time: [
          { required: true, message: "请输入退房时间", trigger: "blur" }
        ],
        source_type: [
          { required: true, message: "选择客源类型", trigger: "blur" }
        ],
        isteam: [{ required: true, message: "选择是否团队", trigger: "blur" }]
      },
      rule2: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: yz.validateMobilePhone, trigger: "blur" }
        ],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
        card_type: [
          { required: true, message: "请输入证件类型", trigger: "blur" }
        ],
        card_num: [
          { required: true, message: "请输入证件号", trigger: "blur" },
          { validator: yz.validatenum, trigger: "blur" }
        ]
      },
      rule3:{
          deposit:[{required:true,message:'请输入定金金额',trigger:'blur'}],
          method:[{required:true,message:'请选择付款方式',trigger:'blur'}],
          project_type:[{required:true,message:'请选择账目项目',trigger:'blur'}],
          entry:[{required:true,message:'请选择账务明细',trigger:'blur'}],
          cash_pledge:[{required:true,message:'请输入押金金额',trigger:'blur'}],
      },
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
          label: "现金"
        },
        {
          value: "2",
          label: "刷卡"
        },
        {
          value: "3",
          label: "会员"
        }
      ],
      // 财务明细
      itemtype: [
        {
          value: "1",
          label: "现金押金"
        },
        {
          value: "2",
          label: "现金收款"
        },
        {
          value: "3",
          label: "现金订金"
        },
        {
          value: "4",
          label: "现金退款"
        },
        {
          value: "5",
          label: "银行卡押金"
        },
        {
          value: "6",
          label: "银行卡收款"
        },
        {
          value: "7",
          label: "银行卡订金"
        },
        {
          value: "8",
          label: "银行卡退款"
        }
      ],
      // 财务项目
      project: [
        {
          value: "1",
          label: "现金订金"
        },
        {
          value: "2",
          label: "银行卡订金"
        },
        {
          value: "3",
          label: "会员卡订金"
        },
        {
          value: "4",
          label: "现金订金转押金"
        },
        {
          value: "5",
          label: "银行卡订金转押金"
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
  created() {
    this.houseEvent();
    this.queryWorker();
    // this.roomList(this.currentPage,this.pagesize)
    this.submitForm();
  },
  computed: {
    titles() {
      return { title: this.$t("left.Booking") };
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
      that.roomList(that.currentPage, that.pagesize);
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
      // let customers=[]
      // customers.push({
      //     ...val
      // })
      let kes = [];
      val.forEach((item, index, arr) => {
        // console.log(item)
        kes.push({
          customers: [item],
          id: this.id,
          re_id: this.re_id
        });
      });
      this.multipleSelection = kes;
      // console.log(kes)
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
      // console.log(row)
      // this.reservationAdd=[row]
      // console.log(this.reservationAdd)
      // this.reservationAdd[index+1].push(row);
      // this.dynamicValidateForm.rooms.push(row)
      // this.customers[index].push
    },
    // addmanss(item){
    //     this.customers.push({
    //         username:"",
    //         phone:"",
    //         gender:"1",
    //         card_type:"",
    //         card_num:""
    //     })
    // },
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
    // // 删除人数
    // remove(item){
    //     let index = this.customers.indexOf(item)
    //     console.log(index)
    //     if (index !== -1) {
    //         this.customers.splice(index, 1)
    //     }
    // },
    // 删除房间
    removeDomain(item) {
      console.log(item);
      let index = this.dynamicValidateForm.rooms.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.rooms.splice(index, 1);
      }
      // console.log(item)
      // if(item.status==1){
      //     this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
      //         confirmButtonText: '确定',
      //         cancelButtonText: '取消',
      //         type: 'warning'
      //         }).then(() => {
      //         var that = this;
      //         let fordata = new FormData();
      //         fordata.append("id",item.id)
      //         fordata.append("status",3)
      //         that.$axios.post(this.$baseUrl + '/reservation/cancel',fordata)
      //         .then((res) => {
      //             if (res.data.result) {
      //             this.$message({
      //                 message: this.$t("common."+res.data.msg),
      //                 showClose: true,
      //                 type: 'success'
      //             });
      //             // if (index !== -1) {
      //             //     this.dynamicValidateForm.rooms.splice(index, 1)
      //             // }
      //             }else{
      //             this.$message({
      //                 message: this.$t("common."+res.data.msg),
      //                 showClose: true,
      //                 type: 'error'
      //             });
      //             }
      //         })
      //         }).catch(() => {
      //             this.$message({
      //                 type: 'info',
      //                 message: this.$t('public.cancel')
      //             });
      //     });
      // }else if(item.status==3){
      //     this.$confirm('此操作将增加该信息, 是否继续?', '提示', {
      //         confirmButtonText: '确定',
      //         cancelButtonText: '取消',
      //         type: 'warning'
      //         }).then(() => {
      //         var that = this;
      //         let fordata = new FormData();
      //         fordata.append("id",item.id)
      //         fordata.append("status",1)
      //         that.$axios.post(this.$baseUrl + '/reservation/cancel',fordata)
      //         .then((res) => {
      //             if (res.data.result) {
      //             this.$message({
      //                 message: this.$t("common."+res.data.msg),
      //                 showClose: true,
      //                 type: 'success'
      //             });
      //             }else{
      //             this.$message({
      //                 message: this.$t("common."+res.data.msg),
      //                 showClose: true,
      //                 type: 'error'
      //             });
      //             }
      //         })
      //         }).catch(() => {
      //             this.$message({
      //                 type: 'info',
      //                 message: this.$t('public.cancel')
      //             });
      //     });
      // }
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
      let para = {
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
              that.list(that.currentPage, that.pagesize);
            }
          } else {
            that.tableData = [];
            that.$message.error(that.$t("common." + res.data.msg));
          }
          // console.log(res)

          // console.log(this.tableData)
        })
        .catch(res => {
          console.log("逻辑错误");
        });
    },
    // 时间戳转换
    dateFormat(row, column) {
      let moment = require("moment");
      let date = row[column.property] * 1000;
      return moment(date).format("YYYY-MM-DD");
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
          // console.log(res.data.pojo[0].reservationAdds);
          if (res.data.result == true) {
            let rese = res.data.pojo[0];
            let room = [];
            this.itemInfo = res.data.pojo[0].reservationAdds;
            // console.log(this.itemInfo);
            rese.reservationAdds.forEach(item => {
              room.push({
                id: item.id,
                houseType: item.house_type,
                room: item.room_number,
                status: item.type
              });
            });
            this.dynamicValidateForm.rooms = room;
            // console.log(this.dynamicValidateForm);
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
        this.$message.error("请先交定金再入住!");
      } else {
        this.info(index, row);
        this.dialog_3 = true;
        this.idTypeEvent();
        this.re_id = row.id;
        this.isteam = row.isteam;
        return false;
      }
    },
    /* batchCheckIn() {
      // let id=[]
      // this.dynamicValidateForm.rooms.forEach(item=>{
      //     id.push({
      //         id:item.id
      //     })
      // })
      // console.log(id)
      // console.log(this.multipleSelection)
      // return false
      if (this.multipleSelection.length == "") {
        this.$message.warning("请选择修改项");
        return;
      }
      let para = {
        reservationAdds: this.multipleSelection
      };
      if (this.isteam == 1) {
        this.$axios
          .post(this.$baseUrl + "/reservation/teamCheckIn", para)
          .then(res => {
            console.log(res);
            if (res.data.result == true) {
              console.log("成功");
            } else {
              this.$message.error(this.$t("common." + res.data.msg));
            }
          })
          .catch(res => {
            console.log(res);
          });
      } else {
        this.$axios
          .post(this.$baseUrl + "/reservation/batchCheckIn", para)
          .then(res => {
            console.log(res);
            if (res.data.result == true) {
              console.log(res);
            } else {
              this.$message.error(this.$t("common." + res.data.msg));
            }
          })
          .catch(res => {
            console.log(res);
          });
      }
    }, */
    // 预订单取消
    handleDelete(index, row) {
      console.log(row.type);
      if (row.type == 3) {
        this.$confirm("此操作将增加订单, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
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
        this.$confirm("此操作将删除订单, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
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
    // // 交押金
    // cashPledge(index, row) {
    //   this.dialog_5 = true;
    //   this.Pledge.bill_id = row.bill_id;
    // },
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
      //  console.log(row)
      //  var info={}
      //  info.re_id=row.re_id;
      //  info.id=row.id;
      //  info.customers=this.customers
      //  this.reservationAdd.push(info)

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