import React from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Chapter = () => {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  const callApi = async () => {
    const res = await axios.get(
      "https://api.codingthailand.com/api/course/" + id
    );
    const data_format = await res.data.data;
    let result = data_format.length;
    if (result === 0) {
      setText("ไม่พบข้อมูลในหลักสูตร");
    } else {
      setData(data_format);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-white to-indigo-200 min-h-screen p-8">
      <div className="flex justify-between items-center mt-10 mb-5">
        <h1 className="text-3xl font-extrabold text-black"> เนื้อหาในหลักสูตร
        </h1>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {data.map((d) => (
            <ChapterCard
              key={d.ch_id}
              title={d.ch_title}
              url={d.ch_url}
              view={d.ch_view}
              timetotal={d.ch_timetotal}
            />
          ))}
        </div>
      </div>

      <p className="text-xl font-bold text-red-800 text-center mt-6">{text}</p>
    </div>
  );
};

const ChapterCard = (props) => {
  return (
    <div className="relative w-full sm:w-80 md:w-72 lg:w-80 xl:w-96 bg-white rounded-3xl shadow-2xl overflow-hidden transition-all transform hover:scale-105 hover:shadow-3xl">
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-800 to-transparent opacity-30"></div>
      <iframe
        className="w-full h-56 object-cover transition-all duration-500 hover:scale-110"
        src={`https://www.youtube.com/embed/${props.url}`}
        title={props.title}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div className="absolute inset-x-0 bottom-6 px-6 space-y-4 z-10">
        <h3 className="text-2xl font-bold text-black transition-colors">
          {props.title}
        </h3>
        <div className="flex justify-between text-xs text-black opacity-80">
          <div className="flex items-center">
            <i className="fa-solid fa-eye mr-1"></i> {props.view}
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-clock mr-1"></i> {props.timetotal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
