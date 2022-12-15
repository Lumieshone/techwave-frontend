import request from "@/utils/request";

export function get_section_data(sectionId,curPage,limit) {
    return request({
        url: "/section/get_section_data",
        method: "get",
        params: {
            sectionId,
            curPage,
            limit
        },
    });
}
export function get_posts_by_subsection(sectionId, subsectionId, curPage, limit) {
    return request({
        url: "/section/get_posts_by_subsection",
        method: "get",
        params: {
            sectionId,
            subsectionId,
            curPage,
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
export function collect_section(sectionId) {
    return request({
        url: "/section/collect_section",
        method: "post",
        data: {
            sectionId: sectionId
        },
    });
}