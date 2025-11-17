import React, { FunctionComponent, useEffect, useRef } from "react";
import { Box } from "miever_ui";
import { Graph, NodeEvent } from "@antv/g6";
import { skillGroups } from "./skillData";
import { useTranslation } from "react-i18next";

const SkillsMap: FunctionComponent = () => {
    const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const oriSize: Record<string, number> = {};
    const baseSize = 100;
    const expandedSize = 180;

    const data = {
      nodes: skillGroups.map((item) => {
        const isFrontend = item.id === "frontend";
        const initSize = isFrontend ? baseSize * 1.7 : baseSize;
        oriSize[item.id] = initSize;
        return {
          id: item.id,
          cluster: item.id,
          label: t(item.label),
          description: item.skills.map((skill) => t(skill.label)).join(",\n"),
          size: initSize,
        };
      }),
      edges: [] as any[],
    };

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const initialLayout = {
      type: "d3-force",
      animate: false,
      preventOverlap: true,
      maxIteration: 60,
      collide: {
        radius: (d: any) => (d.size || baseSize) / 2.2,
        strength: 0.5,
      },
      manyBody: {
        strength: -10,
      },
    } as const;

    const expandLayout = {
      type: "d3-force",
      preventOverlap: true,
      maxIteration: 30,
      collide: {
        radius: (d: any) => (d.size || baseSize) / 2,
        strength: 0.8,
      },
      manyBody: {
        strength: -15,
      },
    } as const;

    const collapseLayout = {
      type: "d3-force",
      preventOverlap: true,
      maxIteration: 30,
      collide: {
        radius: (d: any) => (d.size || baseSize) / 2,
        strength: 0.6,
      },
      manyBody: {
        strength: 30,
      },
    } as const;

    const graph = new Graph({
      container,
      width,
      height,
      data,
      node: {
        type: "circle",
        style: {
          size: (d: any) => d.size || baseSize,
          labelText: (d: any) =>
            d.size === expandedSize ? d.description : d.label,
          labelPlacement: "center",
          labelFill: "#fff",
          labelFontSize: 14,
          labelFontWeight: 600,
          cursor: "pointer",
        },
        palette: {
          field: (d: any) => d.cluster,
        },
      },
      layout: initialLayout,
      behaviors: ["drag-element", "drag-canvas", "zoom-canvas"],
      autoFit: "view",
    });

    graphRef.current = graph;

    graph.on(NodeEvent.CLICK, (e: any) => {
      const nodeId = e.target?.id;
      if (!nodeId) return;

      const nodeData = graph.getNodeData(nodeId) as any;
      if (!nodeData) return;

      const originSize = oriSize[nodeId] ?? baseSize;
      const isExpanded = nodeData.size === expandedSize;
      const newSize = isExpanded ? originSize : expandedSize;

      graph.updateNodeData([{ id: nodeId, size: newSize }]);

      if (!isExpanded) {
        graph.setLayout(expandLayout);
      } else {
        graph.setLayout(collapseLayout);
      }

      graph.layout();
      setTimeout(() => {
        graph.fitView();
      }, 100);
    });

    graph.render();

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { width: newWidth, height: newHeight } = entry.contentRect;
      const currentGraph = graphRef.current;
      if (!currentGraph) return;
      if (newWidth <= 0 || newHeight <= 0) return;

      currentGraph.setSize(newWidth, newHeight);
      currentGraph.fitView();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      graph.destroy();
      graphRef.current = null;
    };
  }, []);

  return (
    <Box>
      <div
        ref={containerRef}
        style={{ width: "100%", height: 400 }}
      />
    </Box>
  );
};

export default SkillsMap;