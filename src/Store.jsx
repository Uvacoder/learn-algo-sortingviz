import create from 'zustand'
import { immer } from "zustand/middleware/immer";

import shallowComparison from 'zustand/shallow'
export const shallow = shallowComparison

export const useSortStore = create(immer((set) => ({
  algo: "bubbleSort",
  len: 30,
  blocks: [],
  sorting: false,
  completed: true,
  speed: 250,
  compare: [],
  swap: [],
  sortedIndex: [],
  activeNotes: [],
  setAlgo: (algo) => { set((state) => { state.algo = algo })},
  setLength: (len) => { set((state) => { state.len = len })},
  setBlocks: (blocks) => { set((state) => { state.blocks = blocks })},
  setSorting: (sorting) => { set((state) => { state.sorting = sorting })},
  setCompleted: (completed) => { set((state) => { state.completed = completed })},
  setSpeed: (speed) => { set((state) => { state.speed = speed })},
  setCompare: (compare) => { set((state) => { 
    state.compare = compare 
  })},
  setSwap: (swap) => { set((state) => { 
    state.swap = swap 
  })},
  setSortedIndex: (sortedIndex) => { set((state) => { state.sortedIndex = sortedIndex })},
  setActiveNotes: (activeNotes) => { set((state) => { state.activeNotes = activeNotes })},
})))
