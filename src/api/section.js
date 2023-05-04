import request from "@/utils/request";

export function getSectionData(sectionId, page, perPage) {
  return request({
    url: `/section/${sectionId}/info`,
    method: "get",
    params: {
      page,
      perPage,
    },
  });
}

export function getPostsBySubsection(subsectionId, page, perPage) {
  return request({
    url: `/section/${subsectionId}`,
    method: "get",
    params: {
      page,
      perPage,
    },
  });
}

export function publishPost(data) {
  return request({
    url: "/section/publish_post",
    method: "post",
    data,
  });
}

export function collectSection(sectionId) {
  return request({
    url: "/section/collect",
    method: "post",
    data: {
      sectionId: sectionId,
    },
  });
}

export function searchPostInSection(sectionId, content, page, perPage) {
  return request({
    url: `/section/${sectionId}/search`,
    method: "get",
    params: {
      content,
      page,
      perPage,
    },
  });
}

export function getAllPosts(sectionId, page, perPage) {
  return request({
    url: `section/${sectionId}/post`,
    method: "get",
    params: {
      page,
      perPage,
    },
  });
}

export function getPinnedPosts(sectionId) {
  return request({
    url: `section/${sectionId}/pinned_post`,
    method: "get",
  });
}

export function getHighlightedPosts(sectionId, page, perPage) {
  return request({
    url: `section/${sectionId}/highlighted_post`,
    method: "get",
    params: {
      page,
      perPage,
    },
  });
}
