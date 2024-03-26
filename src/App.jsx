import axios from 'axios'
import NoteCard from "./Components/NoteCard"
import RecentNoteCard from "./Components/RecentNoteCard"
import React, { useEffect, useState } from "react";
import logo from './assets/note.png';
import AddNote from './assets/AddNote.png';
import allnotes from './assets/allnotes.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  // State variables initialization
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState([]);

  // Base URL for API requests
  // const baseURL = 'http://127.0.0.1:5001/note-taking-app-cloud-function/us-central1/app/api/note';
  const baseURL = 'https://simple-note-taking-application-backend-1.onrender.com/api/note/';


  // useEffect hook for component initialization and cleanup
  useEffect(() => {
    // Function to load notes when component mounts
    (async () => await Load())();
  }, []);

  // Function to load notes from API
  async function Load() {
    const result = await axios.get(baseURL);
    setNotes(result.data);
    console.log(result.data);
  }

  // Function to save a new note
  async function saveNote(event) {
    event.preventDefault();
    // Validation checks
    if (title.length == 0 || note.length == 0 || date.length == 0) {
      toast.warn('All the feilds are required! 🛑', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    try {
      // API request to save note
      await axios.post(baseURL, {
        title: title,
        note: note,
        date: date
      });
      // Success message
      toast.success('Note added successful! 😍', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Clearing input fields and reloading notes
      setId("");
      setNote("");
      setTitle("");
      setDate("");
      Load();
    } catch (err) { }
  }

  // Function to edit notes
  async function editNotes(note) {
    setNote(note.note);
    setTitle(note.title);
    setId(note._id);
    setDate(note.date)
  }

  // Function to delete a note
  async function DeleteNote(id) {
    await axios.delete(baseURL + id);

    // Success message
    toast.success('Note deleted successful!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // Clearing input fields and reloading notes
    setId("");
    setNote("");
    setTitle("");
    setDate("");
    Load();
  }

  // Function to update a note
  async function updateNote(event) {
    event.preventDefault();
    console.log("Notes:", notes);
    console.log("ID:", id);
    const noteToUpdate = notes.find((note) => note._id === id);
    if (!noteToUpdate) {
      alert("Note not found");
      return;
    }

    try {
      // API request to update note
      await axios.put(
        baseURL + id,
        {
          _id: id,
          title: title,
          note: note,
          date: date
        }
      );
      // Success message
      toast.success('Note updated successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Clearing input fields and reloading notes
      setId("");
      setNote("");
      setTitle("");
      setDate("");
      Load();
    } catch (err) {
      alert(err);
    }
  }

  // JSX return for the component
  return (
    <div className="flex w-full h-full font-body overflow-hidden">

      {/* left side */}
      <div className="flex min-[0px]:hidden sm:flex flex-col md:w-[25%] bg-white/30 h-screen rounded-lg  backdrop-filter">

        {/* Heading */}
        <div className="flex w-full h-[10%] items-center justify-center text-xl text-white mt-4" >
          <img src={logo} />
        </div>

        <hr className="m-3" />

        {/* Recently added notes */}
        <div className="flex flex-col w-full h-[90%] ">
          <div className="flex  h-10% items-center gap-2">
            <span className="flex h-[10%] text-[0.8rem] text-black font-semibold  items-center ml-3">Recently added notes</span>
          </div>
          <div className="flex flex-col w-full h-[80%] mt-7  overflow-y-auto scrollbar scrollbar-thumb-pink-500 ">
            {notes.map(function fn(note) {
              return (
                <RecentNoteCard title={note.title} handleUpdate={() => editNotes(note)} handleDelete={() => DeleteNote(note._id)} />
              )
            })}
          </div>

        </div>

      </div>

      {/* Right side */}
      <div className="flex flex-col min-[0px]:w-full  min-[320px]:w-fll h-screen min-[0px]:mt-10 md:mt-0">
        <div className="h-full w-full flex flex-col items-center">
          <span className='min-[0px]:flex sm:hidden text-2xl text-white'> <img src={logo} /></span>

          <div className="w-[90%] h-[60%] bg-white/30 rounded-lg  m-3 backdrop-filter min-[0px]:mt-5 sm:mt-0">
            <div className="flex w-full h-[6%] items-center justify-center md:text-sm lg:text-xltext-black font-semibold  min-[0px]:mt-6 gap-2">
              <img src={AddNote} className='w-[30px] ' />
              <span >Add Notes Here</span>
            </div>

            <div className="flex w-full flex-wrap flex-col min-[0px]:h-[70%] md:h-[60%] gap-2 justify-center items-center ">
              <div className="flex w-full min-[0px]:flex-col md:flex-row md:gap-[1px] min-[0px]:gap-2 items-center justify-center">

                <input
                  type="text"
                  placeholder="Title"
                  className="text-sm p-3 sm:h-5 lg:h-10 min-[0px]:w-[90%] min-[320px]:w-[80%] md:w-[25%] outline-none md:text-[0.6rem] lg:text-[0.8rem] font-body rounded-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <input
                  type="date"
                  placeholder="Date"
                  className="text-sm p-3 sm:h-5 min-[0px]:w-[90%] lg:h-10 min-[320px]:w-[80%] md:w-[25%] outline-none md:text-[0.6rem]  lg:text-[0.8rem] font-body rounded-sm"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />


              </div>
              <div className="flex w-full gap-3 items-center justify-center ">
                <textarea
                  className="resize-none lg:h-[100px] min-[0px]:w-[90%] min-[320px]:w-[80%] md:w-[50%] outline-none p-3 md:text-[0.6rem]  lg:text-[0.8rem]font-body rounded-sm"
                  value={note}
                  placeholder="Add note here"
                  onChange={(e) => setNote(e.target.value)}></textarea>
              </div>
            </div>

            <div className="w-full h-[30%] flex gap-[3px] justify-center  ">
              <button onClick={saveNote} className=" min-[0px]:w-[40%] min-[320px]:w-[40%] md:w-[25%] min-[0px]:h-8 lg:h-10 btn-add bg-sky-800 font-bold rounded-sm text-[0.8rem] text-white outline-none ">Add task</button>
              <button onClick={updateNote} className="min-[0px]:w-[40%] min-[320px]:w-[40%] md:w-[25%] min-[0px]:h-8 lg:h-10 btn-update font-bold  rounded-sm text-[0.8rem] outline-none text-white ">Update task</button>
            </div>
          </div>

          <div className="flex  w-[90%] h-[45%] rounded-lg  m-3 ">

            <div className='w-full h-full flex flex-col backdrop-filter bg-white/30   rounded-lg  '>
              <div className='  flex flex-row w-full h-1/5 items-center justify-center gap-2'>
                <img src={allnotes} className='w-[30px]' />
                <span className='text-black font-semibold  md:text-sm lg:text-xl '>Your All Notes</span>
              </div>
              <div className=' flex flex-wrap justify-center w-full h-4/5 overflow-y-auto  scrollbar scrollbar-thumb-pink-500 scroll-smooth scrollbar-thin '>
                {notes.map(function fn(note) {
                  return (
                    <NoteCard title={note.title} note={note.note} date={note.date} handleUpdate={() => editNotes(note)} handleDelete={() => DeleteNote(note._id)} />
                  )
                })}
              </div>

            </div>
          </div>

        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default App

