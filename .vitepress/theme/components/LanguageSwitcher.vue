<template>
  <div class="language-switcher">
    <a
      v-for="lang in languages"
      :key="lang.code"
      :href="getLanguageLink(lang.code)"
      :class="{ active: isActive(lang.code) }"
      class="lang-link"
    >
      {{ lang.label }}
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const languages = [
  { code: 'en', label: 'English' },
  { code: 'pl', label: 'Polski' }
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
  padding: 6px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  color: var(--vp-c-text-2);
  border: 1px solid transparent;
}

.lang-link:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
}

.lang-link.active {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .language-switcher {
    margin-left: 8px;
  }
  
  .lang-link {
    padding: 4px 8px;
    font-size: 12px;
  }
}
</style>
