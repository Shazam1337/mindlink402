"use client";
import { useEffect, useRef, useState } from "react";
import type { NeuralUser } from "./UserBoard";

interface NeuralGridProps {
  users: NeuralUser[];
  onNodeClick?: (userId: string) => void;
  selectedNodeId?: string;
}

interface Node {
  id: string;
  x: number;
  y: number;
  z: number;
  user: NeuralUser;
  vx: number;
  vy: number;
  vz: number;
}

export default function NeuralGrid({ users, onNodeClick, selectedNodeId }: NeuralGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    // Initialize nodes with user data
    const initialNodes: Node[] = users.map((user, i) => {
      const angle = (i / users.length) * Math.PI * 2;
      const radius = 100;
      return {
        id: user.id,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.random() * 50 - 25,
        user,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
      };
    });
    setNodes(initialNodes);
  }, [users]);

  const nodesRef = useRef<Node[]>(nodes);
  
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

      // Update node positions (simple floating animation)
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

      // Draw connections
      updatedNodes.forEach((nodeA, i) => {
        updatedNodes.slice(i + 1).forEach((nodeB) => {
          const distance = Math.sqrt(
            Math.pow(nodeA.x - nodeB.x, 2) +
            Math.pow(nodeA.y - nodeB.y, 2) +
            Math.pow(nodeA.z - nodeB.z, 2)
          );

          if (distance < 120) {
            const opacity = Math.max(0.1, 1 - distance / 120);
            ctx.strokeStyle = `rgba(0, 250, 255, ${opacity * 0.3})`;
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

      // Draw nodes
      updatedNodes.forEach((node) => {
        const x = width / 2 + node.x;
        const y = height / 2 + node.y;
        const size = 4 + (node.user.level / 2);
        const isSelected = node.id === selectedNodeId;
        const isHovered = node.id === hoveredNode;

        // Glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
        gradient.addColorStop(0, isSelected || isHovered 
          ? `rgba(0, 250, 255, ${isSelected ? 0.8 : 0.4})` 
          : `rgba(0, 250, 255, ${0.2})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        ctx.fillStyle = isSelected 
          ? "#00faff" 
          : isHovered 
          ? "#9a4fff" 
          : node.user.rank <= 3 
          ? "#ffb300" 
          : "#00faff";
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing ring for selected/hovered
        if (isSelected || isHovered) {
          ctx.strokeStyle = isSelected ? "rgba(0, 250, 255, 0.8)" : "rgba(154, 79, 255, 0.6)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, size + 4, 0, Math.PI * 2);
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
    let closest: { node: Node; distance: number } | null = null;
    const width = canvas.width;
    const height = canvas.height;

    nodesRef.current.forEach((node) => {
      const nodeX = width / 2 + node.x;
      const nodeY = height / 2 + node.y;
      const distance = Math.sqrt(
        Math.pow(x - nodeX, 2) + Math.pow(y - nodeY, 2)
      );

      if (!closest || distance < closest.distance) {
        closest = { node, distance };
      }
    });

    if (closest && closest.distance < 30) {
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
      <div className="section-title mb-4">Neural Grid</div>
      
      <div className="relative w-full h-96 rounded-lg overflow-hidden bg-dark-primary/30 border border-neon-cyan/10">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-pointer"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neon-cyan/70">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
            <span>Neuron</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-amber"></div>
            <span>Top Rank</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-violet"></div>
            <span>Hovered</span>
          </div>
        </div>
        
        {/* Hover tooltip */}
        {hoveredNode && (() => {
          const hoveredUser = users.find((u) => u.id === hoveredNode);
          if (!hoveredUser) return null;
          return (
            <div className="absolute top-4 left-4 p-3 rounded-lg bg-dark-secondary/90 backdrop-blur-md border border-neon-cyan/30 text-sm">
              <div className="font-heading font-bold text-neon-cyan mb-1">
                {hoveredUser.username}
              </div>
              <div className="text-xs text-neon-cyan/70">
                Level {hoveredUser.level} • {hoveredUser.signals} signals
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

