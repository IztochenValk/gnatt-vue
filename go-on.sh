set -euo pipefail

# Helpers
mkf() { # mkf <path> <heredoc_content>
  local f="$1"
  if [ -e "$f" ]; then
    echo "⟶ Skip (existe déjà): $f"
  else
    mkdir -p "$(dirname "$f")"
    cat > "$f" <<'EOF'
<template>
  <div></div>
</template>

<script setup lang="ts">
// TODO
</script>

<style scoped>
/* TODO */
</style>
EOF
    echo "✓ Créé: $f"
  fi
}

# 1) Views
mkf "src/views/GanttListView.vue" ""
mkf "src/views/GanttEditorView.vue" ""

# 2) Features: editor
mkf "src/features/gantt/editor/EditorShell.vue" ""
mkf "src/features/gantt/editor/Toolbar.vue" ""
mkf "src/features/gantt/editor/Sidebar.vue" ""
mkf "src/features/gantt/editor/TimeHorizonPicker.vue" ""

# 3) Features: canvas
mkf "src/features/gantt/canvas/GanttCanvas.vue" ""

# 4) Layers
mkf "src/features/gantt/canvas/layers/GridLayer.vue" ""
mkf "src/features/gantt/canvas/layers/BarsLayer.vue" ""
mkf "src/features/gantt/canvas/layers/LinksLayer.vue" ""
mkf "src/features/gantt/canvas/layers/TodayMarker.vue" ""

# 5) Shared
mkf "src/features/gantt/shared/EmptyState.vue" ""
mkf "src/features/gantt/shared/PlusCircleButton.vue" ""
mkf "src/features/gantt/shared/ProjectCard.vue" ""

echo "Terminé."
