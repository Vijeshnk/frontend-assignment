import React, { useState, useEffect } from 'react';
import { Resizable } from 're-resizable';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

interface Element {
    _id: string;
    content: string;
}


export const ResizableComponent = () => {
    const [data, setData] = useState('');
    const [elements, setElements] = useState<Element[]>([]);
    const [selectedElementId, setSelectedElementId] = useState('');
    const [operationCount, setOperationCount] = useState({ adds: 0, updates: 0 });

    useEffect(() => {
        fetchElementsFromLocalStorage();
        fetchOperationCounts();
    }, []);

    /**
     * The function fetches elements from local storage and sets them in the state if they exist.
     */
    const fetchElementsFromLocalStorage = () => {
        const storedElements = localStorage.getItem('elements');
        if (storedElements) {
            setElements(JSON.parse(storedElements));
        }
    };

    /**
     * The function `saveElementToLocalStorage` saves a new element to local storage and fetches all
     * elements from local storage.
     * @param {Element} newElement - `newElement` is the element that needs to be saved to the local
     * storage.
     */
    const saveElementToLocalStorage = (newElement: Element) => {
        const updatedElements = [...elements, newElement];
        localStorage.setItem('elements', JSON.stringify(updatedElements));
        fetchElementsFromLocalStorage();
    };

    /**
     * The function `updateElementInLocalStorage` updates a specific element in local storage and fetches
     * the updated elements.
     * @param {Element} updatedElement - The `updatedElement` parameter in the
     * `updateElementInLocalStorage` function represents the element that has been updated and needs to
     * be saved in the local storage.
     */
    const updateElementInLocalStorage = (updatedElement: Element) => {
        const updatedElements = elements.map((element) =>
            element._id === updatedElement._id ? updatedElement : element
        );
        localStorage.setItem('elements', JSON.stringify(updatedElements));
        fetchElementsFromLocalStorage();
    };

  /**
   * The function fetchOperationCounts fetches operation counts from a specified API endpoint and
   * updates the state with the total number of adds and updates.
   */
    const fetchOperationCounts = async () => {
        try {
            const response = await axios.get('https://node-mongo-api-qff7.onrender.com/data/count');
            setOperationCount({
                adds: response.data[0].totalAdds,
                updates: response.data[0].totalUpdates
            });
        } catch (error) {
            console.error('Failed to fetch operation counts:', error);
        }
    };

  /**
   * The handleAdd function sends a POST request to a server, saves the response to local storage,
   * clears the input data, and fetches updated operation counts.
   */
    const handleAdd = async () => {
        try {
            const response = await axios.post('https://node-mongo-api-qff7.onrender.com/data', { content: data });
            const newElement = { ...response.data, content: data };
            saveElementToLocalStorage(newElement);
            setData('');
            fetchOperationCounts();
        } catch (error) {
            console.error('Failed to add data:', error);
        }
    };

 /**
  * The `handleUpdate` function updates data for a selected element using an HTTP PUT request and
  * handles error cases.
  * @returns The `handleUpdate` function returns nothing explicitly, but it may return a promise if the
  * `axios.put` call is made asynchronously.
  */
    const handleUpdate = async () => {
        if (!selectedElementId) {
            alert('Please select an element to update.');
            return;
        }
        try {
            await axios.put(`https://node-mongo-api-qff7.onrender.com/data/${selectedElementId}`, { content: data });
            const updatedElement = { _id: selectedElementId, content: data };
            updateElementInLocalStorage(updatedElement);
            fetchOperationCounts();
            setData('');
            setSelectedElementId('');
        } catch (error) {
            console.error('Failed to update data:', error);
        }
    };

   /**
    * The `selectElement` function sets data and the selected element ID based on the input element.
    * @param {Element} element - The `element` parameter in the `selectElement` function is of type
    * `Element`. It is an object that represents an element in the DOM (Document Object Model) with
    * properties such as `content` and `_id`.
    */
    const selectElement = (element: Element) => {
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
