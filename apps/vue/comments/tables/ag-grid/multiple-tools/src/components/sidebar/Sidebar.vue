<template>
  <!-- Expand Button - shown when sidebar is collapsed -->
  <div
    v-if="isCollapsed"
    class="fixed left-4 top-4 z-50 cursor-pointer flex items-center justify-center"
    @click="toggleSidebar"
    :style="{
      width: '40px',
      height: '40px',
      backgroundColor: 'rgb(14, 14, 14)',
      borderRadius: '8px',
    }"
  >
    <IconChevronRightPipe :size="20" color="rgb(255, 255, 255)" :stroke="1" />
  </div>

  <aside
    class="flex flex-col justify-between transition-all duration-300"
    :style="{
      width: isCollapsed ? '0px' : '251px',
      height: 'calc(100vh - 32px)',
      backgroundColor: 'rgb(14, 14, 14)',
      borderRadius: '12px',
      margin: '16px',
      marginRight: '8px',
      overflow: 'hidden',
      opacity: isCollapsed ? 0 : 1,
    }"
  >
    <!-- Top Section -->
    <div class="flex flex-col">
      <!-- Header -->
      <div
        class="flex flex-row justify-between items-center"
        :style="{
          paddingTop: '12px',
          paddingRight: '12px',
          paddingBottom: '12px',
          paddingLeft: '16px',
          gap: '45px',
          height: '48px',
        }"
      >
        <div class="flex flex-row items-center" :style="{ gap: '8px' }">
          <IconMenu2 :size="16" color="rgb(255, 255, 255)" :stroke="1" />
          <span :style="{
            color: 'rgb(255, 255, 255)',
            fontFamily: 'Urbanist, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '14px',
          }">Bingo's Workspace</span>
        </div>

        <div
          class="flex flex-row items-center cursor-pointer"
          @click="toggleSidebar"
          :style="{
            padding: '4px',
            width: '24px',
            height: '24px',
            gap: '10px',
          }"
        >
          <IconChevronLeftPipe :size="16" color="rgb(255, 255, 255)" :stroke="1" />
        </div>
      </div>

      <!-- Navigation Section -->
      <div
        class="flex flex-col items-start flex-1 overflow-auto"
        :style="{ padding: '8px', gap: '16px' }"
      >
        <div class="flex flex-col items-start" :style="{ width: '235px', gap: '4px' }">
          <!-- Starred Label -->
          <div
            class="flex flex-row items-start"
            :style="{
              borderRadius: '32px',
              padding: '6px 8px',
              gap: '4px',
              height: '24px',
            }"
          >
            <span :style="{
              color: 'rgb(163, 163, 163)',
              fontFamily: 'Urbanist, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              lineHeight: '12px',
            }">Starred</span>
          </div>

          <!-- FY2023 -->
          <div class="flex flex-col items-start" :style="{ gap: '2px' }">
            <div
              class="flex flex-row items-center cursor-pointer"
              @click="toggleSection('FY2023')"
              :style="{
                borderRadius: '8px',
                padding: '8px',
                gap: '12px',
                width: '235px',
                height: '32px',
              }"
            >
              <IconFolder :size="14" color="rgb(255, 255, 255)" :stroke="1" />
              <span :style="navLabelStyle">FY2023</span>
            </div>
          </div>

          <!-- FY2024 -->
          <div class="flex flex-col items-start" :style="{ gap: '2px' }">
            <div
              class="flex flex-row items-center cursor-pointer"
              @click="toggleSection('FY2024')"
              :style="{
                borderRadius: '8px',
                padding: '8px',
                gap: '12px',
                width: '235px',
                height: '32px',
              }"
            >
              <IconFolder :size="14" color="rgb(255, 255, 255)" :stroke="1" />
              <span :style="navLabelStyle">FY2024</span>
            </div>

            <!-- FY2024 Nested Items -->
            <div
              v-if="expandedSections.FY2024"
              class="flex flex-col items-start justify-center"
              :style="{
                borderRadius: '8px',
                gap: '4px',
                padding: '8px 0 8px 24px',
                width: '235px',
              }"
            >
              <div class="flex flex-row items-center" :style="nestedItemStyle">
                <IconSpeakerphone :size="16" color="rgb(255, 255, 255)" :stroke="1" />
                <span :style="nestedLabelStyle">Marketing Spend</span>
              </div>
              <div class="flex flex-row items-center" :style="nestedItemStyle">
                <IconCurrencyDollar :size="16" color="rgb(255, 255, 255)" :stroke="1" />
                <span :style="nestedLabelStyle">Salaries</span>
              </div>
              <div class="flex flex-row items-center" :style="nestedItemStyle">
                <IconFileAnalytics :size="16" color="rgb(255, 255, 255)" :stroke="1" />
                <span :style="nestedLabelStyle">Misc.</span>
              </div>
            </div>
          </div>

          <!-- FY2025 -->
          <div class="flex flex-col items-start" :style="{ gap: '2px' }">
            <div
              class="flex flex-row items-center cursor-pointer"
              @click="toggleSection('FY2025')"
              :style="{
                borderRadius: '8px',
                padding: '8px',
                gap: '12px',
                width: '235px',
                height: '32px',
              }"
            >
              <IconFolder :size="14" color="rgb(255, 255, 255)" :stroke="1" />
              <span :style="navLabelStyle">FY2025</span>
            </div>

            <!-- FY2025 Nested Items -->
            <div
              v-if="expandedSections.FY2025"
              class="flex flex-col items-start justify-center"
              :style="{
                borderRadius: '8px',
                gap: '4px',
                padding: '8px 0 8px 24px',
                width: '235px',
              }"
            >
              <!-- Marketing Spend - Selected State -->
              <div
                class="flex flex-row items-center"
                :style="{
                  backgroundColor: 'rgb(35, 35, 35)',
                  borderRadius: '8px',
                  padding: '8px',
                  gap: '12px',
                  width: '211px',
                  height: '32px',
                }"
              >
                <IconSpeakerphone :size="16" color="rgb(255, 205, 46)" :stroke="1" />
                <span :style="nestedLabelStyle">Marketing Spend</span>
              </div>
              <div class="flex flex-row items-center" :style="nestedItemStyle">
                <IconCurrencyDollar :size="16" color="rgb(255, 255, 255)" :stroke="1" />
                <span :style="nestedLabelStyle">Salaries</span>
              </div>
              <div class="flex flex-row items-center" :style="nestedItemStyle">
                <IconFileAnalytics :size="16" color="rgb(255, 255, 255)" :stroke="1" />
                <span :style="nestedLabelStyle">Misc.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section - Settings -->
    <div
      class="flex flex-row items-center"
      :style="{ padding: '16px', gap: '8px' }"
    >
      <IconSettings :size="16" color="rgb(255, 255, 255)" :stroke="1" />
      <span :style="{
        color: 'rgb(255, 255, 255)',
        fontFamily: 'Urbanist, sans-serif',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '17px',
      }">Settings</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import {
  IconMenu2,
  IconChevronLeftPipe,
  IconChevronRightPipe,
  IconFolder,
  IconSpeakerphone,
  IconCurrencyDollar,
  IconFileAnalytics,
  IconSettings,
} from '@tabler/icons-vue';
import { useSidebar } from '@/composables/useSidebar';

const { isCollapsed, toggleSidebar } = useSidebar();

const expandedSections = reactive<Record<string, boolean>>({
  FY2023: false,
  FY2024: true,
  FY2025: true,
});

function toggleSection(section: string) {
  expandedSections[section] = !expandedSections[section];
}

const navLabelStyle = {
  color: 'rgb(255, 255, 255)',
  fontFamily: 'Urbanist, sans-serif',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '15px',
  width: '193px',
};

const nestedItemStyle = {
  borderRadius: '8px',
  padding: '8px',
  gap: '12px',
  width: '211px',
  height: '32px',
};

const nestedLabelStyle = {
  color: 'rgb(255, 255, 255)',
  fontFamily: 'Urbanist, sans-serif',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '15px',
  width: '167px',
};
</script>
