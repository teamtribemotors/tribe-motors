'use client';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useOptimistic, startTransition, useEffect, useState } from 'react';
import { updateEnquiryStatus } from '../../actions/enquiries';

type EnquiryData = {
  enquiry: any;
  assignee: any;
};

export default function EnquiriesKanban({ initialData }: { initialData: EnquiryData[] }) {
  // @hello-pangea/dnd needs to ensure it only renders on the client to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [optimisticData, addOptimisticData] = useOptimistic(
    initialData,
    (state, newEnquiry: EnquiryData) => {
      return state.map(item => item.enquiry.id === newEnquiry.enquiry.id ? newEnquiry : item);
    }
  );

  const pending = optimisticData.filter(e => e.enquiry.status === 'New' || e.enquiry.status === 'Pending' || !e.enquiry.status);
  const processing = optimisticData.filter(e => e.enquiry.status === 'In Progress' || e.enquiry.status === 'Contacted' || e.enquiry.status === 'Test Drive');
  const qcCheck = optimisticData.filter(e => e.enquiry.status === 'QC' || e.enquiry.status === 'Review' || e.enquiry.status === 'Negotiation');
  const ready = optimisticData.filter(e => e.enquiry.status === 'Resolved' || e.enquiry.status === 'Closed' || e.enquiry.status === 'Ready');

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    let newStatus = '';
    if (destination.droppableId === 'pending') newStatus = 'Pending';
    else if (destination.droppableId === 'processing') newStatus = 'In Progress';
    else if (destination.droppableId === 'qcCheck') newStatus = 'Negotiation';
    else if (destination.droppableId === 'ready') newStatus = 'Closed';

    const draggedItem = optimisticData.find(e => e.enquiry.id === draggableId);
    if (!draggedItem) return;

    const updatedItem = {
      ...draggedItem,
      enquiry: {
        ...draggedItem.enquiry,
        status: newStatus
      }
    };

    startTransition(() => {
      addOptimisticData(updatedItem);
    });

    try {
      await updateEnquiryStatus(draggableId, newStatus);
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-1 overflow-x-auto p-6 custom-scrollbar bg-surface-bright">
        <div className="flex gap-6">
          
          {/* Column 1: Pending */}
          <Droppable droppableId="pending">
            {(provided, snapshot) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                className={`min-w-[320px] max-w-[320px] flex flex-col gap-4 rounded-xl p-2 transition-colors ${snapshot.isDraggingOver ? 'bg-surface-dim/50' : ''}`}
              >
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-outline"></span>
                    <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Pending</h3>
                    <span className="rounded-full bg-surface-container-high px-2 py-0.5 text-[10px] font-bold text-outline">{pending.length}</span>
                  </div>
                  <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
                </div>
                {pending.map(({ enquiry: enq, assignee }, index) => (
                  <Draggable key={enq.id} draggableId={enq.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.8 : 1 }}
                        className="flex flex-col gap-3 rounded-xl border border-outline-variant bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <span className="rounded-md bg-primary-fixed px-2 py-1 text-[10px] font-bold text-on-primary-fixed-variant">ENQ #{enq.id.slice(0, 8)}</span>
                          <span className="text-[10px] text-outline font-medium">{new Date(enq.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm font-semibold text-on-surface leading-snug">{enq.vehicleModel}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-outline">{enq.name} • {enq.number}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-outline-variant pt-3 mt-1">
                          <div className="flex -space-x-2">
                            <div className="h-6 w-6 rounded-full border-2 border-white bg-surface-dim flex items-center justify-center text-[10px] font-bold text-on-surface">
                              {assignee ? assignee.name.charAt(0) : '?'}
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-outline text-lg">forum</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Column 2: Processing */}
          <Droppable droppableId="processing">
            {(provided, snapshot) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                className={`min-w-[320px] max-w-[320px] flex flex-col gap-4 rounded-xl p-2 transition-colors ${snapshot.isDraggingOver ? 'bg-surface-dim/50' : ''}`}
              >
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Processing</h3>
                    <span className="rounded-full bg-primary-fixed px-2 py-0.5 text-[10px] font-bold text-on-primary-fixed-variant">{processing.length}</span>
                  </div>
                  <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
                </div>
                {processing.map(({ enquiry: enq, assignee }, index) => (
                  <Draggable key={enq.id} draggableId={enq.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.8 : 1 }}
                        className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-white p-4 shadow-sm border-l-4 border-l-primary hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <span className="rounded-md bg-primary-fixed px-2 py-1 text-[10px] font-bold text-on-primary-fixed-variant">ENQ #{enq.id.slice(0, 8)}</span>
                          <div className="flex items-center gap-1 text-[10px] text-primary font-bold">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            {enq.status.toUpperCase()}
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-on-surface leading-snug">{enq.vehicleModel}</p>
                        <div className="w-full bg-surface-container-low rounded-full h-1.5 mt-1">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                        <div className="flex items-center justify-between border-t border-outline-variant pt-3 mt-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-on-surface">{enq.notes || 'No notes'}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Column 3: QC Check */}
          <Droppable droppableId="qcCheck">
            {(provided, snapshot) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                className={`min-w-[320px] max-w-[320px] flex flex-col gap-4 rounded-xl p-2 transition-colors ${snapshot.isDraggingOver ? 'bg-surface-dim/50' : ''}`}
              >
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-tertiary"></span>
                    <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Negotiation</h3>
                    <span className="rounded-full bg-tertiary-fixed px-2 py-0.5 text-[10px] font-bold text-on-tertiary-fixed">{qcCheck.length}</span>
                  </div>
                  <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
                </div>
                {qcCheck.map(({ enquiry: enq, assignee }, index) => (
                  <Draggable key={enq.id} draggableId={enq.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.8 : 1 }}
                        className="flex flex-col gap-3 rounded-xl border border-outline-variant bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <span className="rounded-md bg-surface-container-highest px-2 py-1 text-[10px] font-bold text-on-surface">ENQ #{enq.id.slice(0, 8)}</span>
                          <span className="text-[10px] text-outline font-medium">{new Date(enq.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm font-semibold text-on-surface leading-snug">{enq.vehicleModel}</p>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-tertiary-fixed px-2 py-0.5 text-[9px] font-black text-on-tertiary-fixed">{enq.status.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-outline-variant pt-3 mt-1">
                          <span className="text-[10px] font-bold text-tertiary">{enq.notes || 'Awaiting update'}</span>
                          <span className="material-symbols-outlined text-outline text-lg">switch_account</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Column 4: Ready / Closed */}
          <Droppable droppableId="ready">
            {(provided, snapshot) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                className={`min-w-[320px] max-w-[320px] flex flex-col gap-4 rounded-xl p-2 transition-colors ${snapshot.isDraggingOver ? 'bg-surface-dim/50' : ''}`}
              >
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-secondary"></span>
                    <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Ready / Closed</h3>
                    <span className="rounded-full bg-secondary-fixed px-2 py-0.5 text-[10px] font-bold text-on-secondary-fixed">{ready.length}</span>
                  </div>
                  <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
                </div>
                {ready.map(({ enquiry: enq, assignee }, index) => (
                  <Draggable key={enq.id} draggableId={enq.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.8 : 1 }}
                        className="flex flex-col gap-3 rounded-xl border border-outline-variant bg-white p-4 shadow-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <span className="rounded-md bg-surface-container-highest px-2 py-1 text-[10px] font-bold text-on-surface">ENQ #{enq.id.slice(0, 8)}</span>
                          <span className="text-[10px] text-outline font-medium">{new Date(enq.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm font-semibold text-on-surface leading-snug">{enq.vehicleModel}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

        </div>
      </div>
    </DragDropContext>
  );
}
