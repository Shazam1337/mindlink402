"use client";
import { useEffect, useRef, useState } from "react";
import type { Archon } from "./Pantheon";

interface FractalMapProps {
  archons: Archon[];
  onNodeClick?: (archonId: string) => void;
  selectedNodeId?: string;
}

interface RealityNode {
  id: string;
  x: number;
  y: number;
  z: number;
  archon: Archon;
  vx: number;
  vy: number;
  vz: number;
}

export default function FractalMap({ archons, onNodeClick, selectedNodeId }: FractalMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<RealityNode[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    // Initialize nodes with archon data
    const initialNodes: RealityNode[] = archons.map((archon, i) => {
      const angle = (i / archons.length) * Math.PI * 2;
      const radius = 100;
      return {
        id: archon.id,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.random() * 50 - 25,
        archon,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
      };
    });
    setNodes(initialNodes);
  }, [archons]);

  const nodesRef = useRef<RealityNode[]>(nodes);
  
  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const currentNodes = nodesRef.current;

      // Update node positions (floating reality fragments)
      const updatedNodes = currentNodes.map((node) => ({
        ...node,
        x: node.x + node.vx * 0.1,
        y: node.y + node.vy * 0.1,
        z: node.z + node.vz * 0.1,
        vx: node.vx + (Math.random() - 0.5) * 0.02,
        vy: node.vy + (Math.random() - 0.5) * 0.02,
        vz: node.vz + (Math.random() - 0.5) * 0.02,
      }));
      
      nodesRef.current = updatedNodes;

      // Draw connections between realities
      updatedNodes.forEach((nodeA, i) => {
        updatedNodes.slice(i + 1).forEach((nodeB) => {
          const distance = Math.sqrt(
            Math.pow(nodeA.x - nodeB.x, 2) +
            Math.pow(nodeA.y - nodeB.y, 2) +
            Math.pow(nodeA.z - nodeB.z, 2)
          );

          if (distance < 120) {
            const opacity = Math.max(0.1, 1 - distance / 120);
            ctx.strokeStyle = `rgba(255, 215, 0, ${opacity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(
              width / 2 + nodeA.x,
              height / 2 + nodeA.y
            );
            ctx.lineTo(
              width / 2 + nodeB.x,
              height / 2 + nodeB.y
            );
            ctx.stroke();
          }
        });
      });

      // Draw reality nodes
      updatedNodes.forEach((node) => {
        const x = width / 2 + node.x;
        const y = height / 2 + node.y;
        const size = 5 + (node.archon.ascensionLevel / 2);
        const isSelected = node.id === selectedNodeId;
        const isHovered = node.id === hoveredNode;

        // Glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
        gradient.addColorStop(0, isSelected || isHovered 
          ? `rgba(255, 215, 0, ${isSelected ? 0.9 : 0.5})` 
          : `rgba(255, 215, 0, ${0.3})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Reality node - hexagonal shape for fractal feel
        const hexSize = size;
        ctx.fillStyle = isSelected 
          ? "#FFD700" 
          : isHovered 
          ? "#00FFF6" 
          : node.archon.rank <= 3 
          ? "#C77DFF" 
          : "#FFD700";
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const hx = x + hexSize * Math.cos(angle);
          const hy = y + hexSize * Math.sin(angle);
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fill();

        // Pulsing ring for selected/hovered
        if (isSelected || isHovered) {
          ctx.strokeStyle = isSelected ? "rgba(255, 215, 0, 0.9)" : "rgba(0, 255, 246, 0.7)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, size + 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedNodeId, hoveredNode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find closest node
    type ClosestNode = {
      node: RealityNode;
      distance: number;
    };
    let closest: ClosestNode | null = null;
    const width = canvas.width;
    const height = canvas.height;

    for (const node of nodesRef.current) {
      const nodeX = width / 2 + node.x;
      const nodeY = height / 2 + node.y;
      const distance = Math.sqrt(
        Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2)
      );

      if (closest === null || distance < closest.distance) {
        closest = { node, distance };
      }
    }

    if (closest !== null && closest.distance < 30) {
      setHoveredNode(closest.node.id);
    } else {
      setHoveredNode(null);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (hoveredNode) {
      onNodeClick?.(hoveredNode);
    }
  };

  return (
    <div className="card p-6 relative">
      <div className="section-title mb-4">Fractal Map</div>
      
      <div className="relative w-full h-96 rounded-lg overflow-hidden bg-dark-primary/30 border border-mythos-gold/20">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-pointer"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-mythos-gold/70">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-mythos-gold"></div>
            <span>Reality Fragment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-mythos-purple"></div>
            <span>Top Rank</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-mythos-turquoise"></div>
            <span>Hovered</span>
          </div>
        </div>
        
        {/* Hover tooltip */}
        {hoveredNode && (() => {
          const hoveredArchon = archons.find((a) => a.id === hoveredNode);
          if (!hoveredArchon) return null;
          return (
            <div className="absolute top-4 left-4 p-3 rounded-lg bg-dark-secondary/90 backdrop-blur-md border border-mythos-gold/30 text-sm">
              <div className="font-heading font-bold text-mythos-gold mb-1">
                {hoveredArchon.realmName}
              </div>
              <div className="text-xs text-mythos-gold/70">
                Level {hoveredArchon.ascensionLevel} • {hoveredArchon.energyEssence.toFixed(2)}E
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

