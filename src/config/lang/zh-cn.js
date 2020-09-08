module.exports = {
  common: {
    1100001:"未登录",
    1100002:"缺少参数",
    1100003:"操作成功",
    1100004:"操作失败",
    1100005:"查询成功",
//  2、Server1
    1000001:"员工编号重复不可用",
    1000002:"部门不存在",
    1000003:"角色不存在",
    1000004:"找不到员工信息",
    1000005:"密码错误",
    1000006:"退出成功",
    1000007:"非法登录",
    1000008:"登录类型异常",
    1000009:"用户不存在",
    1000010:"用户已停用",
    1000011:"权限不足",
    1000012:"该部门已存在",
    1000013:"没找到部门信息",
    1000014:"角色已存在",
    1000015:"没找到角色信息",
    1000016:"员工编号错误",
    1000017:"文件格式错误",
    1000018:"解析文件错误",
    1000019:"上传成功",
    1000020:"没找到文件",
    1000021:"用户已登录",
    1000022:"权限规则已存在",
    1000023:"没找到父级权限",
    1000024:"没找到权限信息",
    1000025:"文件已存在",
    1000026:"上传失败",
    1000027:"会员名称重复不可用",
    1000028:"没找到会员类型",
    1000029:"金额不能小于0",
    1000030:"赠送金额不能小于0",
    1000031:"密码错误",
    1000032:"登录失败",
    1000033:"登录方式错误",
    1000034:"没有会员信息",
    1000035:"没找到账单信息",
    1000036:"证件类型不可用",
    1000037:"没找到证件类型",
    1000038:"获取设置信息失败",
    1000039:"该卡号已被占用",
    1000040:"消费范围输入有误",
    1000041:"没找到单据设置信息",
    1000042:"积分余额不足",
    1000043:"会员设置获取失败",
    1000044:"超出积分限额",
    1000045:"会员类型获取失败",
    1000046:"卡内余额不足",
    
    //  3、Server2
    2000001:"查无此记录",
    2000002:"房间已存在",
    2000003:"房型不存在",
    2000004:"房型已存在",
    2000005:"房间不存在",
    2000006:"开始时间大于结束时间",
    2000007:"房型不能为空",
    2000008:"时间冲突",
    2000009:"房间信息错误",
    2000010:"已交押金，不可取消",
    2000011:"当前时间已过退房时间",
    2000012:"预订单不存在",
    2000013:"入住订单不存在",
    2000014:"账单不存在",
    2000015:"房间状态不可用",
    2000016:"与预订单冲突",
    2000017:"不能大于会员卡内余额",
    2000018:"已超过保留时间",
    2000019:"已交过订金",
    2000020:"当前时间段换房不影响房价",
    2000021:"当前房间有客人,不可改变状态",


    //  4、Server3
    3000001:"餐桌已存在",
    3000002:"餐桌不存在",
    3000003:"菜品分类已存在",
    3000004:"菜品分类不存在",
    3000005:"菜品分类名称已存在",
    3000006:"同一分类下菜品名称已存在",
    3000007:"菜品编号已存在",
    3000008:"菜品不存在",
    3000009:"菜品已存在",
    3000010:"餐厅名称已存在",
    3000011:"餐厅编号已存在",
    3000012:"餐厅不存在",
    3000013:"餐厅名称已存在",
    3000014:"已经预定过了",
    3000015:"餐厅预订记录不存在",
    3000016:"完成状态下不可取消",
    3000017:"取消状态下不可完成",
    3000018:"餐厅订单不存在",
    3000019: "餐厅订单菜品不存在",
    3000020:"退菜数量大于订菜数量",
    3000021:"就餐支付状态异常",
    3000022:"菜品已售罄",
    3000023:"餐厅订单已支付",
    3000024:"未排房",
    3000025:"已经取消，不可重复操作",
    3000026:"餐厅订单已支付状态下不可以修改订单",
    3000027:"餐桌有客",
//  5、Server4
    4000001:"无记录",
    4000002:"添加重复",
    4000003:"出入库数量不能为空或小于等于0",
    4000004:"出库量不能大于原库存量",
    4000005:"找不到这条记录",
    4000006:"缺少信息：出入库申请子表id不能为空",
    4000007:"审核成功",
    4000008:"审核失败",
    4000009:"驳回成功",
    4000010:"驳回失败",
    4000011:"货物不存在",
    4000012:"订单不存在",
    4000013:"该房型不存在",
    4000014:"此单位价格策略房型不存在",
    4000015:"添加重复",
    4000016:"货物分类不存在",
    4000017:"仓库不存在",
    4000018:"协议单位不存在",
    4000019:"协议单位账务表不存在",
    4000020:"金额超了",
    4000021:"客人电话不存在",
    4000022:"会员等级不存在",
    4000023:"抵扣积分不能大于300",
    4000024:"积分不足",
    4000025:"会员已注销",
    4000026:"会员已删除",
    4000027:"会员已挂失",
    4000028:"打印单单据设置表不存在",
    4000029:"会员不存在",
    4000030:"入住信息不存在", 
    4000031:"账单的父级id为空",  
    4000032:"该团队还有成员未退房，无法退团",
    4000033:"团队入住信息不存在",
    4000034:"团队退房时只能选择现金或银行卡退款" 
  },
  verification: {
    infoall:"请填写完整信息",
    name:"请输入用户名",
    num:"请输入员工编号",
    password:"请输入密码",
    land:"登录",
  },
  // 左侧导航
  left:{
    warehouse:"仓库管理",
     cargoclass:"货物分类管理",
     cargo:"货物管理",
     entryapply:"出入库管理",
     cooperator:"协议单位管理",
     tactic:"价格策略管理",
     Menu_management:"入住管理",
     chechin:"普通入住管理",
     teamCheckin:"团队入住管理",
     restReserve:"预订管理",
     order:"订单管理",
     setting:"后台管理",
     department:"员工与部门管理",
     department_1:"部门",
     userlist:"员工",
     role:"角色权限管理",
     role_1:"角色",
     permissions:"权限",
     member:"会员管理",
     restautant:"餐厅管理",
     tables:"餐桌管理",
     dishes:"菜品分类管理",
     menu:"菜品管理",
     house:"房屋管理",
     house_1:"房型管理",
     room:"房间管理",
     idType:"后台设置",
     idType_1:"证件类型",
     memsetting:"会员设置",
     printsetting:"打印设置",
     enteracc:"财务管理",
     enteracc_1:"入账记录",
     statistics:"流水账记录",
     record:"操作记录管理",
     customer:"客户管理", 
     members:"会员信息",
     integral:"积分查询", 
     stored:"储值账单", 
     operation:"操作日志", 
     guest:"客人列表", 
     Booking:"预定列表"
  },
  // 公共文字
  public:{
    checkList:"入住列表",
    room_info:'房间信息',
    add:"新增",
    addTeamPlayer:'添加团队住户',
    alldelete:"批量删除",
    remark:"备注",
    inquire:"查询",
    edit:"修改",
    delete:"删除",
    yes:'是',
    no:'否',
    cancel:"取 消",
    ok:"确 定",
    hint:"提示",
    operate:"操作",
    info:"此操作将永久删除, 是否继续?",
    info2:"确定要退出么, 是否继续?",
    alldelete_info:"此操作将批量删除, 是否继续?",
    editstatus:"此操作修改状态, 是否继续?",
    dlecancel:"此操作将永久取消, 是否继续?",
    restpass:"此操作将重置密码, 是否继续?",
    dis_warn:'请先交定金再入住!',
    please:"请输入",
    please_select:"请选择",
    status:"状态",
    username:"用户名",
    phone:"电话",
    gender:"性别",
    man:"男",
    woman:"女",
    email:"邮箱"
  },
  //后台
  backstage:{
    dept_name:"部门名称",
    serial_number:"员工编号",
    entry_time:"入职时间",
    birthday:"生日",
    status_1:"正常",
    status_2:"禁用",
    resetting:"重置密码",
    addname:"后台会员新增",
    altername:'后天会员修改',
    addplayer:'后台员工新增',
    role_id:"角色",
    tijiao:"立即创建",
    alter:'立即修改',
    role_name:"角色名称",
    auth:"授权",
    etc_1:"启用",
    arrow_down:"展开所有",
    name:"权限名称",
    permissions:"权限规则",
    delete_1:"未删除",
    delete_0:"已删除",
    grant_1:"已授权",
    grant_0:"未授权",
    power:"权限",
    pid:"父级权限",
    name_level:"会员等级名称",
    recharge:"单次充值",
    consume_mix:"最少消费",
    consume_max:"消费上限",
    discount:"折扣",
    wid_name:"会员名称",
    table_list:"餐桌列表",
    restaurant:"餐厅名称",
    serials_number:"餐厅编号",
    business_0:"未营业",
    business_1:"营业",
    table_number:"餐桌数量",
    table_name:"餐桌",
    serialss_number:"餐桌编号",
    idle_0:"空闲",
    idle_2:"预定",
    idle_1:"有客",
    capacity:"容纳人数",
    restaurant_id:"餐厅",
    dishes:"菜品名称",
    dishes_d:"菜品分类名称",
    serialsss_number:"菜品编号",
    on_sale_1:"在售",
    on_sale_2:"售罄",
    dishes_id:"菜品分类",
    price:"菜品价格",
    food_dishes:"菜品",
    house_name:"房型名称",
    prices:"房型价格",
    room_number:"房间编号",
    house_type:"房型",
    comp:"电脑状态",
    aircondition:"空调状态",
    peoples:"可住人数",
    beds:"床位数",
    floor:"楼层",
    tv1:"电视状态",
    tel:"座机号码",
    toli1:"热水器",
    cash_pledge:"入住押金",
    idType_name:"证件类型名称",
    idType:"证件类型",
    least:"最少充值",
    increase:"递增",
    score:"积分抵现规则",
    money:"抵现规则",
    max_score:"积分抵现限额",
    top_money:"充值赠送规则",
    give_money:"赠送金额",
    setup:"设置",
    document_name:"单据名称",
    address:"地址",
    item:"账务明细",
    startTime:"选择起始时间",
    endTime:"选择结束时间",
    moneys:"金额",
    create_time:"发生时间",
    staffName:"操作员工",
    phase:"请选择账期名称",
    payment_time:"收支时间",
    profit:"利润",
    cash_deposit:"现金押金",
    cash_receipts:"现金收款",
    cash_payment:"现金订金",
    cash_refund:"现金退款",
    card_deposit:"银行卡押金",
    cash_receiptss:"银行卡收款",
    card_payment:"银行卡订金",
    card_refund:"银行卡退款",
    in:"请输入账期查询",
    action:"操作名称",
    time:"操作时间",
    grant:'授权',
    vip_push:'会员充值',
    vip_del:'会员删除',
    setBill:'退房结账',
  },
  //前台
  reception:{
     name:"酒店管理系统",
     unfold:"收起展开",
     warehouse_list:"仓库列表",
     warehouse_name:'仓库名称',
     full:"全屏",
     password:"修改密码",
     log_off:"退出登录",
     log_out:'退出登录',
     old_password:"原密码",
     im_old_password:"输入原密码",
     new_password:"新密码",
     im_new_password:"输入新密码",
     warehouse_num:"仓库编号",
     tabulation:"货物分类列表",
     goods:"货物分类",
     goods_name:"请输入分类名称",
     cargo_id:"货物编号",
     cargo_name:"货物名称",
     warehouse_id:"仓库",
     classify_id:"分类",
     num:"数量",
     goods_1:"货物",
     goods_list:"货物列表",
     apply_time:"申请时间",
     audit_time:"审批时间",
     type:"出入库类型",
     laid_up:"入库",
     of_cargo:"出库",
     status:"审核状态",
     not:"未审核",
     audit:"审核通过",
     audit_not:"审核未通过",
     finish_1:"已执行",
     finish_0:"未执行",
     multipleSelection:"请选择申请货物列表",
     company_name:"单位名称",
     contacts:"联系人",
     phone:"电话",
     contract_number:"合同号",
     ptype_id:"价格策略",
     content:"协议内容",
     paccount_price:"挂账额度",
     start_time:"生效日期",
     end_time:"失效日期",
     breakfast_num:"早餐券数",
     delete_status:"删除状态",
     delete_status_1:"未删除",
     delete_status_0:"已删除",
     is_invalid:"是否失效",
     is_invalid_0:"已失效",
     is_invalid_1:"正常",
     email:"邮箱",
     address:"地址",
     dia:"协议单位",
     time:"协议时间",
     room_list:"房型列表",
     tactic_name:"规则名称",
     start_etc:"启用",
     start_etd:"禁用",
     names:"房型",
     prices:"门市价",
     set_type:"调价方式",
     set_act:"调价金额",
     username:"用户名",
     id_card:"证件号",
     _id:"餐厅",
     table_id:"餐桌",
     reserve_status:"预订状态",
     cash_status:"押金状态",
     card_type:"证件类型",
     people_num:"就餐人数",
     eat_time:"就餐时间",
     cash_pledge:"押金",
     reserve_status_1:"预订中",
     reserve_status_2:"预订完成",
     cash_status_0:"无",
     cash_status_1:"已交",
     cash_status_2:"已退",
     table_num:"餐桌编号",
     create_time:"起始时间",
     ends_time:"结束时间",
     room_number:"房间号",
     trade:"换餐桌",
     settle:"结账",
     menu_name:"菜品",
     multiplelist:"请选择列表",
     phone2:'手机号',
      id:'证件号',
      idType:"证件类型",
      
      common_pel:'散客',
      team_pel:'单位',
      vip:'会员',
    check_time:'入住时间',
     leave_time:'预离时间',
      total_price:"总价",
      pay_status:'支付状态',
     days:"天数",
     source_type:'客源类型',
     together:'同来宾客',
     is_team:'是否团队',
     status2:'居住状态',
     house_type:'房型',
     username2:'姓名',
     bill:'账单',
     united_room:'联房',
     change_room:'换房',
     add_day:'续住',
     view:'查看',
      is_pay:'已支付',
     no_pay:'未支付',
     house_price:'价格',
     is_in_hotel:'在住',
      no_in_hotel:'离店',
      
      no_leave:'未入住',
      leave_in:'在住',
      leave_out:'离店',
       

      is_team_yes:'是',
      no_team:'否',
        pay_project:'财务项目',
       pay_money:"付款金额",
        use_money:'消费金额',
         print:'打印',
        cash:'交押金',
        cash2:'押金',
         vip_card:'会员卡号',
         password2:'密码',
         united:'协议单位',
         on_account_money:'挂账金额',
         remark:'备注',
         pay_type:'支付方式',
        cash3:'现金',
        bank_card_:'银行卡',
        vip_card_:'会员卡',

        bank_name:'卡名',
        bank_card:'卡号',
        on_account:'挂账',
        amount_due:'应付金额',
        bill_detail:'结账明细单',
        address2:'地址',
        tel:'电话',
        pay_time:'结账时间',
        com_time:'消费时间',
        order_id:'订单号',
        arrived_time:'到店时间',
        leaved_time:'离店时间',
        Id:'序号',
        time2:'时间',
        sum:'合计',
        actual_payment:'实际付款', 
        worker:'收银员',
        sign:'客户签名',
        settle_accounts:'结账',
         view_type:'查看类型',
        registration_form:'入住登记单',
        deposit_slip:'押金条',
        room_price:'房价',
        payed:'预交押金',
        notes:'宾客须知',
        deposit_form:'押金单明细表',
        cash_type:'押金类型',
        cash_money:'押金金额',
         
        // //团队入住管理
          team_name:'团队名称',
         togethers:'同来宾客',
         add_member:'添加成员',
         order:'订单',
         exit_team:'退团',
         team_order_list:'团队订单列表',
        // integral:'会员使用积分',
        back_team_list:'返回团队列表',

        order_details:'订单详情',
        dished_ordered:'所点菜品',
        on_time:'挂账时间',
        on_room:'挂账房间',
        // has_payed:'是否支付',

        //预定列表
        reserve_info:'预定信息',
        reserve_time:'保留时间',
        book_money:'交定金',
        staff_name:'操作人',
        expect_check_time:'预计入住时间',
        expect_out_time:'预计离店时间',
        in_hotel:'入住',
        revoke:'撤销',
        public_pays:'公费项目',
        add_room:'添加房间',
        remove_room:'移除房间',
        add_player:'添加人数',
        remove_player:'删除人数',
        money_detail:'财务明细',

        //客户管理
        // 1.会员信息
        vip_type:'会员类型',
        add_time:'添加时间',
        card_status:'卡状态',
        vip_status:'账号状态',
        ji_fen:'积分',
        balance:'余额',
        amount:'总消费',
        amount_num:'消费次数',
        vip_details:'详情',
        logout:'注销',
        // 2.积分查询
        kai_time:'开始日期',
        jie_time:'结束日期',
        vip_name:'会员名',
        increase:'增加',
        minus:'扣除',
        new_card:'新卡号',
        old_card:'旧卡号',
        log_type:'日志类型',
        change_card:'换卡',
        gua_shi_card:'补卡挂失',
        add_card_:'换卡补卡',
        gua_shi:'挂失',
        alter_pas:'修改密码',
        fei_yong:"费用",
        consume_num:'消费次数',
        total_consume:'总消费',
        cus_history:'客史',
        re_pass:'再次输入密码',
        push_money:'充值金额',
        discount_info:'该会员所享折扣',
        fang_shi:'方式',
        use_a_card:'刷卡',
        common_alter:'正常修改',
        forget_pass:'忘记密码',
        reason:'原因',
        charge:'充值',
        user_type:'用户类型',


    //  ljf strat
    pay:"支付",
    payf:"支付方式",
    payf_0:"现金结账",
    payf_1:"银行卡结账",
    payf_2:"会员卡结账",
    payf_3:"挂账",
    card:"会员卡号",
    memberpass:"支付密码",
    membersort:"会员使用积分",
    look:"查看",
    desk:"换餐桌",
    cai:"修改菜",
    dishnum:"菜品数量",
    empty:"置空/维修",
    forward:"远期房态"
  },
  Validation:{
    depart_name:'请输入部门名称',
    dish_name:'请输入菜品分类名称',
    item_type:{
      item_1:'现金押金',
      item_2:'现金收款',
      item_3:'现金定金',
      item_4:'现金退款',
      item_5:'银行卡押金',
      item_6:'银行卡收款',
      item_7:'银行卡定金',
      item_8:'银行卡退款',
    },
    house_name:'请输入房型名称',
    house_price:'请输入房型价格',
    card_type:'请输入证件类型名称',
    vip_name:'请输入会员等级名称',
    discount:'请输入所享折扣',
    pay_limited:'请输入消费上限',
    charge:'请输入单次充值',
    least_use:'请输入最少消费',
    least_charge:'请输入最少充值',
    increase:'请输入递增',
    integral_rule:'请输入积分抵现规则',
    rule:'请输入抵现规则',
    integral_limited:'请输入积分抵现限额',
    gift:'请输入充值赠送规则(满赠)',
    charge_gift:'请输入充值赠送金额',
    dish_num:'请输入菜品编号',
    dish_status:'请输入菜品状态',
    dish_price:'请输入菜品价格',
    dish_sort:'请输入菜品分类',
    status:'请输入状态',
    permission_name:'请输入权限名称',
    permission_rule:'请输入权限规则',
    permission_father:'请输入父级权限',
    bill_name:'请输入单据名称',
    bill_remark:'请输入单据备注',
    bill_phone:'请输入电话',
    bill_add:'请输入地址',
    res_num:'请输入餐厅编号',
    res_count:'请输入餐桌数量',
    res_name:'请输入餐厅名称',
    res_status:'请输入餐厅营业状态',
    role_name:'请输入角色名称',
    role_status:'请输入角色状态',
    room:{
      sta:{
        item_1:'有',
        item_2:'无',
        item_3:'保修',
        item_4:'空闲',
        item_5:'预订',
        item_6:'有客',
        item_7:'打扫',
        item_8:'维修',
      },
      com_status:'请输入电脑状态',
      room_num:'请输入房间编号',
      lives_people:'请输入可住人数',
      bads:'请输入床位数',
      floors:'请输入楼层',
      tv_status:'请输入电视状态',
      tel:'请输入座机号码',
      hot_wat:'请输入热水器',
      house_type:'请输入房型',
      air_status:'请输入空调状态',
      room_status:'请输入状态',
      room_cas:'请输入入住押金',
      room_price:'请输入价格'
    },
    record:'请输入账期',
    table:{
      table_num:'请输入编号',
      table_people:'请输入容纳人数',
      res:'请输入餐厅',
      table_st:'请输入餐桌状态',
    },
    user_list:{
      username:'请输入用户姓名',
      staff_num:'请输入员工编号',
      entry_time:'请输入入职时间',
      gender:'请输入性别',
      phone:'请输入电话',
      depart:'请输入部门',
      birthday:'请输入生日',
      user_status:'请输入状态',
      roles:'请输入角色',
    },
    error_page:{
      auth:{
        oops: "抱歉!",
        headline: "您没有操作权限...",
        info: "当前帐号没有操作权限,请联系管理员。",
        btn: "返回",
      },
      error:{
        oops: "抱歉!",
        headline: "当前页面不存在...",
        info: "请检查您输入的网址是否正确，或点击下面的按钮返回首页。",
        btn: "返回首页",
      }
    },
    check_in:{
      team_name:'请输入团队名称',
      room_num:'请输入房间号',
      check_time:'请输入入住时间',
      out_time:'请输入预计退房时间',
      days:'请输入天数',
      house_type:'请输入房型',
      source_type:'请输入客源类型',
      username:'请输入姓名',
      phone:'请输入手机号',
      card_type:'请输入证件类型',
      gender:'请输入性别',
      card_num:'请输入证件号',
      live_status:'请输入入住状态',
      total_price:'请输入合计总价',

      bill_id:'账单id',
      cash_pledge:'请输入押金',
      project_type:'请输入账务项目',
      entry:'请输入财务明细',
      pay_status:'请输入状态',
      pay_type:'请输入支付方式',
      method_card:'请输入会员卡号',
      password:'请输入会员支付密码',
      bank_name:'请输入银行卡名称',
      card_num2:'请输入卡号',
      integral:'请输入会员使用积分',
      cooperator_id:'请输入协议单位',
      use_money:'请输入挂账金额',
      memberType:{
        item_1:'散客',
        item_2:'会员',
        item_3:'单位'
      },
      project_type2:{
       item_1:'现金定金',
       item_2:'银行卡订金',
       item_3:'会员卡订金',
       item_4:'现金订金转押金',
       item_5:'银行卡订金转押金',
       item_6:'会员卡订金转押金',
       item_7:'入住收全天房费',
       item_8:'餐厅就餐挂账',
       item_9:'现金押金',
       item_10:'银行卡押金',
       item_11:'现金收款',
       item_12:'银行卡收款',
       item_13:'会员卡收款',
       item_14:'挂账收款',
       item_15:'会员卡押金',
       item_16:'主账代付',
       item_17:'现金退款',
       item_18:'银行卡退款',
       item_19:'替房间付',
      },
      entry_type:{
        item_1:'现金押金',
        item_2:'现金收款',
        item_3:'现金定金',
        item_4:'现金退款',
        item_5:'银行卡押金',
        item_6:'银行卡收款',
        item_7:'银行卡定金',
        item_8:'银行卡退款',
      }

    },
    cooperator:{
      unit_name:'请输入单位名称',
      contacts:'请输入联系人',
      phone:'请输入电话',
      content:'请输入协议内容',
      p_type_id:'请输入价格策略',
      account_price:'请输入挂账额度',
      start_time:'请输入生效时间',
      end_time:'请输入失效时间',
      breakfast_num:'请输入早餐劵数',
      contract_number:'请输入合同号',
      email:'请输入邮箱',
      address:'请输入地址',
      time:'请输入协议时间',
    },
    entry_apply:{
      type:'请输入出库类型',
    },
    guest_list:{
      common:'普通用户'
    },
    member_alter:{
      username:'请输入会员名',
      phone:'请输入手机号',
      gender:'请输入性别',
      birthday:'请选择生日',
      type:'请选择换卡方式',
      member_card:'请输入新卡号',
      old_card:'请输入旧卡号',
      price:'请选择支付方式',
      remark:'请输入描述',
      status:'请选择修改密码原因',
      new_pass:'请输入新密码',
      old_pass:'请输入旧密码',
      money:'请输入金额',
      pay_status:'请选择方式',
      member_card2:'请输入会员卡号',
      card_com:'正常',
      card_log:'注销',
    },
    member_form:{
      level:'请选择卡号类型',
      member_card:'请输入卡号',
      member_card2:'卡号必须是数字',
      id_type:'请选择证件类型',
      id_card:'请输入证件号',
      username:'请输入会员名',
      phone:'请输入手机号',
      password:'请再次输入密码',
      gender:'请选择性别',
      money:'请输入充值金额',
      birthday:'请选择生日',
      pay_sta:'请选择支付方式',
      pass:'请输入密码'
    },
    order:{
      table_num:'请输入餐桌编号',
      restaurant_id:'请输入餐厅',
      pay_method:'请输入支付方式',
      card:'请输入会员卡号',
      password:'请输入支付密码',
      room_num:'请输入房间号'
    },
    reservation:{
      source_type:{
        item_1:'散客',
        item_2:'会员',
        item_3:'单位',
      },
      public_pays:{
        item_1:'无',
        item_2:'房费',
        item_3:'房费+消费',
      },
      rule:{
        username:'姓名',
        phone:'请输入手机号',
        days:'天数',
        res_time:'请输入保留时间',
        in_time:'请输入入住时间',
        out_time:'请输入退房时间',
        type:'选择客源类型',
        is_team:'是否团队',
        gender:'请输入性别',
        card_type:'请输入证件类型',
        card_num:'请输入证件号',
        deposit:'请输入定金金额',
        pay_ty:'请输入付款方式',
        pro_ty:'请输入财务项目',
        entry:'请选择账目明细',
        cash_pledge:'请输入押金金额'
      },
      method_list:{
        item_1:'现金',
        item_2:'刷卡',
        item_3:'会员'
      },
    },
    rest_reserve:{
      cash_status_type:{
        item_1:'无',
        item_2:'已交',
        item_3:'已退'
      },
      reserve_type:{
        item_1:'取消',
        item_2:'预定中',
        item_3:'预订完成'
      },
      rule:{
        username:'请输入用户名',
        phone:'请输入手机号',
        card_type:'请输入证件类型',
        id:'请输入证件号',
        res:'请输入餐厅',
        table:'请输入餐桌',
        people_num:'请输入就餐人数',
        eat_time:'请输入就餐时间',
        cash:'请输入押金',
      }
    },
    store_bill:{
      item_1:'会员充值',
      item_2:'充值赠送',
      item_3:'撤销充值',
      item_4:'撤销充值赠送',
    },
    tactic:{
      tactic_name:'请输入规则名称',
      setType:{
        item_1:'上浮',
        item_2:'下浮',
        item_3:'折扣率',
        item_4:'一口价',
      }
    },
    team_check_list:{
      together_name:'请输入同伴姓名',
      phone:'请输入您的手机号',
      together_phone:'请输入同伴手机号',
      card_type:'请输入您的证件类型',
      together_card:'请输入跟随同伴证件类型',
      gender:'请输入您的性别',
      together_gender:'请输入跟随同伴性别',
      id:'请输入您的证件号',
      together_id:'请输入跟随同伴证件号',
      is_together:'请输入是否有同行宾客'
    },
    ware_house:{
      remark:'请输入仓库名称',
    },
    val:{
      phone_val:'请输入有效的手机号',
      phone_not_null:'手机号不能为空',
      age_val:'请输入有效的年龄',
      card_not_null:'证件编号不能为空',
      card_val:'请输入有效的证件编号18位',
      id_not_null:'身份证号码不能为空',
      id:'请输入有效的身份证号码',
      tel:'请输入手机或座机号为：0000-0000000',
      email_val:'请输入有效的邮箱',
      phone_tel:'请输入手机号码和固定电话',
      email:'请输入邮编',
      ch_zh:'请输入有效传真号',
      per_ct:'请输入正确格式0.00%',
      money:'请输入正确格式0.00',
      int:'请输入正整数',
      pass:'请输入6位密码',
      InP:'请输入0-1这个数,2位小数'
    }
  }
}
