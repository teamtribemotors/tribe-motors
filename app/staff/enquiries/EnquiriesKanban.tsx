'use client';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useOptimistic, startTransition, useEffect, useState } from 'react';
import { updateEnquiryStatus, updateEnquiryNotes, assignEnquiry } from '../../actions/enquiries';

type EnquiryData = {
  enquiry: any;
  assignee: any;
};

export default function EnquiriesKanban({ initialData, staffMembers = [] }: { initialData: EnquiryData[], staffMembers?: any[] }) {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryData | null>(null);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [optimisticData, addOptimisticData] = useOptimistic(
    initialData,
    (state, action: { type: string, payload: any }) => {
      if (action.type === 'update_status') {
        return state.map(item => item.enquiry.id === action.payload.id ? { ...item, enquiry: { ...item.enquiry, status: action.payload.status } } : item);
      }
      if (action.type === 'update_notes') {
        return state.map(item => item.enquiry.id === action.payload.id ? { ...item, enquiry: { ...item.enquiry, notes: action.payload.notes } } : item);
      }
      if (action.type === 'update_assignee') {
        const staff = staffMembers.find(s => s.id === action.payload.assigneeId);
        return state.map(item => item.enquiry.id === action.payload.id ? { ...item, assignee: staff, enquiry: { ...item.enquiry, assignedTo: action.payload.assigneeId } } : item);
      }
      return state;
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

    startTransition(() => {
      addOptimisticData({ type: 'update_status', payload: { id: draggableId, status: newStatus } });
    });

    try {
      await updateEnquiryStatus(draggableId, newStatus);
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    
    const formData = new FormData(e.target as HTMLFormElement);
    const internalNotes = formData.get('internalNotes') as string;
    const assignedTo = formData.get('assignedTo') as string;

    const id = selectedEnquiry.enquiry.id;

    startTransition(() => {
      if (internalNotes !== selectedEnquiry.enquiry.notes) {
        addOptimisticData({ type: 'update_notes', payload: { id, notes: internalNotes } });
      }
      if (assignedTo !== (selectedEnquiry.enquiry.assignedTo || '')) {
        addOptimisticData({ type: 'update_assignee', payload: { id, assigneeId: assignedTo } });
      }
    });

    setSelectedEnquiry(null);

    try {
      if (internalNotes !== selectedEnquiry.enquiry.notes) {
        await updateEnquiryNotes(id, internalNotes);
      }
      if (assignedTo !== (selectedEnquiry.enquiry.assignedTo || '')) {
        await assignEnquiry(id, assignedTo);
      }
    } catch (err) {
      console.error("Failed to update enquiry details", err);
    }
  };

  if (!isMounted) return null;

  return (
    <>
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
                  {pending.map((item, index) => {
                    const enq = item.enquiry;
                    const assignee = item.assignee;
                    return (
                    <Draggable key={enq.id} draggableId={enq.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.8 : 1 }}
                          onClick={() => setSelectedEnquiry(item)}
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
                  )})}
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
                  {processing.map((item, index) => {
                    const enq = item.enquiry;
                    const assignee = item.assignee;
                    return (
                    <Draggable key={enq.id} draggableId={enq.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.8 : 1 }}
                          onClick={() => setSelectedEnquiry(item)}
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
                              <div className="h-6 w-6 rounded-full border-2 border-white bg-surface-dim flex items-center justify-center text-[10px] font-bold text-on-surface">
                                {assignee ? assignee.name.charAt(0) : '?'}
                              </div>
                              <span className="text-[10px] font-bold text-on-surface truncate max-w-[150px]">{enq.notes || 'No notes'}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  )})}
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
                  {qcCheck.map((item, index) => {
                    const enq = item.enquiry;
                    const assignee = item.assignee;
                    return (
                    <Draggable key={enq.id} draggableId={enq.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.8 : 1 }}
                          onClick={() => setSelectedEnquiry(item)}
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
                            <span className="text-[10px] font-bold text-tertiary truncate max-w-[180px]">{enq.notes || 'Awaiting update'}</span>
                            <div className="h-6 w-6 rounded-full border-2 border-white bg-surface-dim flex items-center justify-center text-[10px] font-bold text-on-surface">
                                {assignee ? assignee.name.charAt(0) : '?'}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  )})}
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
                  {ready.map((item, index) => {
                    const enq = item.enquiry;
                    const assignee = item.assignee;
                    return (
                    <Draggable key={enq.id} draggableId={enq.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.8 : 1 }}
                          onClick={() => setSelectedEnquiry(item)}
                          className="flex flex-col gap-3 rounded-xl border border-outline-variant bg-white p-4 shadow-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <div className="flex justify-between items-start">
                            <span className="rounded-md bg-surface-container-highest px-2 py-1 text-[10px] font-bold text-on-surface">ENQ #{enq.id.slice(0, 8)}</span>
                            <span className="text-[10px] text-outline font-medium">{new Date(enq.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm font-semibold text-on-surface leading-snug">{enq.vehicleModel}</p>
                          <div className="flex justify-between mt-2">
                             <div className="h-6 w-6 rounded-full border-2 border-white bg-surface-dim flex items-center justify-center text-[10px] font-bold text-on-surface">
                                {assignee ? assignee.name.charAt(0) : '?'}
                              </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  )})}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

          </div>
        </div>
      </DragDropContext>

      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
              <h3 className="font-headline-md text-lg text-on-surface">Enquiry Details</h3>
              <button 
                onClick={() => setSelectedEnquiry(null)}
                className="text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded-full hover:bg-surface-variant/50"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSaveModal} className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-outline font-label-md">Customer</p>
                <p className="text-on-surface font-body-lg">{selectedEnquiry.enquiry.name} • {selectedEnquiry.enquiry.number}</p>
                <p className="text-on-surface-variant font-body-sm">{selectedEnquiry.enquiry.email}</p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm text-outline font-label-md">Vehicle Interest</p>
                <p className="text-on-surface font-body-md font-semibold">{selectedEnquiry.enquiry.vehicleModel}</p>
              </div>

              <div className="h-px bg-outline-variant/30 w-full"></div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-label-md text-on-surface">Assign Staff Member</label>
                <select 
                  name="assignedTo" 
                  defaultValue={selectedEnquiry.enquiry.assignedTo || ''}
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-on-surface font-body-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                >
                  <option value="">-- Unassigned --</option>
                  {staffMembers.map(staff => (
                    <option key={staff.id} value={staff.id}>{staff.name} ({staff.email})</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-label-md text-on-surface">Internal Notes</label>
                <textarea 
                  name="internalNotes"
                  rows={4}
                  defaultValue={selectedEnquiry.enquiry.notes || ''}
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-3 text-on-surface font-body-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Add your notes about this lead..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button 
                  type="button" 
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-5 py-2.5 rounded-full font-label-md text-primary hover:bg-primary/10 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-primary font-label-md text-on-primary shadow-sm hover:shadow transition-all hover:bg-primary/90"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
