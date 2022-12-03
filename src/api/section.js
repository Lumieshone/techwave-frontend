import request from "@/utils/request";

export function get_section_info(section_id,cur_page,limit) {
    return request({
        url: "/section/get_section_data",
        method: "get",
        params: {
            section_id,
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
export function publish_post(fd) {
    return request({
        url: "/section/publish_post",
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: fd
    });
}
export function collect_section(section_id) {
    return request({
        url: "/section/collect_section",
        method: "post",
        data: {
            section_id: section_id
        },
    });
}