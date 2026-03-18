"use strict";
const apiPath = {
  captcha: "/open/captchaBase",
  auth_token: "/oauth2/token",
  current_user: "/acc/currentUser",
  message_listen: "/message/listen",
  message_page: "/message/selectByPage",
  message_detail: "/message/selectById",
  message_read: "/message/read",
  message_unread_count: "/message/countUnread",
  workshop_tree: "/workshop/selectUserAssignTree",
  equip_page: "/equip/selectByPage",
  equip_count: "/equip/countRealtime",
  equip_realtime: "/equip/selectRealtimeById",
  equip_id: "/equip/selectById",
  equip_run_history: "/equipRecordRun/selectByPage",
  equip_online_history: "/equipRecordOnline/selectByPage",
  equip_alarm_history: "/equipRecordAlarm/selectByPage",
  equip_config: "/equip/queryEquipConfigBySn",
  equip_write_control: "/equip/writeControl",
  equip_collect_page: "/equip/collect/selectByPage",
  equip_run_count: "/equipRecordRun/countMerging",
  equip_online_count: "/equipRecordOnline/countMerging",
  equip_alarm_count: "/equipRecordAlarm/countMerging",
  workshop_scada: "/workshop/getScadaUrlByWorkshopCode",
  workshop_realtime: "/workshop/getWorkshopRealtimeCollect",
  /** 巡检项目：分页查询 */
  inspection_project_page: "/inspection/project/selectByPage",
  /** 巡检任务：分页查询（可传 executorId 查当前账户名下任务） */
  inspect_task_page: "/inspection/task/selectByPage",
  /** 巡检任务：根据ID查询 */
  inspect_task_by_id: "/inspection/task/selectById",
  /** 巡检任务：新增或更新（用于确认执行等状态变更） */
  inspect_task_addOrUpdate: "/inspection/task/addOrUpdate",
  /** 巡检模板：根据ID查询模板及其巡检项列表 */
  inspect_template_with_items: "/inspection/template/selectWithItems",
  /** 设备巡检记录：提交保存（新增） */
  inspect_record_save: "/inspection/record/save",
  /** 设备巡检记录：新增或更新（已检时更新） */
  inspect_record_addOrUpdate: "/inspection/record/addOrUpdate",
  /** 设备巡检记录：按任务ID查询记录列表 */
  inspect_record_listByTaskId: "/inspection/record/listByTaskId"
};
const authParam = {
  client_id: "mes",
  client_sc: "admin123"
};
exports.apiPath = apiPath;
exports.authParam = authParam;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/core/apiRouter/path.js.map
