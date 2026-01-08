export const apiPath = {
    captcha: '/open/captcha' as string,
    auth_token: '/oauth2/token' as string,
    current_user: '/acc/currentUser' as string,
    message_listen: '/message/listen' as string,
    message_page: '/message/selectByPage' as string,
    message_detail: '/message/selectById' as string,
    message_read: '/message/read' as string,
    workshop_tree: '/workshop/selectUserAssignTree' as string,
    equip_page: '/equip/selectByPage' as string,
    equip_count: '/equip/countRealtime' as string,
    equip_realtime: '/equip/selectRealtimeById' as string
};

export const authParam = {
    client_id: 'mes' as string,
    client_sc: 'admin123' as string
}