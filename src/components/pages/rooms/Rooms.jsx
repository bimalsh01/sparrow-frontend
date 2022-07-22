import React, { useEffect, useState } from "react";

import { getAllRooms } from "../../../http/Index";
import AddRoomModal from "../addRoomModal/AddRoomModal";
import RoomCard from "../roomCard/RoomCard";
import style from "./Rooms.module.css";

const Rooms = () => {

  const [rooms,setRooms] = useState([]);

  useEffect(()=>{
    const fetchRooms = async () =>{
      const {data} = await getAllRooms();
      setRooms(data);
    };
    fetchRooms();
  },[]);

  const [showModal, setShowModal] = useState(false);

  function openModal(){
    setShowModal(true);
  }


  return (
    <div className="container">
      <div className={style.roomHeader}>
        <div className={style.left}>
          {/* <span className="fs-3">Search the room</span> */}
          <div className={style.search}>
          <i class="fa-solid fa-podcast fs-3"></i>
            <h5 className="mt-1 ms-2">Enjoy sparrow rooms 🎉🎉</h5>
          </div>
        </div>
        <div className={style.rignt}>
          <button onClick={openModal} className="btn btn-success shadow-0">
            <span className="fw-bold">Create a room</span>
            <i class="fa-solid fa-microphone-lines ms-2 fw-bold"></i>

          </button>
        </div>
      </div>

      <div className={style.roomList}>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room}/>
        ))}
      </div>
      {showModal && <AddRoomModal onClose={()=> setShowModal(false)} />}
    </div>
  );
};

export default Rooms;
