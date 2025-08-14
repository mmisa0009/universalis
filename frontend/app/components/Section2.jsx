'use client';

import { useEffect } from "react";
import Image from 'next/image';
import { announcements } from '../data/announcements';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Section2() {
    useEffect(() => {
        //initialize swiper
        const announcementSwiper = new Swiper('.announcements-swiper', {
            modules: [Pagination],
            loop: false,
            slidesPerView: 3,
            spaceBetween: 20,
            pagination: {
                el: '.announcements-swiper .swiper-pagination',
                clickable: true,
            },
            //responsible breakpoints
            /*//breakpoints: {
                //when window width is > = 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                //when window width is >= 780px
                780: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
            */
        });
    
        return () => {
            if (announcementSwiper) {
                announcementSwiper.destroy();
            }
        };
    }, []);

    return (
        <div className="mx-auto my-8 px-6">
            <h2 className="text-[4vw] tracking-[-0.06em]">Announcements</h2>
            <hr className="border-t border-gray-700 my-4" />
            <div className="swiper announcements-swiper  py-8 mx-auto my-4 w-[95%] pb-30">
                <div className="swiper-wrapper">
                {announcements.map((announcement, index) => (
                    <div key={index} className="swiper-slide bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border border-white/20 border-opacity-20 shadow-lg rounded-[25px] text-[#FFF8F0] p-4 flex flex-col items-start text-left">
                        {announcement.img && (
                            <Image
                            src={announcement.img}
                            alt={announcement.title}
                            width={500}
                            height={300}
                            className="max-w-[90%] rounded-[15px] block mx-auto"
                            />
                        )}
                        <div className="flex flex-col items-start text-left px-3">
                            <div className="mt-1">
                                <h3 className="mb-0.5 text-[1.4vw]">{announcement.title}</h3>
                                <p className="text-[1.2vw] mb-0.1">{announcement.time}</p>
                                <p className="text-[1.2vw] mb-0.1">{announcement.location}</p>
                            </div>
                            <div className=" flex flex-wrap gap-2 mt-2">
                                {announcement.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="tag text-[1.1vw] bg-[#FFF8F0] text-[#001C3D] p-[0.4em] text-sm rounded-[50px] ">
                                    {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        <div className="swiper-pagination relative mt-11"></div>
      </div>
    </div>
    );
}