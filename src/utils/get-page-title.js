import defaultSettings from '@/settings'

const title = defaultSettings.title || '济客空间'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
