<script setup lang="ts">
import type { Project } from '../../types/portfolio'
import AppHeading from '../atoms/AppHeading.vue'
import AppButton from '../atoms/AppButton.vue'
import ProjectCard from '../molecules/ProjectCard.vue'

interface Props {
  projects: Project[]
  limit?: number
  showViewAll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  limit: 6,
  showViewAll: true
})

const displayedProjects = computed(() => {
  if (props.limit && props.limit > 0) {
    return props.projects.slice(0, props.limit)
  }
  return props.projects
})
</script>

<template>
  <section class="w-full py-16 sm:py-24 border-b border-neutral-200" id="projects">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10 sm:gap-14">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div class="flex flex-col gap-3 max-w-2xl">
          <span class="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
            Portfolio
          </span>
          <AppHeading as="h2" size="2xl">
            My work
          </AppHeading>
          <p class="text-neutral-600 text-sm sm:text-base font-medium">
            Check out some of my favorite & most recent projects.
          </p>
        </div>

        <AppButton
          v-if="showViewAll"
          to="/projects"
          variant="secondary"
          class="self-start sm:self-auto"
        >
          View All Projects →
        </AppButton>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <ProjectCard
          v-for="project in displayedProjects"
          :key="project.slug"
          :project="project"
        />
      </div>

      <div v-if="showViewAll" class="flex justify-center pt-6">
        <AppButton
          to="/projects"
          variant="primary"
          class="!px-8 !py-3.5 text-base"
        >
          View All Projects ({{ projects.length }})
        </AppButton>
      </div>
    </div>
  </section>
</template>
