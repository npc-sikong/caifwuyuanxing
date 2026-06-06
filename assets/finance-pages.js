const pages = {
  dashboard(){
    return pageShell('资金看板','财务总览只展示各模块汇总数据。',`
      <div class="grid grid-4">
        ${metric('账户总余额','¥ 32,899,111.20','14 个账户 / 可用 ¥32,747,111.20','账','blue')}
        ${metric('收银流水总账','13 笔','总金额 ¥14,026,594.10','流','green')}
        ${metric('今日充提总数','6,341 笔','充值 4,826 / 提现 1,515','充','orange')}
        ${metric('运营数据总计','¥ 16,982,043.50','投注、中奖、推广、VIP、返水、费用','营','purple')}
      </div>
      <div class="grid grid-4" style="margin-top:16px">
        ${metric('充值总数','4,826 笔','总金额 ¥2,481,900 / 成功率 99.2%','入','green')}
        ${metric('提现总数','1,515 笔','总金额 ¥1,932,400 / 待审 18 笔','出','orange')}
        ${metric('流水入账率','92.31%','13 笔流水 / 12 笔已入账','率','blue')}
        ${metric('异常总数','15 项','断链 1 / 对账 7 / 待审 7','!','red')}
      </div>
      <div class="grid grid-2" style="margin-top:16px">
        <div class="card"><h3>账户余额总览</h3>${renderTable(['日期','账户类别','账户数量','余额合计','冻结金额','可用金额','状态'], datedRows([
          ['总站','3','¥ 21,000,000.00','¥ 0.00','¥ 21,000,000.00','正常'],
          ['三方支付通道','2','¥ 100,000.00','¥ 0.00','¥ 100,000.00','待对账'],
	          ['站点','2','USDT 18,930.00 / ¥ -8,600.00','USDT 500.00','USDT 18,430.00 / ¥ -8,600.00','关注'],
	          ['代理','2','¥ 54,230.50','¥ 0.00','¥ 54,230.50','待清欠'],
	          ['会员','2','¥ 137,300.00','¥ 1,000.00','¥ 136,300.00','正常'],
		          ['资金池','2','¥ 790,000.00','¥ 20,000.00','¥ 770,000.00','balance余额 / fund_pool_balance额度']
	        ]))}
	        <div style="height:14px"></div>
	        <h3>站点资金池</h3>${renderTable(['日期','站点','资金池账户','资金池余额','冻结金额','可用余额','最近变动','状态'], datedRows([
	          ['站点 S-01','SP70001','¥ 640,000.00','¥ 0.00','¥ 640,000.00','总站资金调入 +20,000.00 / Pay-A 入款','正常'],
	          ['站点 S-02','SP70002','¥ 150,000.00','¥ 20,000.00','¥ 130,000.00','总站资金调出 -30,000.00 / WD-B 出款','关注']
	        ]))}</div>
	        <div class="card"><h3>流水总账</h3>${renderTable(['日期','总账对象','总笔数','总金额','已完成','待处理','状态'], datedRows([
	          ['财务请求','6','¥ 50,550.00','2','4','待审批'],
	          ['收银流水','13','¥ 14,026,594.10','12','1','已记账'],
	          ['记账批次','14','¥ 59,956.10','11','3','平衡'],
	          ['会计分录','13 组','借贷配对 ¥58,544.10','12','1','平衡'],
	          ['账户流水','19','¥ 238,775.10','16','3','待复核'],
          ['余额更新队列','11','11 批','9','2','待发送'],
          ['月度盘账','1','2026-05','0','1','告警']
        ]))}</div>
      </div>
      <div class="grid grid-2" style="margin-top:16px">
        <div class="card"><h3>运营数据总计</h3>${renderTable(['日期','业务口径','笔数','总金额','净额/成本','状态'], datedRows([
          ['投注建仓','8,904','¥ 8,920,000.00','平台收入 ¥1,060,000.00','已完成'],
          ['中奖结算','7,631','¥ 7,860,000.00','中奖成本 ¥520.00','已完成'],
          ['礼金发放','286','¥ 120,300.00','优惠成本 ¥80,000.00','已完成'],
          ['推广收益','74','¥ 588.80','推广奖励成本 ¥588.80','已完成'],
          ['VIP礼金','46','¥ 246.00','VIP礼金成本 ¥246.00','已完成'],
          ['投注返水','913','¥ 96.60','投注返水成本 ¥96.60','已完成'],
          ['代理分润','1,124','¥ 78.50','ParentA/B/C 分润','灰度'],
          ['分销返点','318','¥ 45.60','分销成本 ¥45.60','已完成'],
          ['运营费用','42','¥ 3,000.00','运营成本 ¥3,000.00','已完成'],
          ['三方手续费','596','¥ 48,900.00','手工核算 1 条','待优化']
          ,['级差佣金月结','12','¥ 300.00','ParentList 级差','已完成']
          ,['充正垫付','3','¥ 250.00','站点兜底形成台账','待审批']
          ,['台账补回','2','¥ 250.00','未来盈利优先还款','已完成']
          ,['站点/总站分润','4','¥ 90,000.00','站点 85,000 / 总站 5,000','待月结']
        ]))}</div>
        <div class="card"><h3>充提款总数</h3>${renderTable(['日期','类型','笔数','总金额','成功','待审/待处理','失败','成功率'], datedRows([
          ['用户充值','4,826','¥ 2,481,900.00','4,788','12','26','99.2%'],
          ['用户提现','1,515','¥ 1,932,400.00','1,481','18','16','98.9%'],
          ['手动上分','37','¥ 18,600.00','29','8','0','100%'],
          ['手动下分','22','¥ 12,300.00','21','1','0','100%'],
          ['代理/站点清欠','6','¥ 10,600.00','4','2','0','100%']
        ]))}</div>
      </div>
      <div class="card" style="margin-top:16px">
        <h3>对账审计总计</h3>${renderTable(['日期','审计对象','校验总数','通过','异常','异常金额','状态'], datedRows([
          ['内部对账','7 项','5','2','¥ 0.00','告警'],
          ['三方支付对账','3 个通道','2','1','¥ 120.00','待对账'],
          ['场馆账单对账','2 个场馆','1','1','¥ 3,420.00','待对账'],
          ['验签校验','128,904 条','128,903','1','¥ 500.00','异常'],
          ['月度盘账','1 期','0','1','待确认','告警']
        ]))}
      </div>
    `,'财务总览 / 资金看板')
  },
  'account-list'(){
    return pageShell('账户列表','查看会员、代理、站点、平台、三方渠道、三方场馆等账户。这里是所有余额类、往来类、信用/欠款类账户的入口，并明确哪些账户允许出现欠款。',`
      ${accountSummaryCards('总站')}
      <div class="card">
        ${toolbar([accountFilterSelect('总站'),select('账户状态',['正常','关注','冻结','待对账']),input('账户ID / 名称')],'<button class="btn primary">新增账户</button>')}
        <div id="accountListTable">${renderAccountListTable('总站')}</div>
      </div>
    `,'账户中心 / 账户列表')
  },
  'account-detail'(){
    return pageShell('账户详情','查看单个账户的余额、冻结金额、可用金额、信用账户、流水明细，并能追到每一笔变动的来源流水、记账批次和验签结果。',`
      <div class="split">
        <div class="card">
          <h3>账户档案</h3>
          <div class="kv">
		            <div>账户ID</div><div>U10001</div><div>账户名称</div><div>会员 Allen 余额账户</div><div>账户主体</div><div>会员</div><div>科目类型</div><div>负债</div><div>币种</div><div>CNY</div><div>余额</div><div>128,800.00</div><div>冻结金额</div><div>1,000.00</div><div>可用余额</div><div>127,800.00</div><div>垫付金额</div><div>¥ 0.00</div><div>欠款金额</div><div>¥ 0.00</div><div>最近来源</div><div>CASH202605280001</div><div>最近资金调拨</div><div>无；若发生资金池变动，需区分 balance 余额与 fund_pool_balance 额度</div><div>验签状态</div><div>${tag('通过')}</div>
          </div>
        </div>
        <div class="card">
          <h3>账户流水明细</h3>
          ${renderTable(['日期','流水ID','方向','发生额','变动前','变动后','来源流水','验签'], datedRows([
            ['AF202605280001','增加','1,000.00','127,800.00','128,800.00','CASH202605280001','通过'],
            ['AF202605280018','增加','58.00','129,020.00','129,078.00','VIPWEEK20260528015','通过'],
            ['AF202605270045','减少','300.00','128,100.00','127,800.00','BET20260527045','通过'],
            ['AF202605270033','增加','80.00','128,020.00','128,100.00','BONUS20260527033','通过'],
            ['AF202605260012','减少','500.00','128,520.00','128,020.00','WD20260526012','通过']
          ], '2026-05-30 10:24'),'<button class="btn" onclick="openTrace(\'CASH202605280001\')">追踪</button>')}
	          <div style="height:14px"></div>
	          <h3>总站资金调拨记录</h3>
	          ${renderTable(['日期','申请单','目标主体','目标账户变化','归属站点','站点资金池变化','批次','状态'], datedRows([
		            ['TPL-QUOTA-AGENT-ADD','代理 parentA','余额 +20,000.00','站点 S-01','balance / fund_pool_balance 同步复核','BATCH-TPL-QUOTA-AGENT-ADD','已入账'],
		            ['TPL-QUOTA-MEMBER-SUB','会员 U10002','余额 -30,000.00','站点 S-02','balance / fund_pool_balance 同步复核','BATCH-TPL-QUOTA-MEMBER-SUB','待审批']
	          ], '2026-05-30 10:26'))}
	          <div style="height:14px"></div>
	          <h3>充正台账记录</h3>
	          ${renderTable(['日期','台账单','债权方','债务方','发生原因','发生额','已补回','剩余欠款','状态'], datedRows([
	            ['CORRECT202605-C001','站点 S-01','代理 C','会员赢钱份额缺口，站点兜底垫付','250.00','0.00','250.00','待审批'],
	            ['REPAY202605-C001','站点 S-01','代理 C','未来等效毛盈利优先偿还历史垫付','250.00','250.00','0.00','已清欠']
	          ], '2026-05-30 10:27'))}
	          <div style="height:14px"></div>
	          <h3>清欠处理记录</h3>
          ${renderTable(['日期','主体','入金事件','垫付金额','欠款金额','先处理','剩余处理','结果'], datedRows([
            ['代理 A20002','CASH202605280008','¥ 2,000.00','¥ 2,000.00','信用/欠款账户 -2,000.00 清零','0.00 进入代理余额','已清欠'],
            ['会员 U10001','CASH202605280001','¥ 0.00','¥ 0.00','无欠款账户','1,000.00 进入会员余额','通过']
          ], '2026-05-30 10:25'))}
          <div style="height:14px"></div>
          <h3>用户总报表摘要</h3>
          ${renderTable(['日期','统计口径','今日笔数','今日金额','垫付金额','欠款金额','最近批次','状态'], datedRows([
            ['充值/上分','3','1,350.00','¥ 0.00','¥ 0.00','BATCH202605280001','已完成'],
            ['投注建仓','8','2,400.00','¥ 0.00','¥ 0.00','BATCH202605280003','已完成'],
            ['中奖/礼金','2','608.00','¥ 0.00','¥ 0.00','BATCH202605280009','已完成'],
            ['推广返水收益','1','168.80','¥ 0.00','¥ 0.00','BATCH202605280012','已完成'],
            ['推广充值收益','1','120.00','¥ 0.00','¥ 0.00','BATCH202605280013','已完成'],
            ['推广首充收益','1','300.00','¥ 0.00','¥ 0.00','BATCH202605280014','已完成'],
            ['VIP周礼金','1','58.00','¥ 0.00','¥ 0.00','BATCH202605280015','已完成'],
            ['晋升礼金','1','188.00','¥ 0.00','¥ 0.00','BATCH202605280016','已完成'],
            ['投注返水收益','1','96.60','¥ 0.00','¥ 0.00','BATCH202605280017','已完成'],
            ['提现/下分','1','500.00','¥ 0.00','¥ 0.00','BATCH202605280002','已完成']
          ], '2026-05-30 10:30'))}
        </div>
      </div>
    `,'账户中心 / 账户详情')
  },
  'cash-flow'(){
    return pageShell('收银流水','只查看充值和提现收银流水。',`
      <div class="toolbar">
        <div class="filters">
          ${cashFlowDateSelect('今日')}
        </div>
      </div>
      <div id="cashFlowSubjectSummary">${cashFlowSubjectSummary('今日')}</div>
      <div class="card">
        ${cashFlowToolbar()}
        <div id="cashFlowTable">${renderCashFlowTable()}</div>
      </div>
    `,'流水中心 / 收银流水')
  },
  'account-flow'(){
    return pageShell('账户流水','按 v4 模板和分录来源查看每一次余额或控制台账变化。账户流水必须包含变动前余额、发生额、变动后余额、来源ID、验签结果。',`
      <div class="card">
        ${accountFlowToolbar()}
        <div id="accountFlowTable">${renderAccountFlowTable()}</div>
      </div>
      <div class="card" style="margin-top:16px">
        <h3>v4 源表字段与余额/控制台账映射</h3>
        <div class="ok-box" style="margin-bottom:14px">资金池口径：fund_pool.balance 是余额流水；fund_pool.fund_pool_balance 是额度/最高可提现控制项，必须单独验签，不进入正式借贷平衡。</div>
        ${renderTable(['模板编码','业务名称','主体','科目名称','借贷/控制方向','金额表达式','源表','源字段','当前是否覆盖','当前系统事实'], accountingAccountFlowMappingRows(), '<button class="btn" onclick="openTrace(\'BALANCE-LEDGER\')">追踪</button>')}
      </div>
    `,'流水中心 / 账户流水')
  },
  'entry-detail'(){
    return pageShell('会计分录','按 v4 会计分录页签展示每个模板的正式分录与控制台账。借方、贷方和控制台账按同一业务关系聚合查看，不拆成孤立记录。',`
      <div class="relation-brief">
        <div class="relation-item"><strong>v4 来源</strong><span>本页 ${accountingEntries.length} 条明细来自《资金账变会计模板与会计分录_v4_财务模块开发落地版.xlsx》的“会计分录”页签。</span></div>
        <div class="relation-item"><strong>关系展示</strong><span>每个模板一行聚合借方、贷方和控制台账，财务先看业务关系，再看具体分录行。</span></div>
        <div class="relation-item"><strong>控制台账</strong><span>fund_pool_balance、最高可提现额度等只做控制项复核，不进入正式资产负债。</span></div>
      </div>
      <div class="card">
        ${toolbar([select('模板编码',templateCodes()),select('覆盖状态',['已覆盖','部分覆盖','未实现','需补记','控制台账']),input('模板编码 / 科目 / 源表')],'<button class="btn primary">导出 v4 分录</button>')}
        ${renderTable(['模板编码','业务名称','触发状态','借方','贷方','控制台账','覆盖状态','配对状态'], accountingEntryRelationRows(), '<button class="btn" onclick="openTrace(\'TPL-MDEP-001\')">追踪</button>')}
      </div>
      <div class="card" style="margin-top:16px">
        <h3>v4 原始分录明细</h3>
        ${renderTable(['模板编码','业务名称','行号','借贷/控制方向','科目编码','科目名称','科目类型','金额表达式','主体','来源/去向','源表','源字段','是否正式分录','当前是否覆盖','当前系统事实'], accountingEntryDisplayRows(), '<button class="btn" onclick="go(\'template-version\')">编辑</button>')}
      </div>
      <div class="card" style="margin-top:16px">
        <h3>凭证规则索引</h3>
        ${renderTable(['规则ID','关联模板','触发时点','前置校验','生成凭证批次','借方行','贷方行','控制台账行','幂等键','冲正/失败处理','验收'], accountingVoucherRuleRows(), '<button class="btn" onclick="go(\'book-batch\')">凭证</button>')}
      </div>
    `,'流水中心 / 会计分录')
  },
  'book-batch'(){
    return pageShell('记账批次','按 v4 凭证规则查看批次生成口径。VCH 规则定义触发时点、借方行、贷方行、控制台账、幂等键和失败/冲正处理。',`
      <div class="grid grid-4" style="margin-bottom:16px">
        ${metric('凭证规则',`${accountingVoucherRules.length} 条`,'VCH-001 至 VCH-021','凭','blue')}
        ${metric('业务映射',`${accountingBusinessMappingMatrix.length} 条`,'业务账变到模板','映','green')}
        ${metric('核销关系',`${accountingReconciliationRules.length} 条`,'应收/待付/额度/费用','核','orange')}
        ${metric('验收口径',`${accountingFinanceAcceptanceRows.length} 条`,'财务验收清单','验','purple')}
      </div>
      <div class="card">
        ${toolbar([select('凭证规则',accountingVoucherRules.map(row=>accountingValue(row,'规则ID'))),select('触发口径',['实时','审批通过','月结生成','冲正']),input('规则ID / 模板编码 / 核销对象')],'<button class="btn primary">导出凭证规则</button>')}
        ${renderTable(['规则ID','关联模板','触发时点','前置校验','生成凭证批次','借方行','贷方行','控制台账行','幂等键','冲正/失败处理','验收'], accountingVoucherRuleRows(), '<button class="btn" onclick="go(\'entry-detail\')">分录</button>')}
      </div>
      <div class="card" style="margin-top:16px">
        <h3>业务映射矩阵</h3>
        ${renderTable(['映射ID','源表','源类型字段','源类型值','业务事件','模板编码','是否正式凭证','凭证规则','补充表/账本','核销对象','备注'], accountingBusinessMappingRows(),'<button class="btn" onclick="go(\'template-version\')">模板</button>')}
      </div>
      <div class="card" style="margin-top:16px">
        <h3>财务补全验收摘要</h3>
        ${renderTable(['风险编号','财务补全模块','优先级','必须补的账本/表','触发业务/时点','需要落账的数据','标准借贷/控制口径','验收标准','关联模板'], accountingFinanceRequirementRows(), '<button class="btn" onclick="go(\'internal-reconcile\')">对账</button>')}
      </div>
    `,'流水中心 / 记账批次')
  },
	  'template-manage'(){
	    return pages['template-version']();
  },
  'template-version'(){
    return pageShell('模板版本管理','模板中心唯一入口，按 v4 财务规则工作台展示模板列表、分录详情、科目、系统账变、凭证映射、核销验收。',`
      <div class="relation-brief">
        <div class="relation-item"><strong>v4 底稿</strong><span>72 个模板、185 条分录、38 个科目、41 条系统账变映射已作为当前展示底稿。</span></div>
        <div class="relation-item"><strong>财务口径</strong><span>主界面只展示财务规则、凭证关系、核销关系和验收口径，不突出真实后端代码实现。</span></div>
        <div class="relation-item"><strong>立即生效</strong><span>模板是规则配置，不输入具体金额；分录步骤保存后直接生效，并写操作日志。</span></div>
      </div>
      ${renderTemplateVersionTabs()}
      <div id="templateVersionTabContent">
        ${renderTemplateVersionTabContent()}
      </div>
    `,'模板中心 / 模板版本管理')
  },
  'manual-apply'(){
    return pageShell('手动记账申请','人工上分、下分、补账、扣款、代理/站点清欠必须走申请、审批、收银流水、记账批次，不能直接改余额。',`
      <div class="grid grid-2">
        <div class="card"><h3>发起手动记账</h3>
          <div class="form-grid">
	            <div class="field"><label>申请类型</label><select><option>总站资金调入</option><option>总站资金调出</option><option>充正垫付</option><option>台账补回</option><option>站点兜底款</option><option>上级代垫款</option><option>手动上分</option><option>手动下分</option><option>补账</option><option>扣款</option><option>礼金发放</option><option>运营费用</option><option>代理欠款清偿</option><option>站点欠款清偿</option></select></div>
	            <div class="field"><label>目标主体</label><select><option>站点</option><option>代理</option><option>会员</option></select></div>
	            <div class="field"><label>账户ID</label><input value="A20001"></div>
	            <div class="field"><label>金额</label><input value="20,000.00"></div>
	            <div class="field"><label>币种</label><select><option>CNY</option><option>USDT</option></select></div>
	            <div class="field"><label>归属站点</label><select><option>站点 S-01</option><option>站点 S-02</option></select></div>
            <div class="field"><label>对应资金池字段</label><input value="fund_pool.balance / fund_pool_balance"></div>
	            <div class="field"><label>目标余额变化</label><input value="56,230.50 → 76,230.50"></div>
	            <div class="field"><label>资金池现金变化</label><input value="620,000.00 → 640,000.00"></div>
		            <div class="field"><label>会计模板</label><select>${templateCodes().slice(0,18).map(code=>`<option>${code}</option>`).join('')}</select></div>
	            <div class="field"><label>审批流</label><select><option>财务一审</option><option>财务+主管双审</option><option>财务+风控+主管</option></select></div>
	            <div class="field span-3"><label>申请原因</label><textarea>总站给代理 parentA 调入真实资金，并同步增加归属站点 S-01 的资金池现金汇总。</textarea></div>
	          </div>
          <div style="margin-top:14px"><button class="btn primary" onclick="showToast('已提交申请，进入审批中心')">提交申请</button> <button class="btn">保存草稿</button></div>
        </div>
	        <div class="card"><h3>最近申请</h3>${renderTable(['日期','申请单','类型','账户','金额','状态','当前节点'], datedRows([
	          ['HQPOOL20260530001','总站资金调入','A20001 / SP70001','20,000.00','已通过','已入账'],['HQPOOL20260530002','总站资金调出','U10002 / SP70002','30,000.00','待审批','主管审核'],['CORRECT202605-C001','充正垫付','代理 C / WD-B','250.00','待审批','风控审核'],['REPAY202605-C001','台账补回','代理 C / Pay-A','250.00','已通过','已入账'],['FINREQ20260528012','财务请求','U10005','150.00','待审批','财务审核'],['ADJ20260528007','手动上分','U10003','200.00','待审批','财务审核'],['CLEAR20260528008','代理欠款清偿','A20002','2,000.00','已通过','已入账'],['OPS20260528011','运营费用','P40002','3,000.00','已处理','已入账'],['ADJ20260526018','补账','S30001','500.00','待审批','主管审核'],['ADJ20260525011','手动下分','U10009','300.00','已处理','已入账']
	        ], '2026-05-30 10:12'),'<button class="btn">详情</button>')}</div>
      </div>
    `,'调账中心 / 手动记账申请')
  },
  'approval-center'(){
    return pageShell('审批中心','处理财务审批、主管审批、风控审批。调账、冲正、月结入账、账户冻结等高风险动作都要留痕；模板配置保存后直接生效，不进入审批队列。',`
      <div class="ok-box" style="margin-bottom:16px">模板配置修改不进入审批中心，分录步骤保存后直接生效；对应变更在操作日志中记录。</div>
      <div class="grid grid-4">
	        ${metric('财务待审','13','手动上分/资金调拨','财','orange')}
	        ${metric('主管待审','6','大额/冲正/资金调出','主','purple')}
        ${metric('风控待审','3','下分/冻结/异常','控','red')}
        ${metric('月结待审','3','站点月结 / 场馆费 / 费用分摊','月','blue')}
      </div>
      <div class="card" style="margin-top:16px">
	        ${toolbar([select('审批类型',['财务请求','手动记账','资金调拨','充正垫付','台账补回','冲正申请','撤销分账','月结入账','账户冻结']),select('当前节点',['财务审批','主管审批','风控审批']),input('申请单 / 账户ID')],'<button class="btn primary">批量通过</button>')}
	        ${renderTable(['日期','申请单','审批类型','发起人','金额/影响','当前节点','风险提示','状态'], datedRows([
	          ['TPL-QUOTA-AGENT-ADD','资金调拨','财务 Lily','代理 A20001 +20,000.00 / fund_pool_balance 复核','财务审批','按 v4 模板核对 balance 与额度控制项','待审批'],
	          ['TPL-QUOTA-MEMBER-SUB','资金调拨','财务 Lily','会员 U10002 -30,000.00 / fund_pool_balance 复核','主管审批','按 v4 模板核对 balance 与额度控制项','待审批'],
	          ['CORRECT202605-C001','充正垫付','系统月结','代理 C 台账应收 +250.00 / 三方付款账号 -250.00','风控审批','同周期会员赢钱与亏钱分流，缺口不与亏损互抵','待审批'],
	          ['REPAY202605-C001','台账补回','系统月结','三方收款账号 +250.00 / 代理台账应收 -250.00','财务审批','未来等效毛盈利优先偿还历史垫付台账','待审批'],
	          ['FINREQ20260528012','财务请求','运营 Allen','150.00','财务审批','审批后进入收银服务','待审批'],
          ['ADJ20260528007','手动上分','运营 Allen','200.00','财务审批','普通金额，审批后才记账','待审批'],
          ['REV20260528002','回退/冲正','财务 Lily','1,000.00','主管审批','读取原批次反向生成新批次','待审批'],
          ['UNSPLIT20260528003','撤销分账','财务 Lily','COMM20260528005','主管审批','对原分账批次生成反向分账','待审批'],
          ['MONTHLY20260501','月结入账','系统月结','TPL-SITE-MONTHLY-BILL 128,600.00','主管审批','站点月结应收凭证待确认','待审批'],
          ['MONTHLY20260502','月结入账','系统月结','TPL-VENUE-FEE-OFFICIAL 48,900.00','财务审批','场馆费应付确认后再付款','待审批'],
          ['CLEAR20260528008','代理欠款清偿','财务 Lily','2,000.00','财务审批','先清信用/欠款账户再入余额','待审批'],
          ['FRZ20260528004','账户冻结','风控','U10006','主管审批','疑似异常套利','待审批']
        ], '2026-05-30 10:13'),'<button class="btn primary" onclick="showToast(\'已通过审批\')">通过</button> <button class="btn danger" onclick="showToast(\'已拒绝\')">拒绝</button>')}
      </div>
    `,'调账中心 / 审批中心')
  },
  reversal(){
    return pageShell('回退/冲正','找原流水，生成反向批次。错账不能修改原记录，也不重新跑业务模板，只能读取原批次并把借贷方向整体反过来形成新批次。',`
      <div class="grid grid-2">
        <div class="card">
          <h3>发起冲正</h3>
          <div class="form-grid">
            <div class="field span-2"><label>原收银流水ID</label><input value="CASH202605280001"></div>
            <div class="field"><label>原记账批次</label><input value="BATCH202605280001"></div>
            <div class="field"><label>冲正原因</label><select><option>错账</option><option>三方回调错误</option><option>场馆回滚</option><option>误操作</option><option>撤销分账</option></select></div>
            <div class="field"><label>审批流</label><select><option>财务+主管双审</option><option>财务+风控+主管</option></select></div>
            <div class="field"><label>预计冲正金额</label><input value="1,000.00"></div>
            <div class="field span-3"><label>申请备注</label><textarea>充值回调重复，申请冲正原收银流水。</textarea></div>
          </div>
          <div style="margin-top:14px"><button class="btn orange" onclick="showToast('已模拟生成冲正批次 REV-BATCH202605280001')">模拟生成冲正批次</button> <button class="btn primary">提交审批</button></div>
        </div>
        <div class="card">
          <h3>原批次分录</h3>
          ${renderTable(['日期','业务关系','借方','贷方','金额','关系说明','状态'], datedRows([
            ['会员存款',entrySide('借','站点 S-01','站点收款账户 / 三方通道资产','资产增加'),entrySide('贷','会员 U10001','会员存款账户 / 会员余额','负债增加'),'1,000.00 CNY','<div class="relation-note">会员把钱借给站点；站点收到资金，同时欠会员同额余额。</div>','平衡']
          ], '2026-05-30 10:18'))}
        </div>
        <div class="card">
          <h3>新冲正批次</h3>
          ${renderTable(['日期','业务关系','借方','贷方','金额','关系说明','状态'], datedRows([
            ['会员存款冲正',entrySide('借','会员 U10001','会员存款账户 / 会员余额','负债减少'),entrySide('贷','站点 S-01','站点收款账户 / 三方通道资产','资产减少'),'1,000.00 CNY','<div class="relation-note">冲正原会员存款关系，站点对会员的欠款和收款资产同步冲减。</div>','平衡']
          ], '2026-05-30 10:20'))}
        </div>
        <div class="card">
          <h3>回退记录</h3>
          ${renderTable(['日期','操作单','回退类型','原对象','新批次','审计名称','状态'], datedRows([
            ['REV202605280001','账务回退','CASH202605280001','REV-BATCH202605280001','重复充值冲正','已冲正'],
            ['UNSPLIT20260528003','撤销分账','COMM20260528005','REV-SPLIT20260528003','撤销 parentA 分账','待审批'],
            ['MIG20260528004','代理迁移','代理 parentB -> parentC','-','仅影响后续新账','已锁定']
          ], '2026-05-30 10:21'),'<button class="btn">审计追溯</button>')}
        </div>
      </div>
    `,'冲正中心 / 回退/冲正')
  },
  'internal-reconcile'(){
    return pageShell('内部对账','按 v4 风险清单与核销关系校验业务单、凭证规则、会计分录、账户流水、账户余额和控制台账是否一致。',`
      <div class="grid grid-4">
        ${metric('v4 风险',`${accountingRisks.length} 条`,'RISK-001 至 RISK-014','险','red')}
        ${metric('核销关系',`${accountingReconciliationRules.length} 条`,'REC 规则已接入','核','orange')}
        ${metric('P0 风险',`${accountingFinanceRequirementSummaryRows.filter(row=>accountingValue(row,'优先级')==='P0').length} 条`,'优先治理','P0','purple')}
        ${metric('验收项',`${accountingFinanceAcceptanceRows.length} 条`,'财务验收口径','验','green')}
      </div>
      <div class="card" style="margin-top:16px">
        <h3>风险清单与核销关系</h3>
        ${renderTable(['风险编号','差异/风险','级别','当前系统事实','补记/治理建议','关联核销'], accountingRiskWithReconcileRows(), '<button class="btn">查看差异</button>')}
      </div>
      <div class="card" style="margin-top:16px">
        <h3>核销规则</h3>
        ${renderTable(['核销ID','核销对象','借方/资产端','贷方/负债端','触发核销','核销键','允许部分核销','差异处理','状态','验收标准'], accountingReconciliationRuleRows(), '<button class="btn" onclick="go(\'book-batch\')">凭证</button>')}
      </div>
      <div class="card" style="margin-top:16px">
        <h3>财务补全清单</h3>
        ${renderTable(['风险编号','财务补全模块','优先级','必须补的账本/表','触发业务/时点','需要落账的数据','标准借贷/控制口径','验收标准','关联模板'], accountingFinanceRequirementRows(), '<button class="btn" onclick="go(\'template-version\')">模板</button>')}
      </div>
    `,'对账中心 / 内部对账')
  },
  'third-reconcile'(){
    return pageShell('三方对账','突出 v4 中三方支付应收、提现待付、手续费清算、官方账户、场馆费应付等外部资金关系。总站额度调整不进入本页。',`
      <div class="grid grid-3">
        ${metric('支付渠道差异','¥ 120.00','手续费手算待核','支','orange')}
        ${metric('场馆费应付',`${accountingThirdReconciliationRuleRows().length} 项`,'含官方/场馆核销','场','purple')}
        ${metric('自动对账覆盖','68%','手续费/官方账户待完善','自','green')}
      </div>
      <div class="ok-box" style="margin-top:16px">三方手续费默认不是平台收入；支付通道扣费、提现待付、官方账户现金流和场馆费应付必须分开核对。</div>
      <div class="card" style="margin-top:16px">
        ${toolbar([select('对账类型',['支付渠道','提现渠道','三方场馆','场馆费用月结']),select('差异状态',['无差异','有差异','已处理','待优化']),input('三方单号 / 业务单号')],'<button class="btn primary">上传三方账单</button>')}
        ${renderTable(['模板编码','业务名称','科目名称','主体','来源/去向','金额表达式','源表','当前是否覆盖'], accountingThirdReconcileRows(), '<button class="btn">处理差异</button>')}
      </div>
      <div class="card" style="margin-top:16px">
        <h3>三方相关核销口径</h3>
        ${renderTable(['核销ID','核销对象','借方/资产端','贷方/负债端','触发核销','核销键','允许部分核销','差异处理','状态','验收标准'], accountingThirdReconciliationRuleRows(), '<button class="btn" onclick="go(\'internal-reconcile\')">核销</button>')}
      </div>
    `,'对账中心 / 三方对账')
  },
  'balance-report'(){
    return pageShell('资产负债统计','按 v4 的 38 个科目统计资产、负债、收入、成本和控制类科目。控制类独立列示，不进入正式资产负债。',`
      <div class="grid grid-4">
		        ${metric('资产科目',`${accountingSubjects.filter(row=>accountingValue(row,'科目类型')==='资产').length} 个`,'来自 v4 科目表','资','blue')}
		        ${metric('负债科目',`${accountingSubjects.filter(row=>accountingValue(row,'科目类型')==='负债').length} 个`,'会员/代理/站点余额','负','orange')}
		        ${metric('收入科目',`${accountingSubjects.filter(row=>accountingValue(row,'科目类型')==='收入').length} 个`,'损益收入口径','收','purple')}
		        ${metric('控制类科目',`${accountingSubjects.filter(row=>accountingValue(row,'科目类型').includes('控制')).length} 个`,'fund_pool_balance额度项','控','green')}
      </div>
      <div class="ok-box" style="margin-top:16px">v4 口径：fund_pool.balance 是余额；fund_pool.fund_pool_balance 是额度/最高可提现控制项，只做控制台账，不进正式资产负债。</div>
      <div class="card" style="margin-top:16px">
        ${renderTable(['科目类型','科目数量','科目范围','对应主体','对应系统字段/表'], accountingBalanceRows())}
      </div>
    `,'报表中心 / 资产负债统计')
  },
  'income-cost-report'(){
    return pageShell('收入成本统计','按 v4 分录中的收入/成本科目统计损益。手续费默认不是平台收入，需先区分三方手续费清算、官方账户现金流和费用承担方。',`
      <div class="grid grid-4">
        ${metric('收入分录',`${accountingIncomeCostRows().filter(row=>row[4]==='收入').length} 条`,'v4 正式/覆盖口径','收','green')}
        ${metric('成本分录',`${accountingIncomeCostRows().filter(row=>row[4]==='成本').length} 条`,'v4 正式/覆盖口径','成','blue')}
        ${metric('已覆盖损益',`${accountingIncomeCostRows().filter(row=>row[9]==='是').length} 条`,'当前系统覆盖','覆','orange')}
        ${metric('待治理损益',`${accountingIncomeCostRows().filter(row=>row[9]!=='是').length} 条`,'部分覆盖或未覆盖','治','red')}
      </div>
      <div class="card" style="margin-top:16px">
        ${renderTable(['模板编码','业务名称','科目编码','科目名称','科目类型','借贷/控制方向','金额表达式','主体','是否正式分录','当前是否覆盖'], accountingIncomeCostRows())}
      </div>
      <div class="ok-box" style="margin-top:16px">v4 口径：红包待领负债、奖励成本、预付金、站点月结应收/核销、场馆费应付都要按正式凭证或控制台账分开展示。</div>
      <div class="card" style="margin-top:16px">
        <h3>收入/成本来源分录明细</h3>
        ${renderTable(['模板编码','业务名称','行号','借贷/控制方向','科目编码','科目名称','科目类型','金额表达式','主体','当前系统事实'], accountingEntryDisplayRows().filter(row=>['收入','成本'].includes(row[6])).map(row=>[row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[14]]), '<button class="btn" onclick="go(\'entry-detail\')">分录</button>')}
      </div>
    `,'报表中心 / 收入成本统计')
  },
  'signature-check'(){
    return pageShell('验签校验','检查余额流水是否被篡改。任何直接改数据库金额、跳过收银流水或补写不完整链路的行为都应该导致验签失败并触发告警。',`
      <div class="grid grid-3">
        ${metric('今日校验流水','128,904','覆盖全部账户流水','验','blue')}
        ${metric('验签失败','1','疑似人工改库','!','red')}
        ${metric('余额重算通过率','99.99%','1 个账户待处理','✓','green')}
      </div>
      <div class="card" style="margin-top:16px">
        ${renderTable(['日期','流水ID','账户ID','来源/变更ID','发生额','前余额','后余额','验签结果','风险等级'], datedRows([
          ['AF202605280001','U10001','CASH202605280001 / BALCHG202605280001','1,000.00','127,800.00','128,800.00','通过','低'],
	          ['AF202605280006','A20001','CASH202605280005 / BALCHG202605280005','78.50','56,152.00','56,230.50','通过','中'],
	          ['AF202605280007','A20002','CASH202605280008 / BALCHG202605280008','2,000.00','-2,000.00','0.00','通过','中'],
	          ['AFHQ20260530001','A20001','BATCH-HQPOOL20260530001 / BALCHG-HQPOOL20260530001','20,000.00','56,230.50','76,230.50','通过','中'],
	          ['AFHQ20260530002','SP70001','BATCH-HQPOOL20260530001 / BALCHG-HQPOOL20260530001','20,000.00','620,000.00','640,000.00','通过','中'],
	          ['AF202605280013','U10001','REV202605280001 / BALCHG202605280099','-1,000.00','129,020.00','128,020.00','通过','低'],
          ['AF202605280099','U10009','UNKNOWN / 手工改库','500.00','8,000.00','9,000.00','异常','高']
        ], '2026-05-30 10:35'),'<button class="btn" onclick="openTrace(\'AF202605280099\')">排查</button>')}
      </div>
    `,'风控审计 / 验签校验')
  },
  'operation-log'(){
    return pageShell('操作日志','记录谁操作、谁审批、何时生效。模板配置保存后直接生效，也必须在这里留痕；调账、冲正、账户冻结、验签告警、三方差异处理等动作必须可审计。',`
      <div class="card">
	        ${toolbar([select('操作类型',['财务请求','调账申请','总站资金调拨','审批','冲正','撤销分账','模板配置','月结生成','月结审批','风控中间件','月度盘账','账户冻结','登录']),select('角色',['财务','主管','风控','技术运维','系统']),input('操作人 / 单号')],'<button class="btn primary">导出日志</button>')}
	        ${renderTable(['时间','操作人','角色','操作类型','对象','结果','IP','备注'],[
	          ['2026-05-30 10:41:20','cfo','主管','审批资金调拨','HQPOOL20260530001','通过','10.8.1.9','代理 A20001 调入 20,000.00，S-01 资金池现金同步增加'],
	          ['2026-05-30 10:40:12','lily','财务','总站资金调拨','HQPOOL20260530002','待审批','10.8.1.22','会员 U10002 调出 30,000.00，S-02 资金池现金同步减少'],
	          ['2026-05-30 10:39:30','system','系统','资金调拨冲正','REV-BATCH-HQPOOL20260529002','已冲正','127.0.0.1','读取原资金调拨批次反向生成冲正记录'],
	          ['2026-05-30 10:38:02','system','系统','月结生成','VCH-016 / TPL-SITE-MONTHLY-BILL','成功','127.0.0.1','按 v4 生成站点月结应收凭证'],
          ['2026-05-30 10:37:41','cfo','主管','月结审批','VCH-015 / TPL-VENUE-FEE-OFFICIAL','通过','10.8.1.9','场馆费应付确认，付款另走官方账户出款'],
          ['2026-05-30 10:36:18','lily','财务','提交冲正','VCH-017 / TPL-SITE-MONTHLY-CASH-COLLECT-MISSING','成功','10.8.1.22','站点月结现金收款核销凭证准备冲正'],
          ['2026-05-30 09:12:30','system','系统','月度盘账','2026-05 记账明细汇总','告警','127.0.0.1','借贷差异 1 笔，待内部对账'],
          ['2026-05-30 09:01:18','risk-mw','风控','风控中间件','TEAMCTX20260530001','成功','127.0.0.1','写入 ParentA/B/C 上下文'],
          ['2026-05-29 18:22:44','cfo','主管','代理迁移','parentB -> parentC','已锁定','10.8.1.9','只影响迁移后的新账'],
          ['2026-05-28 15:30:22','lily','财务','提交冲正','CASH202605280001','成功','10.8.1.22','读取原批次反向生成新批次'],
          ['2026-05-28 15:24:51','lily','财务','撤销分账','COMM20260528005','待审批','10.8.1.22','对原分账批次发起反向分账'],
          ['2026-05-28 15:20:08','allen','运营','提交手动上分','ADJ20260528007','成功','10.8.1.19','线下收款补录，待审批'],
          ['2026-05-28 15:10:12','system','风控','验签告警','AF202605280099','告警','127.0.0.1','余额疑似被人工改库'],
          ['2026-05-28 15:02:44','lily','财务','代理清欠','A20002','成功','10.8.1.22','信用/欠款账户清零'],
	          ['2026-05-28 14:55:10','lily','财务','v4 模板配置保存','TPL-MDEP-001 第 1 步','立即生效','10.8.1.22','分录步骤调整后立即生效，金额仍来自业务单据公式 G'],
          ['2026-05-28 14:20:02','risk01','风控','冻结账户','U10006','成功','10.8.1.33','疑似套利']
        ],'<button class="btn">详情</button>')}
      </div>
    `,'风控审计 / 操作日志')
  },
  'subject-config'(){
    return pageShell('科目配置','配置 v4 的资产、负债、收入、成本和控制类科目，以及借贷方向规则。所有模板最终都要落到这些科目或控制台账上。',`
      <div class="grid grid-2">
        <div class="card"><h3>v4 会计科目表</h3>${renderTable(['科目编码','科目名称','科目类型','增加方向','减少方向','对应主体','对应系统字段/表','是否进正式分录','备注'], accountingSubjectConfigRows())}</div>
        <div class="card"><h3>科目类型汇总</h3>${renderTable(['科目类型','科目数量','科目范围','对应主体','对应系统字段/表'], accountingBalanceRows())}</div>
      </div>
    `,'系统配置 / 科目配置')
  },
  'account-type-config'(){
    return pageShell('账户类型配置','配置会员、代理、站点、平台、渠道、场馆等账户类型，明确是否允许为负、是否影响余额、是否需要对账，以及是否承担清欠逻辑。',`
      <div class="card">
        ${toolbar([select('账户主体',['会员','代理','站点','平台','渠道','场馆']),select('是否允许为负',['是','否']),input('账户类型名称')],'<button class="btn primary">新增账户类型</button>')}
        ${renderTable(['账户类型','账户主体','默认科目','是否影响余额','是否允许为负','是否需要对账','用途'],[
          ['会员余额账户','会员','负债','是','否','是','充值、投注、提现、派奖、礼金'],
          ['会员通道账户','会员','负债','是','否','是','多通道接入下的用户余额承接'],
          ['借贷基础账户','多账户用户','负债/资产','是','可配置','是','支持借贷双向资金记录和信用账户扩展'],
          ['代理余额账户','代理','负债','是','可配置','是','分润、佣金、提现'],
          ['代理信用/欠款账户','代理','负债','是','是','是','代理承担亏损或欠款'],
          ['站点余额账户','站点','负债','是','可配置','是','站点结算'],
          ['站点信用/欠款账户','站点','负债','是','是','是','站点承担亏损或欠款'],
	          ['平台自有账户','平台','资产','是','否','是','平台侧自有资金变化'],
	          ['平台资金池账户','平台','资产','是','否','是','收款、付款、资金归集'],
		          ['站点资金池账户','站点','控制类/资产复核','是','否','是','按 v4 区分 fund_pool.balance 余额与 fund_pool_balance 额度控制项'],
	          ['代理台账应收账户','代理','资产','是','是','是','记录充正垫付、补亏追偿和未来台账补回'],
	          ['三方支付账户','渠道','资产','是','否','是','站点和平台各持账，需对账'],
          ['三方渠道账户','渠道','资产','是','否','是','充值、提现、手续费'],
          ['三方场馆账户','场馆','资产','是','可配置','是','投注、派奖、场馆结算']
        ],'<button class="btn">编辑</button>')}
      </div>
    `,'系统配置 / 账户类型配置')
  },
  'rate-config'(){
    return pageShell('费率配置','配置手续费、分润比例、场馆费率。费率配置要有版本、生效时间、审批和快照，避免历史账被新费率影响。',`
      <div class="grid grid-2">
        <div class="card"><h3>手续费费率</h3>${renderTable(['更新时间','费率编码','适用对象','费率','最低/最高','生效时间','状态'], datedRows([
          ['PAY_FEE_A','支付渠道 Pay-A','0.12%','无/500','2026-05-01 00:00','已启用'],['WD_FEE_B','代付渠道 WD-B','2.00/笔','2/2','2026-05-01 00:00','已启用'],['SITE_FEE_MONTH','站点 S-01','月流水 0.18%','无/无','2026-06-01 00:00','待月结'],['VENUE_FEE_AG','场馆 AG','0.30%','无/无','2026-05-10 00:00','已启用'],['VENUE_FEE_MONTH','三方场馆月结','账单金额 0.30%','无/无','2026-06-01 00:00','已启用'],['PAY_FEE_MANUAL','支付渠道 Pay-C','手动计算','待自动化','2026-05-30 10:00','待优化']
        ], '2026-05-30 10:36'),'<button class="btn">编辑</button>')}</div>
        <div class="card"><h3>分润比例</h3>${renderTable(['更新时间','规则','产品','层级','比例','结算周期','状态'], datedRows([
          ['体育固定三级分润','体育','ParentA','10%','实时','已启用'],['体育固定三级分润','体育','ParentB','5%','实时','已启用'],['体育固定三级分润','体育','ParentC','3%','实时','已启用'],['月结代理分润','全产品','ParentA/B/C','按月净盈利比例','月结','已启用'],['扩展四级分润','棋牌','ParentD','1%','日结','灰度'],['无限级分润','哈希','动态层级','按等级递减至 0','日结','灰度'],['团队关系上下文','全产品','ParentList','风控预解析','实时','已启用']
        ], '2026-05-30 10:36'),'<button class="btn">查看规则</button>')}</div>
        <div class="card"><h3>月结规则</h3>${renderTable(['更新时间','模板编码','结算周期','金额来源','适用对象','状态'], datedRows([
          ['TPL-SITE-MONTHLY-BILL','每月最后一日','settle/mainShare/rent/VF/OF','站点','待月结'],
          ['TPL-SITE-MONTHLY-AUTO-SETTLE','账单自动结算时','settle 额度扣减','站点资金池','控制台账'],
          ['TPL-SITE-MONTHLY-CASH-COLLECT-MISSING','实际现金收款时','official_account cash_id','官方账户 / 站点应收','需补记'],
          ['TPL-VENUE-FEE-OFFICIAL','场馆账单月结日','official_fee','三方场馆','已启用'],
          ['TPL-VENUE-FEE-WEEK-ALLOC','每周费用分摊','total_share_fee','代理/站点','控制台账'],
          ['TPL-EXP-CHARGE-ALLOC','费用来源分摊后','OF / expense_amount','站点/代理/月结','控制台账'],
          ['TPL-COMM-AGENT-GRANT','佣金账单发放','commission','代理','已启用'],
          ['TPL-COMM-DEBT-REFUND','账单发放/历史债务','commission','代理链路','已启用']
        ], '2026-05-30 10:36'),'<button class="btn">查看规则</button>')}</div>
        <div class="card"><h3>分润 / 充正参数</h3>${renderTable(['更新时间','参数','适用对象','配置值','用途','状态'], datedRows([
          ['站点分成比例','站点 S-01','可配置','计算站点利润分配与总站分润','已启用'],
          ['总站分成比例','总站','可配置','计算总站分润收入','已启用'],
          ['代理佣金率','ParentA/B/C','按层级配置','计算代理实际佣金','已启用'],
          ['级差率','ParentList','上级率 - 下级率','计算级差佣金','已启用'],
          ['充正份额比例','代理/站点','按规则配置','计算会员赢钱份额缺口','已启用'],
          ['费用承担方','发起方/站点/代理','发起方默认','计算充提手续费和月结费用归属','已启用'],
          ['台账优先级','代理台账','先老后新 / 指定债权方','未来盈利补回历史垫付','已启用']
        ], '2026-06-02 10:36'),'<button class="btn">编辑参数</button>')}</div>
        <div class="card"><h3>用户资费 / 推广奖励参数</h3>${renderTable(['ID','code','key','属性1','属性2','属性3','属性4','属性5','属性6','属性7','属性8','属性9','属性10','邀请等级码','修改时间'], userTariffRows(), '<button class="btn">编辑</button>')}</div>
      </div>
    `,'系统配置 / 费率配置')
  },
  'currency-config'(){
    return pageShell('币种汇率','配置多币种、汇率、折算口径。支持 CNY、USDT 等币种，并保存每笔记账使用的汇率快照，避免后续汇率变化影响历史账。',`
      <div class="grid grid-2">
        <div class="card"><h3>币种配置</h3>${renderTable(['币种','精度','是否启用','默认入账币种','说明'],[
          ['CNY','2','已启用','是','人民币账户'],['USDT','6','已启用','否','站点/三方结算'],['POINT','2','停用','否','内部积分示例']
        ],'<button class="btn">编辑</button>')}</div>
        <div class="card"><h3>汇率配置</h3>${renderTable(['更新时间','汇率对','汇率','来源','生效时间','折算口径','状态'], datedRows([
          ['USDT/CNY','7.210000','手动配置','2026-05-28 00:00','入账时快照','已启用'],['CNY/USDT','0.138696','系统换算','2026-05-28 00:00','入账时快照','已启用']
        ], '2026-05-30 10:37'),'<button class="btn">查看快照</button>')}</div>
        <div class="card"><h3>入账汇率快照</h3>${renderTable(['日期','收银流水','原币金额','入账币种','汇率快照','折算金额'], datedRows([
          ['CASH202605280006','12.000000 USDT','CNY','7.210000','86.52'],
          ['CASH202605280008','2,000.00 CNY','CNY','1.000000','2,000.00']
        ], '2026-05-30 10:37'))}</div>
      </div>
    `,'系统配置 / 币种汇率')
  }
};
