"use client";

import { useState, useTransition } from "react";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type SortableItem = { id: string; render: React.ReactNode };

/**
 * Vertical drag-and-drop list. `onReorder` receives the new id order and is
 * expected to persist it (a server action); the list shows the new order
 * immediately and reverts if persisting fails.
 */
export default function SortableList({ items, onReorder }: { items: SortableItem[]; onReorder: (ids: string[]) => Promise<void> }) {
  const [order, setOrder] = useState(items.map((i) => i.id));
  const [pending, start] = useTransition();
  const byId = new Map(items.map((i) => [i.id, i]));
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const prev = order;
    const next = arrayMove(order, order.indexOf(String(active.id)), order.indexOf(String(over.id)));
    setOrder(next);
    start(async () => {
      try { await onReorder(next); } catch { setOrder(prev); }
    });
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        <ul className={["divide-y divide-line rounded-2xl border border-line bg-surface", pending ? "opacity-70" : ""].join(" ")}>
          {order.map((id, i) => byId.get(id) && <Row key={id} id={id} index={i}>{byId.get(id)!.render}</Row>)}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

function Row({ id, index, children }: { id: string; index: number; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <li ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={["flex items-center gap-3 px-3 py-3", isDragging ? "relative z-10 bg-green-50 shadow-lg" : ""].join(" ")}>
      <button type="button" {...attributes} {...listeners} aria-label="Drag to reorder" className="flex h-8 w-8 shrink-0 cursor-grab touch-none items-center justify-center rounded-md text-ink-3 hover:bg-paper hover:text-ink active:cursor-grabbing">
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden><circle cx="5.5" cy="3.5" r="1.3"/><circle cx="10.5" cy="3.5" r="1.3"/><circle cx="5.5" cy="8" r="1.3"/><circle cx="10.5" cy="8" r="1.3"/><circle cx="5.5" cy="12.5" r="1.3"/><circle cx="10.5" cy="12.5" r="1.3"/></svg>
      </button>
      <span className="w-6 shrink-0 font-mono text-[11px] text-ink-3">{String(index + 1).padStart(2, "0")}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </li>
  );
}
