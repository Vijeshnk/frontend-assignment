import React, { useState, useEffect } from 'react';
import { Resizable } from 're-resizable';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

export const ResizableComponent = () => {
    const [data, setData] = useState('');
    const [elements, setElements] = useState([]);
    const [selectedElementId, setSelectedElementId] = useState('');
    const [operationCount, setOperationCount] = useState({ adds: 0, updates: 0 });

    useEffect(() => {
        fetchElementsFromLocalStorage();
        fetchOperationCounts();
    }, []);

    const fetchElementsFromLocalStorage = () => {
        const storedElements = localStorage.getItem('elements');
        if (storedElements) {
            setElements(JSON.parse(storedElements));
        }
    };

    const saveElementToLocalStorage = (newElement) => {
        const updatedElements = [...elements, newElement];
        localStorage.setItem('elements', JSON.stringify(updatedElements));
        fetchElementsFromLocalStorage(); 
    };

    const updateElementInLocalStorage = (updatedElement) => {
        const updatedElements = elements.map((element) =>
            element._id === updatedElement._id ? updatedElement : element
        );
        localStorage.setItem('elements', JSON.stringify(updatedElements));
        fetchElementsFromLocalStorage(); 
    };

    const fetchOperationCounts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/data/count');
            setOperationCount({
                adds: response.data[0].totalAdds,
                updates: response.data[0].totalUpdates
            });
        } catch (error) {
            console.error('Failed to fetch operation counts:', error);
        }
    };

    const handleAdd = async () => {
        try {
            const response = await axios.post('http://localhost:8080/data', { content: data });
            const newElement = { ...response.data, content: data };
            saveElementToLocalStorage(newElement);
            setData('');
            fetchOperationCounts();
        } catch (error) {
            console.error('Failed to add data:', error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedElementId) {
            alert('Please select an element to update.');
            return;
        }
        try {
            await axios.put(`http://localhost:8080/data/${selectedElementId}`, { content: data });
            const updatedElement = { _id: selectedElementId, content: data };
            updateElementInLocalStorage(updatedElement);
            fetchOperationCounts(); 
            setData('');
            setSelectedElementId('');
        } catch (error) {
            console.error('Failed to update data:', error);
        }
    };

    const selectElement = (element) => {
        setData(element.content);
        setSelectedElementId(element._id);
    };

    return (
        <>
            <Resizable
                defaultSize={{
                    width: 700,
                    height: 420,
                }}
                style={{ border: '1px solid black', padding: '20px' }}
                minWidth={190}
                minHeight={400}
                enable={{
                    top: true, right: true, bottom: true, left: true,
                    topRight: true, bottomRight: true, bottomLeft: true, topLeft: true,
                }}
                className="bg-orange-100"
            >
            
                <textarea
                    className="w-full h-24 p-2 mb-4"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    placeholder="Enter your data here"
                ></textarea>
                <div className="flex gap-4 mb-4">
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                        onClick={handleAdd}
                    >
                        Add
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={handleUpdate}
                        disabled={!selectedElementId}
                    >
                        Update
                    </button>
                </div>
                <ul className="mb-4 max-h-40 overflow-auto">
                    {elements.map((element) => (
                        <li key={element._id} onClick={() => selectElement(element)} className={`cursor-pointer hover:bg-gray-200 p-2 ${selectedElementId === element._id ? 'bg-gray-300' : ''}`}
                        >
                            {element.content}
                        </li>
                    ))}
                </ul>
                <div>Operation Counts - Adds: {operationCount.adds}, Updates: {operationCount.updates}</div>
            </Resizable>
        </>
    );
};
