<template>
  <div class="language-switcher">
    <a
      v-for="lang in languages"
      :key="lang.code"
      :href="getLanguageLink(lang.code)"
      :class="{ active: isActive(lang.code) }"
      class="lang-link"
      :title="lang.label"
    >
      <span class="flag-icon">{{ lang.flag }}</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' }
]

const getLanguageLink = (code) => {
  const currentPath = route.path
  
  if (code === 'en') {
    // Remove /pl/ prefix if present
    return currentPath.replace(/^\/pl/, '') || '/'
  } else {
    // Add /pl/ prefix
    if (currentPath === '/' || currentPath === '') {
      return '/pl/'
    }
    if (!currentPath.startsWith('/pl/')) {
      return `/pl${currentPath}`
    }
    return currentPath
  }
}

const isActive = (code) => {
  const currentPath = route.path
  if (code === 'en') {
    return !currentPath.startsWith('/pl/')
  }
  return currentPath.startsWith('/pl/')
}
</script>

<style scoped>
.language-switcher {
  display: inline-flex;
  gap: 4px;
  align-items: center;
  margin-left: 12px;
}

.lang-link {
  padding: 6px 8px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 18px;
  line-height: 1;
  transition: all 0.2s ease;
  color: var(--vp-c-text-2);
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
}

.lang-link:hover {
  background-color: var(--vp-c-bg-soft);
  transform: scale(1.1);
}

.lang-link.active {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
  border-width: 1px;
  border-style: solid;
}

.flag-icon {
  font-size: 20px;
  line-height: 1;
  display: block;
}

@media (max-width: 768px) {
  .language-switcher {
    margin-left: 8px;
  }
  
  .lang-link {
    padding: 4px 6px;
    min-width: 28px;
    height: 28px;
  }
  
  .flag-icon {
    font-size: 18px;
  }
}
</style>
