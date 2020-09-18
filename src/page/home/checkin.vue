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
        <el-input v-model.trim="ruleForm.phone" class="time-left" :placeholder="$t('reception.phone2')" clearable></el-input>
        <el-input v-model.trim="ruleForm.room_number" class="time-left" :placeholder="$t('reception.room_number')" clearable></el-input>
        <el-select
          v-model.trim="ruleForm.certificate_type "
          :placeholder="$t('reception.idType')"
          clearable
          class="time-left"
        >
          <el-option v-for="item in idtype" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-input v-model.trim="ruleForm.id_number" class="time-left" :placeholder="$t('reception.id')" clearable></el-input>
        <el-button
          type="primary tijiao"
          @click="submitForm('ruleForm')"
          class="tijiao"
        >{{$t('public.inquire')}}</el-button>
      </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" header-align="center" type="flex" :max-height="getTableHeight">
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column
        prop="room_number"
        :label="$t('reception.room_number')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
       <el-table-column
        prop="house_type"
        :label="$t('reception.house_type')"
        width="auto"
        show-overflow-tooltip
        align="center"
        :formatter="houseTypeFormat"
      ></el-table-column>
      <el-table-column prop="username" :label="$t('reception.username2')" width="auto" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="phone" :label="$t('reception.phone2')" width="auto" align="center"></el-table-column>
      <el-table-column
        prop="checkin_time"
        :label="$t('reception.check_time')"
        width="180"
        align="center"
        :formatter="dateFormat2"
      ></el-table-column>
      <el-table-column
        prop="checkout_time"
        :label="$t('reception.leave_time')"
        width="180"
        align="center"
        :formatter="dateFormat2"
      ></el-table-column>
      <el-table-column
        prop="total_price"
        :label="$t('reception.total_price')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column prop="pay_status" :label="$t('reception.pay_status')" width="auto" align="center">
          <template slot-scope="scope">
          <el-tag v-if="scope.row.pay_status==0" type="danger">{{$t('reception.no_pay')}}</el-tag>
          <el-tag v-if="scope.row.pay_status==1">{{$t('reception.is_pay')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="day" :label="$t('reception.days')" width="auto" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="source_type" :label="$t('reception.source_type')" width="auto" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.source_type==1">{{$t('reception.common_pel')}}</el-tag>
          <el-tag v-if="scope.row.source_type==2" type="danger">{{$t('reception.vip')}}</el-tag>
          <el-tag v-if="scope.row.source_type==3">{{$t('reception.team_pel')}}</el-tag>
        </template>
      </el-table-column>
     
      <el-table-column
        prop="certificate_type"
        :label="$t('reception.idType')"
        width="auto"
        show-overflow-tooltip
        align="center"
        :formatter="idTypeFormat"
      ></el-table-column>
      <el-table-column
        prop="id_number"
        :label="$t('reception.id')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column prop="isteam" :label="$t('reception.is_team')" width="auto" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isteam==0" type="danger">{{$t('reception.no_team')}}</el-tag>
          <el-tag v-if="scope.row.isteam==1">{{$t('reception.is_team_yes')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="live_type" :label="$t('reception.status2')" width="auto" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.live_type==0" type="danger">{{$t('reception.is_in_hotel')}}</el-tag>
          <el-tag v-if="scope.row.live_type==1">{{$t('reception.no_in_hotel')}}</el-tag>
        </template>
      </el-table-column>
     
      <el-table-column :label="$t('public.operate')" align="center" fixed="right" width="500px">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" plain @click="handleorder(scope.$index, scope.row)">
          {{$t('reception.bill')}}
          </el-button>
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">联房</el-button> -->
          <el-button
            size="mini"
            type="warning"
            plain
            @click="togetherRoom(scope.$index, scope.row)"
            :disabled="scope.row.isteam==1"
          >{{$t('reception.united_room')}}</el-button>
          <el-button size="mini" @click="handleEdit1(scope.$index, scope.row)"
           :disabled="scope.row.pay_status==1"
          >{{$t('reception.change_room')}}</el-button>
          <el-button size="mini" type="primary" @click="handleEdit2(scope.$index, scope.row)"
           :disabled="scope.row.pay_status==1"
          >
            {{$t('reception.add_day')}}
          </el-button>
          <el-button size="mini" @click="printCheckInfo(scope.$index, scope.row)">
             {{$t('reception.view')}}
          </el-button>

          <!-- <el-button size="mini" @click="handleEdit3(scope.$index, scope.row)">入账</el-button> -->
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

    <!-- 结账 -->

    <el-dialog :title="$t('reception.pay')" :visible.sync="dialogBill" class="dia" width="30%">
      <el-form
        :model="billData"
        status-icon
        :rules="rule5"
        ref="billData"
        label-width="110px"
        class="demo-ruleForm mars"
      >
        <!-- <el-form-item :label="$t('reception.amount_due')" prop="pay_money">:{{billData.pay_money}}</el-form-item> -->
        <el-form-item :label="$t('reception.payf')" prop="pay_type">
          <el-radio v-model="billData.pay_type" label="0">{{$t('reception.payf_0')}}</el-radio>
          <el-radio v-model="billData.pay_type" label="1">{{$t('reception.payf_1')}}</el-radio>
          <el-radio v-model="billData.pay_type" label="2">{{$t('reception.payf_2')}}</el-radio>
          <el-radio v-model="billData.pay_type" label="3">{{$t('reception.payf_3')}}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('reception.bank_name')" prop="bank_name" v-if="billData.pay_type==1">
          <el-input v-model.trim="billData.bank_name" @keyup.enter.native="billCommit('billData')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.bank_card')" prop="card_num" v-if="billData.pay_type==1">
          <el-input v-model.trim="billData.card_num" @keyup.enter.native="billCommit('billData')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.card')" prop="member_id" v-if="billData.pay_type==2">
          <el-input v-model.trim="billData.member_id" @keyup.enter.native="billCommit('billData')"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('reception.memberpass')"
          prop="password"
          v-if="billData.pay_type==2"
        >
          <el-input v-model.trim="billData.password" @keyup.enter.native="billCommit('billData')"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('reception.membersort')"
          prop="integral"
          v-if="billData.pay_type==2"
        >
          <el-input v-model.trim="billData.integral" @keyup.enter.native="billCommit('billData')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.united')" prop="cooperator_id " v-if="billData.pay_type==3">
          <!-- <el-input v-model.trim="billData.cooperator_id" ></el-input> -->
          <el-select v-model="billData.cooperator_id" :placeholder="$t('reception.united')" 
          @keyup.enter.native="billCommit('billData')"
          clearable>
            <el-option
              v-for="item in companys"
              :key="item.id"
              :label="item.company_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBill = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="billCommit('billData')">{{$t('public.ok')}}</el-button>
      </div>
    </el-dialog>

    <!-- -------------- -->

    <el-dialog :title="$t('reception.in_hotel')"  :visible.sync="dialogFormVisible" class="dia" width="30%">
      <el-form
        :model="forms"
        status-icon
        :rules="rule"
        ref="forms"
        label-width="80px"
        class="demo-ruleForm mars"
      >
        <el-form-item :label="$t('reception.check_time')" prop="checkin_time" class="floatleft">
          <el-date-picker
            v-model="forms.checkin_time"
            type="date"
            :placeholder="$t('reception.check_time')"
            value-format="timestamp"
            @keyup.enter.native="submitForms('forms')"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('reception.leave_time')" prop="checkout_time" class="floatleft">
          <el-date-picker
            v-model="forms.checkout_time"
            type="date"
            :placeholder="$t('reception.leave_time')"
            value-format="timestamp"
             @keyup.enter.native="submitForms('forms')"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('reception.days')" prop="day" class="floatleft">
          <el-input v-model.trim="forms.day"  @keyup.enter.native="submitForms('forms')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.house_type')" prop="house_type" class="floatleft">
          <el-select
            v-model.trim="forms.house_type"
            :placeholder="$t('reception.house_type')"
            clearable
            @change="queryRoomList"
            @keyup.enter.native="submitForms('forms')"
          >
            <el-option v-for="item in housetype" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.room_number')" prop="room_number" class="floatleft">
          <el-select v-model.trim="forms.room_number" :placeholder="$t('reception.room_number')"
           @keyup.enter.native="submitForms('forms')"
           clearable>
            <el-option v-for="(item,index) in roomList" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.source_type')" prop="source_type" class="floatleft">
          <el-select v-model.trim="forms.source_type" :placeholder="$t('reception.source_type')" 
           @keyup.enter.native="submitForms('forms')"
          clearable>
            <el-option
              v-for="item in memberType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.username2')" prop="username" class="floatleft">
          <el-input v-model.trim="forms.username"  @keyup.enter.native="submitForms('forms')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.phone2')" prop="phone" class="floatleft">
          <el-input v-model.trim="forms.phone"  @keyup.enter.native="submitForms('forms')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.gender')" prop="gender" class="floatleft" >
          <el-radio v-model="forms.gender" label="1" style="width:30px">{{$t('public.man')}}</el-radio>
          <el-radio v-model="forms.gender" label="2" style="width:30px">{{$t('public.woman')}}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('reception.card_type')" prop="card_type" class="floatleft">
          <el-select v-model.trim="forms.card_type " :placeholder="$t('reception.card_type')" 
           @keyup.enter.native="submitForms('forms')"
          clearable>
            <el-option v-for="item in idtype" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.id')" prop="card_num" class="floatleft" style="width:300px">
          <el-input v-model.trim="forms.card_num"  @keyup.enter.native="submitForms('forms')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="submitForms('forms')" v-show="show">{{$t('public.ok')}}</el-button>
        <el-button type="primary" @click="modifyEvent('forms')" v-show="!show">{{$t('public.edit')}}</el-button>
      </div>
    </el-dialog>
     
     <!-- 换房 -->
    <el-dialog :title="$t('public.operate')" :visible.sync="dialogFormVisible1" class="dia" width="30%">
      <el-form
        :model="forms1"
        status-icon
        :rules="rule1"
        ref="forms1"
        label-width="80px"
        class="demo-ruleForm mars"
      >
         <el-form-item :label="$t('reception.status2')" prop="status" v-if="show1==1">
            <el-radio v-model="forms1.status" label="0">{{$t('reception.is_in_hotel')}}</el-radio>
            <el-radio v-model="forms1.status" label="1">{{$t('reception.no_in_hotel')}}</el-radio>
         </el-form-item> 
          <!-- <el-form-item label="房间号" prop="room_number" v-if="show1==2">
           <el-input v-model.trim="forms1.room_number" class="time-left" placeholder="房间号" clearable></el-input>
         </el-form-item>  -->
         
          <el-form-item :label="$t('reception.house_type')" prop="house_type" class="floatleft" v-if="show1==2">
          <el-select
          v-model.trim="forms1.house_type"
            :placeholder="$t('reception.house_type')"
            clearable
            @change="queryRoomList"
          >
            <el-option v-for="item in housetype" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.room_number')" prop="room_number" class="floatleft" v-if="show1==2">
          <el-select v-model.trim="forms1.room_number" placeholder="请输入房间号" clearable>
            <el-option v-for="(item,index) in roomList" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('reception.leave_time')" prop="checkout_time" v-if="show1==3">
          <el-date-picker v-model="forms1.checkout_time" type="date" :placeholder="$t('reception.leave_time')"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('reception.days')" prop="day" v-if="show1==3">
          <el-input v-model.trim="forms1.day" class="time-left" :placeholder="$t('reception.days')" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.total_price')" prop="total_price" v-if="show1==3">
          <el-input disabled v-model.trim="forms1.total_price" class="time-left" :placeholder="$t('reception.total_price')" clearable
         
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">{{$t('public.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="submitForms1('forms1')"
          v-if="show1==1"
        >{{$t('public.ok')}}</el-button>
        <!-- <el-button
          type="primary"
          @click="submitForms1('forms1')"
          v-if="show1==2"
        >{{$t('public.ok')}}</el-button> -->

           <el-button
          type="primary"
          @click="changeRoom('forms1')"
          v-if="show1==2"
        >{{$t('public.ok')}}</el-button>


        <el-button
          type="primary"
          @click="submitForms2('forms1')"
          v-if="show1==3"
        >{{$t('public.ok')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('reception.in_hotel')" :visible.sync="dialogFormVisible2" class="dia" width="30%">
      <el-form
        :model="forms2"
        status-icon
        :rules="rule2"
        ref="forms2"
        label-width="80px"
        class="demo-ruleForm mars"
      >
        <el-form-item :label="$t('reception.cash2')" prop="cash_pledge">
          <el-input v-model.trim="forms2.cash_pledge"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.vip_card')" prop="member_card">
          <el-input v-model.trim="forms2.member_card"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.password2')" prop="password">
          <el-input v-model.trim="forms2.password" type="password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.pay_project')" prop="project_type">
          <!-- <el-input v-model.trim="forms2.project_type" ></el-input> -->
          <el-select v-model.trim="forms2.project_type" :placeholder="$t('reception.pay_project')" clearable>
            <el-option
              v-for="item in projecttype"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

      <el-form-item :label="$t('reception.money_detail')" prop="entry" >
          <!-- <el-input v-model.trim="forms2.project_type" ></el-input> -->
          <el-select v-model.trim="forms2.entry" :placeholder="$t('reception.money_detail')" clearable>
            <el-option
              v-for="item in entry"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="submitForms3('forms2')">{{$t('public.ok')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('public.checkList')" :visible.sync="dialogFormVisible3" class="dia" width="30%">
      <el-form
        :model="forms3"
        status-icon
        :rules="rule3"
        ref="forms3"
        label-width="120px"
        class="demo-ruleForm mars"
      >
        <el-form-item :label="$t('reception.pay_status')" prop="status">
          <el-radio v-model="forms3.status" label="0">{{$t('reception.no_pay')}}</el-radio>
          <el-radio v-model="forms3.status" label="1">{{$t('reception.is_pay')}}</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="submitForms4('forms3')">{{$t('public.ok')}}</el-button>
      </div>
    </el-dialog>

    <!-- 点击挂账要显示的dialog -->
    <el-dialog
      :title="$t('reception.on_account')"
      :visible.sync="dialogFormVisibleCompany"
      class="dia"
      width="30%"
      append-to-body
    >
      <el-form
        :model="formCompany"
        status-icon
        :rules="rule6"
        ref="formCompany"
        label-width="80px"
        class="demo-ruleForm mars"
      >
        <el-form-item :label="$t('reception.united')" prop="coo_id">
          <el-select v-model.trim="formCompany.coo_id" :placeholder="$t('reception.united')" clearable>
            <el-option
              v-for="item in companys"
              :key="item.id"
              :label="item.company_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('reception.on_account_money')" prop="use_money">
          <el-input v-model="formCompany.use_money"></el-input>
        </el-form-item>

        <el-form-item :label="$t('reception.remark')" prop="remark">
          <el-input type="textarea" :rows="5" v-model.trim="formCompany.remark" height="100px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleCompany = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="onAccount('formCompany')" v-show="show">{{$t('public.ok')}}</el-button>
        <el-button
          type="primary"
          @click="modifyEvent('formCompany')"
          v-show="!show"
        >{{$t('public.edit')}}</el-button>
      </div>
    </el-dialog>

    <!-- ---------------- -->

    <!-- 弹出的联房列表 -->
    <el-dialog :title="$t('reception.united_room')" :visible.sync="togetherRoomVisible" append-to-body>
      <el-table :data="togetherInfo" header-align="center" stripe>
        <el-table-column type="index" :label="$t('reception.Id')" width="auto" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column :label="$t('reception.room_number')" prop="room_number"></el-table-column>
        <el-table-column :label="$t('reception.username2')" prop="username"></el-table-column>
        <el-table-column :label="$t('reception.check_time')" prop="checkin_time" :formatter="dateFormat" width="180"></el-table-column>
        <el-table-column :label="$t('reception.house_type')" prop="house_type">
          <template slot-scope="housetype">
            <span v-html="changeHouseType( housetype.row.house_type)"></span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('reception.days')" prop="day"></el-table-column>
        <el-table-column :label="$t('reception.house_price')" prop="total_price"></el-table-column>
        <el-table-column :label="$t('reception.pay_status')" prop="pay_status">
          <template slot-scope="pay">
            <span v-if="pay.row.pay_status == '1'">{{$t('reception.is_pay')}}</span>
            <span v-if="pay.row.pay_status == '0'">{{$t('reception.no_pay')}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.operate')" width="150px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click="togetherPaybill(scope.row)"
              type="primary"
              plain
              size="mini"
              v-if="scope.row.pay_status == '0'"
            >{{$t('reception.settle')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--           -->

    <!-- 选择查看打印的内容 -->
    <el-dialog :title="$t('reception.view')" :visible.sync="printTypedialogForm" class="dia" width="30%">
      <el-form
        :model="printType"
        status-icon
        :rules="rule3"
        ref="printType"
        label-width="80px"
        class="demo-ruleForm mars"
      >
        <el-form-item :label="$t('reception.view_type')" prop="status">
          <el-radio v-model="printType.status" label="0">{{$t('reception.registration_form')}}</el-radio>
          <el-radio v-model="printType.status" label="1">{{$t('reception.deposit_slip')}}</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="printTypedialogForm = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="toPrint('printType',printType.status)">{{$t('public.ok')}}</el-button>
      </div>
    </el-dialog>
    <!-- -->

    <!-- 登记单的信息打印详情对话框 -->

    <el-dialog :title="$t('reception.registration_form')" :visible.sync="checkInfoVisible" class="print" width="800px">
      <div class="float">
        <div>
          {{$t('reception.address2')}}:
          <label for>{{checkInfos.hotel_address}}</label>
        </div>
        <div>
         {{$t('reception.tel')}}:
          <label for>{{checkInfos.hotel_phone}}</label>
        </div>
      </div>
      <hr />

      <div class="float">
        <div>
          {{$t('reception.username2')}}:
          <label for>{{checkInfos.guest_name}}</label>
        </div>
        <div>
            {{$t('reception.tel')}}:
          <label for>{{checkInfos.phone}}</label>
        </div>
      </div>

      <p class="list">
        <span>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{{$t('reception.registration_form')}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;NO:{{checkInfos.order_sn}}
      </p>
      <div class="float">
        <div>
           {{$t('reception.arrived_time')}}:
          <label for>{{checkInfos.into_time |formatDate3}}</label>
        </div>
        <div>
           {{$t('reception.leaved_time')}}:
          <label for>{{checkInfos.out_time | formatDate3}}</label>
        </div>
      </div>

      <hr />

      <div class="float">
        <div>
          {{$t('reception.house_type')}}:
          <label for="male">{{checkInfos.name}}</label>
        </div>
        <div>
          {{$t('reception.room_number')}}:
          <label for>{{checkInfos.room_num}}</label>
        </div>
      </div>
      <div class="float">
        <div>
        {{$t('reception.together')}}:
          <label for>{{checkInfos.toghther_guest }}</label>
        </div>
        <div>
          {{$t('reception.tel')}}:
          <label for>{{accountData.phone}}</label>
        </div>
      </div>

      <div class="float">
        <div>
           {{$t('reception.room_price')}}:
          <label for>{{checkInfos.total_price }}</label>
        </div>
        <div>
           {{$t('reception.payed')}}:
          <label for>{{checkInfos.dep_money }}</label>
        </div>
      </div>
      <hr />
      <p>{{$t('reception.notes')}}:</p>
      <p>{{checkInfos.remark}}</p>
      <br />
      <div>
          {{$t('reception.worker')}}:
        <label for>{{checkInfos.worker_name }}</label>
      </div>
      <div class="sign">
        {{$t('reception.sign')}}:
        <input
          type="text"
          style="border-top:none;border-right:none;border-bottom:1px solid #ccc;border-left:none"
        />
      </div>
      <div style="padding-top:10px;padding-bottom:10px;text-align:right">
        <el-button type="primary" size="mini">
           {{$t('reception.print')}}
        </el-button>
        <el-button type="primary" size="mini">{{$t('public.cancel')}}</el-button>
      </div>
    </el-dialog>

    <!--  -->

    <!--  -->

    <el-dialog :title="$t('reception.pay')" :visible.sync="dialogFormVisible4" class="dia" width="40%">
      <el-table :data="tableData1.filter(item=>item.project!==0)" stripe style="width: 100%" header-align="center">
        <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align="center"></el-table-column>
        
        <el-table-column
        prop="com_time"
        :label="$t('reception.com_time')"
        width="180"
        align="center"
        :formatter="dateFormat"
      ></el-table-column>
        
        <el-table-column
          prop="project"
          :label="$t('reception.pay_project')"
          width="180px"
          show-overflow-tooltip
          align="center"
          :formatter="formatterCloumn"
        ></el-table-column>
        <el-table-column
          prop="house_num"
          :label="$t('reception.room_number')"
          width="auto"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column prop="status" :label="$t('reception.pay_status')" width="auto" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0&&scope.row.project=='7'" type="danger">{{$t('reception.no_pay')}}</el-tag>
            <el-tag v-if="scope.row.status==1&&scope.row.project=='7'">{{$t('reception.is_pay')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_money"
          :label="$t('reception.pay_money')"
          width="auto"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="use_money"
         :label="$t('reception.use_money')"
          width="auto"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column :label="$t('public.operate')" align="center" fixed="right" width="200px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="handleEdit3(scope.$index, scope.row)"
              v-show="!tableData1[0].status&&scope.row.project=='7'"
            >{{$t('reception.cash')}}</el-button>
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              size="mini"
              v-show="!tableData1[0].status&&scope.row.project=='7'"
            >{{$t('reception.on_account')}}</el-button>
            <!-- <el-button size="mini" @click="payBill(scope.$index, scope.row) " v-show="!tableData1[0].status">结账</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div style="padding-top:10px;padding-bottom:10px;text-align:center">
        <!-- <el-button @click="handleClick(tableData1[0])" type="primary" size="mini" v-show="tableData1.length&&!tableData1[0].status" >挂账</el-button> -->
        <el-button
          size="mini"
          type="primary"
          @click="payBill(tableData1[0])"
          v-show="tableData1.length&&!tableData1[0].status"
        >{{$t('reception.settle_accounts')}}</el-button>
        <el-button
          @click="setCurrent(tableData1[0].bill_id)"
          v-show="tableData1.length"
          type="primary"
          size="mini"
        >
          {{$t('reception.print')}}
        </el-button>
      </div>
    </el-dialog>

    <!-- 弹出的账单明细表 -->
    <el-dialog :title="$t('reception.print')" :visible.sync="accountVisible" class="print" width="800px">
      <div class="float">
        <div>
          {{$t('reception.address2')}}:
          <label for>{{accountData.printSetting.address}}</label>
        </div>
        <div>
               {{$t('reception.tel')}}:
          <label for>{{accountData.printSetting.phone}}</label>
        </div>
      </div>

      <p class="list">
        <span>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{{$t('reception.bill_detail')}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;NO:{{accountData.id}}
      </p>
      <div class="float">
        <div>
            {{$t('reception.pay_time')}}:
          <label for>{{accountData.pay_time |formatDate3}}</label>
        </div>
        <div>
         {{$t('reception.order_id')}}:
          <label for>{{accountData.order_sn}}</label>
        </div>
      </div>

      <hr />

      <div class="float">
        <div>
          {{$t('reception.username2')}}:
          <label for>{{accountData.guest_name}}</label>
        </div>
        <div>
          {{$t('reception.room_number')}}:
          <label for>{{accountData.house_num}}</label>
        </div>
      </div>
      <div class="float">
        <div>
          {{$t('reception.arrived_time')}}:
          <label for>{{accountData.into_time | formatDate3}}</label>
        </div>
        <div>
           {{$t('reception.leaved_time')}}:
          <label for>{{accountData.leave_time | formatDate3}}</label>
        </div>
      </div>

      <hr />

      <el-table
        :data="accountData.accountsList"
        stripe
        :summary-method="getSummaries"
        show-summary
        class="table"
      >
        <el-table-column type="index" :label="$t('reception.Id')" width="100" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="com_time" :label="$t('reception.time')" width="180" :formatter="dateFormat"></el-table-column>
        <el-table-column prop="house_num" :label="$t('reception.room_number')" width="100"></el-table-column>
        <el-table-column prop="project" :label="$t('reception.pay_project')" :formatter="formatterCloumn"></el-table-column>

        <el-table-column prop="use_money" :label="$t('reception.use_money')" width="100"></el-table-column>
        <el-table-column prop="pay_money" :label="$t('reception.pay_money')" width="100"></el-table-column>
      </el-table>

      <div class="div-left">{{$t('reception.actual_payment')}}</div>
      <div class="div-right">
        <label for>&yen;{{accountData.total_money}}</label>
      </div>
      <br/>
      <hr />

      <p>{{$t('reception.remark')}}:{{accountData.printSetting.remark}}</p>
      <div>
        {{$t('reception.worker')}}:
        <label for>{{accountData.worker_id }}</label>
      </div>
      <div class="sign">
        {{$t('reception.sign')}}:
        <input
          type="text"
          style="border-top:none;border-right:none;border-bottom:1px solid #ccc;border-left:none"
        />
      </div>
      <div style="padding-top:10px;padding-bottom:10px;text-align:right">
        <el-button type="primary" size="mini">
          {{$t('reception.print')}}
        </el-button>
        <el-button type="primary" size="mini">{{$t('public.cancel')}}</el-button>
      </div>
    </el-dialog>
    <!--      -->

    <!-- 弹出的押金单明细表 -->
    <el-dialog :title="$t('reception.deposit_form')" :visible.sync="cashMoneyVisible" class="print" width="800px">
      <div class="float">
        <div>
           {{$t('reception.address2')}}:
          <label for>{{cashDataPublic.hotel_address}}</label>
        </div>
        <div>
          {{$t('reception.tel')}}:
          <label for>{{cashDataPublic.hotel_phone}}</label>
        </div>
      </div>

      <p class="list">
        <span>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{{$t('reception.deposit_form')}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;NO:{{cashDataPublic.order_sn}}
      </p>
      <hr />

      <div class="float">
        <div>
          {{$t('reception.username2')}}:
          <label for>{{cashDataPublic.guest_name}}</label>
        </div>
        <div>
          {{$t('reception.room_number')}}:
          <label for>{{cashDataPublic.room_num}}</label>
        </div>
      </div>
      <div class="float">
        <div>
         {{$t('reception.arrived_time')}}:
          <label for>{{cashDataPublic.into_time | formatDate3}}</label>
        </div>
        <div>
          {{$t('reception.leaved_time')}}:
          <label for>{{cashDataPublic.out_time | formatDate3}}</label>
        </div>
      </div>

      <hr />

      <el-table :data="cashData" stripe :summary-method="getSummaries" show-summary class="table">
        <el-table-column type="index" :label="$t('reception.Id')" width="100" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="pay_type" :label="$t('reception.cash_type')" width="180" :formatter="formatterCloumn"></el-table-column>

        <el-table-column prop="remark" :label="$t('reception.remark')"></el-table-column>

        <el-table-column prop="dep_money" :label="$t('reception.cash_money')" width="100"></el-table-column>
      </el-table>
      <hr />

      <p>{{$t('reception.remark')}}:{{cashDataPublic.remark}}</p>
      <div>
        {{$t('reception.worker')}}:
        <label for>{{cashDataPublic.worker_name }}</label>
      </div>
      <div class="sign">
        {{$t('reception.sign')}}:
        <input
          type="text"
          style="border-top:none;border-right:none;border-bottom:1px solid #ccc;border-left:none"
        />
      </div>
      <div style="padding-top:10px;padding-bottom:10px;text-align:right">
        <el-button type="primary" size="mini">
         {{$t('reception.print')}}
        </el-button>
        <el-button type="primary" size="mini">{{$t('public.cancel')}}</el-button>
      </div>
    </el-dialog>
    <!--      -->
  </div>
</template>

<script>
import qs from "qs";
import Title from "../../components/cont_title.vue";
import yz from "../../config/validation.js";
import { formatDate } from "@/common/date.js"; // 在组件中引用date.js
export default {
  components: { Title },
  data() {
    return {
        // 初始化时获取当前打开页面的高度
      screenHeight: document.body.clientHeight,
      title: {
        // title:'入住列表',
        title_show: false,
      },
      tableData: [],
      tableData1: [],
      show: true,
      dialogFormVisible: false,
      forms: {
        room_number:"",
        checkout_time:"",
        day: "",
        house_type: "",
        source_type: "",
        username: "",
        phone: "",
        card_type: "",
        gender: "1",
        card_num: "",
      },
      // rule: {
        
      // },
      dialogFormVisible1: false,
      forms1: {
        status:"",
        room_number:"",
        checkout_time: "",
        day: "",
        total_price: "",
      },
      // rule1: {
       
      // },
      dialogFormVisible2: false,
      forms2: {
        re_id: "",
        cash_pledge: "",
        member_card: "",
        password: "",
        project_type: "",
        enty:"",
      },
      // rule2: {
       
      // },
      dialogFormVisible3: false,
      forms3: {},
      // rule3: {
      //   status: [{ required: true, message: this.$t('Validation.check_in.pay_status'), trigger: "blur" }],
      // },
      // rule4: {
       
      // },
      // rule5:{
        
      // },
    

      dialogFormVisible4: false,
      // dialogFormVisible5:
      mytotal: 0,
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      pages: 0,
      pageNums: 0,
      ruleForm: {
        phone: "",
        room_number: "",
        id_number: "",
        certificate_type: "",
      },
      housetype: [],
      housetype2: [],
      idtype: [],
      memberType: [
        {
          value: "1",
          label: this.$t('Validation.check_in.memberType.item_1'),
        },
        {
          value: "2",
          label: this.$t('Validation.check_in.memberType.item_2'),
        },
        {
          value: "3",
          label: this.$t('Validation.check_in.memberType.item_3'),
        },
      ],
      registerinfos: [],
      customers: [],
      show1: 1,
      projecttype: [
        {
          value: "1",
          label: this.$t('Validation.check_in.project_type2.item_1'),
        },
        {
          value: "2",
          label: this.$t('Validation.check_in.project_type2.item_2'),
        },
        {
          value: "3",
          label: this.$t('Validation.check_in.project_type2.item_3'),
        },
        {
          value: "4",
          label: this.$t('Validation.check_in.project_type2.item_4'),
        },
        {
          value: "5",
          label: this.$t('Validation.check_in.project_type2.item_5'),
        },
        {
          value: "6",
          label: this.$t('Validation.check_in.project_type2.item_6'),
        },
        {
          value: "7",
          label: this.$t('Validation.check_in.project_type2.item_7'),
        },
        {
          value: "8",
          label: this.$t('Validation.check_in.project_type2.item_8'),
        },
        {
          value: "9",
          label: this.$t('Validation.check_in.project_type2.item_9'),
        },
        {
          value: "10",
          label: this.$t('Validation.check_in.project_type2.item_10'),
        },
        {
          value: "11",
          label: this.$t('Validation.check_in.project_type2.item_11'),
        },
        {
          value: "12",
          label: this.$t('Validation.check_in.project_type2.item_12'),
        },
        {
          value: "13",
          label: this.$t('Validation.check_in.project_type2.item_13'),
        },
        {
          value: "14",
          label: this.$t('Validation.check_in.project_type2.item_14'),
        },
        {
          value: "15",
          label: this.$t('Validation.check_in.project_type2.item_15'),
        },
        {
          value: "16",
          label: this.$t('Validation.check_in.project_type2.item_16'),
        },
        {
          value: "17",
          label: this.$t('Validation.check_in.project_type2.item_17'),
        },
        {
          value: "18",
          label: this.$t('Validation.check_in.project_type2.item_18'),
        },
        {
          value: "19",
          label: this.$t('Validation.check_in.project_type2.item_19'),
        },
      ],

   entry: [
        {
          value: "1",
          label: this.$t('Validation.check_in.entry_type.item_1'),
        },
        {
          value: "2",
          label: this.$t('Validation.check_in.entry_type.item_2'),
        },
        {
          value: "3",
          label: this.$t('Validation.check_in.entry_type.item_3'),
        },
        {
          value: "4",
          label: this.$t('Validation.check_in.entry_type.item_4'),
        },
        {
          value: "5",
          label: this.$t('Validation.check_in.entry_type.item_5'),
        },
        {
          value: "6",
          label: this.$t('Validation.check_in.entry_type.item_6'),
        },
        {
          value: "7",
          label: this.$t('Validation.check_in.entry_type.item_7'),
        },
        {
          value: "8",
          label: this.$t('Validation.check_in.entry_type.item_8'),
        }
      ],

      order: "",

      //挂账对话框显示字段
      dialogFormVisibleCompany: false,
      formCompany: {
        coo_id: "",
        bill_id: "",
        remark: "",
        use_money: "",
      },

      //要付账的参数
      billData: {
        cooperator_id: "",
        integral: "",
        member_id: "",
        password: "",
        bank_name: "",
        card_num: "",
        remark: "",
        pay_sn: "",
        bank_sn: "",
      },
      dialogBill: false,
      //挂账的协议单位
      companys: [],

      //结账明细单对话框显示
      accountVisible: false,
      //接收结账明细单的数据
      accountData: {
        printSetting: {},
        accountsList: [],
      },

      //  房间的列表
      roomList: [],

      //需要打印的类型
      printType: {},

      //查看类型的对护框显示标志
      printTypedialogForm: false,

      //需要传入的订单id
      registerinfo_id: null,

      //打印登记表信息的对象
      checkInfos: {},

      //入住登记单弹框标志
      checkInfoVisible: false,

      //联房列表
      togetherInfo: [],

      //联房详情对话框
      togetherRoomVisible: false,

      //需要打印押金单详情的对话框
      cashMoneyVisible: false,

      //需要打印的押金单信息的数据
      cashData: [],

      //押金单的公用信息
      cashDataPublic: {},

      //续住需要的数据
      basePrice:null,
      singlePrice:null,

      // 团队里边的结账
      isteam_:null,
      row_leavetime:'',
    };
  },
  filters: {
    formatDate3(time) {
      var date = new Date(time * 1000);
      return formatDate(date, "yyyy年MM月dd日 ");
    },
  },
  watch:{
     'forms1.checkout_time'(val,oldval){
        let a= val;
      if(val!=""){  
      this.forms1.day= parseInt((a- this.row_leavetime*1000+(12*3600*1000))/3600/24/1000);
     
      }
     else{
       this.forms1.day=0;
     }
    },
 
    'forms1.day': function (data) {
      let a= data;
      if(data!=""){
      this.forms1.total_price= a*this.singlePrice;
      this.forms1.checkout_time=this.row_leavetime*1000 + a*24*3600*1000
      }
   
      else{
       this.forms1.total_price=0;
       this.forms1.checkout_time=''
       }
     
    },
    'forms.checkout_time'(val){
       let a= val;
      if(val!=""){
        if(this.forms.checkin_time!=null){
           this.forms.day= (a-this.forms.checkin_time)/3600/24/1000;
        }
        else{
           this.forms.day='';
        }
      }
      else{
       this.forms.day=0;
       }
    },
    // 'forms.checkin_time'(val){
    //    let a= val;
    //   if(val!=""){
    //     if(this.forms.checkout_time!=null){
    //        this.forms.day= (this.forms.checkout_time-a)/3600/24/1000;
    //     }
    //     else{
    //        this.forms.day=0;
    //     }
    //   }
    //   else{
    //    this.forms.day=0;
    //    }
    // },
    'forms.day'(val,oldval){
       let a= val;
      if(val!=""){
        if(this.forms.checkin_time!=''){
           this.forms.checkout_time=a*1000*24*3600+this.forms.checkin_time
        }
        if(val==0){
            this.forms.checkout_time=a*1000*24*3600+this.forms.checkin_time
        }
      }
      else {
        this.forms.checkout_time='';
      }
     
    },
   

  },
  created() {
    this.submitForm();
    this.houseEvent();
    this.idTypeEvent();
  },
  mounted(){
  // 窗口或页面被调整大小时触发事件
  window.onresize = () => {
    // 获取body的高度
    this.screenHeight = document.body.clientHeight
  }
},
  computed: {
    titles() {
     return {title:this.$t('left.chechin')}
    },
    getTableHeight() {
    return this.screenHeight-200
  },
   rule(){
        const rule={
         room_number: [
          { required: true, message: this.$t('Validation.check_in.room_num'), trigger: "blur" },
        ],
        checkin_time: [
          { required: true, message:this.$t('Validation.check_in.check_time'), trigger: "blur" },
        ],
        checkout_time: [
          { required: true, message: this.$t('Validation.check_in.out_time'), trigger: "blur" },
        ],
        day: [{ required: true, message: this.$t('Validation.check_in.days'), trigger: "blur" }],
        house_type: [
          { required: true, message: this.$t('Validation.check_in.house_type'), trigger: "blur" },
        ],
        source_type: [
          { required: true, message: this.$t('Validation.check_in.source_type'), trigger: "blur" },
        ],
        username: [{ required: true, message: this.$t('Validation.check_in.username'), trigger: "blur" }],
        phone: [{ required: true, message: this.$t('Validation.check_in.phone'), trigger: "blur" },
        {validator: yz.validateMobilePhone, trigger: 'blur'}
        ],
        card_type: [
          { required: true, message: this.$t('Validation.check_in.card_type'), trigger: "blur" },
        ],
        gender: [{ required: true, message: this.$t('Validation.check_in.gender'), trigger: "blur" }],
        card_num: [
          { required: true, message: this.$t('Validation.check_in.card_num'), trigger: "blur" },
          {validator: yz.validatenum, trigger: 'blur'},
        ],
        }
        return rule
      },
      rule1(){
        const rule1={
         room_number: [
          { required: true, message: this.$t('Validation.check_in.room_num'), trigger: "blur" },
        ],
        status: [
          { required: true, message: this.$t('Validation.check_in.live_status'), trigger: "blur" },
        ],
        checkout_time: [
          { required: true, message: this.$t('Validation.check_in.out_time'), trigger: "blur" },
        ],
        day: [{ required: true, message: this.$t('Validation.check_in.days'), trigger: "blur" }],
        total_price: [
          { required: true, message: this.$t('Validation.check_in.total_price'), trigger: "blur" },
        ],
        }
        return rule1
      },
       rule2(){
        const rule2={
         bill_id: [{ required: true, message: this.$t('Validation.check_in.bill_id'), trigger: "blur" }],
        cash_pledge: [
          { required: true, message: this.$t('Validation.check_in.cash_pledge'), trigger: "blur" },
        ],
        member_card: [
          // {required: true, message: '请输入会员卡号', trigger: 'blur'}
        ],
        password: [
          // {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        project_type: [
          { required: true, message: this.$t('Validation.check_in.project_type'), trigger: "blur" },
        ],
         entry : [
          { required: true, message: this.$t('Validation.check_in.entry'), trigger: "blur" },
        ],
        }
        return rule2
      },
      rule3(){
        const rule3={
         status: [{ required: true, message: this.$t('Validation.check_in.pay_status'), trigger: "blur" }],
        }
        return rule3
      },
       rule4(){
        const rule4={
         pay_type: [
          { required: true, message: this.$t('Validation.check_in.pay_type'), trigger: "blur" },
        ],
        method_card: [
          { required: true, message: this.$t('Validation.check_in.method_card'), trigger: "blur" },
        ],
        password: [
          { required: true, message: this.$t('Validation.check_in.password'), trigger: "blur" },
        ],
        //  score: [
        //   {required: true, message: '请输入会员使用积分', trigger: 'blur'}
        // ],
        room_number: [
          { required: true, message: this.$t('Validation.check_in.room_num'), trigger: "blur" },
        ],
        }
        return rule4
      },
   rule5(){
        const rule5={
         pay_type: [
          { required: true, message: this.$t('Validation.check_in.pay_type'), trigger: "blur" },
        ],
        bank_name:[{
          required: true, message: this.$t('Validation.check_in.bank_name'), trigger: "blur" 
        }],
        card_num:[{
          required: true, message: this.$t('Validation.check_in.card_num'), trigger: "blur" 
        }],
        member_id: [
          { required: true, message: this.$t('Validation.check_in.method_card'), trigger: "blur" },
        ],
          password: [
          { required: true, message: this.$t('Validation.check_in.password'), trigger: "blur" },
        ],
          integral: [
          {required: true, message: this.$t('Validation.check_in.integral'), trigger: 'blur'}
        ],
         cooperator_id: [
          {required: true, message: this.$t('Validation.check_in.cooperator_id'),  trigger:["blur",'change'] }
        ]
        }
        return rule5
      },
       rule6(){
        const rule6={
        coo_id:[ {required: true, message: this.$t('Validation.check_in.cooperator_id'),  trigger:["blur",'change'] }],
          use_money:[{required: true, message: this.$t('Validation.check_in.use_money'), trigger: 'blur'}],
        }
        return rule6
      },

  },
  methods: {

    //证件类型的转换
    idTypeFormat(row,column){
       for(var i=0,l=this.idtype.length;i<l;i++){
         if(row.certificate_type==this.idtype[i].id){
           return this.idtype[i].name
         }
       }
    },
    //房型的转换
    houseTypeFormat(row,column){
        for(var i=0,l=this.housetype2.length;i<l;i++){
         if(row.house_type==this.housetype2[i].id){
           return this.housetype2[i].name
         }
       }
    },



    //房间号列表查询
    queryRoomList(value) {
      this.forms.room_number='';
      this.forms1.room_number='';
      this.$axios
        .post(this.$baseUrl + `/room/getlist`, {
          house_type: value,
          status: 1,
        })
        .then((res) => {
          if(res.data.result==true){
          var that = this;
          var arr = [];
          var rooms = [];
          arr = res.data.pojo;
          arr.forEach((item) => {
            rooms.push(item.room_number);
          });
          this.roomList = rooms;
          console.log(this.roomList);
          
          }
          else {
            this.roomList=[];
          } 
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //将传过来的账务项目转换成对应的值
    formatterCloumn(row, column) {
      switch (row.project || row.pay_type) {
        case 1:
          return this.$t('Validation.check_in.project_type2.item_1');
          break;
        case 2:
          return this.$t('Validation.check_in.project_type2.item_2');
          break;
        case 3:
          return this.$t('Validation.check_in.project_type2.item_3');
          break;
        case 4:
          return this.$t('Validation.check_in.project_type2.item_4');
          break;
        case 5:
          return this.$t('Validation.check_in.project_type2.item_5');
          break;
        case 6:
          return this.$t('Validation.check_in.project_type2.item_6');
          break;
        case 7:
          return this.$t('Validation.check_in.project_type2.item_7');
          break;
        case 8:
          return this.$t('Validation.check_in.project_type2.item_8');
          break;
        case 9:
          return this.$t('Validation.check_in.project_type2.item_9');
          break;
        case 10:
          return this.$t('Validation.check_in.project_type2.item_10');
          break;
        case 11:
          return this.$t('Validation.check_in.project_type2.item_11');
          break;
        case 12:
          return this.$t('Validation.check_in.project_type2.item_12');
          break;

        case 13:
          return this.$t('Validation.check_in.project_type2.item_13');
          break;

        case 14:
          return this.$t('Validation.check_in.project_type2.item_14');
          break;

        case 15:
          return this.$t('Validation.check_in.project_type2.item_15');
          break;

        case 16:
          return this.$t('Validation.check_in.project_type2.item_16');
          break;

        case 17:
          return this.$t('Validation.check_in.project_type2.item_17');
          break;

        case 18:
          return this.$t('Validation.check_in.project_type2.item_18');
          break;

        case 19:
          return this.$t('Validation.check_in.project_type2.item_19');
          break;
      }
    },

    dateFormat(row, column) {
      var moment = require("moment");
      var date = row[column.property] * 1000;
      return moment(date).format("YYYY-MM-DD ");
    },
     dateFormat2(row, column) {
      var moment = require("moment");
      var date = row[column.property] * 1000;
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    idTypeEvent() {
      this.$axios
        .post(this.$baseUrl + "/idType/list")
        .then((res) => {
          this.idtype = res.data.pojo;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 房型查询
    houseEvent() {
      this.$axios
        .post(this.$baseUrl + "/houseType/getlist")
        .then((res) => {
          var arr=[];
          this.housetype2=res.data.pojo;
          arr = res.data.pojo;
          this.housetype=arr.filter(item=>item.rooms>0)
        })
        .catch((res) => {
          console.log(res);
        });
    },

    list(a, b) {
      var that = this;
      var para = {
        page: a,
        size: b,
        phone: that.ruleForm.phone,
        room_number: that.ruleForm.room_number,
        id_number: that.ruleForm.id_number,
        certificate_type: that.ruleForm.certificate_type,
        room_number: that.ruleForm.room_number,
      };
      that.$axios
        .post(this.$baseUrl + `/registerinfo/getPage`, para)
        .then(function (res) {
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
        })
        .catch(function (error) {
          console.log("逻辑错误");
        });
    },

    submitForm() {
      var that = this;
      that.list(1, this.pagesize);
    },
    handleSizeChangeCont: function (size) {
      this.pagesize = size;
      this.list(this.currentPage, size);
    },
    handleCurrentChangeCont: function (currentPage) {
      this.currentPage = currentPage;
      this.list(currentPage, this.pagesize);
    },
    addEvent() {
      this.houseEvent();
      this.dialogFormVisible = true;
      this.show = true;
    },
    submitForms(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          this.registerinfos = [];
          this.customers = [];
          this.customers.push({
            username: this.forms.username,
            phone: this.forms.phone,
            card_type: this.forms.card_type,
            gender: this.forms.gender,
            card_num: this.forms.card_num,
          });
          this.registerinfos.push({
            room_number: this.forms.room_number,
            checkout_time: (this.forms.checkout_time / 1000)+12*3600,
            day: this.forms.day,
            house_type: this.forms.house_type,
            source_type: this.forms.source_type,
            customers: this.customers,
          });

          that.$axios
            .post(this.$baseUrl + `/registerinfo/insert`, {
              registerinfos: this.registerinfos,
            })
            .then(function (res) {
              if (res.data.result == true) {
                that.submitForm();
                that.$message.success(that.$t("common." + res.data.msg));
                that.dialogFormVisible = false;
                that.forms.room_number = "";
                that.forms.checkin_time = "";
                that.forms.checkout_time = "";
                that.forms.day = "";
                that.forms.house_type = "";
                that.forms.source_type = "";
                that.forms.username = "";
                that.forms.phone = "";
                that.forms.card_type = "";
                that.forms.gender = "";
                that.forms.card_num = "";
                this.houseEvent();
                
              } else {
                that.$message.error(that.$t("common." + res.data.msg));
              }
            })
            .catch(function (error) {
              console.log("逻辑错误");
            });
        }
      });
    },

    submitForms1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          that.$axios
            .post(this.$baseUrl + `/registerinfo/info`, this.forms1)
            .then(function (res) {
              if (res.data.result == true) {
                that.$message.success(that.$t("common." + res.data.msg));
                that.dialogFormVisible1 = false;
                that.forms1.room_number = "";
                that.forms1.id = "";

                that.list(that.currentPage, that.pagesize);
              } else {
                that.$message.error(that.$t("common." + res.data.msg));
              }
            })
            .catch(function (error) {
              console.log("逻辑错误");
            });
        }
      });
    },
     
     //换房
    changeRoom(formName){
       this.$refs[formName].validate((valid) => {
        if (valid) {
            var that = this;
          that.$axios
            .post(this.$baseUrl + `/registerinfo/roomChange`, qs.stringify({
               id:this.forms1.id,
               room_number:this.forms1.room_number
            }))
            .then(function (res) {
              if (res.data.result == true) {
                
                that.$message.success(that.$t("common." + res.data.msg));
                that.dialogFormVisible1 = false;
                that.forms1.room_number = "";
                that.forms1.id = "";
                
                 
                 that.list(that.currentPage, that.pagesize);
                 that.houseEvent();
                //打印账单id
                // console.log(res.pojo.bill_id)
              } else {
                that.$message.error(that.$t("common." + res.data.msg));
              }
            })
            .catch(function (error) {
              console.log("逻辑错误");
            });
        }})
    },
    submitForms2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          this.forms1.checkout_time = this.forms1.checkout_time / 1000;
          that.$axios
            .post(this.$baseUrl + `/registerinfo/continueroom`, {
              id:this.forms1.id,
              checkout_time:this.forms1.checkout_time,
              day:this.forms1.day,
              total_price:this.forms1.total_price
            })
            .then(function (res) {
              if (res.data.result == true) {
                that.$message.success(that.$t("common." + res.data.msg));
                that.dialogFormVisible1 = false;
                that.forms1.checkout_time = "";
                that.forms1.day = "";
                that.forms1.total_price = "";
                that.list(that.currentPage, that.pagesize);
              } else {
                that.$message.error(that.$t("common." + res.data.msg));
              }
            })
            .catch(function (error) {
              console.log("逻辑错误");
            });
        }
      });
    },
    submitForms3(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          that.$axios
            .post(this.$baseUrl + `/registerinfo/cashPledge`, this.forms2)
            .then(function (res) {
              console.log(res);
              if (res.data.result == true) {
                that.$message.success(that.$t("common." + res.data.msg));
                that.dialogFormVisible2 = false;
                that.dialogFormVisible4 = false;
                that.forms2.re_id = "";
                that.forms2.cash_pledge = "";
                that.forms2.member_card = "";
                that.forms2.password = "";
                that.forms2.project_type = "";
                that.forms2.entry  = "";
                that.list(that.currentPage, that.pagesize);
              } else {
                that.$message.error(that.$t("common." + res.data.msg));
              }
            })
            .catch(function (error) {
              console.log("逻辑错误");
            });
        }
      });
    },
    submitForms4(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          that.$axios
            .post(
              this.$baseUrl + `/registerinfo/info`,
              qs.stringify(this.forms3)
            )
            .then((res) => {
              if (res.data.result == true) {
                that.$message.success(that.$t("common." + res.data.msg));
                that.dialogFormVisible3 = false;
                that.forms3.status = "";
                this.tableData1 = res.data.pojo;
                that.dialogFormVisible4 = true;
                that.list(that.currentPage, that.pagesize);
              } else {
                that.$message.error(that.$t("common." + res.data.msg));
              }
            })
            .catch((err) => {
              console.log("逻辑错误");
            });
        }
      });
    },
    handleEdit1(index, row) {
      this.dialogFormVisible1 = true;
      this.forms1.room_number = row.room_number;
      this.forms1.id = row.id;
      this.show1 = 2;
    },
    handleEdit2(index, row) {
      this.forms1.day='';
      this.forms1.checkout_time='';
      this.row_leavetime=Number(row.checkout_time) ;
      console.log(this.row_leavetime)
      this.dialogFormVisible1 = true;
      //  this.forms1.checkout_time = row.checkout_time;
      this.forms1.id = row.id;
      //  console.log(row.id)
      // this.forms1.day = row.day;
      // this. basePrice=row.total_price;
      this.singlePrice=row.total_price/row.day;
      // this.forms1.total_price = row.total_price;
      this.show1 = 3;
    },
    handleEdit3(index, row) {
      this.dialogFormVisible2 = true;
      this.forms2.re_id = row.bill_id;
      //  this.forms2.bill_id = row.id;
    },
    handleorder(index, row) {
      this.forms3.id = row.id;
      this.formCompany.guest_name = row.username;

      //把此条订单id赋值给要发送请求结账的数据对象
      this.billData.registerinfo_id = row.id;

      if(row.isteam==1){
           this.isteam_ =row.isteam;
      }

      this.dialogFormVisible3 = true;
    },
    handleDelete(index, row) {
      this.$confirm(this.$t("public.info"), this.$t("public.hint"), {
        confirmButtonText: this.$t("public.ok"),
        cancelButtonText: this.$t("public.cancel"),
        type: "warning",
      })
        .then(() => {
          var fordata = new FormData();
          fordata.append("id", row.id);
          var that = this;
          this.$axios
            .post(this.$baseUrl + "/houseType/del", fordata)
            .then((res) => {
              if (res.data.result) {
                this.$message({
                  message: this.$t("common." + res.data.msg),
                  showClose: true,
                  type: "success",
                });
                // this.tableData.splice(index,1)
                that.list(that.currentPage, that.pagesize);
              } else {
                this.$message({
                  message: this.$t("common." + res.data.msg),
                  showClose: true,
                  type: "error",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("public.cancel"),
          });
        });
    },

    //获取协议单位数据的方法
    getCompanyData() {
      this.$axios
        .post(this.$baseUrl + `/cooperator/getlist`)
        .then((res) => {
          console.log(res);
          this.companys = res.data.pojo;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //点击挂账，弹出对话框，获取到协议单位的数据
    handleClick(row) {
      this.getCompanyData();
      // this.queryBill_id(row.id)
      this.formCompany.bill_id = row.bill_id;
      console.log(this.formCompany.bill_id);
      this.formCompany.guest_name = row.username;
      this.formCompany.house_num = row.house_num;
      // this.formCompany.bill_id=row.id;
      this.dialogFormVisibleCompany = true;
    },

    //点击弹出的挂账对话框确定按钮，进行挂账操作
    onAccount(accountInfo) {
        this.$refs[accountInfo].validate((valid) => {
        if (valid) {
         console.log(accountInfo);
      var that = this;
      this.$axios
        .post(this.$baseUrl + `/roomact/onAccount`, this.formCompany)
        .then((res) => {
          if(res.data.result==true){
          this.$message.success(that.$t("common." + res.data.msg));
          this.dialogFormVisibleCompany = false;
          }
          else {
            this.$message.error(that.$t("common." + res.data.msg));
          }
          
        })
        .catch((err) => {
          console.log(err);
          console.log("逻辑错误");
        });
        }})
     
    },

    //结账退房的对话框显示内容
    payBill(row) {
      console.log(this.isteam_)
      //把这条数据的账单id 赋给要发送结账请求的数据对象中
      this.billData.bill_id = row.bill_id;
      this.billData.pay_money = row.use_money + row.pay_money;
      this.getCompanyData();
      this.dialogBill = true;
    },

    //结账退房的具体请求操作
    billCommit(billData) {
     
      console.log(this.billData);
     this.$refs[billData].validate((valid)=>{
       if(valid){
      var that = this;
      //判断是联房结账状态还是订单结账状态
      if (!this.billData.bill_id) {
        //发送联房结账的post请求
        console.log(this.billData);
        this.$axios
          .post(this.$baseUrl + `/roomact/BackRoomForLian`, this.billData)
          .then((res) => {
            console.log(res);
            if (res.data.result === true) {
              this.dialogBill = false;
              this.dialogFormVisible4 = false;
              that.$message.success(that.$t("common." + res.data.msg));
              that.list(that.currentPage, that.pagesize);
            } else {
              that.$message.error(that.$t("common." + res.data.msg));
            }
          })
          .catch((err) => {
            console.log(err);
            that.$message.error(that.$t("common." + res.data.msg));
          });
      }
      else if(this.isteam_==1){

       //发送团队退房结账的post请求
        this.$axios
          .post(this.$baseUrl + `/groupact/endBillGroup`, this.billData)
          .then((res) => {
            console.log(res);
            if (res.data.result === true) {
              this.dialogBill = false;
              that.$message.success(that.$t("common." + res.data.msg));
              that.list(that.currentPage, that.pagesize);
            } else {
              that.$message.error(that.$t("common." + res.data.msg));
            }
          })
          .catch((err) => {
            console.log(err);
            that.$message.error(that.$t("common." + res.data.msg));
          });
      }
      
      else {
        //发送结账的post请求
        this.$axios
          .post(this.$baseUrl + `/roomact/endBill`, this.billData)
          .then((res) => {
            console.log(res);
            if (res.data.result === true) {
              this.dialogBill = false;
              that.$message.success(that.$t("common." + res.data.msg));
              that.list(that.currentPage, that.pagesize);
            } else {
              that.$message.error(that.$t("common." + res.data.msg));
            }
          })
          .catch((err) => {
            console.log(err);
            that.$message.error(that.$t("common." + res.data.msg));
          });
      }
       }
     })
     
    },
    //打印结账明细单
    setCurrent(bill_id) {
      //测试打印账单详情
      this.$axios
        .post(this.$baseUrl + `/roomact/printingConBill`, {
          id: bill_id,
        })
        .then((res) => {
          this.accountVisible = true;
          this.accountData = res.data.pojo;
          this.accountData.accountsList = res.data.pojo.accountsList;
          this.accountData.printSetting = res.data.pojo.printSetting;
         
          console.log(this.accountData);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //   打印的订单总价
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = this.$t('reception.sum');
          return;
        }
        //只取这两列的数据进行汇总
        if (
          column.property == "use_money" ||
          column.property == "pay_money" ||
          column.property == "dep_money"
        ) {
          const values = data.map((item) => Number(item[column.property]));
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index];
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    //打印单子（入住登记单，押金单）
    toPrint(formName, status) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //如果选择的是登记表，发送登记表的post请求
          if (status == "0") {
            console.log("0");

            this.$axios
              .post(this.$baseUrl + `/roomact/printingConInto`, {
                id: 4,
                registerinfo_id: this.registerinfo_id,
              })
              .then((res) => {
                console.log(res);
                this.checkInfoVisible = true;
                this.checkInfos = res.data.pojo;

                this.checkInfos.name = this.changeHouseType(
                  this.checkInfos.room_type
                );
                console.log(this.checkInfos.name);
              })
              .catch((err) => {
                console.log(err);
              });

            this.printTypedialogForm = false;
          }
          //如果选择的是押金单，发送押金单的post请求
          if (status == "1") {
            console.log("1");
            // this.printTypedialogForm=false;
            
            this.$axios
              .post(this.$baseUrl + `/roomact/printingConDeposit`, {
                registerinfo_id: this.registerinfo_id,
              })
              .then((res) => {
                if (res.data.pojo.length!=0) {
                  this.cashData = res.data.pojo;
                  console.log(this.cashData);
                  this.cashDataPublic = res.data.pojo[0];
                   this.cashMoneyVisible = true;
                } else {
                  that.$message.error("对不起，您还没有交过押金");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      });
    },

    //房型的类型转换
    changeHouseType(typeId) {
      var arr = "";
      this.housetype.forEach((item) => {
        console.log(item.id);
        if (item.id == typeId) {
          arr = item.name;
        }
      });
      return arr;
    },

    //查看按钮的操作
    printCheckInfo(index, row) {
      this.printTypedialogForm = true;
      this.registerinfo_id = row.id;
      console.log(this.registerinfo_id);
    },
    //联房2
    togetherRoom(index, row) {
      console.log(row.id);
      var that=this;
      this.$axios
        .post(
          this.$baseUrl + `/registerinfo/relist`,
          qs.stringify({
            id: row.id,
            status: "",
          })
        )
        .then((res) => {
          this.togetherInfo = res.data.pojo;
          this.togetherRoomVisible = true;
          console.log(this.togetherInfo);
          that.list(that.currentPage, that.pagesize);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //联房结账
    togetherPaybill(row) {
      console.log(row.id);
      this.getCompanyData();
      this.dialogBill = true;
      this.billData.registerinfo_id = row.id;
      this.billData.pay_money = row.total_price;
    },
  },
};
</script>

<style scoped="scoped">
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
.floatleft .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.print .float {
  padding-bottom: 20px;
}
.print .float div {
  float: left;
  width: 50%;
}

hr {
  border-top: none;
  border-left: none;
  border-bottom: none;
  height: 1px;
  margin: 10px 0;
  background-color: #e4e4e4;
}
.list {
  text-align: center;
  font-size: 10px;
  color: #cac8c8;
  padding: 20px 0;
}
.list span {
  font-size: 20px;
  font-weight: 600;
  color: dimgray;
}
.div-left {
  float: left;
}
.div-right {
  float: right;
  margin-right: 65px;
}

.btn-right {
}
.clearfix {
  content: "";
  height: 0;
  display: block;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}
</style>
