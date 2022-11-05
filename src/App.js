import React, { useState, useEffect } from 'react'
import { useSortStore , shallow } from "./Store"
import './App.css'

import Navbar from './components/Navbar/Navbar'
import ListBlocks from './components/ListBlocks/ListBlocks'
import Legends from './components/Legends/Legends'
import Info from './components/Info'

// Algorithms
import bubbleSort from './algorithms/bubbleSort'
import insertionSort from './algorithms/insertionSort'
import selectionSort from './algorithms/selectionSort'
import mergeSort from './algorithms/mergeSort'
import quickSort from './algorithms/quickSort'
import ResponsivePiano from "./components/Keyboard/ResponsivePiano"

const ConnectedPiano = () => {
	const [ activeNotes ] = useSortStore((s) => [s.activeNotes], shallow)
	return <ResponsivePiano activeNotes={activeNotes}/>
}

function App() {
	
	// Store
	const [ algo, len, blocks, sorting, completed, speed, compare, swap, sortedIndex ] = useSortStore((s) => 
	[s.algo, s.len, s.blocks, s.sorting, s.completed, s.speed, s.compare, s.swap, s.sortedIndex], shallow)
	const [ setAlgo, setLength, setBlocks, setSorting, setCompleted, setSpeed, setCompare, setSwap, setSortedIndex, setActiveNotes ] = useSortStore((s) => 
	[s.setAlgo, s.setLength, s.setBlocks, s.setSorting, s.setCompleted, s.setSpeed, s.setCompare, s.setSwap, s.setSortedIndex, s.setActiveNotes], shallow)
	
	// Generating shuffled array of 1 to len
	const generateRandomArray = (len) => {
		setCompleted(false)
		setSorting(false)
		setSortedIndex([])

		const randomArray = Array.from(Array(len + 1).keys()).slice(1)
		
		for (let i = randomArray.length - 1; i > 0; i--) {
			const randomIndex = Math.floor(Math.random() * (i - 1))
			const temp = randomArray[i]

			randomArray[i] = randomArray[randomIndex]
			randomArray[randomIndex] = temp
		}
		
		setBlocks(randomArray)
	}

	// Generating random array every time the length is changed by th user
	useEffect(() => {
		generateRandomArray(len)
	}, [len, algo])

	// setting the selected algorithm
	const handleAlgo = (event) => {
		setAlgo(event.value)
		
	}

	// handling the length of the array
	const handleLength = (event) => {
		const value = Number(event.target.value)
		setLength(value)
		// console.log(genNote(value))
		setActiveNotes([value + 13])
	}

	// handling the speed of sorting
	const handleSpeed = (event) => {
		const value =  Number(event.target.value)
		setSpeed(Math.ceil(400 / value))
	}

	// Sorting according to the algorithm
	const upshift = len > 40 ? 20 : 50
	const handleSort = () => {
		const sortAccOrder = (order) => {
			(function loop(i) {
				setTimeout(function () {
					const [j, k, arr, index] = order[i]
					console.log("j, k, arr, index",j, k, arr, index)
					setCompare([j, k])
					setActiveNotes([j + upshift, k + upshift])
					setSwap([])
					if(index !== null){
						setSortedIndex([...sortedIndex, index])
					}
					if(arr){
						setBlocks(arr)
						if(j !== null || k != null)
							setSwap([j])
							setTimeout(() => setSwap([k]), speed - 100)
					}
					if (++i < order.length){
						loop(i)
					} else {
						setSorting(false)
						setCompleted(true)
					}   
				}, speed)
			})(0)
		}

		setSorting(true)

		algo === 'bubbleSort' ? sortAccOrder(bubbleSort(blocks)) : 
		algo === 'insertionSort' ?  sortAccOrder(insertionSort(blocks)) :
		algo === 'selectionSort' ? sortAccOrder(selectionSort(blocks)) :
		algo === 'mergeSort' ? sortAccOrder(mergeSort(blocks)) : 
		algo === 'quickSort' ? sortAccOrder(quickSort(blocks)) : (() => {
			setSorting(false)
			setCompleted(true)
		})()
	}

	return (
		<div className="App">
			<Navbar 
				generateRandomArray={() => generateRandomArray(len)}
				handleLength={handleLength} 
				handleSpeed={handleSpeed}
				handleAlgo={handleAlgo}
				handleSort={handleSort} 
				sorting={sorting}
				completed={completed}
				len={len}
				speed={speed}
				algo={algo}
			/>
			
			<ListBlocks 
				blocks={blocks} 
				compare={sorting && compare}
				swap={sorting && swap}
				sorted={sortedIndex} 
			/>

			<Legends algo={algo}/>
			<Info algo = {algo}/>
			<ConnectedPiano />
		</div>
	);
}

export default App
