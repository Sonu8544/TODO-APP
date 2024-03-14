import React, { useState } from 'react';

export default function TodoBox() {
    const [inputValue, setInputValue] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
    const [todoList, setTodoList] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== "") {
            setTodoList(prevTodoList => [...prevTodoList, { text: inputValue, completed: false }]);
            setInputValue("");
        }
    };

    const handleDeleteTodo = (index) => {
        setTodoList(prevTodo => prevTodo.filter((_, i) => i !== index))
    };

    const handleEditTodo = (index) => {
        setEditIndex(index);
        setInputValue(todoList[index].text);
    };

    const handleSaveEdit = () => {
        if (inputValue.trim() !== "") {
            setTodoList(prevTodoList => {
                const updatedTodoList = [...prevTodoList];
                updatedTodoList[editIndex] = { ...updatedTodoList[editIndex], text: inputValue };
                return updatedTodoList;
            });
            setInputValue("");
            setEditIndex(-1);
        }
    };

    const handleCancelEdit = () => {
        setInputValue("");
        setEditIndex(-1);
    };

    const handleToggleComplete = (index) => {
        setTodoList(prevTodoList => {
            const updatedTodoList = [...prevTodoList];
            updatedTodoList[index] = { ...updatedTodoList[index], completed: !updatedTodoList[index].completed };
            return updatedTodoList;
        });
    };

    return (
        <div className='bg-gray-600 max-w-[600px] mx-auto flex flex-col gap-10'>
            <h1 className='text-center text-[40px] text-white uppercase pt-5 font-sans font-[600] underline'>Todo list</h1>
            <div className="relative">
                <input
                    type="search"
                    id="search"
                    className="block w-full p-4 text-white border-solid focus:ring-blue-500 focus:border-blue-500 bg-gray-700 placeholder-white ring-blue-500 border-2 border-black"
                    placeholder={editIndex !== -1 ? "Edit Todo" : "Add Todo"}
                    value={inputValue}
                    onChange={handleInputChange}
                    required
                />
                <button
                    type="button"
                    onClick={editIndex !== -1 ? handleSaveEdit : handleAddTodo}
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-md text-lg px-6 py-2 hover:bg-blue-600 focus:ring-blue-700"
                >
                    {editIndex !== -1 ? "SAVE" : "ADD"}
                </button>
                {editIndex !== -1 && (
                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="text-white absolute bottom-2.5 end-32 bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-md text-lg px-6 py-2 hover:bg-red-600 focus:ring-red-700"
                    >
                        CANCEL
                    </button>
                )}
            </div>
            {/* Todo Item */}
            <div>
                <ul>
                    {todoList.map((todoItem, index) => (
                        <li key={index} className={`text-md font-sans px-5 py-3 shadow-xl border-t-2 flex gap-5 items-start ${todoItem.completed ? 'text-blue-600' : 'text-white'}`}>
                            <p className='border-2 border-solid border-white px-[8px] rounded-[50px]'>{index + 1}</p>
                            {editIndex === index ? (
                                <input
                                    type="search"
                                    className="block w-full text-white border-solid focus:ring-blue-500 focus:border-blue-500 bg-gray-700 placeholder-white ring-blue-500 border-2 border-black"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{todoItem.text}</p>
                            )}
                            <div className='flex items-end ml-auto'>
                                <button
                                    type="button"
                                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-back font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2"
                                    onClick={() => handleEditTodo(index)}
                                >
                                    EDIT
                                </button>
                                <button
                                    type="button"
                                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-back font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2"
                                    onClick={() => handleDeleteTodo(index)}
                                >
                                    DELETE
                                </button>
                                <button
                                    type="button"
                                    className={`text-white font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 ${todoItem.completed ? 'bg-gray-400 cursor-default' : 'bg-blue-500 hover:bg-blue-600'}`}
                                    onClick={() => handleToggleComplete(index)}
                                    disabled={editIndex === index}
                                >
                                    {todoItem.completed ? 'Completed' : 'Complete'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
