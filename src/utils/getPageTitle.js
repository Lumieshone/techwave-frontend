import defaultSettings from '@/settings'

const title = defaultSettings.title || 'TechWave'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
