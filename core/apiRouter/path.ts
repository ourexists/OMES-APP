export const apiPath = {
    captcha: '/open/captchaBase' as string,
    auth_token: '/oauth2/token' as string,
    current_user: '/acc/currentUser' as string,
    message_listen: '/message/listen' as string,
    message_page: '/message/selectByPage' as string,
    message_detail: '/message/selectById' as string,
    message_read: '/message/read' as string,
    message_unread_count: '/message/countUnread' as string,
    workshop_tree: '/workshop/selectUserAssignTree' as string,
    equip_page: '/equip/selectByPage' as string,
    equip_count: '/equip/countRealtime' as string,
    equip_realtime: '/equip/selectRealtimeById' as string,
    equip_id: '/equip/selectById' as string,
    equip_run_history: '/equipRecordRun/selectByPage' as string,
    equip_online_history: '/equipRecordOnline/selectByPage' as string,
    equip_alarm_history: '/equipRecordAlarm/selectByPage' as string,
    equip_config: '/equip/queryEquipConfigBySn' as string,
    equip_collect_page: '/equip/collect/selectByPage' as string,
    equip_run_count: '/equipRecordRun/countMerging' as string,
    equip_online_count: '/equipRecordOnline/countMerging' as string,
    equip_alarm_count: '/equipRecordAlarm/countMerging' as string,

};

export const authParam = {
    client_id: 'mes' as string,
    client_sc: 'admin123' as string
}