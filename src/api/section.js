import request from "@/utils/request";

export function get_section_info(section_id,user_id,cur_page,limit) {
    return request({
        url: "/section/get_section_data",
        method: "get",
        params: {
            section_id,
            user_id,
            cur_page,
            limit
        },
    });
}
export function filter_post_by_tag(section_id,tag_id, cur_page,limit) {
    return request({
        url: "/section/get_posts_by_tag",
        method: "get",
        params: {
            section_id,
            tag_id,
            cur_page,
            limit
        },
    });
}
// export function collect_section(user_id,section_id) {
//     return request({
//         url: "/section_collect",
//         method: "post",
//         params: {
//             user_id,
//             section_id
//         },
//     });
// }