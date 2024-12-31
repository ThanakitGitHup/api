import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Course = () => {
  const [data, setData] = useState([]);
  const callApi = async () => {
    const res = await axios.get(
      "https://api.codingthailand.com/api/course"
    );
    const data_format = await res.data.data;
    setData(data_format);
  };
  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-white to-indigo-200 min-h-screen p-8">
      <h1 className="text-6xl font-extrabold text-center text-black mb-16">
        หลักสูตร
      </h1>

      <div className="flex flex-wrap justify-center gap-12">
        {
          data.map((d) => (
            <CourseCard 
              key={d.id} 
              id={d.id} 
              picture={d.picture} 
              title={d.title} 
              detail={d.detail} 
              date={d.date} 
              view={d.view} 
            />
          ))
        }
      </div>
    </div>
  );
};

const CourseCard = (props) => {
  return (
    <NavLink to={"/course/" + props.id}>
      <div className="relative w-full sm:w-80 md:w-72 lg:w-80 xl:w-96 bg-white rounded-3xl shadow-2xl overflow-hidden transition-all transform hover:scale-105 hover:shadow-3xl">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-800 to-transparent opacity-30"></div>
        <img className="w-full h-56 object-cover transition-all duration-500 hover:scale-110" src={props.picture} alt={props.title} />
        
        <div className="absolute inset-x-0 bottom-6 px-6 space-y-4 z-10">
          <h3 className="text-2xl font-bold text-white transition-colors">
            {props.title}
          </h3>
          <p className="text-sm text-white opacity-90">{props.detail}</p>
          
          <div className="flex justify-between text-xs text-white opacity-80">
            <div className="flex items-center">
              <i className="fa-solid fa-calendar-days mr-1"></i> {props.date}
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-eye mr-1"></i> {props.view}
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Course;
